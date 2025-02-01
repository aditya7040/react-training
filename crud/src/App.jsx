import { useState } from "react";
import "./App.css";
import { StudentTable } from "./projects/StudentTable/StudentTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateStudent from "./projects/CreateStudent/Create";
import EditStudent from "./projects/EditStudent/Edit";
import ViewDetails from "./projects/ViewDetail/View";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />}></Route>
        <Route path="/student/create" element={<CreateStudent />}></Route>
        <Route path="/student/edit/:id" element={<CreateStudent />}></Route>
        <Route path="/student/view/:id" element={<ViewDetails />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
