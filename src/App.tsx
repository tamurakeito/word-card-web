import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "pages/home";
import { Training } from "pages/traning";
import { ThemaContextProvider } from "component/thema-provider";
import { TraningContextProvider } from "component/training-provider";
import {
  SurfaceContextProvider,
  useSurfaceContext,
} from "component/surface-provider";

const App = () => {
  return (
    <div className="App">
      <Router>
        <ThemaContextProvider>
          <TraningContextProvider>
            <SurfaceContextProvider>
              <RouterSelector />
            </SurfaceContextProvider>
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
      <Route path="/word-card-web" element={<SurfaceProvider />} />
    </Routes>
  );
};

const SurfaceProvider = () => {
  const { surface } = useSurfaceContext();
  return (
    <>
      {surface === "home" && <Home />}
      {surface === "training" && <Training />}
    </>
  );
};
