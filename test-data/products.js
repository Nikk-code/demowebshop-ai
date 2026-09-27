/**
 * Reusable product catalog test data.
 * Object structures are frozen to prevent accidental runtime mutations.
 */
const products = Object.freeze({
  computingAndInternet: Object.freeze({
    name: 'Computing and Internet',
    category: 'Books',
    categoryPath: '/books'
  }),

  // Product used in E2E purchase flow scenarios
  fictionBook: Object.freeze({
    name: 'Fiction',
    category: 'Books',
    categoryPath: '/books'
  })
});

module.exports = { products };
