import { RootState } from "@/redux/store";
import React, { useState } from "react"
import { IoWarningOutline } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as userApiClient from "@/api/userApiClient"
import { BsTwitterX } from "react-icons/bs";
import * as orderApiClient from "@/api/orderApiClient";
import { useAppContext } from "@/contexts/AppContext";
import { clearCart } from "@/utils/cartSlice";

export default function CheckoutSection() {
    const dispatch = useDispatch();
    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
    const { showToast } = useAppContext();

    const [errorMsg, setErrorMsg] = useState<string | null>(null) // Form overall error message

    const [shippingAddress, setShippingAddress] = useState<string>("")
    const navigate = useNavigate()

    const { data: userData } = useQuery(
        "userApiClient", userApiClient.fetchCurrentUser
    )
    const mutation = useMutation(orderApiClient.insertOrder, {
        onSuccess: () => {
            showToast({ message: "Booking Successful!", type: "SUCCESS" })
            navigate("/")
        },
        onError: (error: any) => {
            showToast({ message: error.message, type: "ERROR" })
        },
    })
    if (!userData) {
        return "Loading..."
    }
    const totalPrice = CartProducts.reduce((total, cart) => {
        return total + (cart.price * cart.stock);
    }, 0)
    const totalAmout = CartProducts.reduce((sum, item) => sum + item.stock,0);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!shippingAddress) {
            setErrorMsg("Please enter address!")
            setTimeout(() => {
                setErrorMsg(null)
            }, 1000);
            return;
        }
        const orderData = {
            userId: userData._id,
            totalAmout: totalAmout,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            order_details: CartProducts?.map((item) => ({
                bookId: item.id,
                quantity: item.stock,
                price: item.price
            }))
        }
        mutation.mutate(orderData)
        dispatch(clearCart());
    }
    return (
        <>
            <section>
                <h1 className="text-center font-serif text-2xl font-semibold lg:text-3xl">
                    Checkout
                </h1>
                <p className="mb-8 text-center lg:mb-14">
                    Provide your payment and delivery address information to finalize your
                    order.
                </p>
                <form onSubmit={handleSubmit}
                    className="my-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-5 lg:gap-x-10"
                >
                    <div className="md:col-span-1 lg:col-span-3">
                        <h2 className="text-xl font-bold">Billing Details</h2>

                        <div className="mt-4">
                            <div className="mb-4">
                                <label className="font-sans font-medium">
                                    Name
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={userData?.firstName + " " + userData?.lastName}
                                        readOnly
                                        disabled
                                        className="my-1 block w-full rounded border-2 border-skin-gray bg-skin-base py-1 px-2 font-normal outline-skin-accent"
                                    />
                                </label>

                            </div>

                            <div className="mb-4">
                                <label className="font-sans font-medium">
                                    Email Address
                                    <input
                                        type="email"
                                        value={userData?.email}
                                        readOnly
                                        disabled
                                        className="my-1 block w-full rounded border-2 border-skin-gray bg-skin-base py-1 px-2 font-normal outline-skin-accent"
                                    />
                                </label>

                            </div>

                            <div className="mb-4">
                                <label className="font-sans font-medium">
                                    Phone
                                    <input
                                        type="tel"
                                        value={userData?.phoneNumber}
                                        readOnly
                                        disabled
                                        className="my-1 block w-full rounded border-2 border-skin-gray bg-skin-base py-1 px-2 font-normal outline-skin-accent"
                                    />
                                </label>

                            </div>

                            <div className="mb-2">
                                <label className="font-sans font-medium">
                                    Address
                                    <textarea
                                        placeholder="No (27), 11 M, Hledan, Yangon"
                                        rows={4}
                                        value={shippingAddress}
                                        onChange={(event) => {
                                            setShippingAddress(event.target.value)
                                        }}
                                        className="my-1 block w-full rounded border-2 border-gray-100 
                                        bg-gray-100 py-1 px-2 font-normal outline-[#53CAB5]"
                                    />
                                </label>
                                {errorMsg && (
                                    <div className="border-rose-600 stroke-rose-600 text-rose-600 flex flex-row gap-x-2 items-center">
                                        <IoWarningOutline className="stroke-2 text-xl" />
                                        {errorMsg}
                                    </div>
                                )}
                            </div>
                        </div>
                        <hr />
                        <Link
                            to="/cart"
                            className="text-link mt-4 hidden items-center text-gray-600 hover:text-green-500 font-sans underline-offset-8 md:inline-flex"
                        >
                            <PiCaretDownBold className="rotate-90 stroke-skin-dark stroke-1" />{" "}
                            Return to Cart
                        </Link>
                    </div>

                    {/* ===== Order Summary Section ===== */}
                    <div className="my-4 flex flex-col gap-3 rounded bg-gray-100 p-4 md:col-span-1 md:p-6 
                    lg:col-span-2 lg:my-0 lg:p-8">
                        <h2 className="text-center text-lg font-semibold">Order Summary</h2>
                        <div className="flex justify-between font-semibold">
                            <span>Item</span>
                            <span>Subtotal</span>
                        </div>
                        <hr />
                        {/* Cart Items */}
                        {CartProducts?.map((item) => (
                            <div className="flex  items-center justify-between">
                                <div className="flex flex-row items-center  gap-x-2 text-lg max-w-[70%]">
                                    {item.title}{" "}
                                    <BsTwitterX />
                                    <span className="font-light">  {item.stock}</span>
                                </div>
                                <span>${item.price * item.stock}</span>
                            </div>
                        ))}

                        <hr />

                        {/* Total */}
                        <div className="flex items-center justify-between md:mt-10">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-xl font-semibold">${totalPrice}</span>
                        </div>

                        <hr />
                        <button
                            type="submit"
                            className="bg-gray-800 text-gray-100 focus-within:bg-opacity-90 
                            focus-within:text-[#53cab5] hover:bg-opacity-80 active:bg-opacity-90 rounded 
                            border-2 border-gray-800 py-2 font-sans font-semibold md:mt-5"
                        // onClick={() => dispatch(deleteProduct())}
                       >
                            Place Order
                        </button>
                        <Link
                            to={`/cart`}
                            className="border-gray-800 text-gray-800 hover:bg-gray-100 
                            rounded border-2 py-2 text-center font-sans font-semibold shadow hover:shadow-md 
                            md:hidden"
                        >
                            Return to Cart
                        </Link>
                    </div>
                </form >
            </section>
        </>
    )
}