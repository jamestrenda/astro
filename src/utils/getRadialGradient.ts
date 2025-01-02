// ChatGPT is life!!!!! Actually, Jesus is the Way, the Truth, and the Life, but ChatGPT is pretty cool too.
type RGB = { r: number; g: number; b: number };

/**
 * Converts a hex color string to an RGB object.
 * @param hex - The hex color string (e.g., "#3498db").
 * @returns An object with `r`, `g`, and `b` values.
 */
function hexToRgb(hex: string): RGB {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

/**
 * Converts an HSL color to an RGB object.
 * @param hsl - The HSL string (e.g., "hsl(210, 50%, 60%)").
 * @returns An object with `r`, `g`, and `b` values.
 */
function hslToRgb(hsl: string): RGB {
  const [h, s, l] = hsl.match(/\d+/g)!.map(Number);

  const sat = s / 100;
  const light = l / 100;

  const chroma = (1 - Math.abs(2 * light - 1)) * sat;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - chroma / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (h >= 0 && h < 60) [r, g, b] = [chroma, x, 0];
  else if (h >= 60 && h < 120) [r, g, b] = [x, chroma, 0];
  else if (h >= 120 && h < 180) [r, g, b] = [0, chroma, x];
  else if (h >= 180 && h < 240) [r, g, b] = [0, x, chroma];
  else if (h >= 240 && h < 300) [r, g, b] = [x, 0, chroma];
  else if (h >= 300 && h < 360) [r, g, b] = [chroma, 0, x];

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

/**
 * Generates a radial gradient using three specified colors, radial center, and gradient stops.
 * @param color1 - The first color as a hex or hsl string (e.g., "#3498db" or "hsl(210, 50%, 60%)").
 * @param color2 - The second color as a hex or hsl string.
 * @param color3 - The third color as a hex or hsl string.
 * @param center - The radial center as a percentage string (e.g., "50% 50%").
 * @param stops - The gradient stops as an array of percentage strings (e.g., ["0%", "50%", "100%"]).
 * @returns A CSS radial gradient string.
 */
export function getRadialGradient(
  color1: string,
  color2: string,
  color3: string,
  center: string = "50% 50%",
  stops: [string, string, string] = ["0%", "50%", "100%"]
): string {
  // Validate the stops array
  if (stops.length !== 3) {
    throw new Error("Please provide exactly three gradient stops.");
  }

  return `radial-gradient(
    circle at ${center}, 
    ${color1} ${stops[0]}, 
    ${color2} ${stops[1]}, 
    ${color3} ${stops[2]}
  )`;
}
