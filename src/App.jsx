import React from "react";
import AppRoutes from "./routes/Index";
import GlobalLoader from "./components/loader/Loader.jsx";
import AuthInitializer from "./components/AuthInitializer.jsx";
// import RouteLoadingTracker from "./components/loader/RouteLoadingTracker.jsx";
import DirectUrlGuard from "./components/GuardDirectUrl.jsx";

const App = () => {
  return (
    <>
      <DirectUrlGuard>
        <AppRoutes />
        <GlobalLoader />
        {/* <RouteLoadingTracker /> */}
        <AuthInitializer />
      </DirectUrlGuard>
    </>
  );
};

export default App;
