export const formatPriceFromFloatString = floatString => {
  return `+$${parseInt(floatString).toFixed(2)}`;
}