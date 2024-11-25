import { FormProvider, useForm } from "react-hook-form";
import TitleSection from "./TitleSection";
import CategorySection from "./CategorySection";
import AuthorSection from "./AuthorSection";
import DetailSection from "./DetailSection";
import ImagesSection from "./ImagesSection";

export type BookFormAddData = {
    title: string;
    categoryId: string;
    authorId: string;
    price: number;
    description: string;
    stock: number;
    imageFiles: FileList;
    imageUrls: string[];
}
type Props = {
    onSave: (HotelFormData: FormData) => void;
    isLoading: boolean;
}
export default function ManageAddForm({ onSave, isLoading }: Props) {
    const formMethods = useForm<BookFormAddData>();
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJson: BookFormAddData) => {
        const formData = new FormData();

        formData.append("title", formDataJson.title);
        formData.append("categoryId", formDataJson.categoryId);
        formData.append("authorId", formDataJson.authorId);
        formData.append("description", formDataJson.description)
        formData.append("price", formDataJson.price.toString());
        formData.append("stock", formDataJson.stock.toString());
        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url)
            })
        }
        Array.from(formDataJson.imageFiles).forEach((imageFiles) => {
            formData.append(`imageFiles`, imageFiles)
        })
        onSave(formData)
    })

    return (
        <>
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <TitleSection />
                    <div className="my-2 grid grid-cols-2 gap-x-5" >
                        <CategorySection />
                        <AuthorSection />
                    </div>
                    <DetailSection />
                    <ImagesSection />
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