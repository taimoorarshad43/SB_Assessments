const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

   it("unrolls a 4x4 matrix", () => {
    const square = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    expect(unroll(square)).toEqual([
      1, 2, 3, 4, 8, 12, 16,
      15, 14, 13, 9, 5, 6, 7,
      11, 10
    ]);
  });

  it("unrolls a 3x3 matrix", () => {
    const smallerSquare = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"],
    ];
    expect(unroll(smallerSquare)).toEqual([
      "a", "b", "c", "f", "i", "h", "g", "d", "e"
    ]);
  });

  it("unrolls a 1x1 matrix", () => {
    expect(unroll([[42]])).toEqual([42]);
  });

  it("unrolls a 2x2 matrix", () => {
    expect(unroll([
      [1, 2],
      [3, 4]
    ])).toEqual([1, 2, 4, 3]);
  });

  it("returns an empty array for an empty matrix", () => {
    expect(unroll([])).toEqual([]);
  });

});
