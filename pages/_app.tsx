import React from "react";
import {AppProps} from "next/app";
import {Refine} from "@pankod/refine-core";
import {ErrorComponent, notificationProvider,} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
import {RefineKbarProvider} from "@pankod/refine-kbar";
import {appWithTranslation, useTranslation} from "next-i18next";
import {authProvider} from "src/authProvider";
import {customDataProvider} from "src/utility";
import {Footer, Header, Layout, OffLayoutArea, Sider, Title,} from "@components/layout";

import ChallengeCreate from "@components/challenge/create";
import ChallengeList from "@components/challenge/list";
import LoginScreen from "@components/login/index";
import HomeScreen from "@components/home/home";
import {ChallengeShow} from "@components";

require("antd/dist/antd.less");

function MyApp({Component, pageProps}: AppProps): JSX.Element {
    const {t, i18n} = useTranslation();
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
                options={{
                    //  syncWithLocation: true,
                    disableTelemetry: true,
                }}
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
                        show: ChallengeShow,
                        options: {
                            label: "Challenge",
                        },
                    },
                ]}

                Layout={Layout}
                catchAll={<ErrorComponent/>}
            >
                <Component {...pageProps} />
            </Refine>
        </RefineKbarProvider>
    );
}

export default appWithTranslation(MyApp);
