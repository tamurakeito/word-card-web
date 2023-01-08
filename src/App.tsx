import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import Data from "data/kokushi-yokomoji.json";
import { Home } from "pages/home";
import { Training } from "pages/traning";

const App = () => {
  return (
    <div className="App">
      <Router>
        <RouterSelector />
      </Router>
    </div>
  );
};

export default App;

// **route**

const RouterSelector = () => {
  return (
    <Routes>
      <Route path="/" element={<Home data={Data.data} />} />
      <Route path="/training" element={<Training data={Data.data} />} />
    </Routes>
  );
};
