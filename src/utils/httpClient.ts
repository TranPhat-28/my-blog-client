import axios, { type AxiosRequestConfig } from "axios";

/* Basic Axios instance setup */
const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // include cookies
    headers: {
        "Content-Type": "application/json",
    },
});

export async function httpRequest<T = unknown>(
    url: string,
    config: AxiosRequestConfig = {}
): Promise<T> {
    try {
        const response = await httpClient(url, config);

        if (response && typeof response === "object" && "data" in response) {
            return (response.data ?? response) as T;
        }

        return response as T;
    } catch (error) {
        console.error("[HTTP error] ", error);
        throw error;
    }
}

export { httpClient };
