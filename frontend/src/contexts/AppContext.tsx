import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import * as userApiClient from "@/api/userApiClient";
import Toast from "@/lib/Toast";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}
type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLogged: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const { isError } = useQuery("validateToken", userApiClient.validateToken, {
        retry: false
    })
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage)
                },
                isLogged: !isError
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(undefined)}
                />
            )}
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}