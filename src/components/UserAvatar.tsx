const UserAvatar = () => {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                className="avatar avatar-placeholder"
                role="button"
            >
                <div className="bg-neutral text-neutral-content w-10 rounded-full cursor-pointer ring-primary ring-offset-2 hover:ring-2 duration-100">
                    <span>SY</span>
                </div>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 mt-2 shadow-sm"
            >
                <li>
                    <a>New blog</a>
                </li>
                <li>
                    <a>Dashboard</a>
                </li>
                <li>
                    <a>Settings</a>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
        </div>
    );
};

export default UserAvatar;

/*
<div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full cursor-pointer ring-primary ring-offset-2 hover:ring-2 duration-100">
                <span>SY</span>
            </div>
        </div>
*/
