import { useState } from "react";
import Logo from "./Logo";
import { useRouter } from "next/navigation";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Cross from "@/public/Cross";
import Menu from "@/public/Menu";
import Link from "next/link";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="transition-all shadow-xl w-screen flex flex-row justify-between px-4 md:px-12 py-3 bg-slate-900/70 backdrop-blur-md">
      <Link href={"#Default1"}>
        <div className="cursor-pointer md:block hidden">
          <Logo />
        </div>
      </Link>
      <Link href={"#Default"}>
        <div className="cursor-pointer md:hidden block">
          <Logo />
        </div>
      </Link>

      <div className="md:hidden transition-all z-30 block w-full flex-col justify-center items-end flex">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="w-6 h-6"
        >
          {!isOpen ? <Menu /> : <Cross />}
        </div>
      </div>
      {isOpen ? <MobileNav setIsOpen={setIsOpen} router={router} /> : <></>}
      <DesktopNav setIsOpen={setIsOpen} router={router} />
    </div>
  );
}