import { Link } from "react-router-dom";
import React, { useState } from "react";

type Props = {
    children: React.ReactNode;
}
export default function History({ children }: Props) {
    const [state, setState] = useState<string>("")
    return (
        <>
            <div className="space-y-5">
                <span className="flex justify-between pb-6">
                    <h1 className="text-3xl font-bold">History</h1>
                </span>

                <div className="container">
                    <div className="grid lg:grid-cols-3 px-20 text-2xl font-bold font-serif">
                        <Link
                            to="/history"
                            onClick={() => setState("pending")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "pending" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                Pending
                            </div>
                        </Link>
                        <Link
                            to="/history-order-transiting"
                            onClick={() => setState("transit")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "transit" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                In Transit
                            </div>
                        </Link>
                        <Link
                            to="/history-order-delivered"
                            onClick={() => setState("delivered")}
                            className={`border-2 border-green-600 flex-1 py-2 ${state === "delivered" ? "bg-gray-700 text-green-600" : ""}`}>
                            <div className="px-5 text-center hover:text-3xl hover:text-green-600">
                                Delivered
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