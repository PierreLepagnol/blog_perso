import Link from 'next/link'
import ExportedImage from "next-image-export-optimizer";
import profilePic from 'public/images/LogoPierre.png'

function Icon() {
  return (
    <ExportedImage width={25} src={profilePic} alt="Logo of the author" />
  )
}

function Logo() {
  return (
    <Link href="/" className="inline-flex justify-center items-center">
      <span className="mr-2">
        <Icon />
      </span>
      <span className="font-bold">Pierre LEPAGNOL</span>
    </Link>
  )
}

export function Header() {
  return (
    <header className="p-8 flex justify-center">
      <Logo />
    </header>
  )
}
