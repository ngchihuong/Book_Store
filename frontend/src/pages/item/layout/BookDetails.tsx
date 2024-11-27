import ReactMarkdown from "react-markdown"
import { useParams } from "react-router-dom"
import SocialGroup from "@/components/SocialGroup";
import { Image } from "antd";
import { useQuery } from "react-query";
import * as bookApiClient from "@/api/bookApiClient";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { FaBook, FaBookmark } from "react-icons/fa";
import { IoIdCardSharp } from "react-icons/io5";
import { PiMoneyWavyFill } from "react-icons/pi";
import { useAppContext } from "@/contexts/AppContext";
import { addProduct } from "@/redux/slice/cartSlice";
import { RootState } from "@/redux/store";

export default function BookDetails() {
    const dispatch = useDispatch();
    const { showToast } = useAppContext();
    const CartProducts = useSelector((state: RootState) => state.cart.CartArr);

    const { id } = useParams();

    const { data: bookData } = useQuery(
        ["fetchBookById", id], () => bookApiClient.fetchBookById(id || ""),
        {
            enabled: !!id
        }
    )

    if (!bookData) {
        return <>
            <div className="flex justify-center items-center animate-spin duration-50 text-4xl h-48 text-gray-800">
                <AiOutlineLoading3Quarters />
            </div>
        </>
    }

    const isProductInCart = CartProducts?.some((item) => item.id === bookData._id);


    return (
        <>
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:gap-10 lg:gap-16">
                <div className="mx-auto w-full max-w-[20rem] rounded bg-gray-100 p-8 md:w-[40%]
                md:max-w-none md:self-start md:p-8 lg:p-16">
                    <div className="flex flex-col">
                        <div className="relative h-72 w-full overflow-hidden transition-transform duration-500
                     hover:scale-110 md:h-80 xl:h-96 border-b my-1">
                            <img src={bookData?.imageUrls[0]}
                                alt=""
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-row gap-x-1 py-1">
                            {bookData?.imageUrls.map((img: string, index: number) => (
                                <Image
                                    key={index}
                                    width={100} // Hiển thị ảnh với chiều rộng cố định
                                    height={100} // Hiển thị ảnh với chiều cao cố định
                                    style={{ objectFit: "cover" }} // Đảm bảo ảnh vừa với khung mà không bị méo
                                    src={img}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:w-[60%]">
                    <div className="flex items-center text-2xl gap-x-1">
                        <FaBook className="text-3xl" />
                        <h1 className="text-3xl font-bold md:text-5xl">
                            {bookData?.title}
                        </h1>
                    </div>
                    <div className="my-2 flex items-center gap-x-1 w-80 xs:w-96 xl:w-full md:my-4">
                        {/* <FaBookmark /> */}
                        <ReactMarkdown className="whitespace-pre-wrap break-words overflow-wrap-anywhere">
                            {bookData?.description}
                        </ReactMarkdown>
                    </div>

                    <hr className="my-4 md:my-6" />
                    <div className="grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-y-4 lg:grid-cols-4 py-6">
                        <div className="md:col-span-2 lg:col-span-3 flex items-center text-2xl gap-x-1">
                            <FaBookmark />
                            {bookData?.categoryId.name}
                        </div>

                        <div className="md:col-span-2 lg:col-span-3 flex items-center text-2xl gap-x-1">
                            <IoIdCardSharp />
                            {bookData?.authorId.name}
                        </div>
                        <div className="md:col-span-2 lg:col-span-3 flex items-center text-2xl gap-x-1">
                            <PiMoneyWavyFill />
                            <b>${bookData?.price}</b>

                        </div>
                        <div className="md:col-span-2 lg:col-span-3 flex items-center text-2xl gap-x-1">
                            <i>
                                {bookData?.stock ? " In Stock" : "Waiting update quantity...!"}
                            </i>
                        </div>
                    </div>

                    <div className="my-6 flex flex-col-reverse gap-4 md:flex-row md:gap-8">
                        <button
                            type="button"
                            className="bg-gray-800 text-white hover:bg-gray-500 flex w-auto min-w-[90%] disabled:bg-gray-400
                            items-center justify-center gap-x-4 rounded py-2 text-center text-lg font-medium"
                            onClick={() => {
                                dispatch(addProduct({
                                    id: bookData._id,
                                    title: bookData.title,
                                    categoryId: bookData.categoryId.name,
                                    authorId: bookData.authorId.name,
                                    price: bookData.price,
                                    description: bookData.description,
                                    stock: bookData.stock,
                                    imageUrls: bookData.imageUrls,
                                }))
                                showToast({ message: "Add to cart successful!", type: "SUCCESS" })
                            }}
                            disabled={isProductInCart}
                        >
                            Add To Cart
                        </button>
                    </div>
                    <SocialGroup className="!justify-start" />
                </div>
            </div>
        </>
    )
}