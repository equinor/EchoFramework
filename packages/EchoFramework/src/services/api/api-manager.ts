import { BaseError } from '@equinor/echo-base';
import EchoCore, { EchoEnv } from '@equinor/echo-core';

export const baseApiUrl = EchoEnv.env().REACT_APP_API_URL;

export async function request<T>(url: string, requestType: T): Promise<T> {
    const response: Response = await EchoCore.EchoClient.fetch(url);
    const contentType = response.headers.get('content-type');
    if (
        (response.status === 200 || response.status === 202) &&
        contentType &&
        contentType.indexOf('application/json') !== -1
    ) {
        try {
            requestType = JSON.parse(await response.text());
        } catch (exception) {
            throw new BaseError({ message: 'Could not parse JSON', exception });
        }
    } else if (
        (response.status === 200 || response.status === 202) &&
        contentType &&
        contentType.indexOf('text/plain') !== -1
    ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text: any = await response.text();
        requestType = text;
    } else if (
        ((response.status === 200 || response.status === 202) && contentType && contentType.indexOf('image/') >= 0) ||
        (contentType && contentType.indexOf('video/') >= 0)
    ) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            requestType = (await response.arrayBuffer()) as any;
        } catch (ex) {
            throw new Error(ex);
        }
    }

    return requestType;
}
