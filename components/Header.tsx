import ExportedImage from "next-image-export-optimizer";
import Link from 'next/link'

function Icon() {
  return (
    <ExportedImage width={25} height={200} src="./LogoPierre.png" alt="Logo of the author" unoptimized />
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
