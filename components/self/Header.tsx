import Image from "next/image";
import Logo from "@/app/assets/Logo.svg";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load the saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <header className="border-b border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <div className="relative mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex flex-col items-start  md:flex-row md:items-center md:justify-between">
          {/* <div> */}
          <div className="flex items-center justify-between md:justify-normal md:gap-x-8 w-full">
            <div className="">
              <Image
                className="rounded-xl dark:border-white border-2"
                src={Logo}
                height={100}
                alt="logo"
              />
            </div>
            <div className="flex items-center justify-center gap-x-4 md:gap-x-8 dark:text-white">
              <div className="cursor-pointer font-sans hover:underline">
                Home
              </div>
              <div className="cursor-pointer font-sans hover:underline">
                About
              </div>
              <div className="cursor-pointer font-sans hover:underline">
                Career
              </div>
              <div className="cursor-pointer font-sans hover:underline">
                Contact Us
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="flex items-center justify-end w-full md:w-fit gap-4">
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
            <RegisterLink>
              <Button>SignUp</Button>
            </RegisterLink>
          </div>
        </div>
        <div className="absolute right-7 top-3" onClick={toggleDarkMode}>
          {darkMode ? (
            <div className="border-2 border-white rounded-full p-1">
              <Sun className="text-white size-5" />
            </div>
          ) : (
            <div className=" border-2 border-black rounded-full p-1">
              <Moon className="size-4 md:size-5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
