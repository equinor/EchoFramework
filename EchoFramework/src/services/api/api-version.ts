import EchoCore from '@equinor/echo-core';
import { baseApiUrl } from "./api-manager";

export async function getApiVersion(): Promise<string> {
    const data = await (await EchoCore.EchoClient.fetch(`${baseApiUrl}/Version`)).text()
    return data;
}

export async function getAppVersion(): Promise<string> {
    const data = await (await EchoCore.EchoClient.fetch(`${baseApiUrl}/Version/ProductVersion`)).text()
    return data;
}
