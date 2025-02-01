import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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


    <div>
      {
        <ul>
          <li>{data.firstname}</li>
          <li>{data.city}</li>
          <li>{data.email}</li>
          <li>{data.username}</li>

        </ul>
      }

    </div>
  );
}
