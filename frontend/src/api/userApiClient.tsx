import { SignInFormData } from "@/pages/account/layouts/LoginForm";
import { RegisterFormData } from "@/pages/account/layouts/RegisterForm";
import { UserType } from "../../../backend/src/shared/types"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/validate-token`, {
        credentials: "include"
    })
    if (!response.ok) {
        throw new Error("Token invalid!")
    }
    return response.json();
}
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}
export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
    localStorage.setItem("userId", responseBody.userId);
    localStorage.setItem("role", responseBody.role);
    return responseBody;
}
export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
        credentials: "include",
        method: "POST"
    });
    if (!response.ok) {
        throw new Error("Error during Sign-out!")
    }
    localStorage.clear();
}
export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("Error fetching user!")
    }
    return response.json();
}
export const fetchAllAccounts = async (): Promise<UserType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/users/users`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    return response.json();
}
export const searchUserByName = async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/api/users/search/${name}`, {
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Error search users!")
    }
    return response.json();
}