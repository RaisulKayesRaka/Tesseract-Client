import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border-2 border-black p-1 text-xl dark:border-white dark:text-white"
    >
      {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
    </button>
  );
}
