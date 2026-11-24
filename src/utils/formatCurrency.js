/**
 * Formats a numeric amount according to the active currency ('LKR' or 'USD').
 * @param {number} amount
 * @param {'LKR' | 'USD'} currency
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD') {
  const safeAmount = Number.isFinite(Number(amount)) ? Number(amount) : 0;

  if (currency === 'LKR') {
    const formatted = Math.round(safeAmount).toLocaleString('en-LK');
    return `Rs. ${formatted}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount);
}

/**
 * Helper to pick and format a dual-currency price object ({ LKR, USD }).
 * @param {{ LKR: number, USD: number }} priceObj
 * @param {'LKR' | 'USD'} currency
 * @param {number} [multiplier=1]
 * @returns {string}
 */
export function formatDualPrice(priceObj, currency = 'USD', multiplier = 1) {
  const raw = (priceObj?.[currency] ?? 0) * multiplier;
  return formatCurrency(raw, currency);
}
