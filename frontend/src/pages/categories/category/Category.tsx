import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import * as bookApiClient from "@/api/bookApiClient";
import * as cateApiClient from "@/api/categoryApiClient"
import { useState } from "react";
import { FaBook, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "@/contexts/AppContext";
import { RootState } from "@/redux/store";
import { addProduct } from "@/redux/slice/cartSlice";
import { PiMoneyWavyFill } from "react-icons/pi";
import { IoIdCardSharp } from "react-icons/io5";

export default function Category() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const categoryId = useParams();

    const dispatch = useDispatch();
    const { showToast } = useAppContext()

    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
    const bookPerPage = 10;
    const { data: cateIdData } = useQuery(
        ["fetchCategoryById", categoryId.category], () => cateApiClient.fetchCategoryById(categoryId.category || ""),
        {
            enabled: !!categoryId
        }
    )
    const { data: cateData } = useQuery(
        ["fetchBookByCategoryId", categoryId.category], () => bookApiClient.fetchBookByCategoryId(categoryId.category || ""),
        {
            enabled: !!categoryId
        }
    )
    if (!cateData || !cateIdData) {
        return <>
            <div className="flex justify-center items-center text-xl h-48 text-gray-800">
                <h6 className="text-gray-700 font-bold text-sans mx-1">Category</h6> is updating...!
            </div>
        </>
    }

    const totalPages = Math.ceil(cateData.length / bookPerPage);

    return (
        <>
            <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
                <h1 className="font-serif text-2xl font-semibold capitalize text-center">
                    {cateIdData?.name}
                </h1>
                <div>
                    <div className="my-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5">
                        {cateData && cateData.map((book: any) => {
                            const isProductInCart = CartProducts.some((item) => item.id === book._id);

                            return (
                                <>
                                    {book.length < 1
                                        ? <div className="text-gray-600"> is updating...!</div>
                                        : <>
                                            <article className={`flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg ${"className"}`}>
                                                <Link
                                                    to={`/item/${book._id}`}
                                                    title={"title"}
                                                    className={`image-wrapper rounded border-2 border-gray-100 bg-gray-100 p-4 sm:p-8 md:p-4`}
                                                >
                                                    <div className="relative h-48 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
                                                        <img src={book.imageUrls[0]} alt={"title"}
                                                            className="object-contain w-full 50vw sm:min-w-[33vw] md:min-w-[25vw] lg:min-w-[20vw]"
                                                        />
                                                    </div>
                                                </Link>
                                                <Link
                                                    to={`/item/${book._id}`}
                                                    className="text-link font-medium flex items-center italic line-clamp-2
                                hover:underline
                                "
                                                >
                                                    <header className="h-10 flex items-center gap-x-1 line-clamp-2">
                                                        <FaBook />
                                                        <h3 className="text-md ">{book.title}</h3>
                                                    </header>
                                                </Link>
                                                <div className="price flex items-center font-medium">
                                                    <FaBookmark className="font-bold mr-1" />
                                                    <span>{book.categoryId.name}</span>
                                                </div>
                                                <div className="price flex items-center gap-x-1 font-medium">
                                                    <IoIdCardSharp />
                                                    <span>{book.authorId.name}</span>
                                                </div>
                                                <div className="price mb-1 flex items-center gap-x-1 font-medium">
                                                    <span><PiMoneyWavyFill /> </span>
                                                    <span>${book.price}</span>
                                                </div>
                                                <div className="buttons flex gap-x-2">
                                                    <button type="button"
                                                        onClick={() => {
                                                            dispatch(addProduct({
                                                                id: book._id,
                                                                title: book.title,
                                                                categoryId: book.categoryId.name,
                                                                authorId: book.authorId.name,
                                                                price: book.price,
                                                                description: book.description,
                                                                stock: book.stock,
                                                                imageUrls: book.imageUrls,
                                                            }))
                                                            showToast({ message: "Add to cart successful!", type: "SUCCESS" })
                                                        }}
                                                        className="border-spacing-10 bg-gray-700 text-white flex-1 rounded
                                     py-2 px-1 text-md font-semibold hover:bg-gray-900 hover:text-gray-300
                                     disabled:bg-gray-400"
                                                        disabled={isProductInCart}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                    {/* <button type="button" className="border-2 flex-[1/4] rounded py-1 px-2">
                                    <FaHeart
                                        className={`text-gray-400 text-2xl`}
                                    />
                                </button> */}
                                                </div>
                                            </article>
                                        </>
                                    }

                                </>
                            )
                        })}
                    </div>
                    <div className="my-10 flex flex-col items-center gap-y-2 lg:flex row lg:justify-between">
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
                </div>

            </main>
        </>
    )
}