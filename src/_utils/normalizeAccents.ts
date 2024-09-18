export default function normalizeAccents(str: string): string {
  return str
    .normalize("NFD") // Normalize the string into decomposed form
    .replace(/[\u0300-\u036f]/g, ""); // Remove all combining diacritical marks
}
