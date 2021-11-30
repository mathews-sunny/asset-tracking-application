import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Assets from "./pages/Assets";
import Main from "./pages/Main";
import CustomToast from "./Toasts/CustomToast";

function App() {
  return (
    <Fragment>
      <div className="position-absolute top-0 end-0">
        <CustomToast />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/assets" element={<Assets />} />
      </Routes>
    </Fragment>
  );
}

export default App;
