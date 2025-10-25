import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { routes } from "../routes/routes";

const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthed] = useState<boolean>(false);

    return (
        <>
            <div className="h-16 w-full fixed shadow bg-base-200">
                <div className="h-full w-full max-w-6xl mx-auto flex items-center px-2">
                    <button
                        className="font-logo cursor-pointer text-primary"
                        onClick={() => navigate(routes.home.path)}
                    >
                        MyBlog
                    </button>
                    <div className="flex-1"></div>
                    {isAuthed && <UserAvatar />}
                    {!isAuthed && (
                        <button
                            className="btn btn-primary btn-outline"
                            onClick={() => navigate(routes.login.path)}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
            {/* Placeholder to push the page content down to not overlap */}
            <div className="h-16 w-full mb-2"></div>
        </>
    );
};

export default Navbar;
