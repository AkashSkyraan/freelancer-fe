import React from "react";
import AppRoutes from "./routes/Index";
import GlobalLoader from "./components/loader/Loader.jsx";

const App = () => {
  return (
    <>
      <AppRoutes />
      <GlobalLoader />
    </>
  );
};

export default App;
