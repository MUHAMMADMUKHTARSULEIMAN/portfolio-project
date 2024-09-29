import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import About from "./pages/About"
import Projects, {loader as projectsLoader} from "./pages/Projects"
import NotFound from "./pages/NotFound"

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "/",
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "projects",
        element: <Projects />,
        loader: projectsLoader
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}