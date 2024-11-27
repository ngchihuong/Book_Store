import { FaPhoneFlip } from "react-icons/fa6";
import { GiBookshelf } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import * as orderApiClient from "@/api/orderApiClient";
import { useQuery } from "react-query";
import { FaCartPlus, FaMoneyBillWave, FaUser } from "react-icons/fa";

export default function HistoryDetail() {
    const { id } = useParams();

    const { data: orderData } = useQuery(
        ["fetchOrderById", id], () => orderApiClient.fetchOrderById(id || "")
    )
    if (!orderData) {
        return <div className="text-center font-bold text-xl">Order Not Found!</div>
    }
    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending":
                return "Pending Shipment";
            case "in_transit":
                return "In Transit";
            case "delivered":
                return "Delivered";
            case "canceled":
                return "Bin";
            default:
                return status; // Để đảm bảo không có trạng thái nào bị bỏ qua
        }
    };
    console.log(orderData);

    return (
        <div className="mx-2 md:mx-0 md:container py-5 bg-gray-100">
            <div className="pb-2 flex gap-x-2 text-center items-center text-xl font-bold font-serif">
                <h1 className=" text-4xl">Order </h1>#{orderData._id}
            </div>
            <div className="py-2">
                <p className="flex items-center gap-x-1 text-xl pb-1">
                    <FaUser />
                    <strong>Customer:</strong> {orderData.userId.firstName + " " + orderData.userId.lastName}
                </p>
                <p className="flex items-center gap-x-1 text-xl pb-1">
                    <MdEmail />
                    <strong>Email:</strong> {orderData.userId.email}
                </p>
                <p className="flex items-center gap-x-1 text-xl pb-1">
                    <FaPhoneFlip />
                    <strong>Phone Number:</strong> {orderData.userId.phoneNumber}
                </p>
                <p className="flex items-center gap-x-1 text-xl pb-1">
                    <IoMdHome />
                    <strong>Shipping Adddress:</strong> {orderData.shippingAddress}
                </p>
                <p className="flex items-center gap-x-1 text-xl pb-1">
                    <FaCartPlus />
                    <strong>Status:</strong> {getStatusLabel(orderData.status)}
                </p>
            </div>

            <table className="border-t-4 border-x-4 border-gray-500 w-full mt-6">
                <thead>
                    <tr className="text-xl">
                        <th className="px-1 py-2 border-x-2 border-gray-500">Books</th>
                        <th className="px-1 py-2 border-x-2 border-gray-500">Quantity</th>
                        <th className="px-1 py-2 border-x-2 border-gray-500">Price</th>
                        <th className="px-1 py-2 border-x-2 border-gray-500">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="border-4 border-gray-500">
                    {orderData?.orderDetails.map((order:any) => (
                        <tr key={order._id}
                            className="border-y-4 border-gray-500"
                        >
                            <td className="px-1 py-2 border-x-2 border-gray-500">{order.bookId.title}</td>
                            <td className="px-1 py-2 border-x-2 border-gray-500">{order.quantity}</td>
                            <td className="px-1 py-2 border-x-2 border-gray-500">${order.bookId.price}</td>
                            <td className="px-1 py-2 border-x-2 border-gray-500">${order.quantity * order.bookId.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-8">
                <p className="flex items-center gap-x-1 text-3xl pb-1">
                    <GiBookshelf />
                    <strong>Total Books: </strong> {orderData.totalAmout}
                </p>
                <p className="flex items-center gap-x-1 text-3xl pb-1">
                    <FaMoneyBillWave />
                    <strong>Total Price:</strong> ${orderData.totalPrice}
                </p>
            </div>
        </div>
    );
    // }
}