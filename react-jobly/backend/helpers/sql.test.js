
const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", function () {
  test("works: 1 item", function () {
    const result = sqlForPartialUpdate(
        { f1: "v1" },
        { f1: "f1", fF2: "f2" });
    expect(result).toEqual({
      setCols: "\"f1\"=$1",
      values: ["v1"],
    });
  });

  test("works: 2 items", function () {
    const result = sqlForPartialUpdate(
        { f1: "v1", jsF2: "v2" },
        { jsF2: "f2" });
    expect(result).toEqual({
      setCols: "\"f1\"=$1, \"f2\"=$2",
      values: ["v1", "v2"],
    });
  });

///////////////////////////////////////////////////////////// SQL Partial Update ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  test("works: multiple items with mixed mapping", function () {
    const result = sqlForPartialUpdate(
        { firstName: "John", lastName: "Doe", age: 30, email: "john@example.com" },
        { firstName: "first_name", lastName: "last_name" });
    expect(result).toEqual({
      setCols: "\"first_name\"=$1, \"last_name\"=$2, \"age\"=$3, \"email\"=$4",
      values: ["John", "Doe", 30, "john@example.com"],
    });
  });

  test("works: no jsToSql mapping (uses original keys)", function () {
    const result = sqlForPartialUpdate(
        { title: "Software Engineer", salary: 100000, equity: 0.1 },
        {});
    expect(result).toEqual({
      setCols: "\"title\"=$1, \"salary\"=$2, \"equity\"=$3",
      values: ["Software Engineer", 100000, 0.1],
    });
  });

  test("works: partial jsToSql mapping", function () {
    const result = sqlForPartialUpdate(
        { name: "Acme Corp", numEmployees: 50, description: "Great company" },
        { numEmployees: "num_employees" });
    expect(result).toEqual({
      setCols: "\"name\"=$1, \"num_employees\"=$2, \"description\"=$3",
      values: ["Acme Corp", 50, "Great company"],
    });
  });

  test("works: different data types", function () {
    const result = sqlForPartialUpdate(
        { 
          name: "Test Company",
          isActive: true,
          count: 42,
          price: 99.99,
          data: null,
          items: [1, 2, 3]
        },
        { isActive: "is_active" });
    expect(result).toEqual({
      setCols: "\"name\"=$1, \"is_active\"=$2, \"count\"=$3, \"price\"=$4, \"data\"=$5, \"items\"=$6",
      values: ["Test Company", true, 42, 99.99, null, [1, 2, 3]],
    });
  });

  test("works: special characters in values", function () {
    const result = sqlForPartialUpdate(
        { description: "Company with 'quotes' and \"double quotes\"" },
        {});
    expect(result).toEqual({
      setCols: "\"description\"=$1",
      values: ["Company with 'quotes' and \"double quotes\""],
    });
  });

  test("works: empty jsToSql object", function () {
    const result = sqlForPartialUpdate(
        { field1: "value1", field2: "value2" },
        {});
    expect(result).toEqual({
      setCols: "\"field1\"=$1, \"field2\"=$2",
      values: ["value1", "value2"],
    });
  });

  test("throws BadRequestError for empty dataToUpdate", function () {
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrow(BadRequestError);
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrow("No data");
  });

  test("throws BadRequestError for null dataToUpdate", function () {
    expect(() => {
      sqlForPartialUpdate(null, {});
    }).toThrow(BadRequestError);
  });

  test("throws BadRequestError for undefined dataToUpdate", function () {
    expect(() => {
      sqlForPartialUpdate(undefined, {});
    }).toThrow(BadRequestError);
  });

  test("works: real-world company update example", function () {
    const result = sqlForPartialUpdate(
        {
          name: "Updated Company Name",
          description: "Updated description",
          numEmployees: 100,
          logoUrl: "https://example.com/logo.png"
        },
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url"
        });
    expect(result).toEqual({
      setCols: "\"name\"=$1, \"description\"=$2, \"num_employees\"=$3, \"logo_url\"=$4",
      values: ["Updated Company Name", "Updated description", 100, "https://example.com/logo.png"],
    });
  });

  test("works: real-world user update example", function () {
    const result = sqlForPartialUpdate(
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          isAdmin: false
        },
        {
          firstName: "first_name",
          lastName: "last_name",
          isAdmin: "is_admin"
        });
    expect(result).toEqual({
      setCols: "\"first_name\"=$1, \"last_name\"=$2, \"email\"=$3, \"is_admin\"=$4",
      values: ["Jane", "Smith", "jane@example.com", false],
    });
  });

  test("works: real-world job update example", function () {
    const result = sqlForPartialUpdate(
        {
          title: "Senior Developer",
          salary: 120000,
          equity: 0.05
        },
        {});
    expect(result).toEqual({
      setCols: "\"title\"=$1, \"salary\"=$2, \"equity\"=$3",
      values: ["Senior Developer", 120000, 0.05],
    });
  });

  test("works: single item with jsToSql mapping", function () {
    const result = sqlForPartialUpdate(
        { firstName: "Alice" },
        { firstName: "first_name" });
    expect(result).toEqual({
      setCols: "\"first_name\"=$1",
      values: ["Alice"],
    });
  });

  test("works: preserves order of keys as they appear in dataToUpdate", function () {
    const result = sqlForPartialUpdate(
        { z: "last", a: "first", m: "middle" },
        {});
    expect(result).toEqual({
      setCols: "\"z\"=$1, \"a\"=$2, \"m\"=$3",
      values: ["last", "first", "middle"],
    });
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////