import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

const App = [
    {
        path: "/login",
        element: <div>Login</div>,
    },
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/blogs" replace />,
            },
            {
                path: "blogs",
                element: <div>Latest blogs</div>,
                // loader: async () => fetch("/api/posts").then(res => res.json()), // later
            },
            {
                path: "blogs/:id",
                element: <div>Blogs with id</div>,
                // loader: async ({ params }) => fetch(`/api/posts/${params.id}`).then(res => res.json()),
            },
        ],
    },
    {
        path: "*",
        element: <div>404 Not Found</div>,
    },
];

export default App;
