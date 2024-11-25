import { BookType } from "../../../backend/src/shared/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const addBook = async (bookFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/books/add`, {
        method: "POST",
        credentials: "include",
        body: bookFormData
    });
    if (!response.ok) {
        throw new Error("Failed Insert New Book!")
    }
    return response.json();
}
export const fetchAllBook = async (): Promise<BookType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/books/books`);
    if (!response.ok) {
        throw new Error("Failed fetch books!")
    }
    return response.json();
}
export const editBook = async (bookFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/books/edit/${bookFormData.get("id")}`, {
        method: "PUT",
        credentials: "include",
        body: bookFormData
    });
    if (!response.ok) {
        throw new Error("Failed to update book!")
    }
    return response.json();
}
export const deleteBook = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/api/books/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Failed delete book!")
    }
    return response.json();
}
export const fetchBookById = async (id: string) => {
    const responsne = await fetch(`${API_BASE_URL}/api/books/book/${id}`);
    if (!responsne.ok) {
        throw new Error("Failed fetch book!")
    }
    return responsne.json();
}
export const searchBookForAdmin = async (title: string) => {
    const response = await fetch(`${API_BASE_URL}/api/books/search/${title}`)
    if (!response.ok) {
        throw new Error("Failed search author!")
    }
    return response.json();
}
export const fetchBookByCategory = async () => {
    const response = await fetch(`${API_BASE_URL}/api/books/categories-with-books`);
    if (!response.ok) {
        throw new Error("Failed load book!")
    }
    return response.json();
}
export const fetchBookByCategoryId = async (categoryId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/books/book/category/${categoryId}`);
    if (!response.ok) {
        throw new Error("Failed load book!")
    }
    return response.json();
}
export const searchBookByName = async (key: string,limit: number) => {
    const params = new URLSearchParams({ key, limit: limit.toString() }).toString();
    const response = await fetch(`${API_BASE_URL}/api/books/search/${params}`, {
        method: "GET"
    })
    if (!response.ok) {
        throw new Error("Failed search book!")
    }
    return response.json();
}