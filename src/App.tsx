import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from "./pages/home";
import { Training } from "./pages/traning";
import { ThemaContextProvider } from "./component/thema-provider";
import { TraningContextProvider } from "./component/training-provider";
import {
  SurfaceContextProvider,
  useSurfaceContext,
} from "./component/surface-provider";
import { ModeTypes } from "./types/types";

const App = () => {
  return (
    <div className="App">
      <Router basename="/word-card-web">
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
      <Route path="" element={<SurfaceProvider />} />
      <Route path="minimum" element={<SurfaceProvider minimum={true} />} />
    </Routes>
  );
};

const SurfaceProvider = ({ minimum }: { minimum?: boolean }) => {
  const { surface } = useSurfaceContext();
  return !minimum ? (
    <>
      {surface === "home" && <Home mode={ModeTypes.default} />}
      {surface === "training" && <Training mode={ModeTypes.default} />}
    </>
  ) : (
    <>
      {surface === "home" && <Home mode={ModeTypes.minimum} />}
      {surface === "training" && <Training mode={ModeTypes.minimum} />}
    </>
  );
};
