import Image from "next/image"
import logo from '@/assets/logo.png'
import silogo from '@/assets/si_logo.png'

const Footer = () => {
  return (
    <footer className="container flex items-center justify-between py-10">
      <div>
        <Image
          src={logo}
          width={100}
          height={100}
          quality={100}
          alt="homeservices"
        />
      </div>

      <div>
        <Image
          src={silogo}
          alt="saurabh infosys"
        />
      </div>
    </footer>
  )
}

export default Footer