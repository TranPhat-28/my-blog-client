import { useEffect } from "react";
import {
    createSearchParams,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { authApi } from "../apis/authApi";
import { PKCE } from "../utils/PKCE";
import { routes } from "../routes/routes";
import { toast } from "react-toastify";

const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();

    useEffect(() => {
        (async () => {
            const code = searchParam.get("code");
            const state = searchParam.get("state");

            if (!code) {
                navigate({
                    pathname: routes.error.absolutePath,
                    search: createSearchParams({
                        error_message:
                            "The auth code that indicates a successful login was not found.",
                    }).toString(),
                });

                toast.error("Cannot connect to Google at the moment");
                return;
            }

            if (!state) {
                navigate({
                    pathname: routes.error.absolutePath,
                    search: createSearchParams({
                        error_message:
                            "The state that indicates a successfull login was not found.",
                    }).toString(),
                });

                toast.error("Cannot connect to Google at the moment");
                return;
            }

            const storedState = PKCE.getState();
            if (state !== storedState) {
                navigate({
                    pathname: routes.error.absolutePath,
                    search: createSearchParams({
                        error_message:
                            "The security states mismatch. The request to Google was posibly malformed or this might be an attack.",
                    }).toString(),
                });

                toast.error("Cannot connect to Google at the moment");
                return;
            }

            try {
                const token = await authApi.exchangeGoogleCodeForToken(code);
                toast.success("Login successful");
                navigate(routes.home.absolutePath);
            } catch (error) {
                navigate({
                    pathname: routes.error.absolutePath,
                    search: createSearchParams({
                        error_message: "Failed to verify you with Google.",
                    }).toString(),
                });

                toast.error((error as Error).message);
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
