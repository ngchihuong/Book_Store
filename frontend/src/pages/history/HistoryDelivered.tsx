import { Link } from "react-router-dom";
import * as orderApiClient from "@/api/orderApiClient"
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function HistoryDelivered() {
    const [currentPage, setCurrentPage] = useState(1);

    const orderPerPage = 6;
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const { data: orderData } = useQuery(
        "fetchOrdersDeliveredForUser", orderApiClient.fetchOrdersDeliveredForUser
    )
    const { mutate: updateToCanceled, isLoading: isUpdateToCanceled } = useMutation(
        ({ id }: { id: string }) => orderApiClient.updateStatusPendingToCanceled(id),
        {
            onSuccess: () => {
                queryClient.clear()
                showToast({ message: "Delete Successful!", type: "SUCCESS" })
            },
            onError: (error: Error) => {
                showToast({ message: error.message, type: "ERROR" })
            }
        }
    )
    if (!orderData || (Array.isArray(orderData) && orderData.length === 0)) {
        return <div className="px-20 text-center font-bold text-xl">Order Not Found!</div>
    }

    const handleUpdateToCanceled = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        event.preventDefault();
        const isConfirm = window.confirm("Confirm delete!")
        if (isConfirm) {
            updateToCanceled({ id })
        }
    }
    console.log(orderData);

    const totalPages = Math.ceil(orderData.length / orderPerPage);
    const indexOfLastOrder = currentPage * orderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
    const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
    return (
        <>
            <div className="hidden lg:block">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Order Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Features
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {(currentOrders).map((order: any) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order._id}
                                </th>
                                <td className="px-6 py-4">
                                    {order.userId.firstName + " " + order.userId.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {order.shippingAddress}
                                </td>
                                <td className="px-6 py-4 uppercase">
                                    {order.status === "delivered" ? "Delivered" : "Delivered"}
                                </td>
                                <td className="flex flex-row px-6 py-10">
                                    <Link
                                        to={`/history-detail/${order._id}`}
                                    >
                                        <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg">
                                            Detail
                                        </button>
                                    </Link>
                                    <button className="w-20 h-10 p-1 bg-red-600 text-white text-sm font-bold hover:bg-red-500 hover:text-gray-200 mx-1 rounded-lg"
                                        onClick={(event) => handleUpdateToCanceled(event, order._id)}
                                    >
                                        {isUpdateToCanceled ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
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
            <div className="block lg:hidden">
            <div className="flex flex-col gap-4">
            {currentOrders.map((order: any) => (
                <div
                    key={order._id}
                    className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                    <p className="font-bold text-gray-900 dark:text-white">Order Code: {order._id}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Name: {order.userId.firstName + " " + order.userId.lastName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Address: {order.shippingAddress}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                        Status: {order.status === "delivered" ? "Delivered" : "Delivered"}
                    </p>
                    <div className="flex justify-end mt-4 gap-2">
                        <Link to={`/history-detail/${order._id}`}>
                            <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 hover:text-gray-200 rounded-lg">
                                Detail
                            </button>
                        </Link>
                        <button
                            className="w-16 h-10 p-1 bg-red-600 text-white text-sm font-bold hover:bg-red-500 hover:text-gray-200 rounded-lg"
                            onClick={(event) => handleUpdateToCanceled(event, order._id)}
                        >
                            {isUpdateToCanceled ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Cancel"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
            </div>
        </>
    )
}