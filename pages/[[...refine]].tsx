import { GetServerSideProps } from "next";
import {
  checkAuthentication,
  handleRefineParams,
  NextRouteComponent
} from "@pankod/refine-nextjs-router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {authProvider} from "../src/authProvider";
import {customDataProvider, parseResource} from "../src/utility";

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
    if(id) {
      switch (resource) {
        case "challenge": {
          switch (action) {
            case "show": {
              const data = await customDataProvider.getOne({
                resource: parseResource(resource),
                id,
              });

              return {
                props: {
                  initialData: data,
                  ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
                },
              };
              break;
            }

            case "delete": {
              const data = await customDataProvider.deleteOne({
                resource: parseResource(resource),
                id
              });

              return {
                props: {
                  initialData: data,
                  ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
                },
              };
              break;
            }

            default: {
              break;
            }
          }

          break;
        }

        default: {
          break;
        }
      }
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

export default NextRouteComponent.bind({initialRoute:"/"});


/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `NextRouteComponent` like the following:
 *
 * export default NextRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
