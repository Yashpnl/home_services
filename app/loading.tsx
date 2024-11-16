import logo from '@/assets/logo.png'
import Image from 'next/image'

const loading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-secondary/60 z-50'>
            <Image
                src={logo}
                alt="homeservices"
                width={150}
                height={150}
                quality={100}
            />
        </div>
    )
}

export default loading