import './App.css';
import Author from './components/author';

import SearchBox from './components/searchbar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const searchbox = <SearchBox></SearchBox>;


const router = createBrowserRouter([
  {
    path: "/",
    element: <Author/>
  },
  {
    path: "/searchbox",
    element: searchbox
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
