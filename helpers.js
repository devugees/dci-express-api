// Remove the test database before testing
exports.removeDB = (db) => {
  before(async () => {
    await db.remove();
    console.log(`\n\n\t😢 Goodbye test ${db.modelName}s 😢\n\n`);
  })
}

// Errors Handler
// With async/await we need some way to catch errors.
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};
