"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { useGetFoodItemsQuery, useUpdateFoodItemMutation } from '../../lib/features/fetchFoodItems/fetchFoodItemsApiSlice';

const FoodStockPage: React.FC = () => {
    const { data: session } = useSession();
    const { data: foodSold = [], error, isLoading, refetch } = useGetFoodItemsQuery(session?.user?.email!);
    const [updateFoodItem] = useUpdateFoodItemMutation();

    const [updatedFood, setUpdatedFood] = useState<{ [key: string]: { price: string, number: string } }>({});
    const [selectedFood, setSelectedFood] = useState<{ name: string, price: string, number: string } | null>(null);

    useEffect(() => {
        if (foodSold.length > 0) {
            const initialUpdatedFood = foodSold.reduce((acc, food) => {
                acc[food.name] = { price: food.price!.toString(), number: food.number!.toString() };
                return acc;
            }, {} as { [key: string]: { price: string, number: string } });
            setUpdatedFood(initialUpdatedFood);
        }
    }, [foodSold]);

    const handleInputChange = (name: string, field: string, value: string) => {
        setUpdatedFood(prevState => ({
            ...prevState,
            [name]: {
                ...prevState[name],
                [field]: value
            }
        }));
    };

    const handleUpdate = async () => {
        if (selectedFood) {
            const { name, price, number } = selectedFood;
            try {
                await updateFoodItem({
                    name,
                    providerEmail: session?.user?.email!,
                    price: parseFloat(price),
                    number: parseInt(number, 10)
                }).unwrap();
                alert("Food item updated successfully!");
                setSelectedFood(null);
                refetch(); // Refetch food items after successful update
            } catch (error) {
                console.error("Failed to update food item:", error);
                alert("Failed to update food item. Please try again.");
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading food sold data</div>;

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Food Stock</h1>
            <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                {foodSold.map(food => (
                    <li key={food.name} className="mb-4 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-xl font-semibold">{food.name}</span>
                            <span className="text-lg">Price: ${food.price}</span>
                            <span className="text-lg">Stock: {food.number}</span>
                        </div>
                        <button
                            onClick={() => setSelectedFood({ name: food.name, price: food.price!.toString(), number: food.number!.toString() })}
                            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </li>
                ))}
            </ul>

            {selectedFood && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Update {selectedFood.name}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-1">Price:</label>
                            <input
                                type="text"
                                value={selectedFood.price}
                                onChange={(e) => setSelectedFood({ ...selectedFood, price: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-1">Remaining Stock:</label>
                            <input
                                type="text"
                                value={selectedFood.number}
                                onChange={(e) => setSelectedFood({ ...selectedFood, number: e.target.value })}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setSelectedFood(null)}
                                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodStockPage;