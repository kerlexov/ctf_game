import { GetServerSideProps } from "next";
import {
  handleRefineParams,
  checkAuthentication,
  NextRouteComponent /*, handleRefineParams */,
} from "@pankod/refine-nextjs-router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {authProvider} from "../src/authProvider";
import {dataProvider} from "@pankod/refine-appwrite";
import {appwriteClient, options} from "../src/utility";


export const getServerSideProps: GetServerSideProps<
    { initialData?: unknown },
    { refine: [resource: string, action: string, id: string]; }
    > = async (context) => {
  const { resource, action, id } = handleRefineParams(context.params?.refine);

  const { isAuthenticated, ...props } = await checkAuthentication(
      authProvider,
      context,
  );

  if (!isAuthenticated) {
    return props;
  }
  // customize
  try {
    if (resource && action === "show" && id) {
      const data = await dataProvider(appwriteClient,options).getOne({
        // we're slicing the resource param to get the resource name from the last part
        resource: resource.slice(resource.lastIndexOf("/") + 1),
        id,
      });

      return {
        props: {
          initialData: data,
          ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
        },
      };
    } else if (resource && !action && !id) {
      const data = await dataProvider(appwriteClient,options).getList({
        // we're slicing the resource param to get the resource name from the last part
        resource: resource.slice(resource.lastIndexOf("/") + 1),
      });

      return {
        props: {
          initialData: data,
          ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
        },
      };
    }
  } catch (error) {
    return { props: {
        initialData: {},
        ...(await serverSideTranslations(context.locale ?? "en", ["common"]))
    }};
  }

  return {
    props: {
        initialData: {},
      ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    },
  };
};

export default NextRouteComponent;


/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
