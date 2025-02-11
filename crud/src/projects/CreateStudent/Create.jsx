import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateStudent() {
  const navigate = useNavigate();

  const params = useParams();
  const isEdit = params?.id ? true : false;
  const [data, satData] = useState([]);

  useEffect(() => {
    const api = `https://65e7470053d564627a8e6689.mockapi.io/crud/${params.id}`;

    fetch(api)
      .then((res) => res.json())
      .then((json) => satData(json));
  }, []);

  //Populate form with editData when it changes
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  // console.log(data,'data  data  data  data')

  const [formData, setFormData] = useState({
    firstname: "",
    city: "",
    username: "",
    email: "",
  });

  const handleChange = (event) => {
    console.log(formData, "formData formData formData", event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(isEdit, "isEdit isEdit  isEdit ");
    if (isEdit) {
      fetch(`https://65e7470053d564627a8e6689.mockapi.io/crud/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      fetch("https://65e7470053d564627a8e6689.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).catch((error) => {
        console.error("Error submitting data:", error);
      });
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  };

  return (
    <div className="container">
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">
            {isEdit ? "Edit Student" : "create Student"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="firstName" className="form-label">
                First Name
              </label>
              <input
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your first name"
              />
            </div>

            <div className="mb-3">
              <label for="city" className="form-label">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter your city"
              />
            </div>

            <div className="mb-3">
              <label for="username" className="form-label">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="username"
                placeholder="Choose a username"
              />
            </div>

            <div className="mb-3">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              {isEdit ? "Edit " : "create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
