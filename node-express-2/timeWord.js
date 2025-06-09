// your timeword solutio goes here

function convertTime(str)
{

    // You only need these words to make a time string representation
    const numberstoWords = {
    0: 'twelve', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven',
    12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty'
    };

    // Getting the hour and minute representation
    const [hhStr, mmStr] = str.split(':');
    let hh = parseInt(hhStr, 10);
    let mm = parseInt(mmStr, 10);

    if (hh > 24) return 'invalid hour';
    if (mm > 59) return 'invalid minute';

    // Edge Cases
    if (hh === 0 && mm === 0) return 'midnight';
    if (hh === 12 && mm === 0) return 'noon';

    const suffix = hh < 12 ? 'am' : 'pm';

    // We want to get the hour from 24h to 12h format
    hh = hh < 12 ? hh : hh - 12;

    function convertNumberToWords(numStr) {
    const num = parseInt(numStr, 10);
    if (num < 20) return numberstoWords[num];
    const tens = Math.floor(num / 10) * 10;
    const ones = num % 10;
    return ones === 0
      ? numberstoWords[tens]
      : `${numberstoWords[tens]} ${numberstoWords[ones]}`;
  }

    const hourWord = numberstoWords[hh];

    let minuteWord;
    if (mm === 0) {
        return `${hourWord} o’clock ${suffix}`;
    } else if (mm < 10) {
        minuteWord = `oh ${numberstoWords[mm]}`;
    } else {
        minuteWord = convertNumberToWords(mmStr);
    }

    return `${hourWord} ${minuteWord} ${suffix}`;

}

console.log(convertTime('04:05'));
console.log(convertTime('06:18'));
console.log(convertTime('12:00'));
console.log(convertTime('00:00'));
console.log(convertTime('11:11'));
console.log(convertTime('22:10'));
console.log(convertTime('44:33'));