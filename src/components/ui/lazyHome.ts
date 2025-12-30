
import React from "react";

const Home = React.lazy(() => import("./homePage"));

// preload function
export const preloadHome = (): Promise<{ default: React.ComponentType<any> }> =>
  import("./homePage");

export default Home;
