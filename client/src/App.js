import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProducts from "./Components/Pages/AddProduct";
import ViewProducts from "./Components/Pages/ViewProducts";
import View from "./Components/User/View";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewProducts />} />
          <Route path="/add" element={<AddProducts />} />
          <Route path="/user" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
