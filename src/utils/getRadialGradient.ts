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
  center: string = '50% 50%',
  stops: [string, string, string] = ['0%', '50%', '100%'],
): string {
  // Validate the stops array
  if (stops.length !== 3) {
    throw new Error('Please provide exactly three gradient stops.');
  }

  return `radial-gradient(
    circle at ${center}, 
    ${color1} ${stops[0]}, 
    ${color2} ${stops[1]}, 
    ${color3} ${stops[2]}
  )`;
}
