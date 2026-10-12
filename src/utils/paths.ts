/** Root-relative URLs work both on a custom domain and under a Pages project path. */
export const withBase = (path:string) => `${import.meta.env.BASE_URL.replace(/\/$/,'')}/${path.replace(/^\//,'')}`;
