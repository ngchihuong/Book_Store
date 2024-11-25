import { useFormContext } from "react-hook-form";
import { BookFormAddData } from "./ManageAddForm";

export default function TitleSection() {
    const {
        register,
        formState: { errors }
    } = useFormContext<BookFormAddData>();

    return (
        <>
            <div className="flex flex-col gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Title
                    <input type="text"
                        placeholder="Title..."
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("title", { required: "This field is required!" })}
                    />
                </label>
                {errors.title && (
                    <span className="text-red-500 font-bold">{errors.title.message}</span>
                )}
            </div>
        </>
    )
}