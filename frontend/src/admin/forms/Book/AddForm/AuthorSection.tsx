import { useFormContext } from "react-hook-form";
import { BookFormAddData } from "./ManageAddForm";
import { useQuery } from "react-query";
import * as authorApiClient from "@/api/authorApiClient";
import { Select } from "antd";
import { useEffect } from "react";

export default function AuthorSection() {
    const {
        setValue,
        watch,
        formState: { errors }
    } = useFormContext<BookFormAddData>();

    const { data: listAuthors, isLoading } = useQuery(
        "fetchAllAuthors",
        authorApiClient.fetchAllAuthors
    );

    // Watch current value of categoryId
    const selectedCategoryId = watch("authorId");

    const defaultAuthor = listAuthors?.[0]?._id || "";
    useEffect(() => {
        if (!selectedCategoryId && defaultAuthor) {
            setValue("authorId",defaultAuthor)
        }
    }, [defaultAuthor, selectedCategoryId, setValue])
    if (isLoading || !listAuthors) {
        return <>Loading...</>;
    }

    return (
        <div>
            <label className="text-md font-semibold font-mono flex-1">
                Author
                <Select
                    placeholder="Choose a category..."
                    style={{ width: 200, minWidth: "100%" }}
                    options={
                        listAuthors?.map(category => ({
                            label: <span>{category.name}</span>,
                            value: category._id
                        }))
                    }
                    value={selectedCategoryId} // Bind current value
                    onChange={value => setValue("authorId", value, { shouldValidate: true })} // Update react-hook-form value
                />
            </label>
            {/* Error handling */}
            {errors.authorId && (
                <span className="text-red-500 text-sm font-semibold">
                    {errors.authorId.message}
                </span>
            )}
        </div>
    );
}
