import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThreeMap } from './components/three_map';

const three_map = <ThreeMap></ThreeMap>

const router = createBrowserRouter([
  {
    path: "/three_map",
    element: three_map
  },
]);

function App() {
  return (
    <div className="container">
      {/* now, it is the time to build antd components */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
