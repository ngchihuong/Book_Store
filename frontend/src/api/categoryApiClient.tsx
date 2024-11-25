import { CategoryType } from "../../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const addCategory = async (categoryData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/categories/add-category`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(categoryData)
    })
    if (!response.ok) {
        throw new Error("Failed insert category!")
    }
    return response.json();
}
export const editCategory = async (id: string, name: string) => {
    const response = await fetch(`${API_BASE_URL}/api/categories/edit-category/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    })
    if (!response.ok) {
        throw new Error("Failed update information category!")
    }
    return response.json();
}
export const deleteCategory = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/categories/delete-category/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed delete hotel!")
    }
    return response.json();
}
export const fetchAllCategories = async (): Promise<CategoryType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/categories/categories`);
    if (!response.ok) {
        throw new Error("Error fetching categories!")
    }
    return response.json();
}
export const fetchCategoryById = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/categories/category/${id}`);
    if (!response.ok) {
        throw new Error("Error fetching category!")
    }
    return response.json();
}