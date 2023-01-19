import {UploadFiles} from "../interfaces";

export const emailExpression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

export class Convert {
    public static toUploadFiles(json: string): UploadFiles[] {
        return JSON.parse(json);
    }

    public static uploadFilesToJson(value: UploadFiles[]): string {
        return JSON.stringify(value);
    }
}
