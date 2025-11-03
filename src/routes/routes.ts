/* Root level paths must have prefix slash */
/* Nested level paths must not have prefix slash */
export const routes = {
    login: {
        path: "/login",
        absolutePath: "/login",
        link: () => "/login",
        /* Nested routes */
        callback: {
            path: "callback",
            absolutePath: "/login/callback",
            link: () => "/login/callback",
        },
    },
    home: {
        path: "/",
        absolutePath: "/",
        link: () => "/",
        /* Nested routes */
        blogs: {
            path: "blogs",
            absolutePath: "/blogs",
            link: () => "/blogs",
        },
        blogId: {
            path: "blogs/:id",
            absolutePath: "/blogs/:id",
            link: (id: string) => `/blogs/${id}`,
        },
    },
    error: {
        path: "/error",
        absolutePath: "/error",
        link: () => "/error",
    },
    notFound: {
        path: "/error?error_message=Page+not+found.",
        absolutePath: "/error?error_message=Page+not+found.",
        link: () => "/error?error_message=Page+not+found.",
    },
    any: {
        path: "*",
        absolutePath: "*",
        link: () => "*",
    },
} as const;
