/* eslint-disable */
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Archives from "./components/Archives/Archives";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Contact from "./components/Contact/Contact";

let x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/home/contact",
        element: <Contact />,  // Nested route for team inside /home
      },
      { path: "/archives", element: <Archives /> },

      { path: "/profile", element: <Profile /> },
    ],
  },

  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
function App() {
  return (
    <>
      <RouterProvider router={x}></RouterProvider>
    </>
  );
}

export default App;
