import path from "path";

/**
 * Gets a writable file path. On Vercel (production serverless environments),
 * it returns a path in the '/tmp' directory. Locally, it returns a path in
 * the project root.
 */
export function getWritablePath(filename: string): string {
  // Check if we are running in a Vercel serverless environment
  if (process.env.VERCEL || process.env.NODE_ENV === "production" || typeof process.env.AWS_LOCALS === "string") {
    return path.join("/tmp", filename);
  }
  return path.join(process.cwd(), filename);
}
