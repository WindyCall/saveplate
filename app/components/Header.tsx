"use client"

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
    const { data: session } = useSession();


    return (
        <nav className="relative z-10 p-4 py-1 flex flex-wrap items-center justify-center px-2 text-xs sm:text-base max-w-4/5">
          <div className="flex flex-grow basis-0 items-center px-4 w-100">
            <Link
              className="text-2xl font-bold text-left text-black font-ibm ml-3 pr-4 hover:text-gray-600 transition-all flex items-center gap-2"
              href="/"
            >
              <p className="text-2xl text-white">🪄</p>
              SavaPlate
            </Link>
          </div>
          <div className="flex-grow basis-0">
            <div className="flex items-center justify-end gap-2">
            {!session?.user ?
             <button
              onClick={() => signIn("google", { callbackUrl: "/" })}>
                Sign In with Google
              </button>
        : (
            <>
            {session?.user?.name}
              <button
              onClick={() => signOut({callbackUrl: "/"})}>
                Sign out
              </button>
              </>
        )}
            </div>
          </div>
        </nav>
      );
}