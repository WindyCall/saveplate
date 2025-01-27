"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { useUpdateFoodItemMutation } from '../../lib/features/fetchFoodItems/fetchFoodItemsApiSlice';
import Link from 'next/link';

const SellFoodPage: React.FC = () => {
    const { data: session } = useSession();
    const [foodName, setFoodName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [number, setNumber] = useState('');
    const [updateFoodItem] = useUpdateFoodItemMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userConfirmed = window.confirm("Are you sure you want to add this food item?");
        if (userConfirmed) {
            try {
                await updateFoodItem({
                    name: foodName,
                    providerEmail: session?.user?.email!,
                    description,
                    price: parseFloat(price),
                    location,
                    imageUrl,
                    number: parseInt(number, 10)
                }).unwrap();
                alert("Food item added successfully!");
                setFoodName('');
                setDescription('');
                setPrice('');
                setLocation('');
                setImageUrl('');
                setNumber('');
            } catch (error) {
                console.error("Failed to add food item:", error);
                alert("Failed to add food item. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <Link href="/" className="self-start mb-4 text-blue-500 hover:underline text-xl font-semibold">
                &larr; Back to Main Page
            </Link>
            <h1 className="text-4xl font-bold mb-8">Sell Your Food</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="foodName" className="block text-gray-700 font-bold mb-2">Food Name:</label>
                    <input
                        type="text"
                        id="foodName"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">Image URL:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="number" className="block text-gray-700 font-bold mb-2">Number of Items:</label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SellFoodPage;