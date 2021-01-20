export function hashCode(str) { // java String#hashCode
  let hash = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intToRGB(i) {
  // eslint-disable-next-line no-bitwise
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}
