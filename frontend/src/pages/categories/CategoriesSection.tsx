import BookRow from "@/components/BookRow"
import { PiCaretDoubleDownBold } from "react-icons/pi"
import { Link } from "react-router-dom"

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
        <PiCaretDoubleDownBold className="-rotate-90 scale-75" />
    </Link>
)
export default function CategoriesSection() {

    return (
        <>
            <section className="pb-6">
                <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl my-5">
                        Name
                    </h2>
                    <SeeAll href={`/categories/${"slug"}`} />
                </div>
                <BookRow />
                <div className="mt-8 flex items-center justify-center md:hidden">
                    <SeeAll href={`/categories/${"slug"}`} bottom />
                </div>
            </section>
            <section className="pb-6">
                <div className="flex items-baseline justify-between">
                    <h2 className="font-serif text-2xl font-medium capitalize md:text-2xl my-5">
                        Name
                    </h2>
                    <SeeAll href={`/categories/${"slug"}`} />
                </div>
                <BookRow />
                <div className="mt-8 flex items-center justify-center md:hidden">
                    <SeeAll href={`/categories/${"slug"}`} bottom />
                </div>
            </section>
        </>
    )
}