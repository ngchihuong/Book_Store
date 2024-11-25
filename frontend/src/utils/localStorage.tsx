export const getLocalStorageData = (key: string, defaultValue: any) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : defaultValue;
};

// Hàm lưu dữ liệu vào localStorage
export const setLocalStorageData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};