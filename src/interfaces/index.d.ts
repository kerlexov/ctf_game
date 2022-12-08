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
