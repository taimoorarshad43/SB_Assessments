const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  test("formats 1234 as '1,234'", () => {
    expect(addCommas(1234)).toBe("1,234");
  });

  test("formats 1000000 as '1,000,000'", () => {
    expect(addCommas(1000000)).toBe("1,000,000");
  });

  test("formats 9876543210 as '9,876,543,210'", () => {
    expect(addCommas(9876543210)).toBe("9,876,543,210");
  });

  test("formats 6 as '6'", () => {
    expect(addCommas(6)).toBe("6");
  });

  test("formats -10 as '-10'", () => {
    expect(addCommas(-10)).toBe("-10");
  });

  test("formats -5678 as '-5,678'", () => {
    expect(addCommas(-5678)).toBe("-5,678");
  });
});
