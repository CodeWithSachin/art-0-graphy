"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {};

const ThemeSwitcher: React.FC<Props> = (props) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const handleThemeToggle = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className="flex items-center justify-center mx-4">
			{theme === "light" ? (
				<BiMoon
					fill="black"
					size={25}
					onClick={handleThemeToggle}
					aria-label="Switch to dark mode"
					className="cursor-pointer"
					tabIndex={0}
				/>
			) : (
				<BiSun
					size={25}
					onClick={handleThemeToggle}
					aria-label="Switch to light mode"
					className="cursor-pointer text-white"
					tabIndex={0}
				/>
			)}
		</div>
	);
};

export default ThemeSwitcher;
