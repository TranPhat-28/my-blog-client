import { httpRequest } from "../utils/httpClient";
import { PKCE } from "../utils/PKCE";

const loginWithGoogle = async (): Promise<void> => {
    const { code_challenge, state, nonce } = await PKCE.create();

    const params = new URLSearchParams({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        code_challenge,
        code_challenge_method: "S256",
        state,
        nonce,
    });

    window.location.href = `${
        import.meta.env.VITE_GOOGLE_AUTH_URL
    }?${params.toString()}`;
};

const exchangeGoogleCodeForToken = async (code: string): Promise<string> => {
    const codeVerifier = PKCE.getVerifier();
    const nonce = PKCE.getNonce();
    if (!codeVerifier || !nonce)
        throw new Error(
            "Missing PKCE verifier or nonce — user might have reloaded."
        );

    const res = await httpRequest<{ token: string }>("/auth/google", {
        method: "POST",
        data: {
            code,
            code_verifier: codeVerifier,
            nonce,
        },
        withCredentials: true,
    });

    if (!res) {
        throw new Error("Auth failed");
    }

    PKCE.clear();
    return "JWT";
};

export const authApi = { loginWithGoogle, exchangeGoogleCodeForToken };
