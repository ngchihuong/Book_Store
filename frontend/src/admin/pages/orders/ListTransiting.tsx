import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as orderApiClient from "@/api/orderApiClient"

export default function ListTransiting() {
    const [currentPage, setCurrentPage] = useState(1);

    const orderPerPage = 6;
    const { data: orderData } = useQuery(
        "fetchOrdersTransiting", orderApiClient.fetchOrdersTransiting
    )
    if (!orderData) {
        return <div className="text-center font-bold text-xl">Order Not Found!</div>
    }
    const totalPages = Math.ceil(orderData.length / orderPerPage);
    const indexOfLastOrder = currentPage * orderPerPage;
    const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
    const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
    return (
        <>
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
                                {order.status === "in_transit" ? "In Transit ": 'in_transit'}
                            </td>
                            <td className="flex flex-row px-6 py-10">
                                <Link
                                     to={`/order-detail/${order._id}`}
                                >
                                    <button className="w-16 h-10 p-1 bg-blue-600 text-white text-sm font-bold hover:bg-blue-500 hover:text-gray-200 mx-1 rounded-lg">
                                        Detail
                                    </button>
                                </Link>

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
        </>
    )
}