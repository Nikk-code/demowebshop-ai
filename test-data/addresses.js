/**
 * Reusable checkout / billing address test data.
 * Object structures are frozen to prevent accidental runtime mutations.
 */
const addresses = Object.freeze({
  /**
   * Standard billing address used for E2E purchase flow tests.
   * Matches the Demo Web Shop checkout form fields.
   */
  standard: Object.freeze({
    firstName: 'Test',
    lastName:  'User',
    email:     'testing123456@cts.com',
    country:   'United States',
    city:      'New York',
    address:   '123 Main Street',
    zip:       '10001',
    phone:     '1234567890'
  })
});

module.exports = { addresses };
