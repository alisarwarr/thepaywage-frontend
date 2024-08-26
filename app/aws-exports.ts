"use client";
//AWS-AMPLIFY
import { Amplify, type ResourcesConfig } from 'aws-amplify';


//initialize variables for userPoolId and userPoolClientId
let userPoolId = "";
let userPoolClientId = "";


//switch statement to set the correct values based on the environment
switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case 'DEV':
        userPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID_DEV || '';
        userPoolClientId = process.env.NEXT_PUBLIC_USERPOOL_CLIENT_ID_DEV || '';
        break;

    case 'PROD':
        userPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID_PROD || '';
        userPoolClientId = process.env.NEXT_PUBLIC_USERPOOL_CLIENT_ID_PROD || '';
        break;

    case 'TEST':
        userPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID_TEST || '';
        userPoolClientId = process.env.NEXT_PUBLIC_USERPOOL_CLIENT_ID_TEST || '';
        break;

    default:
        console.error("Invalid environment specified");
        break;
}


const cognitoConfig: ResourcesConfig["Auth"] = {
    Cognito: {
        userPoolId,
        userPoolClientId
    }
}


Amplify.configure({ Auth: cognitoConfig }, { ssr: true });


export default function ConfigureAmplifyClientSide() {
    console.log({ cognitoConfig });
    return null;
}