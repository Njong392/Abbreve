import { useEffect } from "react";
import { useState } from "react";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const defaultTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(defaultTheme);
  const element = document.documentElement;

  const icons = [
    {
      icon: "moon",
      text: "light"
    },
    {
      icon: "sunny",
      text: "dark"
    }
  ];

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");

        break;
    }
  }, [theme]);

  return (
    <nav className="px-8  bg-dark">
      <div className="flex justify-between items-center p-2">
        <div className="logo">
          <img
            src={Logo}
            alt="letter a with a french accent aigu over it"
            className="h-12 w-12 md:w-14 md:h-14 animate-[breeze_1s_alternate-reverse_infinite]"
          />
        </div>

        <div className="flex items-center md:flex">
          <a
            href="https://github.com/Njong392/Abbreve"
            target="_blank"
            rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12 hover:rotate-6 hover:scale-110 mr-4">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"
                fill="rgba(172,88,245,1)"
              />
            </svg>
          </a>

          {icons?.map((icon) => (
            <div className="rounded-lg" key={icon.text}>
              <button
                onClick={() => setTheme(icon.text)}
                className={`w-8 h-8 leading-9 text-xl rounded-full m-1 text-ash ${
                  theme === icon.text && `text-deeppurple`
                }`}>
                <ion-icon name={icon.icon}></ion-icon>
              </button>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
