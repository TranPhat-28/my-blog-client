import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<div>Login</div>} />

            {/* Main layout */}
            <Route path="/" element={<MainLayout />}>
                <Route
                    index
                    element={<Navigate to={"/blogs"} replace={true} />}
                />
                <Route path="blogs" element={<div>Latest blogs</div>} />
                <Route path="blogs/:id" element={<div>Blogs with id</div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;
