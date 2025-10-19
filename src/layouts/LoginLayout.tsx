import { Outlet } from "react-router-dom";

const LoginLayout = () => {
    return (
        <div className="h-screen w-screen bg-base-200 flex items-center justify-center p-4">
            <Outlet />
        </div>
    );
};

export default LoginLayout;
