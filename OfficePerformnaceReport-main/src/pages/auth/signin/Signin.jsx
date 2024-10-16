/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/layout/Layout";
import myContext from "../../../context/myContext";
import Loader from "../../../components/loader/Loader";
import toast from "react-hot-toast";
import { auth } from "../../../firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading, setIsLoggedIn} = context;
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      setLoading(false);
      toast.success("Login Successfully");
      setIsLoggedIn(true);

      // Navigate to appropriate page
      navigate("/"); // Or navigate to any other page

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        {loading && <Loader />}
        {!loading && (
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SignIn;
