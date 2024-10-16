import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../../firebase/Firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import myContext from "../../../context/myContext";
import toast from "react-hot-toast";
import Layout from "../../../components/layout/Layout";
import Loader from "../../../components/loader/Loader.jsx";

const SignUp = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    rate: "0",
  });

  const handleChange = (e) => {
    setUserSignup({ ...userSignup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        rate: userSignup.rate,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userRefrence = collection(fireDB, "user");
      await addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        password: "",
        email: "",
      });

      toast.success("Signup Successfully");

      setLoading(false);
      navigate("/signin");
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
          <div className="login_Form bg-pink-50 px-8 py-6 border border-blue-100 rounded-xl shadow-md">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userSignup.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userSignup.email}
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
                    value={userSignup.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Sign Up
                </button>
              </form>
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SignUp;
