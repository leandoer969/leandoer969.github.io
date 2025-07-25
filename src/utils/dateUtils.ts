/* src/utils/dateUtils.ts */

// Map of month numbers to 3-letter abbreviations
export const MONTH_ABBR: Record<string, string> = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec',
};

/**
 * Formats a duration object to "MMM YYYY".
 * @param year  Four-digit year
 * @param month Two-digit month string ("01"–"12")
 * @returns Formatted string, e.g. "Jun 2024"
 */
export function formatMonthYear(year: number, month: string): string {
  const abbr = MONTH_ABBR[month] || month;
  return `${abbr} ${year}`;
}
