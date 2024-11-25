import CheckoutButton from "@/components/CheckoutButton";
import { decreaseStock, deleteProduct, increaseStock } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";
import { Empty } from "antd";
import { CiSquareRemove } from "react-icons/ci";
import { IoAdd } from "react-icons/io5";
import { PiCaretDownBold } from "react-icons/pi";
import { RiSubtractLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as bookApiClient from "@/api/bookApiClient";
import { useQuery } from "react-query";


export default function CartItemSection() {
    const dispatch = useDispatch();

    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);

    const { data: productDetails } = useQuery(
        // Truy vấn thông tin sản phẩm từ backend
        ['productDetails', CartProducts.map(product => product.id)],
        async () => {
            // Fetch tất cả các sản phẩm từ backend
            return Promise.all(
                CartProducts.map(product => bookApiClient.fetchBookById(product.id))
            );
        },
        {
            enabled: CartProducts.length > 0, // Chỉ thực hiện truy vấn nếu giỏ hàng có sản phẩm
        }
    );
    const totalPrice = CartProducts.reduce((total, cart) => {
        return total + (cart.price * cart.stock);
    }, 0);
    return (
        <>
            <section className="md:flex-col mb-20 lg:mb-auto">
                <h1 className="font-serif text-xl font-semibold md:text-2xl md:p-1 px-3">My Cart</h1>
                <div className="my-4 lg:grid lg:grid-cols-3 lg:gap-x-6 md:w-[90vw] lxl:w-[73vw]">
                    <div className="table-wrapper lg:col-span-2">
                        <div className="lg:min-h-[20.25rem]">
                            <table className="w-full">
                                <thead className="hidden bg-gray-100 font-sans font-semibold md:table-header-group">
                                    <tr>
                                        <th colSpan={2} className="w-[42.5%] py-1 px-1">
                                            Book Title
                                        </th>
                                        <th className="w-[17.5%] py-1 md:text-right px-1 lg:px-4">Price</th>
                                        <th className="w-[17.5%] py-1 px-1 lg:px-4">Quantity</th>
                                        <th colSpan={2} className="w-[22.5%] py-1 px-1">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CartProducts.length < 1 ? (
                                        <tr>
                                            <td colSpan={6} className="h-64 w-full text-center">
                                                <div className="flex flex-col items-center">
                                                    <Empty />
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        <>
                                            {CartProducts && CartProducts?.map((cart, index) => {
                                                const productDetail = productDetails ? productDetails[index] : null;

                                                return (
                                                    <>
                                                        <tr className="grid grid-cols-[auto_2fr_auto] grid-rows-[2fr_1fr_1fr_1fr] gap-x-2 border-b
                                        py-2 font-sans md:table-row">
                                                            <td className="row-span-4 w-32 md:w-20 py-2">
                                                                <div className="relative h-44 w-full md:h-44 bg-gray-300 p-4">
                                                                    <img
                                                                        src={cart.imageUrls[0]}
                                                                        className="object-contain md:py-2 w-full h-full"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="col-start-2 row-start-1 md:max-w-[10rem] md:pl-2 lg:pl-4 ">
                                                                <Link
                                                                    to={`/item/${cart.id}`}
                                                                    className="text-link font-medium italic opacity-80 line-clamp-2 
                                                                    md:!inline md:line-clamp-4 hover:underline"
                                                                >
                                                                    {cart.title}
                                                                </Link>
                                                            </td>
                                                            <td className="col-span-2 col-start-2 row-start-2 lg:px-4 md:text-right">
                                                                <span className="md:hidden">Price: </span>
                                                                <span className="font-medium">
                                                                    ${cart.price}
                                                                </span>
                                                            </td>
                                                            <td className="col-span-2 col-start-2 row-start-3 md:text-center
                                                                lg:items-center ">
                                                                <button
                                                                    type="button"
                                                                    title="Reduce Quantity"
                                                                    className={`rounded border-2 border-green-600 bg-gray-100 px-1 py-1  text-xl disabled:bg-gray-300 disabled:text-white disabled:border-gray-400 leading-none`}
                                                                    onClick={() => {
                                                                        dispatch(decreaseStock(cart.id))
                                                                    }}
                                                                    disabled={cart.stock <= 1}
                                                                >
                                                                    <RiSubtractLine />
                                                                </button>
                                                                <span className="mx-2 text-lg inline-block w-5 text-center py-2">
                                                                    {cart.stock}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    title="Reduce Quantity"
                                                                    className="rounded border-2 border-green-600 bg-gray-100 px-1 py-1  
                                                                    text-xl leading-none disabled:bg-gray-300 disabled:text-white disabled:border-gray-400"
                                                                    onClick={() => {
                                                                        dispatch(increaseStock(cart.id))
                                                                    }}
                                                                    disabled={cart?.stock == productDetail?.stock}
                                                                >
                                                                    <IoAdd />
                                                                </button>
                                                            </td>
                                                            <td className="col-span-2 col-start-2 row-start-4 md:max-w-[5rem] lg:px-6 md:text-right lg:text-center">
                                                                <span className="md:hidden">Total: </span>
                                                                <span className="inline-block w-28 text-lg font-medium">
                                                                    ${cart.price * cart.stock}
                                                                </span>
                                                            </td>
                                                            <td className="col-span-1 col-start-3 row-span-1 row-start-1 md:text-center lg:px-2">
                                                                <button
                                                                    title="Remove"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        dispatch(deleteProduct(cart))
                                                                    }}
                                                                >
                                                                    <CiSquareRemove className="text-4xl lg:text-3xl lg:mt-1 stroke-black hover:stroke-2" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })}
                                        </>
                                    )}
                                </tbody>
                            </table>

                        </div>
                        <hr />
                        <Link
                            to="/"
                            className="underline hover:text-gray-800 text-gray-500 text-lg mt-4 hidden items-center font-sans lg:inline-flex"
                        >
                            <PiCaretDownBold className="rotate-90 stroke-black stroke-1" />{" "}
                            Continue Shopping
                        </Link>
                    </div>

                    <div className="others my-4 flex flex-col gap-4 lg:my-0">
                        <hr />
                        <Link
                            to="/"
                            type="button"
                            className="outline-btn-color my-2 rounded border-2 py-1 font-sans shadow hover:shadow-md lg:hidden"
                        >
                            Continue Shopping
                        </Link>
                        <div className="hidden font-sans text-lg lg:block py-10">
                            <div className="mb-4 flex items-baseline justify-between">
                                <span className="text-base">Total Price :</span>
                                <span className="font-semibold">${totalPrice}</span>
                            </div>
                            <CheckoutButton
                                includeIcon
                                className="rounded py-2 font-medium"
                                isDisabled={CartProducts.length < 1}
                            />

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}