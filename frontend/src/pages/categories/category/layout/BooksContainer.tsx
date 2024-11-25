import ItemCard from "@/components/ItemCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

export default function BooksContainer() {
    const [pageCount, setPageCount] = useState<number>(10);
    const [page, setPage] = useState<number>(2)
    return (
        <div>
            <div className="my-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5">
                <ItemCard />
            </div>
            <div className="my-10 flex flex-col items-center gap-y-2 lg:flex row lg:justify-between">
                <span className="font-sans">
                    Showing {"startItem"} ~ {"lastItem"} of {"total"}
                </span>
                <Pagination pageCount={pageCount} currentPage={page} />
            </div>
        </div>
    )
}