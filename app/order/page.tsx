// filepath: /c:/Users/yanxi/hemax/saveplate/app/order/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const OrderPage: React.FC = () => {
    const router = useRouter();
    const { name, price, imageUrl } = router.query;
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handleOrder = () => {
        alert(`Ordered ${quantity} of ${name} with payment method: ${paymentMethod}`);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <Link href="/buyfood" className="self-start mb-4 text-blue-600 hover:underline flex items-center text-lg font-semibold">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to Food List
            </Link>
            <h1 className="text-4xl font-bold mb-8">Order {name}</h1>
            <img src={imageUrl as string} alt={name as string} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-lg mb-4">Price: ${price}</p>
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
                            onChange={handlePaymentMethodChange}
                            className="mr-2"
                        />
                        Bank Transfer
                    </label>
                </div>
            </div>
            <button
                onClick={handleOrder}
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Place Order
            </button>
        </div>
    );
};

export default OrderPage;