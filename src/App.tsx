import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "pages/home";
import { Training } from "pages/traning";
import { ThemaContextProvider } from "component/thema-provider";
import { TraningContextProvider } from "component/training-provider";

const App = () => {
  return (
    <div className="App">
      <Router>
        <ThemaContextProvider>
          <TraningContextProvider>
            <RouterSelector />
          </TraningContextProvider>
        </ThemaContextProvider>
      </Router>
    </div>
  );
};

export default App;

// **route**

const RouterSelector = () => {
  return (
    <Routes>
      <Route path="/word-card-web" element={<Home />} />
      <Route path="/word-card-web/training" element={<Training />} />
    </Routes>
  );
};
