function unroll(square) {
  const result = [];

  while (square.length > 0) {
    // Top row (left to right)
    result.push(...square.shift());

    // Right column (top to bottom)
    for (let row of square) {
      if (row.length > 0) result.push(row.pop());
    }

    // Bottom row (right to left)
    if (square.length > 0) {
      result.push(...(square.pop().reverse()));
    }

    // Left column (bottom to top)
    for (let i = square.length - 1; i >= 0; i--) {
      if (square[i].length > 0) result.push(square[i].shift());
    }
  }

  return result;
}

module.exports = unroll;
