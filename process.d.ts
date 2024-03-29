namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {

        NEXT_PUBLIC_APPWRITE_URL: string
        NEXT_PUBLIC_APPWRITE_PROJECT: string
        NEXT_PUBLIC_DATABASE_ID: string
        NEXT_PUBLIC_RESOURCE_CHALLENGES: string
        NEXT_PUBLIC_RESOURCE_CATEGORIES: string
        NEXT_PUBLIC_BUCKET_ID: string

        VSID: string
        VRID: string
        VURL: string
        AWSID: string
    }
}
