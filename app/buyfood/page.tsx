"use client";

import React, { useState } from 'react';
import { useGetFoodItemsQuery } from '../../lib/features/fetchFoodItems/fetchFoodItemsApiSlice';
import { useSession } from "next-auth/react";

const BuyFoodPage: React.FC = () => {
    const { data: session } = useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: foodItems = [], error } = useGetFoodItemsQuery("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredFoodItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
                    <div key={item.id} className="border rounded-lg p-4 bg-white shadow-md">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                        <p className="text-lg mb-4">Price: ${item.price}</p>
                        <button
                            onClick={() => alert(`Ordering ${item.name}`)}
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Order Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyFoodPage;