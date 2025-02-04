import { useEffect } from "react";
import "./StudentTable.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../theme/loader";

const api = "https://65e7470053d564627a8e6689.mockapi.io/crud";

export const StudentTable = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
 
  const fetchData=()=>{
    setLoading(true); // Set loading to true before fetching
    fetch(api)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false); // Set loading to false after data is received
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is false even if there's an error
      });
  }
  useEffect(() => {
    fetchData()
  }, []); 


  const navigate = useNavigate();

  const goToView = (id) => {
    navigate(`/student/view/${id}`)
  }
  const goToEdit = (id) => {
    navigate(`/student/edit/${id}`)
  }

  const deleteStudent = async (id) => {
    const isConfirm = confirm("Are you sure?");
    if (isConfirm) {
      try {
        // Wait for the DELETE request to complete
        await fetch(`https://65e7470053d564627a8e6689.mockapi.io/crud/${id}`, {
          method: "DELETE"
        });
        
        // Now fetch the updated data
        fetchData();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };
  
  return (

    <div style={{ textAlign: "center", padding: "20px" }}>
      {loading ? (<Loader />) : (<div className="container mt-5 p-4 bg-light rounded shadow-sm">
        <h1 className="display-4 mb-4 text-primary">Student Table</h1>
        <Link to="/student/create" className="mb-4 btn btn-primary ">
          Add Student
        </Link>
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th scope="col">id</th>

                <th scope="col">First Name</th>
                <th scope="col">City</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col" className="text-center">
                  <span className="px-3">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((studentData) => (
                <tr onClick={() => goToView(studentData.id)} >
                  <td>{studentData.id}</td>

                  <td>{studentData.firstname}</td>
                  <td>{studentData.city}</td>
                  <td>{studentData.username}</td>
                  <td>{studentData.email}</td>

                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button onClick={() => goToEdit(studentData.id)}  className="btn btn-sm btn-warning text-white">
                        Edit
                      </button>
                      <button onClick={()=> deleteStudent(studentData.id)} className="btn btn-sm btn-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>)}
    </div>
  );
};
