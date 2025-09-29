import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="h-16 w-full fixed shadow bg-base-200">
                <div className="h-full w-full max-w-6xl mx-auto flex items-center">
                    <button
                        className="btn btn-ghost font-logo"
                        onClick={() => navigate("/")}
                    >
                        MyBlog
                    </button>
                    <div className="flex-1"></div>
                    <UserAvatar />
                </div>
            </div>
            {/* Placeholder to push the page content down to not overlap */}
            <div className="h-16 w-full mb-2"></div>
        </>
    );
};

export default Navbar;
