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
} as const;
