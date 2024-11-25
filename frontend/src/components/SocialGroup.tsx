import { CiMail } from "react-icons/ci"
import { FaInstagram } from "react-icons/fa"
import { LiaTelegram } from "react-icons/lia"
import { LuFacebook } from "react-icons/lu"
import { Link } from "react-router-dom"

type Props = {
  className?: string
  placeBottom?: boolean
}

const SocialGroup = ({ className = "", placeBottom = false }: Props) => {
  return (
    <ul
      className={`${className} flex justify-center gap-x-4 py-2 ${placeBottom ? "mt-auto mb-0" : ""
        }`}
    >
      {socialData.map(({ id, title, href, icon }) => (
        <li key={id}>
          <Link
            to={href}
            title={title}
            className="rounded  bg-gray-200 bg-opacity-0 p-2 hover:bg-opacity-30"
          >
            {icon}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const socialData = [
  {
    id: 1,
    title: "Follow NextBookstore on Facebook",
    href: "https://fb.com/satnaing.dev",
    icon: (
      <LuFacebook className="bg-gray-100 text-2xl mx-2 opacity-80 hover:opacity-100 hover:bg-gray-400" />
    ),
  },
  {
    id: 2,
    title: "Follow NextBookstore on Instagram",
    href: "https://ig.com/satnaing.dev",
    icon: (
      <FaInstagram className="bg-gray-100 text-2xl mx-2 opacity-80 hover:opacity-100 hover:bg-gray-400" />
    ),
  },
  {
    id: 3,
    title: "Join NextBookstore Telegram channel",
    href: "https://telegram.com/satnaing.dev",
    icon: (
      <LiaTelegram className="bg-gray-100 text-2xl mx-2  opacity-80 hover:opacity-100 hover:bg-gray-400" />
    ),
  },
  {
    id: 4,
    title: "Send NextBookstore an Email",
    href: "mailto:contact@satnaing.dev",
    icon: (
      <CiMail className="bg-gray-100 text-2xl mx-2  opacity-80 hover:opacity-100 hover:bg-gray-400" />
    ),
  },
]

export default SocialGroup
