
import { FaRegUser } from "react-icons/fa";

type Position = "top" | "top-only" | "main" | "main-mobile"

type NavLinks = {
  name: string
  href: string
  icon: JSX.Element | null
  position: Position
}[]

const navLinks: NavLinks = [
  {
    name: "About Us",
    href: "/about-us",
    icon: null,
    position: "top",
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: null,
    position: "top",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
    icon: null,
    position: "top-only",
  },
  {
    name: "Account",
    href: "/account",
    icon: <FaRegUser />,
    position: "main",
  },
]

export default navLinks
