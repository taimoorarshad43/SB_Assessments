function addCommas(num) {
  // Convert the number to a string
  let numStr = num.toString();

  // Check if the number is negative
  let isNegative = false;
  if (numStr[0] === '-') {
    isNegative = true;
    numStr = numStr.slice(1); // Remove the minus sign for now
  }

  // Split the number into integer and decimal parts
  let intPart = numStr;
  let decPart = '';
  if (numStr.includes('.')) {
    let parts = numStr.split('.');
    intPart = parts[0];
    decPart = parts[1];
  }

  // Build the integer part with commas
  let result = '';
  let count = 0;
  for (let i = intPart.length - 1; i >= 0; i--) {
    result = intPart[i] + result;
    count++;

    // Add a comma every 3 digits, but not at the beginning
    if (count % 3 === 0 && i !== 0) {
      result = ',' + result;
    }
  }

  // Add the decimal part back if it exists
  if (decPart !== '') {
    result = result + '.' + decPart;
  }

  // Add back the minus sign if the number was negative
  if (isNegative) {
    result = '-' + result;
  }

  return result;
}

module.exports = addCommas;
