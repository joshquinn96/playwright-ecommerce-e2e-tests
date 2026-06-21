export function extractOrderIdFromUrl(url: string): string | null {
  const urlMatch = url.match(/prop=%5B%22([^%]+)%22%5D/);
  if (urlMatch) return urlMatch[1];
  // fallback: try to match an order-details path
  const parts = url.split('/');
  const last = parts[parts.length - 1];
  if (last && /[0-9a-f]{20,}/i.test(last)) return last;
  return null;
}
