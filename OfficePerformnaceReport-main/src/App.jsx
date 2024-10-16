import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homepage/Homepage";
import Signin from "./pages/auth/signin/Signin";
import Signup from "./pages/auth/signup/Signup";
import Employee from "./pages/employeepage/Employee";
import Nopage from "./pages/nopage/NoPage";
import Manager from "./pages/managerpage/Manager";
import MyState from "./context/myState";
import Editemployee from "./pages/managerpage/Editemployee";
import PerformanceReport from "./pages/performanceReport/PerformanceReport";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Nopage />} />
          <Route path="/editemployee/:id" element={<Editemployee />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/performance" element={<PerformanceReport/>}/>
        </Routes>
      </Router>
    </MyState>
  );
}

export default App;
