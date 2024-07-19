import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "@/public/assets/user.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type Props = {
	user: any;
	active: number;
	setActive: (active: number) => void;
	avatar: string | null;
	logoutHandler: () => void;
};

const SideBarProfile: FC<Props> = ({
	user,
	active,
	setActive,
	avatar,
	logoutHandler,
}) => {
	return (
		<div className="w-full">
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active === 1 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
				}`}
				onClick={() => setActive(1)}
			>
				<Image
					src={
						user?.avatar || avatar ? user?.avatar?.url || avatar : avatarDefault
					}
					alt=""
					className="rounded-full w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer"
					width={20}
					height={20}
				/>
				<h5 className="pl-2 hidden 800px:block font-Poppins text-black dark:text-white">
					My Account
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active === 2 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
				}`}
				onClick={() => setActive(2)}
			>
				<RiLockPasswordLine size={20} className="text-black dark:text-white" />
				<h5 className="pl-2 hidden 800px:block font-Poppins text-black dark:text-white">
					Change Password
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active === 3 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
				}`}
				onClick={() => setActive(3)}
			>
				<SiCoursera size={20} className="text-black dark:text-white" />
				<h5 className="pl-2 hidden 800px:block font-Poppins text-black dark:text-white">
					Enrolled Courses
				</h5>
			</div>
			{user?.role === "admin" && (
				<div
					className={`w-full flex items-center px-3 py-4 cursor-pointer ${
						active === 6 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
					}`}
					onClick={() => setActive(6)}
				>
					<MdOutlineAdminPanelSettings
						size={20}
						className="text-black dark:text-white"
					/>
					<h5 className="pl-2 hidden 800px:block font-Poppins text-black dark:text-white">
						Admin Dashboard
					</h5>
				</div>
			)}
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer ${
					active === 4 ? "dark:bg-slate-800 bg-slate-200" : "bg-transparent"
				}`}
				onClick={() => logoutHandler()}
			>
				<AiOutlineLogout size={20} className="text-black dark:text-white" />
				<h5 className="pl-2 hidden 800px:block font-Poppins text-black dark:text-white">
					Logout
				</h5>
			</div>
		</div>
	);
};

export default SideBarProfile;
