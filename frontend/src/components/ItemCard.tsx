import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"

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
    book: BookProps[];
}
export default function ItemCard() {
    return (
        <>
            <article className={`flex flex-col gap-y-2 rounded font-sans shadow hover:shadow-lg ${"className"}`}>
                <Link
                    to={`/item/${"book._id"}`}
                    title={"title"}
                    className={`image-wrapper rounded border-2 border-gray-100 bg-gray-100 p-4 sm:p-8 md:p-4 lg:p-8`}
                >
                    <div className="relative h-44 w-full overflow-hidden transition-transform duration-200 hover:scale-105">
                        <img src={"props.book.imageUrls[0]"} alt={"title"}
                            className="object-contain 50vw sm:min-w-[33vw] md:min-w-[25vw] lg:min-w-[20vw]"
                        />
                    </div>
                </Link>
                <div className="content px-4 pb-4">
                    <header className="h-10 line-clamp-2">
                        <h3 className="text-sm">{"title"}</h3>
                    </header>
                    <div className="price mb-1 font-medium">
                        <span>MMK: </span>
                        <span>{"price"}</span>
                    </div>
                    <div className="buttons flex gap-x-2">
                        <button type="button" className="border-spacing-10 bg-gray-600 text-white flex-1 rounded px-1 text-sm font-semibold">
                            Add to Cart
                        </button>
                        <button type="button" className="border-2 flex-[1/4] rounded py-1 px-2">
                            <FaHeart      
                            className={`text-gray-400 text-2xl`}
                            />
                        </button>
                    </div>
                </div>
            </article>
        </>
    )
}