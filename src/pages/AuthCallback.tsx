import { useEffect } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { authApi } from "../apis/authApi";
import { routes } from "../routes/routes";
import { goToErrorPage } from "../utils/error";
import { PKCE } from "../utils/PKCE";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();

    useEffect(() => {
        (async () => {
            const code = searchParam.get("code");
            const state = searchParam.get("state");

            if (!code) {
                goToErrorPage(
                    navigate,
                    routes.error.absolutePath,
                    "The auth code that indicates a successful login was not found.",
                    "Cannot connect to Google at the moment"
                );
                return;
            }

            if (!state) {
                goToErrorPage(
                    navigate,
                    routes.error.absolutePath,
                    "The state that indicates a successful login was not found.",
                    "Cannot connect to Google at the moment"
                );
                return;
            }

            const storedState = PKCE.getState();
            if (state !== storedState) {
                goToErrorPage(
                    navigate,
                    routes.error.absolutePath,
                    "The security states mismatch. The request to Google was posibly malformed or this might be an attack.",
                    "Cannot connect to Google at the moment"
                );
                return;
            }

            try {
                const token = await authApi.exchangeGoogleCodeForToken(code);
                toast.success("Login successful");
                navigate(routes.home.absolutePath);
            } catch (error) {
                goToErrorPage(
                    navigate,
                    routes.error.absolutePath,
                    "Failed to verify you with Google.",
                    (error as Error).message
                );
                return;
            }
        })();
    }, [navigate]);

    return (
        <div className="bg-base-100 shadow-lg shadow-gray-400 rounded-xl p-4 items-center flex flex-col">
            <p className="pb-2 font-bold">Just a moment</p>
            <BeatLoader />
        </div>
    );
};

export default AuthCallbackPage;
