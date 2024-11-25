import { ObjectId } from "mongoose";
import { BookType } from "../../../../../../backend/src/shared/types";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import TitleEditSection from "./TitleEditSection";
import CategoryEditSection from "./CategoryEditSection";
import AuthorEditSection from "./AuthorEditSection";
import DetailEditSection from "./DetailEditSection";
import ImagesEditSection from "./ImagesEditSection";
import { useEffect } from "react";

export type BookFormEditData = {
    title: string;
    categoryId: ObjectId | string;
    authorId: ObjectId | string;
    price: number;
    description: string;
    stock: number;
    imageFiles: FileList;
    imageUrls: string[];
}
type Props = {
    book?: BookType;
    onSave: (bookFormData: FormData) => void;
    isLoading: boolean;
}
export default function ManageEditBookForm({ onSave, isLoading, book }: Props) {
    const navigate = useNavigate();
    const formMethods = useForm<BookFormEditData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(book)
    }, [book, reset])

    const onSubmit = handleSubmit((formDataJson: BookFormEditData) => {
        const formData = new FormData();
        if (book) {
            formData.append("id", book._id)
        }
        formData.append("title", formDataJson.title);
        formData.append("categoryId", formDataJson.categoryId.toString())
        formData.append("authorId", formDataJson.authorId.toString());
        formData.append("price", formDataJson.price.toString());
        formData.append("stock", formDataJson.stock.toString());
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url)
            }) 
        }
        Array.from(formDataJson.imageFiles).forEach((imageFiles) => {
            formData.append("imageFiles", imageFiles)
        });
        onSave(formData)
        setTimeout(() => {
            navigate("/list-books")
        }, 1000);
    })
    return (
        <>
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <TitleEditSection />
                    <div className="my-2 grid grid-cols-2 gap-x-5" >
                        <CategoryEditSection />
                        <AuthorEditSection />
                    </div>
                    <DetailEditSection />
                    <ImagesEditSection />
                    <span className="flex justify-end">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-lgk"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                    </span>
                </form>
            </FormProvider>
        </>
    )
}