export function filterProjectsStartsWithFirst(data: string[], filter: string): string[] {
    const startsWithData = data.filter((item) => item.toLowerCase().startsWith(filter.toLowerCase()));
    const includesData = data
        .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
        .filter((item) => !startsWithData.includes(item));

    return startsWithData.concat(includesData);
}
