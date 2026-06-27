import { useState, useEffect } from "react";

export function useContent(page: string, defaultContent: Record<string, string>) {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [loading, setLoading] = useState(true);

  // Load from localStorage immediately on mount for zero-latency fallback
  useEffect(() => {
    const cached = localStorage.getItem(`psr_content_${page}`);
    if (cached) {
      try {
        setContent((prev) => ({ ...prev, ...JSON.parse(cached) }));
      } catch {
        // ignore
      }
    }
  }, [page]);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const res = await fetch(`/api/content?page=${page}`);
        if (res.ok && active) {
          const data = await res.json();
          setContent((prev) => {
            const nextContent = { ...prev, ...data };
            // Cache to localStorage for offline / database-fallback survival
            localStorage.setItem(`psr_content_${page}`, JSON.stringify(data));
            return nextContent;
          });
        }
      } catch (err) {
        console.error(`Failed to load page content for ${page}:`, err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      active = false;
    };
  }, [page]);

  return { content, loading };
}
