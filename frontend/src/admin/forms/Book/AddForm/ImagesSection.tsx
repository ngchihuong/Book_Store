import { useFormContext } from "react-hook-form"
import { BookFormAddData } from "./ManageAddForm";

export default function ImagesSection() {
    const {
        register,
        watch,
        formState: { errors }
    } = useFormContext<BookFormAddData>();

    const existingImageUrls = watch("imageUrls");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input type="file"
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
                <span className="text-red-500 text-sm font-semibole">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}