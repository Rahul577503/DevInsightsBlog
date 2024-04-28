"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { RiMoonFill, RiSunLine } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import { FaCode } from "react-icons/fa";


interface NavItem {
  label: string;
  page: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", page: "/" },
];

const Navbar =() => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const pathname = usePathname();
  const [navbar, setNavbar] = useState(false);

  return (
<header className="w-full mx-auto px-4 sm:px-20 fixed top-0 z-50 shadow dark:border-b backdrop-blur-lg">
      <div className="justify-between md:items-center md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <h2 className="text-xl font-bold text-gradient-primary">DevInsightsBlog</h2>
                <FaCode size={30} color="#3b82f6"/>
              </div>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <VscChromeClose size={30} /> : <FiMenu size={30}  />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-4 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <div className="items-center justify-center space-y-3 md:flex md:space-x-4 md:space-y-0">
              {NAV_ITEMS.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    href={item.page}
                    className="block lg:inline-block hover:text-neutral-500 cursor-pointer"
                  >
                    {item.label}
                  </Link>
                );
              })}
              {currentTheme === "dark" ? (
                <button
                  onClick={() => setTheme("light")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiSunLine size={25} color="black" />
                </button>
              ) : (
                <button
                  onClick={() => setTheme("dark")}
                  className="bg-slate-100 p-2 rounded-xl"
                >
                  <RiMoonFill size={25} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar