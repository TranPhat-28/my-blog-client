import { useEffect } from "react";
import { BeatLoader } from "react-spinners";

const AuthCallbackPage = () => {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");

        if (!code) {
            console.error("No authorization code found in URL.");
            return;
        }

        // 👇 For now just log it
        console.log("Authorization code:", code);
        console.log("State:", state);

        // TODO: exchange `code` for tokens here (frontend or backend)
        // Example (frontend): await exchangeCodeForTokens(code);
    }, []);

    return (
        <div className="bg-base-100 shadow-lg shadow-gray-400 rounded-xl p-4 items-center flex flex-col">
            <p className="pb-2 font-bold">Just a moment</p>
            <BeatLoader />
        </div>
    );
};

export default AuthCallbackPage;
