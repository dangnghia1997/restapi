module.exports = app => {
  const customerController = require('../controllers/customer.controller');

  app.get('/customers', customerController.findAll);
  app.post('/customers', customerController.create);
  app.get('/customers/:customerId', customerController.findOne);
  app.put('/customers/:customerId', customerController.update);
  app.delete('/customers/:customerId', customerController.delete);
  app.delete('/customers', customerController.deleteAll);
};