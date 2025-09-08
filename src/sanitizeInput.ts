// Simple input sanitizer: strips HTML/script and limits length.
export function sanitizeInput(str: string, maxLength = 120) {
  let clean = str.replace(/<[^>]*>/g, "").replace(/script/gi, "");
  clean = clean.replace(/[\u0000-\u001F\u007F-\u009F]/g, ""); // remove control chars
  if (clean.length > maxLength) clean = clean.slice(0, maxLength);
  return clean;
}
