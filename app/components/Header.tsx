"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "@/public/assets/user.png";
import { useSession } from "next-auth/react";
import {
	useLogoutQuery,
	useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number;
	route: string;
	setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
	const [active, setActive] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(false);
	const { user } = useSelector((state: any) => state.auth);
	const { data } = useSession();
	const [socialAuth, { isSuccess }] = useSocialAuthMutation();

	const [logout, setLogout] = useState(false);
	const {} = useLogoutQuery(undefined, { skip: !logout ? true : false });

	useEffect(() => {
		if (!user) {
			if (data) {
				socialAuth({
					email: data.user?.email,
					name: data.user?.name,
					avatar: data.user?.image,
				});
			}
		}
		if (data === null) {
			if (isSuccess) {
				const message = "Login Successful";
				toast.success(message);
			}
		}
		if (!user && data === null) {
			setLogout(true);
		}
	}, [data, user]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 80) {
				setActive(true);
			} else {
				setActive(false);
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);

	const handleClose = (e: any) => {
		if (e.target.id === "screen") {
			setOpenSidebar(false);
		}
	};

	return (
		<div className="w-full relative">
			<div
				className={`${
					active
						? "dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:bg-[#ffffff1c] shadow-xl transition duration-500"
						: "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
				}`}
			>
				<div className="m-auto w-[95%] 800px:w-[92%] py-2 h-full">
					<div className="w-full flex justify-between items-center h-[80px] p-3">
						<div>
							<Link
								href={"/"}
								className="text-[25px] text-black dark:text-white font-Poppins font-[500]"
							>
								{" "}
								ART_0_GRAPHY
							</Link>
						</div>
						<div className="flex items-center">
							<NavItems activeItem={activeItem} isMobile={false} />
							<ThemeSwitcher />
							{/* Only for mobile */}
							<div className="800px:hidden ">
								<HiOutlineMenuAlt3
									className="cursor-pointer dark:text-white text-black"
									size={25}
									onClick={() => setOpenSidebar(true)}
								/>
							</div>
							{user ? (
								<Link href={"profile"}>
									<Image
										src={user.avatar ? user.avatar.url : avatar}
										alt="user"
										width={30}
										height={30}
										className="w-[30px] aspect-square cursor-pointer rounded-full object-cover"
										style={{
											border: activeItem === 5 ? "2px solid #37a39a" : "none",
										}}
									/>
								</Link>
							) : (
								<HiOutlineUserCircle
									className="hidden 800px:block cursor-pointer dark:text-white text-black"
									size={25}
									onClick={() => setOpen(true)}
								/>
							)}
						</div>
					</div>
				</div>
				{/* only for mobile */}
				{openSidebar && (
					<div
						className="fixed w-full h-screen top-0 left-0 dark:bg-[unset] z-[99999] bg-[#00000024]"
						onClick={handleClose}
						id="screen"
					>
						<div className="w-[70%] fixed h-screen top-0 right-0 dark:bg-slate-900 dark:bg-opacity-90 z-[9999999] bg-white">
							<NavItems activeItem={activeItem} isMobile={true} />
							<HiOutlineUserCircle
								className="cursor-pointer ml-5 my-2 dark:text-white text-black"
								size={25}
								onClick={() => setOpen(true)}
							/>
							<br />
							<br />
							<p className="text-[16px] px-2  pl-5 dark:text-white text-black">
								Copyright © 2024 ART_0_GRAPHY
							</p>
						</div>
					</div>
				)}
			</div>
			{route === "Login" && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							component={Login}
							activeItem={activeItem}
						/>
					)}
				</>
			)}
			{route === "Sign-Up" && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							component={SignUp}
							activeItem={activeItem}
						/>
					)}
				</>
			)}
			{route === "Verification" && (
				<>
					{open && (
						<CustomModal
							open={open}
							setOpen={setOpen}
							setRoute={setRoute}
							component={Verification}
							activeItem={activeItem}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Header;
