import React from 'react';
import Button from './Button';
import axios from 'axios';
import Table from './Table';

const Main = () => {
  const [fileName, setFileName] = React.useState('');
  const [validateBtn, setValidateBtn] = React.useState(false);
  const [showTable, setShowTable] = React.useState(false);
  const [err, setErr] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [isInvalide, setIsInvalide] = React.useState(false);

  async function handleChange(e) {
    setIsInvalide(false);
    setValidateBtn(false);
    setShowTable(false);
    setErr([]);
    setFileName(e.target.value);
    const file = await e.target.files[0].text();
    const arrayProducts = file.split('\r\n');
    //const header = arrayProducts[0].split(',');
    const data = [];
    for (let i = 1; i < arrayProducts.length; i++) {
      let dados = arrayProducts[i].split(',');
      if (dados[0] && dados[1]) {
        data.push({ code: dados[0], new_price: dados[1] });
      }
    }
    let list = [];
    data.map((item) => {
      axios
        .get(`http://localhost:8080/product/${item.code}`)
        .then((r) => {
          let product = r.data;
          let newPriceNumber = Number.parseFloat(item.new_price);

          if (isNaN(newPriceNumber)) {
            setIsInvalide(true);
            setErr([
              'Produtos da lista estão com preços corrompidos, corrija-os e tente novamente',
            ]);
            product.new_price = 'XXXX';
            product.msg = 'Preço corrompido';
            product.msgColor = 'text-red-500';
            list.push(product);
          } else {
            const porcentagem = product.sales_price * 0.1;
            const diferenca =
              newPriceNumber > product.sales_price
                ? newPriceNumber - product.sales_price
                : product.sales_price - newPriceNumber;
            if (newPriceNumber < product.cost_price) {
              product.msg =
                'O preço de venda não pode ser menor que o preço de custo!!';
              product.msgColor = 'text-red-500';
              setIsInvalide(true);
            } else if (diferenca > porcentagem) {
              product.msg = 'O reajuste não pode ser maior que 10%!!';
              product.msgColor = 'text-red-500';
              setIsInvalide(true);
            } else {
              product.msg = 'Produto válido';
              product.msgColor = 'text-green-500';
            }
            product.new_price = newPriceNumber;
            list.push(product);
          }
        })
        .catch((err) => setErr([err.response.data.err]));
    });
    addProducts(list);
  }

  function addProducts(products) {
    setProducts(products);
  }

  function validationSubmit(e) {
    e.preventDefault();
    if (!isInvalide) {
      setValidateBtn(true);
    }
    setShowTable(true);
  }

  function update() {
    for (let item of products) {
      axios
        .post(`http://localhost:8080/product/${item.code}`, {
          new_price: item.new_price,
        })
        .then(() => {
          setErr(['Produtos alterados com sucesso!!!']);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    }
  }
  return (
    <main className="max-w-6xl mx-auto my-5 grid grid-cols-1 gap-4 px-6 ">
      <section className="flex justify-center items-center p-10">
        <form
          onSubmit={validationSubmit}
          className="flex flex-col gap-10 justify-center items-center w-fit"
        >
          <input
            type="file"
            name="file"
            id="file"
            value={fileName}
            onChange={handleChange}
            className="hidden"
          />
          <label htmlFor="file" className="bg-gray-200 px-5 py-3 rounded-md">
            {fileName.substring(12) || 'Enviar Arquivo'}
          </label>
          <div className="flex gap-4 items-center">
            <Button
              classes={
                fileName && !validateBtn
                  ? `bg-sky-900 text-white hover:bg-sky-950`
                  : `bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-default`
              }
              text="Validar"
              disabled={fileName && !validateBtn ? false : true}
            />
            <Button
              classes={
                validateBtn && !isInvalide
                  ? `bg-sky-900 text-white hover:bg-sky-950`
                  : `bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-default`
              }
              text="Atualizar"
              disabled={validateBtn && !isInvalide ? false : true}
              onClick={update}
            />
          </div>
        </form>
      </section>
      {err &&
        err.map((error) => (
          <h1 key={error} className="mx-auto font-bold text-lg w-fit">
            {error}
          </h1>
        ))}
      {
        <section className="flex justify-center items-center p-10">
          {showTable && <Table products={products} columns={true} />}
          {!showTable && err.length === 0 && (
            <h1 className="mx-auto font-bold text-lg w-fit">
              Adicione um arquivo .csv para listar os produtos
            </h1>
          )}
        </section>
      }
    </main>
  );
};

export default Main;
