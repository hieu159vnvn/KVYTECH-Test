"use client";
import { FunctionComponent, useState } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";

type NavBarProps = Record<string, never>;

const NavBar: FunctionComponent<NavBarProps> = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 bg-neutral-900 z-50 w-full flex items-center justify-between p-4 lg:px-6">
            <div className="block flex-none md:hidden">
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Open mobile menu" className="flex h-11 w-11 items-center justify-center rounded-md border transition-colors md:hidden border-neutral-700 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                    </svg>
                </button>
            </div>
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Logo/>
                </div>
                <div className="md:block hidden md:w-1/3">
                    <SearchBar></SearchBar>
                </div>
                <CartButton></CartButton>
            </div>
            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="fixed top-[76px] left-0 bg-neutral-900 p-4 md:hidden z-50 w-full h-auto transition duration-150 ease-out ">
                    <SearchBar />
                </div>
            )}
        </nav>
    );
}

export default NavBar;