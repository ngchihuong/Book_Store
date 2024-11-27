import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import * as cateApiClient from "@/api/categoryApiClient";
// import { Select } from "antd";
import { useEffect } from "react";
import { BookFormEditData } from "./ManageEditBookForm";

export default function CategoryEditSection() {
    const {
        register,
        setValue,
        watch,
        formState: { errors }
    } = useFormContext<BookFormEditData>();

    const { data: listCategories, isLoading } = useQuery(
        "fetchAllCategories",
        cateApiClient.fetchAllCategories
    );

    const selectedCategoryId = watch("categoryId");

    const defaultCategoryId = listCategories?.[0]?._id || "";

    useEffect(() => {
        if (!selectedCategoryId && defaultCategoryId) {
            setValue("categoryId", defaultCategoryId);
        }
    }, [defaultCategoryId, selectedCategoryId, setValue]);
    if (isLoading || !listCategories) {
        return <>Loading...</>;
    }

    return (
        <div>
            <label className="text-md font-semibold font-mono flex-1">
                Category
                {/* <Select
                    placeholder="Choose a category..."
                    style={{ width: 200, minWidth: "100%" }}
                    options={
                        listCategories?.map(category => ({
                            label: <span>{category.name}</span>,
                            value: category._id
                        }))
                    }
                    value={selectedCategoryId} // Bind current value
                    onChange={value => setValue("categoryId", value, { shouldValidate: true })} // Update react-hook-form value
                /> */}
                <select
                    {...register("categoryId", { required: "This field is required!" })}
                    className="border rounded w-full p-2 text-gray-700 font-normal"
                >
                    {listCategories && listCategories?.map((category) => (
                        <option value={category._id}
                        >{category.name}</option>
                    ))}
                </select>
            </label>
            {/* Error handling */}
            {errors.categoryId && (
                <span className="text-red-500 text-sm font-semibold">
                    {errors.categoryId.message}
                </span>
            )}
        </div>
    );
}
