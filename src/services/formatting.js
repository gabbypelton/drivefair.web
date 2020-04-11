export const formatPriceFromFloatString = floatString => {
  return `+$${parseFloat(floatString).toFixed(2)}`;
}