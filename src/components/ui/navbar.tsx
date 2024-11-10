import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import Logo from '../../../public/images/logo.svg';
import Search from '../../../public/images/search.svg';
import Dropdown from '../../../public/images/dropdown.svg';
import Image from "next/image";
import { ReactNode } from "react";

interface MenuLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const MenuLink = ({ href, children, className, ...props }: MenuLinkProps) => (
  <Link
    href={href}
    className={`group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-base font-medium transition-colors hover:bg-blue-200 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${className}`}
    prefetch={false}
    {...props}
  >
    {children}
  </Link>
);

export function Navbar() { 
  return ( 
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6"> 
      <Link href="#" className="mr-6 lg:mr-0" prefetch={false}> 
        <Image src={Logo} alt="logo" height={50} width={50} /> 
        <span className="sr-only">Acme Inc</span> 
      </Link> 
      
      <nav className="hidden lg:flex ml-auto gap-6"> 
        <MenuLink href="#"> 
          <Image src={Search} height={20} width={20} alt="search" /> 
          Search 
        </MenuLink> 
        
        <MenuLink href="#">Explore causes</MenuLink> 

        <MenuLink href="#"> 
          About us <Image src={Dropdown} height={12} width={12} alt="dropdown" /> 
        </MenuLink> 
        
        <MenuLink href="#"> 
          How it works <Image src={Dropdown} height={12} width={12} alt="dropdown" /> 
        </MenuLink> 
        
        <MenuLink href="#" className="bg-blue-600 hover:bg-blue-700"> 
          List a cause 
        </MenuLink> 
        
        <MenuLink href="/login" className="hover:text-blue-700 hover:underline"> 
          Login 
        </MenuLink> 
      </nav> 
      
      <Sheet> 
        <SheetTrigger asChild> 
          <Button variant="outline" size="icon" className="lg:hidden ml-auto border-none"> 
            <MenuIcon className="h-6 w-6" /> 
            <span className="sr-only">Toggle navigation menu</span> 
          </Button> 
        </SheetTrigger> 
        
        <SheetContent side="left" className="bg-white"> 
          <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}> 
            <MountainIcon className="h-6 w-6" /> 
            <span className="sr-only">Acme Inc</span> 
          </Link> 
          <div className="grid gap-2 py-6"> 
            <MenuLink href="#"> 
              <Image src={Search} alt="search" height={24} width={24} /> Search 
            </MenuLink> 
            <MenuLink href="#">Explore causes</MenuLink> 
            <MenuLink href="#">About us</MenuLink> 
            <MenuLink href="#">How it works</MenuLink> 
            <MenuLink href="#">List a cause</MenuLink> 
            <MenuLink href="/login">Login</MenuLink> 
          </div> 
        </SheetContent> 
      </Sheet> 
    </header> 
  ); 
}

interface IconProps extends React.SVGProps<SVGSVGElement> {}

function MenuIcon(props: IconProps) {
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
      <line x1="2" x2="20" y1="12" y2="12" />
      <line x1="2" x2="20" y1="6" y2="6" />
      <line x1="2" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: IconProps) {
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
  );
}
