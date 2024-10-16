import { Link } from "react-router-dom";
import { useContext } from "react";
import myContext from "../../context/myContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(myContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add any additional logout logic here, such as clearing local storage, etc.
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">
            <Link to="/">Employee Management</Link>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white font-semibold ml-4"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
