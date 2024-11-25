import ItemCard from "@/components/ItemCard";
import { useState } from "react"

export default function RelatedBooks() {
    const [isLoading, setisLoading] = useState<boolean>(false)
    const [isError, setisError] = useState<boolean>(false);

    return (
        <>
            <div className="my-12">
                <h2 className="mb-8 font-serif text-2xl font-bold">Related Books</h2>
                {/* {isLoading || isError ? (
                    <CardSkeletons num={5} />
                ) : ( */}
                <div className="my-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5">
                    {/* {relatedBooks?.map(({ id, attributes }) => {
                            const { slug, price, title, image } = attributes */}
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    <ItemCard/>
                    {/* // })} */}
                </div>
                {/* )} */}
            </div>
        </>
    )
}