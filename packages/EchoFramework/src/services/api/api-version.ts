import { baseApiUrl, request } from "./api-manager";

export async function getApiVersion(): Promise<string> {
    const url = `${baseApiUrl}/Version`;
    return await request<string>(url, '');
}

export async function getAppVersion(): Promise<string> {
    const url = `${baseApiUrl}/Version/ProductVersion`;
    return await request<string>(url, '');
}
