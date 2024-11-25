import { PiCaretDownBold } from "react-icons/pi"
import { Link } from "react-router-dom"


type Props = {
    pageCount: number
    currentPage: number
}
export default function Pagination({ pageCount, currentPage = 1 }: Props) {
    return (
        <>
            <nav className="pagination">
                <ul className="pagination flex items-center gap-x-3 font-sans">
                    <li>
                        {currentPage < 2
                            ? (
                                <>
                                    <span className="flex cursor-not-allowed opacity-50">
                                        <PiCaretDownBold className="rotate-90 scale-90" />
                                        Previous
                                    </span>
                                </>
                            )
                            : (
                                <>
                                    <Link to={`${"pathname"}?page=${currentPage - 1}`} className="flex">
                                        <PiCaretDownBold className="rotate-90 scale-90" />
                                        Previous
                                    </Link>
                                </>
                            )
                        }
                    </li>

                    <li className="">
                        <Link
                            to={`${"slug"}`}
                            className={`
                                         "rounded-sm border border-skin-dark bg-skin-muted"
                                     px-3 py-1`}
                        >
                            <span className="sr-only">page </span>
                            {"page"}
                        </Link>
                    </li>

                    <li className="pagination__item pagination__item--next-page">
                        {currentPage < pageCount ? (
                            <Link to={`${"pathname"}?page=${currentPage + 1}`} className="flex">
                                Next <PiCaretDownBold className="-rotate-90 scale-90" />
                            </Link>
                        ) : (
                            <span className="flex cursor-not-allowed opacity-50">
                                Next <PiCaretDownBold className="-rotate-90 scale-90" />
                            </span>
                        )}
                    </li>

                </ul>
            </nav>
        </>
    )
}