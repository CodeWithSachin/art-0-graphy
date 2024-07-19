"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
	user: any;
};

const Profile: FC<Props> = ({ user }) => {
	const [scroll, setScroll] = useState(false);
	const [active, setActive] = useState(1);
	const [avatar, setAvatar] = useState(null);
	const [logout, setLogout] = useState(false);
	const {} = useLogoutQuery(undefined, { skip: !logout ? true : false });
	const logoutHandler = async () => {
		setLogout(true);
		await signOut();
	};
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 80) {
				setScroll(true);
			} else {
				setScroll(false);
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
	return (
		<div className="flex mx-auto w-[85%]">
			<div
				className={`dark:bg-slate-900 bg-white bg-opacity-90 w-[60px] 800px:w-[310px] h-[450px] border border-slate-500 dark:border-[#ffffff1d] rounded-[5px] shadow-lg overflow-hidden  my-[80px] sticky left-[30px] ${
					scroll ? "top-[120px]" : "top-[30px]"
				}`}
			>
				<SideBarProfile
					user={user}
					active={active}
					setActive={setActive}
					avatar={avatar}
					logoutHandler={logoutHandler}
				/>
			</div>
			{active === 1 && (
				<div className="w-full h-full bg-transparent mt-[80px]">
					<ProfileInfo user={user} avatar={avatar} />
				</div>
			)}
			{active === 2 && (
				<div className="w-full h-full bg-transparent mt-[80px]">
					<ChangePassword user={user} />
				</div>
			)}
		</div>
	);
};

export default Profile;
