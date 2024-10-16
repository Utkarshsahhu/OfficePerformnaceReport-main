import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/Firebase.js";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader.jsx";
import Layout from "../../components/layout/Layout.jsx";

function Editemployee() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    comeInTime: "",
    goOutTime: "",
    rating: "0",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const productData = productTemp.data();
      setProduct({
        name: productData?.name || "",
        comeInTime: productData?.comeInTime || "",
        goOutTime: productData?.goOutTime || "",
        rating: productData?.rating || "0",
        time: productData?.time || Timestamp.now(),
        date: productData?.date || new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Employee details updated successfully!");
      navigate("/manager"); // Navigate back to the manager page
    } catch (error) {
      console.error("Error updating employee details: ", error);
      toast.error("Failed to update employee details");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8">
        <h1 className="text-2xl font-semibold mb-4">Edit Employee</h1>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="comeInTime" className="mb-1">Come In Time:</label>
              <input
                type="text"
                id="comeInTime"
                name="comeInTime"
                value={product.comeInTime}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="goOutTime" className="mb-1">Go Out Time:</label>
              <input
                type="text"
                id="goOutTime"
                name="goOutTime"
                value={product.goOutTime}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rating" className="mb-1">Rating:</label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={product.rating}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save Changes</button>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default Editemployee;
