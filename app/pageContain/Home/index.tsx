import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import SearchBox from '@/components/searchbox/SearchBox'
import PopularSection from './sections/popularSection/PopularSection'
import ServiceProviderSection from './sections/serviceProviderSection/ServiceProviderSection'

const Home = () => {
    return (
        <>
            <SearchBox />
            <PopularSection />
            <ServiceProviderSection />
        </>
    )
}

export default Home