import { Link } from "react-router-dom";

export default function ListOrders() {
    return (
        <>
         <div className="space-y-5">
                <span className="flex justify-between">
                    <h1 className="text-3xl font-bold">List Books</h1>
                    <div className="flex flex-row">
                        <Link to='/list-categories'
                            className="flex bg-blue-600 text-white text-xl font-bold p-2
                         hover:bg-blue-500 rounded-lg mx-1"
                        >
                            List Categories
                        </Link>
                        <Link to='/books/add'
                            className="flex bg-blue-600 text-white text-xl font-bold p-2
                         hover:bg-blue-500 rounded-lg mx-1"
                        >
                            Add New Book
                        </Link>

                    </div>
                </span>
                {/* Search */}
                <div className="w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <input
                            type="text"
                            className="border-2 px-4 py-2 rounded-md w-full"
                            placeholder="Enter Hotel Name..."
                            // value={searchValue}
                            // onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </div>
                </div>
                {/* Search */}

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Book Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Feature
                                </th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {(searchResults || currentBooks).map((book: {
                                _id: any,
                                imageUrls: any,
                                title: any,
                                description: any,
                                price: any,
                                stock: any,
                                categoryId: any,
                                authorId: any
                            }) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={book.imageUrls[0]} className="w-20 h-24" alt="" />
                                    </th>
                                    <td className="px-6 py-4">
                                        {book.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.authorId?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.categoryId?.name}
                                    </td>
                                    <td className="px-5 py-4 whitespace-nowrap break-words max-w-[100px] max-h-[100px] overflow-hidden text-ellipsis">
                                        {book.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        ${book.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.stock}
                                    </td>
                                    <td className="flex flex-row px-6 py-10">
                                        <Link
                                            to={`/books/edit/${book._id}`}
                                        >
                                            <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg">
                                                Update
                                            </button>
                                        </Link>
                                        <button className="w-16 h-10 p-1 bg-red-600 text-white text-sm font-bold hover:bg-red-500 hover:text-gray-200 mx-1 rounded-lg"
                                            onClick={(event) => handleDelete(event, book._id)}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody> */}
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                    <div className="m-4">
                        <button
                            // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            // disabled={currentPage === 1}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Previous
                        </button>
                        <span className="mx-2">Page {"currentPage"} of {"totalPages"}</span>
                        <button
                            // onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            // disabled={currentPage === totalPages}
                            className="bg-gray-300 p-2 rounded disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}