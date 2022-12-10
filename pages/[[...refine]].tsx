import { GetServerSideProps } from "next";
import {
  handleRefineParams,
  checkAuthentication,
  NextRouteComponent /*, handleRefineParams */,
} from "@pankod/refine-nextjs-router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {authProvider} from "../src/authProvider";
import {customDataProvider, parseResource} from "../src/utility";
import fs from 'fs';
import vault from 'vault-api';
import axios from "axios";
import {getEngineName} from "vault-api/dist/core/mounts";
import cryptoJS from "crypto-js";
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

    // switch(resource) {
    //   case "challenge": {
    //     switch (action) {
    //       case "show":{
    //           if(id){
    //             console.log("tusamuso")
    //             const data = await customDataProvider.getOne({
    //               // we're slicing the resource param to get the resource name from the last part
    //               resource,
    //               id,
    //             });
    //             console.log(data)
    //
    //             return {
    //               props: {
    //                 initialData: data,
    //                 ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
    //               },
    //             };
    //           }
    //         break;
    //       }
    //
    //       default: {
    //         break;
    //       }
    //     }
    //
    //     break;
    //   }
    //
    //   default: {
    //     break;
    //   }
    // }
    if (resource && action === "show" && id) {
        console.log(resource)
        console.log(action)
        console.log(id)
        const data = await customDataProvider.getOne({
          // we're slicing the resource param to get the resource name from the last part
          resource: parseResource(resource),
          id,
        });

        console.log(data)
        return {
          props: {
            initialData: data,
            ...(await serverSideTranslations(context.locale ?? "en", ["common"])),
          },
        };
    } else if (resource && !action && !id) {
        const data = await customDataProvider.getList({
          // we're slicing the resource param to get the resource name from the last part
          resource: resource,
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
