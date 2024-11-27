import { Link } from "react-router-dom";
import { FaBook, FaBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/slice/cartSlice'
import { IoIdCardSharp } from "react-icons/io5";
import { PiMoneyWavyFill } from "react-icons/pi";
import { useAppContext } from "@/contexts/AppContext";
import { RootState } from "@/redux/store";

type BookProps = {
    _id: string;
    title: string;
    authorId: string;
    description: string;
    price: number;
    stock: number;
    imageUrls: string[];
}
type Props = {
    books: BookProps[];
}
export default function BookRow(props: Props) {
    const dispatch = useDispatch();
    const { showToast } = useAppContext()

    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);


    const fiveBook = props.books.slice(0, 5) || [];


    return (
        <>
            <div className="my-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5">
                {fiveBook.map((book: any) => {
                    const isProductInCart = CartProducts.some((item) => item.id === book._id);

                    return (
                        <article key={book.id} className={`flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg ${"className"}`}>
                            <Link
                                to={`/item/${book._id}`}
                                title={"title"}
                                className={`image-wrapper rounded border-2 border-gray-100 bg-gray-100 p-4 sm:p-8 md:p-4`}
                            >
                                <div className="relative h-48 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
                                    <img src={book.imageUrls[0]} alt={"title"}
                                        className="object-contain py-1 sm:w-[20vw] w-[50vw] h-full"
                                    />
                                </div>
                            </Link>
                            <div className="content px-4 pb-4">
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
                            </div>
                        </article>
                    )
                })}
            </div>
        </>
    )
}