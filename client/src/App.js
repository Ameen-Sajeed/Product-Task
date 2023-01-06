import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginAdmin from "./Components/Admin/login";
import AddProducts from "./Components/Pages/AddProduct";
import ViewProducts from "./Components/Pages/ViewProducts";
import View from "./Components/User/View";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/products" element={<ViewProducts />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
