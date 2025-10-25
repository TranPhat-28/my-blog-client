import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { authApi } from "../apis/authApi";

const AuthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const state = params.get("state");

            if (!code) {
                console.error("No authorization code found in URL.");
                return;
            }

            try {
                const token = await authApi.exchangeGoogleCodeForToken(
                    code,
                    state
                );
                console.log("Login successful:", token);
                navigate("/");
            } catch (e) {
                console.log("Error cannot login: ", e);
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
