import { getHashFromItem } from "./getHashFromItem";

const ALLOWED_COLORS = [
  "#001f3f",
  "#0074d9",
  "#7fdbff",
  "#39cccc",
  "#3d9970",
  "#2ecc40",
  "#01ff70",
  "#ffdc00",
  "#ff851b",
  "#ff4136",
  "#85144b",
  "#f012be",
  "#b10dc9",
];

const TOTAL_COLORS = ALLOWED_COLORS.length;

/**
 * Given any serializable input returns a legible fg and bg. Same input = same color
 * @param input
 * @returns a deterministic color for that input
 */
export function getDeterministicPallette(input: any) {
  const serializedString = JSON.stringify(input);
  const colorIndex = getHashFromItem(serializedString)
    .split("")
    .reduce((acc, char) => (acc + char.charCodeAt(0)) % TOTAL_COLORS, 0);
  const deterministicColor = ALLOWED_COLORS[colorIndex];
  const color = getForegroundColor(deterministicColor);
  return { color, backgroundColor: deterministicColor };
}

/**
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by  https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
 *@see {https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/}
 */
const getForegroundColor = (hexInput: string) => {
  let hex = hexInput.replace("#", "");
  if (hex.length == 3) {
    hex = hex.split("").reduce((acc, char) => `${acc}${char}${char}`, "");
  }
  const [r, g, b] = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .slice(1)
    .map((color) => parseInt(color, 16));
  /**
   * @see {@link https://en.wikipedia.org/wiki/YIQ}
   */
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  /**
   * @todo it would be nice to get a complementary foreground that was high contrast
   * alas, I am no designer so this will do for now
   */
  return yiq >= 128 ? "#000000" : "#ffffff";
};
