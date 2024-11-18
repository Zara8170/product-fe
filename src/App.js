// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Add from "./pages/Add";
import Update from "./pages/Update";
import List from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/list" element={<Layout />}>
            <Route index element={<List />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="add" element={<Add />} />
            <Route path="update/:id" element={<Update />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
