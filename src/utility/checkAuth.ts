import { AuthProvider } from "@pankod/refine-core";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const checkAuthentication = async (
    authProvider: AuthProvider,
    context: GetServerSidePropsContext,
): Promise<
    GetServerSidePropsResult<{}> & {
    isAuthenticated: boolean;
}
> => {
    let isAuthenticated = false;
    if (context.resolvedUrl.includes("/login")) {
        return {
            props: {},
            isAuthenticated,
        };
    }

    try {
        await authProvider.checkAuth?.(context);
        isAuthenticated = true;
    } catch (error) {
        const encodeURI = () => {
            if (
                context.resolvedUrl === "/" ||
                context.resolvedUrl === undefined
            ) {
                return "/login";
            }

            if(context.resolvedUrl.includes("userId")&&context.resolvedUrl.includes("secret")&&context.resolvedUrl.includes("expire")){
                return `/reset?to=${encodeURIComponent(context.resolvedUrl)}`;
            }

            return `/login?to=${encodeURIComponent(context.resolvedUrl)}`;
        };

        return {
            isAuthenticated,
            redirect: {
                destination: encodeURI(),
                permanent: false,
            },
        };
    }

    return { props: {}, isAuthenticated };
};
