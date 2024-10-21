"use client"
import Image from "next/image"
import logo from '@/assets/logo.png'
import { TbLogin2 } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import Modal from "../modal/Modal";
import DropDownMenu from "../modal/DropDownMenu";

const Header = () => {

  const [isLoggedin, setisLoggedin] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <header className="container bg-white flex items-center justify-between py-10 mb-7">
        <div>
          <Image
            src={logo}
            alt="homeservices"
            width={100}
            height={100}
            quality={100}
          />
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <RiShoppingBag4Line className="text-secondary size-6" />

            <p className="text-xl">Order</p>
          </div>

          {isLoggedin ? <div className="flex items-center gap-1 cursor-pointer" onClick={handleModal}>
            <p className="text-xl">Eva John</p>
            <IoMdArrowDropdown className="text-secondary size-10" />
          </div>
            :
            <div className="flex items-center gap-4 cursor-pointer">
              <TbLogin2 className="text-secondary size-6" />
              <p className="text-xl">Login</p>
            </div>
          }
        </div>
      </header>

      {showModal &&
        <Modal onClose={handleModal}>
          <DropDownMenu />
        </Modal>
      }
    </>
  )
}

export default Header