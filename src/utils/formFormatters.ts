// Philippine Government Document Formatter Utilities (Appendix 60, 61, 62)

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertUnderThousand(num: number): string {
  if (num === 0) return '';
  if (num < 20) return ONES[num];
  if (num < 100) {
    const rem = num % 10;
    return TENS[Math.floor(num / 10)] + (rem ? ' ' + ONES[rem] : '');
  }
  const rem = num % 100;
  return ONES[Math.floor(num / 100)] + ' Hundred' + (rem ? ' ' + convertUnderThousand(rem) : '');
}

/**
 * Converts a numeric currency amount to words (e.g. 14,500.00 -> "Fourteen Thousand Five Hundred Pesos Only")
 */
export function convertAmountToWords(amount: number): string {
  if (isNaN(amount) || amount === 0) return 'Zero Pesos Only';

  const pesos = Math.floor(amount);
  const centavos = Math.round((amount - pesos) * 100);

  const billions = Math.floor(pesos / 1000000000);
  const millions = Math.floor((pesos % 1000000000) / 1000000);
  const thousands = Math.floor((pesos % 1000000) / 1000);
  const remainder = pesos % 1000;

  const parts: string[] = [];

  if (billions > 0) {
    parts.push(convertUnderThousand(billions) + ' Billion');
  }
  if (millions > 0) {
    parts.push(convertUnderThousand(millions) + ' Million');
  }
  if (thousands > 0) {
    parts.push(convertUnderThousand(thousands) + ' Thousand');
  }
  if (remainder > 0) {
    parts.push(convertUnderThousand(remainder));
  }

  const pesoWords = parts.join(' ') || 'Zero';
  if (centavos > 0) {
    return `${pesoWords} Pesos and ${centavos}/100 Centavos Only`;
  }
  return `${pesoWords} Pesos Only`;
}
