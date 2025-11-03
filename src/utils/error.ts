import { createSearchParams, type NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

export const goToErrorPage = (
    navigate: NavigateFunction,
    path: string,
    errorMessage?: string,
    toastMessage?: string
) => {
    navigate({
        pathname: path,
        search: createSearchParams({
            error_message: errorMessage ?? "Undefined error.",
        }).toString(),
    });

    toast.error(toastMessage ?? "Undefined error");
};
