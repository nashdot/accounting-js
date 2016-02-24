
function _stripInsignificantZeros(str, decimal) {
  const parts = str.split(decimal);
  const integerPart = parts[0];
  const decimalPart = parts[1].replace(/0+$/, '');

  if (decimalPart.length > 0) {
    return integerPart + decimal + decimalPart;
  }

  return integerPart;
}

export default _stripInsignificantZeros;
