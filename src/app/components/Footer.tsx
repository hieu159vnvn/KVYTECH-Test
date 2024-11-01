import Logo from "./Logo";

function Footer() {
    return (
        <footer className="bg-neutral-900 mt-16 border-t border-t-neutral-800">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 ">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Logo></Logo>
                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright &copy; 2024. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;