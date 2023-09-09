const Pack = require('../models/Pack');

module.exports = {
  async read(request, response) {
    const productList = await Pack.findAll();
    return response.json(productList);
  },
};
