import { useFormContext } from "react-hook-form";
import { BookFormEditData } from "./ManageEditBookForm";

export default function DetailEditSection() {
    const {
        register,
        formState: { errors }
    } = useFormContext<BookFormEditData>();
    return (
        <>
            <div className="flex flex-col gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Description
                    <textarea rows={5}
                        placeholder="Description..."
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("description", { required: "This field is required!" })}
                    >
                    </textarea>
                    {errors.description && (
                        <span className="text-red-500">{errors.description.message}</span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    Price
                    <input type="number"
                        min={1}
                        placeholder="0"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("price", { required: "This field is required!" })}
                    />
                    {errors.price && (
                        <span className="text-red-500">{errors.price.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    Quantity
                    <input type="number"
                        min={1}
                        placeholder="0"
                        className="border rounded w-full py-1 px-2 font-normal"
                        {...register("stock", { required: "This field is required!" })}
                    />
                    {errors.stock && (
                        <span className="text-red-500">{errors.stock.message}</span>
                    )}
                </label>
            </div>
        </>
    )
}