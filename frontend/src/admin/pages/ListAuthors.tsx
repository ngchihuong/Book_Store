import { useAppContext } from "@/contexts/AppContext";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as authorApiClient from "@/api/authorApiClient"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Modal } from "antd";
import { IoWarningOutline } from "react-icons/io5";

export default function ListAuthors() {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null)
    const [selectedName, setSelectedName] = useState<string>("");
    const [selectedBio, setSelectedBio] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null)
    const [searchValue, setSearchValue] = useState<string>("")

    const [currentPage, setCurrentPage] = useState(1);
    const authorsPerPage = 6; // Number of hotels per page

    const { data: authorData } = useQuery(
        "fetchAllAuthors", authorApiClient.fetchAllAuthors
    )

    const mutation = useMutation(authorApiClient.addAuthor, {
        onSuccess: () => {
            showToast({ message: "Insert Author Successful!", type: "SUCCESS" });
            setSelectedName("")
            setSelectedBio("")
            queryClient.clear()
            setShowModal(false)
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })
    const { mutate: editAuthor, isLoading: isUpdate } = useMutation(
        ({ id, name, bio }: { id: string, name: string, bio: string }) => authorApiClient.editAuthor(id, name, bio), {
        onSuccess: () => {
            queryClient.invalidateQueries("fetchAllAuthors");
            setSelectedAuthorId(null)
            setSelectedName("")
            setSelectedBio("")
            showToast({ message: "Update author information successful!", type: "SUCCESS" })
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })
        }
    })

    const { mutate: deleteAuthor, isLoading: isDelete } = useMutation(authorApiClient.deleteAuthor, {
        onSuccess: async () => {
            showToast({ message: "Deleted author!", type: "SUCCESS" })
            queryClient.clear();
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" });
        }
    })
    const { data: searchResults } = useQuery(
        ["searchAuthorByName", searchValue],
        () => authorApiClient.searchAuthorByName(searchValue),
        {
            enabled: !!searchValue
        }
    )
    if (!authorData) {
        return <>
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        </>
    }

    const handleAddAuthor = () => {
        if (!selectedName || !selectedBio) {
            setErrorMsg("Please fill all value!")
            setTimeout(() => {
                setErrorMsg(null)
            }, 1000);
            return;
        }
        mutation.mutate({ name: selectedName, bio: selectedBio })
    }
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, authorId: string) => {
        event.preventDefault();
        const isConfirm = window.confirm("Are you sure you want to delete this author!");
        if (isConfirm) {
            deleteAuthor(authorId);
        }
    }
    const handleUpdate = (id: string) => {
        if (!selectedName || !selectedBio) {
            showToast({ message: "Please fill all value!", type: "ERROR" })
            return;
        }
        editAuthor({ id, name: selectedName, bio: selectedBio })
    }

    // Calculate total pages
    const totalPages = Math.ceil(authorData.length / authorsPerPage);

    // Get the current hotels to display
    const indexOfLastHotel = currentPage * authorsPerPage;
    const indexOfFirstAuthor = indexOfLastHotel - authorsPerPage;
    const currentAuthor = authorData.slice(indexOfFirstAuthor, indexOfLastHotel);


    return (
        <>
            <div className="space-y-5">
                <span className="flex justify-between">
                    <h1 className="text-3xl font-bold">List Authors</h1>

                    <div className="flex flex-row">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex bg-blue-600 text-white text-xl font-bold p-2
                         hover:bg-blue-500 rounded-lg mx-1"
                        >
                            Insert New Author
                        </button>
                        <Modal
                            title="Insert New Author"
                            style={{ top: 20 }}
                            open={showModal}
                            onOk={handleAddAuthor}
                            onCancel={() => setShowModal(false)}
                        >
                            <div className="flex flex-col gap-x-2">
                                <div className="my-2">
                                    <label className="text-md font-semibold font-mono">
                                        Name
                                        <input type="text" className="w-full rounded-md px-3 py-1 border-2"
                                            placeholder="Author Name..."
                                            value={selectedName}
                                            onChange={(event) => setSelectedName(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="my-2">
                                    <label className="text-md font-semibold font-mono">
                                        Bio
                                        <textarea
                                            rows={4}
                                            className="w-full rounded-md px-3 py-1 border-2"
                                            placeholder="Author Bio..."
                                            value={selectedBio}
                                            onChange={(event) => setSelectedBio(event.target.value)}
                                        >
                                        </textarea>
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

                <div className="w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <input
                            type="text"
                            className="border-2 px-4 py-2 rounded-md w-full"
                            placeholder="Author Name..."
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </div>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Author ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Features
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchResults || currentAuthor).map((author: {
                                _id: any,
                                name: any,
                                bio: any
                            }) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">
                                        {author._id}
                                    </td>
                                    {selectedAuthorId === author._id
                                        ?
                                        <>
                                            <td className="px-6 py-4">
                                                <input type="text"
                                                    className="border-2 border-gray-500 rounded-md px-2 py-1 mr-1"
                                                    value={selectedName || ""}
                                                    onChange={(event) => setSelectedName(event?.target.value)}
                                                />
                                            </td>
                                            <td className="whitespace-nowrap break-words max-w-[100px] max-h-[100px] overflow-hidden text-ellipsis">
                                                <textarea
                                                    className="border-2 border-gray-500 rounded-md px-2 py-1 mr-1 my-2"
                                                    rows={3}
                                                    value={selectedBio || ""}
                                                    onChange={(event) => setSelectedBio(event.target.value)}
                                                >
                                                </textarea>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td className="px-6 py-4">
                                                {author.name}
                                            </td>
                                            <td className="whitespace-nowrap break-words max-w-[100px] max-h-[100px] overflow-hidden text-ellipsis">
                                                {author.bio}
                                            </td>
                                        </>
                                    }

                                    <td className="flex flex-row px-6 py-4">
                                        <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm 
                                        font-bold hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg"
                                            onClick={() => {
                                                if (selectedAuthorId === author._id) {
                                                    handleUpdate(author._id)
                                                } else {
                                                    setSelectedAuthorId(author._id);
                                                    setSelectedName(author.name)
                                                    setSelectedBio(author.bio)
                                                }
                                            }}
                                        >
                                            {`${selectedAuthorId === author._id ?
                                                `${isUpdate
                                                    ? "Saving"
                                                    : "Save"}`
                                                : "Update"}`}
                                        </button>
                                        <button className="w-16 h-10 p-1 bg-red-600 text-white text-sm font-bold hover:bg-red-500 hover:text-gray-200 mx-1 rounded-lg"
                                            onClick={(event) => handleDelete(event, author._id)}
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