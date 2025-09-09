// Simple input sanitizer: strips HTML/script and limits length.
function removeControlChars(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    if ((code >= 32 && code <= 126) || code > 159) {
      out += s[i];
    }
  }
  return out;
}

export function sanitizeInput(str: string, maxLength = 120) {
  let clean = str.replace(/<[^>]*>/g, '').replace(/script/gi, '');
  clean = removeControlChars(clean);
  if (clean.length > maxLength) clean = clean.slice(0, maxLength);
  return clean;
}
