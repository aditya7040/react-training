import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./View.css"
export default function ViewDetails() {
  const params = useParams()
  console.log(params, 'params  ');

  const [data, satData] = useState([]);
  const api = `https://65e7470053d564627a8e6689.mockapi.io/crud/${params.id}`;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((json) => satData(json));
  }, []);
  console.log(data, 'data  data  data  data')

  return (


    <div className="user-card">
    <ul className="user-info">
      <li><strong>First Name:</strong> {data.firstname}</li>
      <li><strong>City:</strong> {data.city}</li>
      <li><strong>Email:</strong> {data.email}</li>
      <li><strong>Username:</strong> {data.username}</li>
    </ul>
  </div>
  );
}
