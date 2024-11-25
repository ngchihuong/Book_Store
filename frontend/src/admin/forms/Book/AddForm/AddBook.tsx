import { useAppContext } from "@/contexts/AppContext"
import { useMutation } from "react-query";
import * as bookApiClient from "@/api/bookApiClient"
import ManageAddForm from "./ManageAddForm";

export default function AddBook() {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(bookApiClient.addBook, {
        onSuccess: async () => {
            showToast({ message: "Insert Book Successful!", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })
    const handleSave = (bookFormData: FormData) => {
        mutate(bookFormData);
    }
    return (
        <>
            <h1 className="text-3xl font-bold mb-8">Insert Book</h1>
            <ManageAddForm onSave={handleSave} isLoading={isLoading} />
        </>
    )
}