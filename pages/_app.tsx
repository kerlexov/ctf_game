import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
require("antd/dist/antd.less");

import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { appWithTranslation, useTranslation } from "next-i18next";
import { authProvider } from "src/authProvider";
import {appwriteClient, customDataProvider, options, resources} from "src/utility";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "@components/layout";
import {ChallengeCreate, ChallengeList,LoginScreen,HomeScreen} from "@components";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <RefineKbarProvider>
      <Refine
        routerProvider={routerProvider}
        authProvider={authProvider}
        dataProvider={customDataProvider}
        notificationProvider={notificationProvider}
        options={{ syncWithLocation: true, disableTelemetry: true }}
        LoginPage={LoginScreen}
        DashboardPage={HomeScreen}
        Title={Title}
        Header={Header}
        Sider={Sider}
        Footer={Footer}
        OffLayoutArea={OffLayoutArea}
        i18nProvider={i18nProvider}
        resources={[
          {
            name: "challenge",
            list: ChallengeList,
            create: ChallengeCreate,
            // edit: PostEdit,
            // show: PostShow,
            options: {
              label: "Challenge",
            },
          },
        ]}
        Layout={Layout}
        catchAll={<ErrorComponent />}
      >
        <Component {...pageProps} />
      </Refine>
    </RefineKbarProvider>
  );
}

export default appWithTranslation(MyApp);
