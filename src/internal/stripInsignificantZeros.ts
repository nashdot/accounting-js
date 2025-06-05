
export function stripInsignificantZeros(str: string, decimal: string): string {
  const parts = str.split(decimal);
  let result = '';

  if (parts[0] !== undefined) {
    result = parts[0];
  }

  if (parts[1] !== undefined) {
    const decimalPart = parts[1].replace(/0+$/, '');

    if (decimalPart.length > 0) {
      result = result + decimal + decimalPart;
    }
  }

  return result;
}
