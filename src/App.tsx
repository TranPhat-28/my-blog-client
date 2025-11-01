import { Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";

// Pages
import AuthCallbackPage from "./pages/AuthCallback";
import LoginPage from "./pages/Login";
import { routes } from "./routes/routes";

const App = [
    {
        /* LOGIN */
        path: routes.login.path,
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
            {
                path: routes.login.callback.path,
                element: <AuthCallbackPage />,
            },
        ],
    },
    {
        /* HOME */
        path: routes.home.path,
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <Navigate to={routes.home.blogs.absolutePath} replace />
                ),
            },
            {
                path: routes.home.blogs.path,
                element: <div>Latest blogs</div>,
            },
            {
                path: routes.home.blogId.path,
                element: <div>Blogs with id</div>,
            },
        ],
    },
    {
        path: "*",
        element: <div>404 Not Found</div>,
    },
];

export default App;
