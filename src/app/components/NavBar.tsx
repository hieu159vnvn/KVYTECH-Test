import { FunctionComponent } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";

type NavBarProps = Record<string, never>;

const NavBar: FunctionComponent<NavBarProps> = () => {
    return (
        <nav className="relative flex items-center justify-between p-4 lg:px-6">
            <div className="block flex-none md:hidden">
                <button aria-label="Open mobile menu" className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                    </svg>
                </button>
            </div>
            <div className="flex w-full items-center">
                <div className="flex w-full md:w-1/3">
                    <Logo/>
                </div>
                <SearchBar></SearchBar>
                <CartButton></CartButton>
            </div>
        </nav>
    );
}

export default NavBar;