import { AuthorType } from "../../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const addAuthor = async (authorData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/authors/add-author`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(authorData)
    })
    if (!response.ok) {
        throw new Error("Failed to insert author!")
    }
    return response.json()
}
export const fetchAllAuthors = async (): Promise<AuthorType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/authors/authors`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Failed fetch authors!")
    }
    return response.json();
}
export const editAuthor = async (id: string, name: string, bio: string) => {
    const response = await fetch(`${API_BASE_URL}/api/authors/edit-author/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, bio })
    });
    if (!response.ok) {
        throw new Error("Failed to edit author information!")
    }
    return response.json();
}
export const deleteAuthor = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/authors/delete-author/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed delete author!")
    }
    return response.json();
}
export const searchAuthorByName = async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/api/authors/search/${name}`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Failed search author!")
    }
    return response.json();
}