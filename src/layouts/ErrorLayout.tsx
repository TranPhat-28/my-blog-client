import { useNavigate, useSearchParams } from "react-router-dom";
import { routes } from "../routes/routes";

const ErrorLayout = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const error_message = searchParam.get("error_message") ?? "Undefined error";

    return (
        <div className="h-screen w-screen bg-base-200 flex flex-col items-center justify-center p-4 gap-4">
            <div className="h-full max-h-96 w-full max-w-96">
                <img src="error_illustration.png" alt="Error" />
            </div>
            <div className="bg-base-300 shadow rounded-lg w-full max-w-lg p-4">
                <span className="font-bold">Error summary: </span>
                {error_message}
            </div>
            <button
                className="btn btn-primary"
                onClick={() => {
                    navigate(routes.home.absolutePath);
                }}
            >
                Back to home
            </button>
        </div>
    );
};

export default ErrorLayout;
