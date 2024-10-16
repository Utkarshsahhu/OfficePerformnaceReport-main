import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { fireDB } from "../../firebase/Firebase.js";
import { collection, getDocs } from "firebase/firestore";

const ManagerPage = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(fireDB, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployeeData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee data: ", error);
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 mt-8">Employee Data</h2>
        {loading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Come-In Time
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Go-Out Time
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employeeData.map((employee) => (
                  <tr key={employee.id} className="text-gray-700">
                    <td className="px-3 py-2 md:px-6 md:py-3 whitespace-nowrap">
                      {employee.name}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3 whitespace-nowrap">
                      {employee.comeInTime}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3 whitespace-nowrap">
                      {employee.goOutTime}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3 whitespace-nowrap">
                      {employee.rating}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-3 whitespace-nowrap">
                      <Link
                        to={`/editemployee/${employee.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </Link>
                      {/* Add delete functionality if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManagerPage;
