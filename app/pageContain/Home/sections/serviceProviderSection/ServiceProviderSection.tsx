import ProviderCard from "./components/ProviderCard"

const ProviderData = [
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
    {
        providerImage: '/logo.png',
        providerName: "John Deo",
        providerField: "Electrician",
        price: "₹ 500",
        rating: "4.9"
    },
]

const ServiceProviderSection = () => {
    return (
        <section className="container my-20">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Servic Providers</h3>
                <button className="text-xl text-primary">View all</button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 pt-5">
                {ProviderData?.map((services, serviceskey) => (
                    <ProviderCard
                        key={serviceskey}
                        providerImage={services?.providerImage}
                        providerName={services?.providerName}
                        providerField={services?.providerField}
                        price={services?.price}
                        rating={services?.rating}
                    />
                ))}
            </div>
        </section>
    )
}

export default ServiceProviderSection