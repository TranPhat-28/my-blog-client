import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const AuthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            const state = params.get("state");

            if (!code) {
                console.error("No authorization code found in URL.");
                return;
            }

            const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
            if (!codeVerifier) {
                console.error(
                    "Missing PKCE verifier — user might have reloaded."
                );
                return;
            }

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "include", // allows cookies from backend
                        body: JSON.stringify({
                            code,
                            code_verifier: codeVerifier,
                            state,
                        }),
                    }
                );

                if (!res.ok) {
                    const err = await res.text();
                    throw new Error(`Auth failed: ${err}`);
                }

                const data = await res.json();
                console.log("Login successful:", data);

                navigate("/");
            } catch (err) {
                console.error("Login error:", err);
            }
        };

        handleAuth();
    }, [navigate]);

    return (
        <div className="bg-base-100 shadow-lg shadow-gray-400 rounded-xl p-4 items-center flex flex-col">
            <p className="pb-2 font-bold">Just a moment</p>
            <BeatLoader />
        </div>
    );
};

export default AuthCallbackPage;
