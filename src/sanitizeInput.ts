// Improved input sanitizer using DOMPurify for robust XSS protection.
import DOMPurify from 'dompurify';

export function sanitizeInput(str: string, maxLength = 120) {
  // Sanitize with DOMPurify (removes all HTML/script)
  let clean = DOMPurify.sanitize(str, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  if (clean.length > maxLength) clean = clean.slice(0, maxLength);
  return clean;
}
