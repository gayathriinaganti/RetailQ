/**
 * Format price in Indian Rupees
 * @param price - Price in paisa (smallest unit)
 * @returns Formatted price string with ₹ symbol
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Convert USD to INR (approximate rate: 1 USD = 83 INR)
 * @param usdPrice - Price in USD
 * @returns Price in INR
 */
export function convertUSDToINR(usdPrice: number): number {
  return Math.round(usdPrice * 83);
}