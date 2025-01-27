"use client";

import React, { useEffect } from 'react';
import { useGetOrderQuery } from '../../lib/features/createOrder/createOrderApiSlice';
import { useSession } from "next-auth/react";
import Link from 'next/link';

const CartPage: React.FC = () => {
    const { data: session } = useSession();
    const { data: orders, error, isLoading, refetch } = useGetOrderQuery(session?.user?.email!);

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 min-h-screen">
            <Link href="/" className="self-start mb-4 text-blue-500 hover:underline text-xl font-semibold">
                &larr; Back to Main Page
            </Link>
            <h1 className="text-4xl font-bold mb-8">Your Orders</h1>
            {orders && orders.length > 0 ? (
            <ul className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                {orders.map((order) => (
                <li key={order.orderedAt.toString()} className="mb-4 border border-gray-300 p-4 rounded-lg">
                    <p className="text-lg mb-2">Food Name: {order.foodName}</p>
                    <p className="text-lg mb-2">Food Price: ${order.foodPrice.toFixed(2)}</p>
                    <p className="text-lg mb-2">Status: {order.status}</p>
                    <p className="text-lg mb-2">Payment Method: {order.paymentMethod}</p>
                    <p className="text-lg mb-2">Order Number: {order.orderNumber}</p>
                    <p className="text-lg mb-2">Ordered At: {new Date(order.orderedAt).toLocaleString()}</p>
                </li>
                ))}
            </ul>
            ) : (
            <p className="text-lg">No orders found</p>
            )}
        </div>
    );
};

export default CartPage;