"use client";

import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="relative z-10 p-4 py-1 flex flex-wrap items-center justify-between px-2 text-xs sm:text-base max-w-4/5 bg-gray-800">
      <div className="flex items-center px-4">
        <Link
          className="text-2xl font-bold text-left text-white font-ibm ml-3 pr-4 hover:text-gray-400 transition-all flex items-center gap-2"
          href="/"
        >
          <p className="text-2xl">🪄</p>
          SavePlate
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {!session?.user ? (
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Sign In with Google
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
            >
              {session.user.name}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <Link
                  href="/foodSold"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Food sold
                </Link>
                <Link
                  href="/foodBought"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Food bought
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}