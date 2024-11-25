import { useAppContext } from "@/contexts/AppContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom"
import * as bookApiClient from "@/api/bookApiClient";
import ManageEditBookForm from "./ManageEditBookForm";

export default function EditBook() {

    const { id } = useParams();
    const { showToast } = useAppContext();
    const queryClient = useQueryClient()

    const { data: book } = useQuery(
        "fetchBookById", () => bookApiClient.fetchBookById(id || ""), {
        enabled: !!id
    }
    )
    const { mutate, isLoading } = useMutation(bookApiClient.editBook, {
        onSuccess: () => {
            queryClient.clear()
            showToast({ message: "Book Saved!", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error Saving Book!", type: "ERROR" })
        }
    })
    const handleSave = (bookFormData: FormData) => {
        mutate(bookFormData);
    }
    return (
        <>
            <h1 className="text-3xl font-bold mb-8">Update Book</h1>
            <ManageEditBookForm book={book} onSave={handleSave} isLoading={isLoading} />
        </>
    )
}