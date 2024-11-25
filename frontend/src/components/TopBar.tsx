import navLinks from "@/utils/navLinks";
import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <>
            <div className="hidden bg-gray-100 text-gray-700 md:block">
                <div className="max-width flex items-center justify-between text-sm px-40 py-1 bg-gray-200">
                    <span className="text-md font-sans font-semibold opacity-50 cursor-pointer hover:opacity-100">
                        Welcome to BookMoon! Have good a day!
                    </span>
                    <ul className="flex gap-x-2">
                        {navLinks.filter(nav => ["top"].includes(nav.position))
                            .map(nav => (
                                <li key={nav.name}>
                                    <Link to={nav.href}
                                        className="flex items-center gap-x-2 px-1 font-serif opacity-75 hover:opacity-100"
                                    >
                                        {nav.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}