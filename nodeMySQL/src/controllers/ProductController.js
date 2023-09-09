const Products = require('../models/Product');

module.exports = {
  async read(request, response) {
    const productList = await Products.findAll();
    return response.json(productList);
  },

  async readCode(request, response){
    const {code} = request.params;
    console.log(code)
    const product = await Products.findOne({where : {code: code }});
    if(product === null) return response
    .status(400)
    .json({ err: 'Produto não encontrado!!' });
    return response.json(product)
  },

  async edit(request, response) {
    const { code } = request.params;
    const product = await Products.findOne({where : {code: code }});
    const { new_price } = request.body;

    const porcentagem = product.sales_price * 0.10
    const diferenca = new_price > product.sales_price ? new_price - product.sales_price : product.sales_price - new_price
    if(new_price < product.cost_price){
      return response
        .status(400)
        .json({ err: 'O preço de venda não pode ser menor que o preço de custo!!' });
    } else if(diferenca > porcentagem){
      return response
        .status(400)
        .json({ err: 'O reajuste não pode ser maior que 10%!!' });
    }

    product.sales_price = new_price

    await product.save();
    return response.json(product);
  },
};
