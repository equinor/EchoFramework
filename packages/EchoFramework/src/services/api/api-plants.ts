import { Plant } from '@equinor/echo-core';
import { baseApiUrl, request } from './api-manager';

/**
 * Function for getting a list of plants from our API.
 * @export
 * @return {*}  {Promise<Plant[]>}
 */
export async function getPlantsFromApi(): Promise<Plant[]> {
    const url = `${baseApiUrl}/plants`;
    return await request<Plant[]>(url, []);
}
