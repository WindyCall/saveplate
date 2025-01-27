"use client";

import React, { useState, useEffect } from 'react';
import { useGetFoodItemsQuery } from '../../lib/features/fetchFoodItems/fetchFoodItemsApiSlice';
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useCreateOrderMutation } from '@/lib/features/createOrder/createOrderApiSlice';

const BuyFoodPage: React.FC = () => {
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: foodItems = [], error, isLoading, refetch } = useGetFoodItemsQuery("");
    const [selectedFood, setSelectedFood] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [createOrder] = useCreateOrderMutation();

    useEffect(() => {
        refetch();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleOrderNow = (foodItem: any) => {
        setSelectedFood(foodItem);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handleOrder = async () => {
        if (quantity > selectedFood.number) {
            alert(`Cannot order more than available stock. Available: ${selectedFood.number}`);
            return;
        }

        try {
            await createOrder({
                userEmail: session?.user?.email!,
                foodName: selectedFood.name,
                providerEmail: selectedFood.providerEmail,
                paymentMethod: paymentMethod,
                status: 'Pending',
                orderNumber: quantity
            }).unwrap();

            alert(`Ordered ${quantity} of ${selectedFood.name} with payment method: ${paymentMethod}`);
            setSelectedFood(null);
            setQuantity(1);
            setPaymentMethod('Credit Card');
            refetch(); // Refetch food items after successful order
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Failed to create order. Please try again.');
        }
    };

    const filteredFoodItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.number! > 0
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    if (error) {
        return <div>Error loading food items</div>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <Link href="/" className="self-start mb-4 text-blue-600 hover:underline flex items-center text-lg font-semibold">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Main Page
            </Link>
            <h1 className="text-4xl font-bold mb-8">Discounted Food</h1>
            <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full max-w-lg px-3 py-2 mb-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {filteredFoodItems.map(item => (
                    <div key={item.name + item.providerEmail} className="border rounded-lg p-4 bg-white shadow-md">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                        <p className="text-lg mb-2">Price: ${item.price}</p>
                        <p className="text-lg mb-2">Number: {item.number}</p>
                        <p className="text-lg mb-2">Description: {item.description}</p>
                        <p className="text-lg mb-4">Location: {item.location}</p>
                        <button
                            onClick={() => handleOrderNow(item)}
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Order Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedFood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Order {selectedFood.name}</h2>
                        <img src={selectedFood.imageUrl} alt={selectedFood.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <p className="text-lg mb-4">Price: ${selectedFood.price}</p>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-1">Quantity:</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-1">Payment Method:</label>
                            <div className="flex flex-col">
                                <label className="mb-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Credit Card"
                                        checked={paymentMethod === 'Credit Card'}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    Credit Card
                                </label>
                                <label className="mb-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="PayPal"
                                        checked={paymentMethod === 'PayPal'}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    PayPal
                                </label>
                                <label className="mb-2">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Bank Transfer"
                                        checked={paymentMethod === 'Bank Transfer'}
                                        onChange={handlePaymentMethodChange}
                                        className="mr-2"
                                    />
                                    Bank Transfer
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setSelectedFood(null)}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleOrder}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyFoodPage;