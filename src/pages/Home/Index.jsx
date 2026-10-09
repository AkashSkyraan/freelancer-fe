import React from "react";
import Hero from "./Hero";
import Browse from "./Browse";
import Process from "./Process";
import Trending from "./Trending";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <Hero />
      <Browse />
      <Process />
      <Trending />
    </div>
  );
};

export default Home;
