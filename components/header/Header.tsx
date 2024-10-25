"use client"
import Image from "next/image"
import logo from '@/assets/logo.png'
import { TbLogin2 } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import DropDownMenu from "../modal/DropDownMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/Context/GlobalContext";

const Header = () => {

  const pathname = usePathname();
  const [isLoggedin, setisLoggedin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useGlobalContext();
  const googleToken = userInfo?.stsTokenManager?.accessToken

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (googleToken) {
      setisLoggedin(googleToken);
    }
  }, [googleToken]);

  return (
    <>
      <header className="w-[90%] mx-auto bg-white flex items-center justify-between py-6 mb-7">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="homeservices"
            width={100}
            height={100}
            quality={100}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex flex-col gap-1 items-center">
            <Link href={'/order'} className="flex items-center gap-1 cursor-pointer">
              <RiShoppingBag4Line className="text-secondary size-6" />
              <p className="text-xl">Order</p>
            </Link>
            {pathname.includes("/order") && <svg width="110" height="5" viewBox="0 0 130 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C0 2.76142 2.23858 5 5 5H125C127.761 5 130 2.76142 130 0H0Z" fill="#0C3469" />
            </svg>
            }
          </div>

          {isLoggedin ? (
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
              <Image
                src={userInfo?.photoURL}
                alt={userInfo?.displayName}
                className="size-10 rounded-full shadow-[0px_2px_8px_0px_#D4E0EB] border-2 border-white"
                width={40}
                height={40}
              />
              <p className="text-xl">{userInfo?.displayName}</p>
              <IoMdArrowDropdown className="text-secondary size-10" />
            </div>
          ) : (
            <Link href={'/signin'} className="flex items-center gap-4 cursor-pointer">
              <TbLogin2 className="text-secondary size-6" />
              <p className="text-xl">Login</p>
            </Link>
          )}
        </div>

        {/* Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <IoMdClose className="text-3xl text-secondary" />
            ) : (
              <HiMenuAlt3 className="text-3xl text-secondary" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-5 absolute top-28 right-2 rounded-2xl w-fit h-fit z-50 shadow-[0px_1.23px_4.95px_0px_#04040440]">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 cursor-pointer">
              <RiShoppingBag4Line className="text-secondary size-6" />
              <p className="sm:text-xl">Order</p>
            </div>

            {isLoggedin ? (
              <div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
                <p className="sm:text-xl">Eva John</p>
                <IoMdArrowDropdown className="text-secondary size-10" />
              </div>
            ) : (
              <div className="flex items-center gap-4 cursor-pointer">
                <TbLogin2 className="text-secondary size-6" />
                <p className="text-xl">Login</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showModal && (
        <Modal onClose={handleModal} showModal={showModal}>
          <DropDownMenu />
        </Modal>
      )}
    </>
  );
};

export default Header;
