import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet"
import { Button } from "../ui/button"
import Link from "next/link"
import Logo from '../../../public/images/logo.svg'
import Search from '../../../public/images/search.svg';
import Dropdown from '../../../public/images/dropdown.svg';
import Image from "next/image";

export function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              <Image src={Search} alt="search" height={24} width={24} />
              Search
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Explore causes
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              About us
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              How it works
            </Link>
            <Link href="#" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              List a cause
            </Link>
            <Link href="/login" className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
              Login
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <Image src={Logo} alt="logo" height={60} width={60} />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-blue-200 hover:text-gray-900  focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          prefetch={false}
        >
         <Image src={Search} height={20} width={20} alt="search" />
         Search
        </Link>
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-blue-200 hover:text-gray-900  focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          prefetch={false}
        >
          Explore causes
        </Link>
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-blue-200 hover:text-gray-900  focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          prefetch={false}
        >
          About us<Image src={Dropdown} height={12} width={12} alt="dropdown" />
        </Link>
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-blue-200 hover:text-gray-900  focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          prefetch={false}
        >
          How it works<Image src={Dropdown} height={12} width={12} alt="dropdown" />
        </Link>
        <Link
          href="#"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-base text-white font-medium transition-colors hover:bg-blue-700 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          prefetch={false}
        >
          List a cause
        </Link>
        <Link
          href="/login"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:text-blue-700 hover:underline focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Login
        </Link>
      </nav>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
