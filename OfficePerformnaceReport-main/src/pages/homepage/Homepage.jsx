import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { useContext } from "react";
import myContext from "../../context/myContext";

const HomePage = () => {
  const context = useContext(myContext);
  const { isLoggedIn } = context;

  return (
    <Layout>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="mb-8">Please {isLoggedIn ? "continue" : "sign in"}.</p>
        {!isLoggedIn && (
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 m-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/signin">Sign In</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 m-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className="flex flex-col space-y-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/employee">Enter as Employee</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/manager">Enter as Manager</Link>
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <Link to="/performance">Performance Report</Link>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
