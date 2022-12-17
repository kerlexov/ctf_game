import {UploadFiles} from "../interfaces";

export class Convert {
    public static toUploadFiles(json: string): UploadFiles[] {
        return JSON.parse(json);
    }

    public static uploadFilesToJson(value: UploadFiles[]): string {
        return JSON.stringify(value);
    }
}
