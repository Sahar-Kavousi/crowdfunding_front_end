import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./global.css";
import "./pages/SignupPage.css";

import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AddProjectPage from "./pages/AddProjectPage.jsx";

import NavBar from "./components/NavBar.jsx";
import {AuthProvider} from "./components/AuthProvider.jsx";
import PledgePage from "./pages/PledgePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/login", element: <LoginPage/>},
            {path: "/signup", element: <SignUpPage/>},
            {path: "/contact", element: <ContactPage/>},
            {path: "/about", element: <AboutPage/>},
            {path: "/addProject", element: (<ProtectedRoute><AddProjectPage/></ProtectedRoute>)},
            {path: "/project/:id", element: (<ProtectedRoute><ProjectPage/></ProtectedRoute>)},
            {path: "/project/pledge/:id", element: (<ProtectedRoute><PledgePage/></ProtectedRoute>)},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {/* Here we wrap our app in the router provider, so they render */}
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);
