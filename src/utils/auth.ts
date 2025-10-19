import { createPKCE } from "./PCKE";

export const loginWithGoogle = async (): Promise<void> => {
    const { code_challenge, state, nonce } = await createPKCE();

    const params = new URLSearchParams({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: "http://localhost:5173/login/callback",
        response_type: "code",
        scope: "openid email profile",
        code_challenge,
        code_challenge_method: "S256",
        state,
        nonce,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};
