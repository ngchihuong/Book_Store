import { Link } from "react-router-dom";
import React, { useState } from "react";

type Props = {
    children: React.ReactNode;
}
export default function ListOrders({ children }: Props) {
    const [state, setState] = useState<string>("")
    return (
        <>
            <div className="space-y-5">
                <span className="flex justify-between pb-6">
                    <h1 className="text-3xl font-bold">List Orders</h1>
                </span>

                <div className="container">
                    <div className="grid grid-cols-4 px-20 text-2xl font-bold font-serif">
                        <Link
                            to="/list-orders"
                            onClick={() => setState("pending")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "pending" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                Pending
                            </div>
                        </Link>
                        <Link
                            to="/order-transiting"
                            onClick={() => setState("transit")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "transit" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                In Transit
                            </div>
                        </Link>
                        <Link
                            to="/order-delivered"
                            onClick={() => setState("delivered")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "delivered" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                Delivered
                            </div>
                        </Link>
                        <Link
                            to="/order-canceled"
                            onClick={() => setState("canceled")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "canceled" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                Bin
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="container relative overflow-x-auto">
                    {children}
                </div>
            </div>
        </>
    )
}