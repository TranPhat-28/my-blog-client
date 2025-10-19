import type { PKCEData } from "../types";

const base64urlEncode = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let str = "";
    bytes.forEach((b) => (str += String.fromCharCode(b)));
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const sha256 = async (input: string): Promise<string> => {
    const data = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return base64urlEncode(hashBuffer);
};

const randomString = (length = 64): string => {
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => ("0" + (b % 36).toString(36)).slice(-1)).join(
        ""
    );
};

export const createPKCE = async (): Promise<PKCEData> => {
    const code_verifier = randomString(96);
    const code_challenge = await sha256(code_verifier);
    const state = randomString(16);
    const nonce = randomString(16);

    sessionStorage.setItem("pkce_code_verifier", code_verifier);
    sessionStorage.setItem("pkce_state", state);
    sessionStorage.setItem("oidc_nonce", nonce);

    return { code_challenge, state, nonce };
};
