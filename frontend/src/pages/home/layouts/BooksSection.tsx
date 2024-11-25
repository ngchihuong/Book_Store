
import { Link } from "react-router-dom";
import { PiCaretDownBold } from "react-icons/pi";
import BookRow from "@/components/BookRow";
import * as bookApiClient from "@/api/bookApiClient"
import { useQuery } from "react-query";

type SeeAllType = {
    href: string
    bottom?: boolean
}

const SeeAll = ({ href, bottom = false }: SeeAllType) => (
    <Link
        to={href}
        className={`${bottom ? "flex" : "hidden md:flex"
            } items-center font-sans font-medium`}
    >
        See All
        <PiCaretDownBold className="-rotate-90 scale-75" />
    </Link>
)
export default function BooksSection() {

    const { data: cateData } = useQuery(
        "fetchBookByCategory", bookApiClient.fetchBookByCategory
    )
    if (!cateData) {
        return <>Loading...</>
    }

    return (
        <>
            <div id="books" className="py-14">
                {cateData && cateData.map((category: any) => (
                    <>
                        <section className="mx-auto max-w-6xl px-4 py-6 md:px-8" key={category._id}>
                            <div className="flex items-baseline justify-between mb-5">
                                <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl">
                                    {category.name}
                                </h2>
                                <SeeAll href={`/categories/${category._id}`} />
                            </div>
                            {category.books.length === 0
                                ? <div className="text-gray-600">{category.name} is updating...!</div>
                                : <BookRow books={category.books} />
                            }

                            <div className="mt-8 flex items-center justify-center md:hidden">
                                <SeeAll href={`/categories/${category._id}`} bottom />
                            </div>
                        </section>
                    </>
                ))}

            </div>
        </>
    )
}