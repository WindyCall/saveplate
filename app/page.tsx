"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4 mt-8">Welcome to SavePlate</h1>
      {session?.user ? (
      <div className="text-lg text-center mt-8">
        <p className="mb-8 mt-8">Choose between selling the food you have or buying the food you need</p>
        <div className="flex space-x-16 justify-center">
        <Link 
          href="/sellfood"
          className="w-56 h-56 flex items-center justify-center bg-blue-500 text-white text-3xl font-semibold rounded-lg shadow-md hover:bg-blue-700"
        >
          Sell Food
        </Link>
        <Link 
          href="/buyfood"
          className="w-56 h-56 flex items-center justify-center bg-green-500 text-white text-3xl font-semibold rounded-lg shadow-md hover:bg-green-700"
        >
          Buy Food
        </Link>
        </div>
      </div>
      ) : (
      <div className="text-lg text-center mt-8">
        Please sign in to use our platform
      </div>
      )}
    </div>
  );
}
