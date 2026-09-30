export function createLuhnCheckDigit(partial: string): string {
  const totalLength = partial.length + 1;
  let sum = 0;

  for (let index = 0; index < partial.length; index += 1) {
    let digit = Number(partial[index]);

    if (!Number.isInteger(digit)) {
      throw new TypeError("Card number must contain digits only");
    }

    if (index % 2 === totalLength % 2) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
  }

  return String((10 - (sum % 10)) % 10);
}

export function isLuhnValid(number: string): boolean {
  if (!/^\d+$/.test(number)) return false;

  let sum = 0;
  let double = false;

  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);

    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}
