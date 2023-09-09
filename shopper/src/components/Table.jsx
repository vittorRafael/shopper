// eslint-disable-next-line react/prop-types
const Table = ({ products, columns }) => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Código
              </th>
              <th scope="col" className="px-6 py-3">
                Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Preço Atual
              </th>
              {columns && (
                <th scope="col" className="px-6 py-3">
                  Novo Preço
                </th>
              )}
              {columns && (
                <th scope="col" className="px-6 py-3">
                  Mensagem
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {products &&
              // eslint-disable-next-line react/prop-types
              products.map((item) => (
                <tr
                  key={item.code}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.code}
                  </th>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{`R$ ${item.sales_price}`}</td>
                  {columns && (
                    <td className="px-6 py-4">{`R$ ${item.new_price}`}</td>
                  )}
                  {columns && (
                    <td className={`px-6 py-4 ${item.msgColor}`}>{item.msg}</td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
