export interface IChallenge {
    id: string;
    name: string;
    points: number;
    difficulty: string;
    description: string;
    challangeCategoryID: string;
}

export interface IChallengeCreate extends IChallenge{
    flag: string
}
