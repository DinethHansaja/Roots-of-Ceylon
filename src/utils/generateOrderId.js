/**
 * Generates a unique, human-readable luxury export order ID.
 * Format: ROC-YYYY-XXXX (e.g., ROC-2026-4821)
 * @returns {string}
 */
export function generateOrderId() {
  const year = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ROC-${year}-${randomDigits}`;
}
