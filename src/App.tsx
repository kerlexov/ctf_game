import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ErrorComponent,
} from "@pankod/refine-antd";
import {
    dataProvider,
    liveProvider,
} from "@pankod/refine-appwrite";
import routerProvider from "@pankod/refine-react-router-v6";
import "@pankod/refine-antd/dist/styles.min.css";

import { appwriteClient,authProvider } from "utility";
import {LoginScreen} from "./pages/login/login";
import {ChallengesList} from "./pages/challenge/list";
import {ChallengesCreate} from "./pages/challenge";

const App: React.FC = () => {
    return (
        <Refine
            dataProvider={dataProvider(appwriteClient, {
                databaseId: "636fb1bbc8d1f78b47a1",
            })}
            liveProvider={liveProvider(appwriteClient, {
                databaseId: "636fb1bbc8d1f78b47a1",
            })}
            options={{ liveMode: "auto" }}
            authProvider={authProvider}
            routerProvider={routerProvider}
            LoginPage={LoginScreen}
            resources={[
                {
                    name: "636fb211985274ef42f2",
                    create: ChallengesCreate,
                    list: ChallengesList,
                   // edit: PostsEdit,
                   // show: PostsShow,
                    options: {
                        label: "Challange",
                    },
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
            disableTelemetry={true}
        />
    );
};

export default App;
