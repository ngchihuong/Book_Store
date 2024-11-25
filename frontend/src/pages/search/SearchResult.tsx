import { useAppContext } from "@/contexts/AppContext";
import { addProduct } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { FaBook, FaBookmark } from "react-icons/fa";
import { IoIdCardSharp } from "react-icons/io5";
import { PiMoneyWavyFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

export default function SearchResult() {
    const dispatch = useDispatch();
    const { showToast } = useAppContext()
    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchParams] = useSearchParams();
    const [searchResult, setSearchResult] = useState([]);

    const bookPerPage = 10;
    const key = searchParams.get("key") || ""; // Lấy từ khóa từ URL


    useEffect(() => {
        const fetchResults = async () => {
            try {
                if (!key.trim()) return;

                const params = new URLSearchParams({ key, limit: "10" }).toString();
                const response = await fetch(`http://localhost:5005/api/books/search?${params}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSearchResult(data); // Cập nhật kết quả tìm kiếm
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchResults();
    }, [key]);
    const totalPages = Math.ceil(searchResult.length / bookPerPage);
    console.log(totalPages);

    return (
        <>
            <main className="mx-auto w-full max-w-6xl px-4 py-2 md:px-8">
                <h1 className="font-serif text-2xl font-semibold capitalize text-start">
                    Search Result For <span className="text-4xl px-5 text-green-600 italic">{key}</span>
                </h1>
                <div>

                    <div className="my-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5">
                        {searchResult.length > 0 ? (
                            <>
                                {searchResult.map((book: any) => {
                                    const isProductInCart = CartProducts.some((item) => item.id === book._id);
                                    return (
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
                                            </div>
                                        </article>
                                    )
                                })}
                            </>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </div>
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
            </main>
        </>
    )
}