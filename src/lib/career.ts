// Years of experience, worked out from the start date every time the page
// loads, so the site never needs a manual edit when another year passes.
// To change the start date, edit CAREER_START only.

export const CAREER_START = { year: 2021, month: 10 }; // Oct 2021, joined Miles Education

export function yearsSince(start = CAREER_START, now = new Date()): number {
  let years = now.getFullYear() - start.year;
  if (now.getMonth() + 1 < start.month) years -= 1; // anniversary not reached yet this year
  return Math.max(0, years);
}

const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

/** Whole years in workplace IT, e.g. 5 */
export const years = yearsSince();
/** The same number in words, e.g. "five" */
export const yearsWord = words[years] ?? String(years);
/** Capitalised, e.g. "Five" */
export const YearsWord = yearsWord.charAt(0).toUpperCase() + yearsWord.slice(1);
