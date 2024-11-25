import { Dropdown, Empty, MenuProps, Space } from "antd";
import { GrCart } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoIdCardSharp } from "react-icons/io5";
import { deleteProduct } from "@/redux/slice/cartSlice";
import { FaBook, FaBookmark } from "react-icons/fa";
import { PiMoneyWavyFill } from "react-icons/pi";

export default function CartDropdown() {
    const dispatch = useDispatch();
    const CartProducts = useSelector((state: RootState) => state.cart.CartArr)


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="top-14 right-0 rounded-sm border border-gray-100
                bg-gray-100 p-4 shadow-lg
                ">
                    <div className="mb-4 text-center font-serif text-base font-semibold">
                        My Shopping Cart
                    </div>

                    <div className="mb-4 max-h-80 overflow-y-auto">
                        {CartProducts.length < 1 ? (
                            <div className="flex h-36 items-center justify-center">
                                <div className="mx-3 flex w-64 flex-col items-center">
                                    <Empty className="h-12 w-12" />
                                    <span className="text-center text-yellow-800 text-xl font-bold font-sans opacity-100">
                                        Cart is empty!
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ul>
                                    {CartProducts && CartProducts?.map((cart) => (
                                        <li className="grid grid-cols-[auto_2fr_auto] grid-rows-[2fr_1fr_1fr] gap-x-2 border-b py-2 font-sans text-sm">
                                            <div className="row-span-4 w-24">
                                                <Link
                                                    to={`/item/${cart.id}`}
                                                    className="relative inline-block h-32 w-full"
                                                >
                                                    <img
                                                        src={cart.imageUrls[0]}
                                                        alt={cart.title}
                                                        className="object-contain py-1 sm:w-[20vw] w-[50vw]"
                                                        sizes="(min-width: 640px) 20vw, 50vw"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="col-start-2 row-start-1 w-36">
                                                <Link
                                                    to={`/item/${cart.id}`}
                                                    className="text-link font-medium flex items-center italic line-clamp-2"
                                                >
                                                    <FaBook /> {cart.title}
                                                </Link>
                                                <div className="flex items-center">
                                                    <FaBookmark />
                                                    {cart.categoryId}
                                                </div>
                                                <div className="flex items-center">
                                                    <IoIdCardSharp />
                                                    {cart.authorId}
                                                </div>
                                                {/* <div className="flex items-center">
                                                    <PiBooksFill />
                                                    {cart.stock}
                                                </div> */}
                                            </div>
                                            <div className="col-span-2 flex items-center col-start-2 row-start-2">
                                                <span className=""><PiMoneyWavyFill /> </span>
                                                <span className="font-medium">
                                                    ${cart.price} / books
                                                </span>
                                            </div>
                                            <div className="col-span-1 col-start-3 row-span-1 row-start-1">
                                                <button
                                                    title="Remove"
                                                    type="button"
                                                    onClick={() => dispatch(deleteProduct(cart))}
                                                >
                                                    <ImCancelCircle className="text-lg opacity-75 hover:stroke-2 hover:opacity-100" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                            </>
                        )}
                    </div>

                    <hr />
                    {/* <div className="my-2 flex items-baseline justify-between">
                        <span className="text-base">Total Price :</span>
                        <span className="text-base font-semibold">{"totalPrice"} Ks</span>
                    </div>
                    <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-base">Shipping :</span>
                        <span className="w-44 text-right font-sans text-xs italic opacity-75">
                            Taxes and shipping fee will be calculated at checkout
                        </span>
                    </div> */}
                    <div className="flex justify-between gap-x-2 text-base">
                        {/* <CheckoutButton
                            className="rounded-sm"
                            isDisabled={CartProducts.length < 1}
                        /> */}
                        <Link to={'/cart'}
                            className="bg-gray-200 text-gray-800 border-black border-2
                             w-full rounded-sm py-1 text-xl font-bold hover:text-gray-100 hover:bg-gray-600 text-center transition-colors duration-200"
                        >
                            View Information Cart
                        </Link>
                    </div>
                </div >
            ),
        },
    ];
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomCenter">
                        <div className="flex flex-row justify-center items-center gap-x-2 group">
                            <span className="group-hover:text-gray-500 text-2xl md:text-xl font-bold mr-5 ml-2 
                             md:mr-0 md:ml-0 md:flex">
                                {CartProducts.length > 0 && (
                                    <>
                                        <span
                                            aria-label={`Number of items: ${CartProducts}`}
                                            className="hidden md:rounded-full md:w-4 md:flex justify-center h-4 bg-green-300 text-xs
                                     text-gray-700 "
                                        >
                                            {CartProducts.length}
                                        </span>
                                        <div
                                            className="flex flex-row md:hidden ">
                                            <GrCart />
                                            <span
                                                className="text-xs text-gray-800 rounded-full bg-green-300 w-4 h-4 text-center">
                                                {CartProducts.length}
                                            </span>
                                        </div>
                                    </>

                                )}
                                <GrCart className="hidden md:flex" />
                            </span>
                            <span className="hidden md:flex group-hover:text-gray-500 font-sans text-lg">
                                Cart
                            </span>

                        </div>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}