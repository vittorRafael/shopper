import React from 'react';
import Table from './Table';
import axios from 'axios';

const Produtos = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:8080/products/')
      .then((r) => setProducts(r.data));
  }, [products]);

  return (
    <section className="max-w-7xl mx-auto my-10 flex flex-col gap-6">
      <h1 className="font-bold text-3xl">Lista de produtos</h1>
      <Table products={products} columns={false} />
    </section>
  );
};

export default Produtos;
