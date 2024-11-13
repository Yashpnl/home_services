import Image from "next/image"
import logo from '@/assets/logo.png'
import silogo from '@/assets/si_logo.png'

const Footer = () => {
  return (
    <footer className="w-[90%] mx-auto flex flex-row items-center justify-between gap-5 py-10">
      <div>
        <Image
          src={logo}
          width={100}
          height={100}
          quality={100}
          alt="homeservices"
          // className="w-[70px] sm:w-[100px] h-[70px] sm:h-[100px]"
          className="w-full h-full"
        />
      </div>

      <div>
        <Image
          src={silogo}
          alt="saurabh infosys"
          className="w-full h-full"
        />
      </div>
    </footer>
  )
}

export default Footer