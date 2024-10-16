import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext.jsx";

function PerformanceReport() {
  const context = useContext(myContext);
  const { loading, getAllProduct } = context;

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Performance Report</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {getAllProduct.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-md shadow-md p-4"
              >
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">Date: {product.date}</p>
                <p className="text-gray-600">Rating: {product.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default PerformanceReport;
