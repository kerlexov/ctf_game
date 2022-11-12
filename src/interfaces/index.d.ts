export interface IChallengeCategory {
    id: string;
    title: string;
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IChallenge {
    id: string;
    name: string;
    points: number;
    difficulty: string;
    description: string;
    flag: string;
    challangeCategoryID: string;
}

export interface IChallengeVariables {
    id: string;
    name: string;
    points: number;
    difficulty: string;
    description: string;
    flag: string;
}

