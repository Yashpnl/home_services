"use client"
import Image from "next/image"
import logo from '@/assets/logo.png'
import { TbLogin2 } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi"; 
import { IoMdClose } from "react-icons/io"; 
import { useState } from "react";
import Modal from "../modal/Modal";
import DropDownMenu from "../modal/DropDownMenu";

const Header = () => {
  const [isLoggedin, setisLoggedin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  };

  return (
    <>
      <header className="container bg-white flex items-center justify-between py-6 mb-7">
        <div>
          <Image
            src={logo}
            alt="homeservices"
            width={100}
            height={100}
            quality={100}
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <RiShoppingBag4Line className="text-secondary size-6" />
            <p className="text-xl">Order</p>
          </div>

          {isLoggedin ? (
            <div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
              <p className="text-xl">Eva John</p>
              <IoMdArrowDropdown className="text-secondary size-10" />
            </div>
          ) : (
            <div className="flex items-center gap-4 cursor-pointer">
              <TbLogin2 className="text-secondary size-6" />
              <p className="text-xl">Login</p>
            </div>
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
        <div className="md:hidden bg-white py-4 px-6 absolute top-24 left-0 w-full min-h-screen z-50">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 cursor-pointer">
              <RiShoppingBag4Line className="text-secondary size-6" />
              <p className="text-xl">Order</p>
            </div>

            {isLoggedin ? (
              <div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
                <p className="text-xl">Eva John</p>
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
        <Modal onClose={handleModal}>
          <DropDownMenu />
        </Modal>
      )}
    </>
  );
};

export default Header;
