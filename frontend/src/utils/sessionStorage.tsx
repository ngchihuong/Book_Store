export const getSessionStorageData = (key: string, defaultValue: any) => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
}
export const setSessionStorageData = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}