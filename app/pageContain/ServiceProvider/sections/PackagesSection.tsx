"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServicePricing {
    name: string;
    description: string;
    price: string;
}

interface PackagesSectionProps {
    servicepricings: ServicePricing[];
}

const PackagesSection = ({ servicepricings, providerId }: { servicepricings: PackagesSectionProps, providerId: string }) => {

    const router = useRouter()
    const [quantities, setQuantities] = useState<number[]>(servicepricings.map(() => 1));
    const [cart, setCart] = useState<{ name: string; description: string; price: string; quantity: number }[]>([]);

    const handleIncrement = (index: number) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] += 1;
            return newQuantities;
        });
    };

    const handleDecrement = (index: number) => {
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = Math.max(newQuantities[index] - 1, 1);
            return newQuantities;
        });
    };

    const handleAddToCart = (index: number) => {
        const pkg = servicepricings[index];
        const quantity = quantities[index];
        const existingItemIndex = cart.findIndex(item => item.name === pkg.name);

        if (existingItemIndex > -1) {
            // If the item already exists in the cart, update the quantity
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            // If the item does not exist, add it to the cart
            setCart(prevCart => [
                ...prevCart,
                { name: pkg.name, description: pkg.description, price: pkg.price, quantity }
            ]);
        }

        // Reset quantity after adding to cart
        setQuantities(prevQuantities => {
            const newQuantities = [...prevQuantities];
            newQuantities[index] = 1; // Reset the quantity for that package
            return newQuantities;
        });
    };

    const handleViewCart = () => {
        // Prepare the cart data to be passed as query parameters
        const cartData = cart.map(item => ({
            packageName: item.name,
            description: item.description,
            price: item.price,
            quantity: item.quantity,
        }));

        // Convert cart data to a JSON string and encode it for the URL
        const cartString = encodeURIComponent(JSON.stringify(cartData));

        // Navigate to the checkout page with the service provider ID and cart data
        router.push(`/service-provider/${providerId}/checkout?cart=${cartString}`);
    };

    return (
        <div className="rounded-[20px] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] py-5 px-12">
            <h1 className="font-semibold text-2xl">Packages</h1>
            <div className="grid 2xl:grid-cols-2 gap-5 pt-7">
                {servicepricings.map((pkg, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-5 max-w-full px-6 py-4 border border-[#0000001A] rounded-md">
                            <span className="font-medium">{pkg.name}</span>
                            <div className="flex items-center justify-between w-full">
                                <span className="text-xs w-[70%]">{pkg.description}</span>
                                <div className="flex items-center gap-2 bg-[#D4E0EB] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md">
                                    <button onClick={() => handleDecrement(index)} className="w-6 h-6 flex items-center justify-center rounded-full text-xl font-semibold">-</button>
                                    <span className="text-lg font-semibold">{quantities[index]}</span>
                                    <button onClick={() => handleIncrement(index)} className="w-6 h-6 flex items-center justify-center rounded-full text-xl font-semibold">+</button>
                                </div> 
                            </div>
                            <span className="text-lg font-semibold text-primary">₹ {pkg.price}</span>
                            <Button onClick={() => handleAddToCart(index)} className="mt-2 text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-2">
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Cart Section */}
                <div className="flex flex-col gap-7 p-7 rounded-xl shadow-[0px_1.23px_4.94px_0px_#D4E0EB]">
                    <h2>Cart</h2>
                    {cart.length === 0 ? (
                        <span className="text-gray-500">Your cart is empty</span>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="flex flex-col gap-3">
                                <span className="font-medium">{item.name}</span>
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-xs w-[70%]">{item.description}</span>
                                    <div className="flex items-center gap-2 bg-[#D4E0EB] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md">
                                        <button
                                            onClick={() => handleDecrement(index)}
                                            className="w-6 h-6 flex items-center justify-center rounded-full text-xl font-semibold"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrement(index)}
                                            className="w-6 h-6 flex items-center justify-center rounded-full text-xl font-semibold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <span className="text-lg font-semibold text-primary">₹ {item.price}</span>
                            </div>
                        ))
                    )}
                    <div className="flex items-center justify-center w-full">
                        <Button className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-7 sm:px-20"
                            onClick={handleViewCart}
                        >
                            View Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackagesSection;
