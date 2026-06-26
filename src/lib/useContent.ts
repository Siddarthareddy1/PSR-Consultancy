import { useState, useEffect } from "react";

export function useContent(page: string, defaultContent: Record<string, string>) {
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const res = await fetch(`/api/content?page=${page}`);
        if (res.ok && active) {
          const data = await res.json();
          setContent((prev) => ({ ...prev, ...data }));
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
