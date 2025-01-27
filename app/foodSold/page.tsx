"use client";

import React from 'react';
import { useGetFoodSoldQuery } from '../../lib/apiSlice';

const FoodSoldPage: React.FC = () => {
    const { data: foodSold = [], error, isLoading } = useGetFoodSoldQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading food sold data</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8">Food Sold</h1>
            <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                {foodSold.map(food => (
                    <li key={food.id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-semibold">{food.name}</span>
                            <span className="text-lg">${food.price}</span>
                        </div>
                        <div className="text-gray-600">Quantity Sold: {food.quantitySold}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodSoldPage;