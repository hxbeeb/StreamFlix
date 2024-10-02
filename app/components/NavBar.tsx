import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import NavBarItem from "./NavBarItem";
import MobileMenu from "./MobileMenu";
import { useState, useEffect } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

export default function NavBar() {
    const [visible, setVisible] = useState(false);
    const [accountMenuVisible, setAccountMenuVisible] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const toggleVisible = () => {
        setVisible(!visible);
    }
    const toggleAccountMenuVisible = () => {
        setAccountMenuVisible(!accountMenuVisible);
    }

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
                <img src="/images/logo2.png" className="h-4 lg:h-7" alt="Logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex items-center justify-center ">
                <NavBarItem label="Home" />
                <NavBarItem label="Series" />
                <NavBarItem label="Films" />
                <NavBarItem label="New & Popular" />
                <NavBarItem label="My List" />
                <NavBarItem label="Browse by Languages" />
            </div>
            <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative" onClick={toggleVisible}>
                <p className="text-white text-sm">Browse</p>
                <BsChevronDown className={`text-white transition ${visible ? 'rotate-180' : 'rotate-0'}`} size={15} />
                <MobileMenu visible={visible}/>
            </div>
            <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <BsSearch size={22} />
                </div>
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <BsBell size={22} />
                </div>
                <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={toggleAccountMenuVisible}>
                    <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/profile.png" alt="Profile" />
                    </div>
                    <BsChevronDown className={`text-white transition ${accountMenuVisible ? 'rotate-180' : 'rotate-0'}`} size={15} />
                    <AccountMenu visible={accountMenuVisible} />
                </div>
            </div>
            </div>
            
        </nav>
    );
}