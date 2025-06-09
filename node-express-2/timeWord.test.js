const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  const cases = [
    ["00:00", "midnight"],
    ["00:12", "twelve twelve am"],
    ["01:00", "one o’clock am"],
    ["06:01", "six oh one am"],
    ["06:10", "six ten am"],
    ["06:18", "six eighteen am"],
    ["06:30", "six thirty am"],
    ["10:34", "ten thirty four am"],
    ["12:00", "noon"],
    ["12:09", "twelve oh nine pm"],
    ["23:23", "eleven twenty three pm"],
  ];

  for (let [input, expected] of cases) {
    test(`returns "${expected}" for "${input}"`, () => {
      expect(timeWord(input)).toBe(expected);
    });
  }

});

