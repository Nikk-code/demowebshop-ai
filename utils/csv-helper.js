const fs = require('fs');
const path = require('path');

const DEFAULT_CSV_PATH = path.resolve(__dirname, '../test-data/registered-users.csv');
const CSV_HEADERS = 'Email,Password,FirstName,LastName,RegisteredAt\n';

/**
 * Appends a newly registered user's credentials to the CSV file.
 * Automatically creates the file with header row if it does not exist.
 *
 * @param {Object} user
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} [user.firstName]
 * @param {string} [user.lastName]
 * @param {string} [csvPath]
 * @returns {string} The path to the CSV file written
 */
function saveUserToCsv(user, csvPath = DEFAULT_CSV_PATH) {
  const dir = path.dirname(csvPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, CSV_HEADERS, 'utf8');
  }

  const timestamp = new Date().toISOString();
  const row = `"${user.email}","${user.password}","${user.firstName || ''}","${user.lastName || ''}","${timestamp}"\n`;

  fs.appendFileSync(csvPath, row, 'utf8');
  return csvPath;
}

/**
 * Reads all registered users from the CSV file.
 *
 * @param {string} [csvPath]
 * @returns {Array<Object>} List of user objects parsed from CSV
 */
function readUsersFromCsv(csvPath = DEFAULT_CSV_PATH) {
  if (!fs.existsSync(csvPath)) {
    return [];
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.trim().split('\n').slice(1); // skip headers

  return lines
    .filter(line => line.trim().length > 0)
    .map(line => {
      // Split by comma taking into account possible quotes
      const values = line.split(',').map(val => val.replace(/^"|"$/g, '').trim());
      return {
        email: values[0],
        password: values[1],
        firstName: values[2],
        lastName: values[3],
        registeredAt: values[4],
      };
    });
}

module.exports = {
  saveUserToCsv,
  readUsersFromCsv,
  DEFAULT_CSV_PATH
};
