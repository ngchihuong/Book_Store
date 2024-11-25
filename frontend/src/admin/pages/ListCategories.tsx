import { useAppContext } from "@/contexts/AppContext";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as cateApiClient from "@/api/categoryApiClient"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal } from "antd";
import { IoWarningOutline } from "react-icons/io5";

export default function ListCategories() {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const [currentPage, setCurrentPage] = useState(1);
    const categorisPerPage = 6; // Number of hotels per page

    const { data: cateData } = useQuery(
        "fetchAllCategories", cateApiClient.fetchAllCategories
    )
    const mutation = useMutation(cateApiClient.addCategory, {
        onSuccess: () => {
            showToast({ message: "Insert new category successful!", type: "SUCCESS" })
            setSelectedValue("");
            setShowModal(false)
            queryClient.clear()
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })
    const { mutate: editCate, isLoading: isUpdate } = useMutation(
        ({ id, name }: { id: string, name: string }) => cateApiClient.editCategory(id, name),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("fetchAllCategories");
                setSelectedCategoryId(null)
                setSelectedValue("")
                showToast({ message: "Update Category Successful!", type: "SUCCESS" })
            },
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" })
            }
        }
    )
    const { mutate: deleteCate, isLoading: isDelete } = useMutation(cateApiClient.deleteCategory, {
        onSuccess: () => {
            showToast({ message: "Delete Successful!", type: "SUCCESS" });
            queryClient.clear();
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })
    if (!cateData) {
        return <>
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        </>
    }
    const handleAddCate = () => {
        if (!selectedValue) {
            setErrorMsg("Please fill all value!")
            setTimeout(() => {
                setErrorMsg(null)
            }, 1000);
            return;
        }
        mutation.mutate({ name: selectedValue })
        setErrorMsg(null)
    }
    const handleUpdate = (id: string) => {
        if (!selectedValue) {
            showToast({ message: "Please fill all value!", type: "ERROR" })
            return;
        }
        editCate({ id, name: selectedValue })
    }
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, category_id: string) => {
        event.preventDefault();
        const isConfirm = window.confirm("Are you sure you want to delete this author!");
        if (isConfirm) {
            deleteCate(category_id)
        }
    }
    // Calculate total pages
    const totalPages = Math.ceil(cateData.length / categorisPerPage);

    // Get the current hotels to display
    const indexOfLastCate = currentPage * categorisPerPage;
    const indexOfFirstHotel = indexOfLastCate - categorisPerPage;
    const currentCate = cateData.slice(indexOfFirstHotel, indexOfLastCate);
    return (
        <>
            <div className="space-y-5">
                <span className="flex justify-between">
                    <h1 className="text-3xl font-bold">List Hotels</h1>
                    <div className="flex flex-row">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex bg-blue-600 text-white text-xl font-bold p-2
                         hover:bg-blue-500 rounded-lg mx-1"
                        >
                            Insert New Category
                        </button>
                        <Link to='/list-books'
                            className="flex bg-gray-600 text-white text-xl font-bold p-2
                         hover:bg-gray-500 rounded-lg mx-1"
                        >
                            Back
                        </Link>
                        <Modal
                            title="Insert New Category"
                            style={{ top: 20 }}
                            open={showModal}
                            onOk={handleAddCate}
                            onCancel={() => setShowModal(false)}
                        >
                            <div className="flex flex-col gap-x-2">
                                <div className="my-2">
                                    <label className="text-md font-semibold font-mono">
                                        Category Name
                                        <input type="text" className="w-full rounded-md px-3 py-1 border-2"
                                            placeholder="Category Name..."
                                            value={selectedValue}
                                            onChange={(event) => setSelectedValue(event.target.value)}
                                        />
                                    </label>
                                </div>
                                {errorMsg &&
                                    <span className="error mt-2 text-red-700 flex flex-row gap-x-1">
                                        <>
                                            <IoWarningOutline className=" text-2xl align-text-bottom" />
                                            {errorMsg}
                                        </>
                                    </span>
                                }
                            </div>
                        </Modal>
                    </div>

                </span>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Category ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Features
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCate.map((category: {
                                _id: any,
                                name: any,
                            }) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {category._id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {selectedCategoryId == category._id ? (
                                            <>
                                                <input type="text" className="border-2 py-1 px-2 rounded"
                                                    value={selectedValue}
                                                    onChange={(event) => setSelectedValue(event.target.value)}
                                                />
                                            </>
                                        )
                                            :
                                            (
                                                <>
                                                    {category.name}
                                                </>
                                            )
                                        }
                                    </td>
                                    <td className="flex flex-row px-6 py-4">
                                        <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm 
                                        font-bold hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg"
                                            onClick={() => {
                                                if (selectedCategoryId === category._id) {
                                                    handleUpdate(category._id)
                                                } else {
                                                    setSelectedCategoryId(category._id)
                                                    setSelectedValue(category.name)
                                                }
                                            }}
                                        >
                                            {`${selectedCategoryId === category._id ?
                                                `${isUpdate
                                                    ? "Saving"
                                                    : "Save"}`
                                                : "Update"}`}
                                        </button>
                                        <button className="w-16 h-10 p-1 bg-red-600 text-white text-sm font-bold hover:bg-red-500 hover:text-gray-200 mx-1 rounded-lg"
                                            onClick={(event) => handleDelete(event, category._id)}
                                            disabled={isDelete}
                                        >
                                            {isDelete ? <AiOutlineLoading3Quarters className="text-lg mx-auto animate-spin" /> : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <div className="m-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Previous
                        </button>
                        <span className="mx-2">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}