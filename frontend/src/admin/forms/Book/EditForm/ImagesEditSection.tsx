import { useFormContext } from "react-hook-form";
import { BookFormAddData } from "../AddForm/ManageAddForm";

export default function ImagesEditSection() {
    const {
        register,
        watch,
        setValue,
        formState: { errors }
    } = useFormContext<BookFormAddData>();

    const existingImageUrls = watch("imageUrls")

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
        event.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url !== imageUrl))
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="relative group">
                                <img src={url} alt="" className="min-h-full object-cover" />
                                <button
                                    onClick={(event) => handleDelete(event, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                >Delete</button>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                            if (totalLength === 0) {
                                return "At least one image should be added!"
                            }
                            if (totalLength > 4) {
                                return "Total number of images cannot be more than 4!"
                            }
                            return true;
                        }
                    })} />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}