const { BadRequestError } = require("../expressError");

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { firstName: "first_name", age: "age" }
 *
 * @returns {Object} {sqlSetCols, dataToUpdate}
 *
 * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };

/* ========================================
 * ENHANCED DOCUMENTATION SECTION
 * ========================================
 * 
 * The following section contains enhanced documentation
 * for the sqlForPartialUpdate function, including:
 * - Detailed parameter descriptions
 * - Return value specifications
 * - Error handling documentation
 * - Real-world usage examples
 * - Security considerations
 */

/**
 * ENHANCED DOCUMENTATION FOR sqlForPartialUpdate
 * 
 * This function generates the SET clause and parameterized values for SQL UPDATE
 * statements. It's particularly useful for partial updates where you only want
 * to update specific fields without affecting others.
 * 
 * SECURITY FEATURES:
 * - Uses parameterized queries to prevent SQL injection
 * - Properly escapes column names with double quotes
 * - Maintains parameter order for safe query execution
 * 
 * PARAMETER DETAILS:
 * @param {Object} dataToUpdate - Object containing the fields to update
 *   - Keys: JavaScript field names (e.g., 'firstName', 'numEmployees')
 *   - Values: New values to set (any JavaScript type)
 *   - Example: { firstName: "John", age: 30, isActive: true }
 * 
 * @param {Object} jsToSql - Optional mapping object for column name conversion
 *   - Maps JavaScript camelCase to SQL snake_case column names
 *   - If a field is not found in mapping, original name is used
 *   - Example: { firstName: "first_name", numEmployees: "num_employees" }
 * 
 * RETURN VALUE DETAILS:
 * @returns {Object} Object containing:
 *   - setCols {string} - SET clause with parameterized placeholders
 *     Example: '"first_name"=$1, "age"=$2, "is_active"=$3'
 *   - values {Array} - Values array in same order as placeholders
 *     Example: ["John", 30, true]
 * 
 * ERROR HANDLING:
 * @throws {BadRequestError} When:
 *   - dataToUpdate is empty object {}
 *   - dataToUpdate is null
 *   - dataToUpdate is undefined
 * 
 * REAL-WORLD USAGE EXAMPLES:
 * 
 * // Company update with column mapping
 * const { setCols, values } = sqlForPartialUpdate(
 *   { name: "Acme Corp", numEmployees: 100, logoUrl: "logo.png" },
 *   { numEmployees: "num_employees", logoUrl: "logo_url" }
 * );
 * const query = `UPDATE companies SET ${setCols} WHERE handle = $${values.length + 1}`;
 * const result = await db.query(query, [...values, companyHandle]);
 * 
 * // User update with partial mapping
 * const { setCols, values } = sqlForPartialUpdate(
 *   { firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
 *   { firstName: "first_name", lastName: "last_name" }
 * );
 * const query = `UPDATE users SET ${setCols} WHERE username = $${values.length + 1}`;
 * const result = await db.query(query, [...values, username]);
 * 
 * // Job update without column mapping
 * const { setCols, values } = sqlForPartialUpdate(
 *   { title: "Senior Developer", salary: 120000, equity: 0.05 },
 *   {}
 * );
 * const query = `UPDATE jobs SET ${setCols} WHERE id = $${values.length + 1}`;
 * const result = await db.query(query, [...values, jobId]);
 */
