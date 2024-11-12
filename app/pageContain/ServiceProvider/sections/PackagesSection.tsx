"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServicePricing {
    name: string;
    description: string;
    price: string;
}

const PackagesSection = ({ servicepricings, providerId }: { servicepricings: number, providerId: string }) => {

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

            const cartData = cart.map(item => {
                const totalPrice = parseFloat(item.price) * item.quantity;
                return {
                    packageName: item.name,
                    description: item.description,
                    price: item.price,
                    quantity: item.quantity,
                    totalPrice: totalPrice.toFixed(2),
                };
            });

            // Store the cart data in localStorage
            localStorage.setItem("cartIten", JSON.stringify(cartData));

            router.push(`/service-provider/${providerId}/checkout`);
        
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
                        cart.map((item, index) => {
                            // Calculate the total price for the item
                            const totalPrice = parseFloat(item.price) * item.quantity;

                            return (
                                <div key={index} className="flex flex-col gap-3">
                                    <span className="font-medium">{item.name}</span>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xs w-[70%]">{item.description}</span>
                                        <span className="bg-[#D4E0EB] shadow-[0px_1.23px_4.94px_0px_#D4E0EB] rounded-md size-10 flex items-center justify-center text-lg font-semibold">{item.quantity}</span>
                                    </div>
                                    <span className="text-lg font-semibold text-primary">₹ {totalPrice.toFixed(2)}</span>
                                </div>
                            );
                        })
                    )}
                    <div className="flex items-center justify-center w-full">
                        <Button
                            disabled={cart?.length === 0}
                            className="text-[#0C3469] text-lg font-bold bg-[#F9AA58] rounded-full py-4 sm:py-7 sm:px-20"
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
