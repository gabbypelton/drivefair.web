export const formatPriceFromFloatString = floatString => {
  return `$${parseFloat(floatString).toFixed(2)}`;
}

export const formatImgurUrl = path => {
  return `https://i.imgur.com/${path}.png`;
}