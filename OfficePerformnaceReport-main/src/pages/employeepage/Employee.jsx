import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/Firebase.js";
import Loader from "../../components/loader/Loader.jsx";

const Employee = () => {
  const context = useContext(myContext);
  const { loading, setLoading, isLoggedIn } = context;
  const navigate = useNavigate();

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

  const addEmployeeData = async () => {
    if (
      product.name === "" ||
      product.comeInTime === "" ||
      product.goOutTime === ""
    ) {
      return toast.error("Please fill out all fields");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Added Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Employee</h2>
        {isLoggedIn ? (
          <div  className="mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comeInTime" className="block mb-1">
                Come-In Time
              </label>
              <input
                type="time"
                id="comeInTime"
                value={product.comeInTime}
                onChange={(e) =>
                  setProduct({ ...product, comeInTime: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="goOutTime" className="block mb-1">
                Go-Out Time
              </label>
              <input
                type="time"
                id="goOutTime"
                value={product.goOutTime}
                onChange={(e) =>
                  setProduct({ ...product, goOutTime: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              onClick={addEmployeeData}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            <p>Please login to continue.</p>
            <Link to="/signin">
              <button className="bg-green-500 text-white m-6 py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
                Sign In
              </button>
            </Link>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </Layout>
  );
};

export default Employee;
