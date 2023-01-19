import {JwtPayload} from "jwt-decode";
import VaultClient from "node-vault-client";
export interface IChallengeBase {
    id: string;
    name: string;
    points: number;
    difficulty: string;
    description: string;
    author_id: string;
    //challangeCategoryID: string;
}

export interface IChallenge extends IChallengeBase{
    files: IFile[]
}

export interface IChallengeCreate extends IChallengeBase{
    flag: string
    files: string
}

export interface IFile {
    uid: string;
    name: string;
    url: string;
    type: string;
    size: number;
    percent: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
}

export interface ILoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export interface IRegisterForm {
    create_name: string;
    create_email: string;
    create_password: string;
}

export interface ResultRecordData{
    name: string
    points: number
}
export type ResultRecord = {
    [key: string]: number;
}

export interface UploadFiles {
    uid:     string;
    name:    string;
    url:     string;
    type:    string;
    size:    number;
    percent: number;
    status:  string;
}

declare module 'jwt-decode' {
    export interface JwtPayloadCustom extends JwtPayload {
        userId: string
        sessionId: string
        exp: number
    }
}

export interface ScoreboardProps {
    initialData?: ResultRecordData[]
}


export interface ProfileProps {
    name?: string
    email?: string
    emailVerified?: boolean
    identity?: string
    prefs?: ProfilePrefs;
}

export interface ProfilePrefs {
    [key: string]: string
}

export type RefineLayoutSiderPropsCustom = {
    render?: (props: SiderRenderPropsCustom) => React.ReactNode;
};
export type SiderRenderPropsCustom = {
    items: JSX.Element[];
    profile: React.ReactNode;
    logout: React.ReactNode;
    dashboard: React.ReactNode;
    collapsed: boolean;
};


