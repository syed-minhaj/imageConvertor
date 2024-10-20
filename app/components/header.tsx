"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLink from "./navlink";
import { useRouter } from "next/navigation";

export default function Header() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const Back = () => {
        // get on route
        const route = window.location.pathname;
        if(route != '/'){
          router.push('/');
        }
        
    }
    return (
        <header className="container mx-auto py-6 px-4">
          <nav className="flex justify-between items-center">
            <h1 onClick={() => {Back()}} className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors duration-300">ImageConvert</h1>
            <div className="hidden md:flex space-x-6">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
            <button className="md:hidden text-blue-400 hover:text-blue-300 transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </nav>
          {isMenuOpen && (
            <div className="mt-4 flex flex-col space-y-2 md:hidden">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          )}
        </header>
    );
}