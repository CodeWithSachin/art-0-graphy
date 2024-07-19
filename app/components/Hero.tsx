import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
	return (
		<div className="w-full 1000px:flex items-center pl-5">
			<div className="absolute top-[100px] w-[50vh] h-[50vh] hero_animation 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] rounded-full"></div>
			<div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
				<Image
					src={require("../../public/assets/banner-img-1.png")}
					alt=""
					className="object-contain w-[90%] h-[auto] z-[10] 1100px:max-w-[90%] 1500px:max-w-[85%]"
				/>
			</div>
			<div className="1000px: w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
				<h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px: leading-[75px] 1500px:w-[60%]">
					Improve Your Online Learning Experience Instantly
				</h2>
				<br />
				<p className="text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%] 1500px:dark:text-[#edfff4]">
					We have 40k+ Online courses & 500K+ Online registered students. Find
					your desired Courses from them.
				</p>
				<br />
				<br />
				<div className="relative w-[90%] h-[50px] bg-transparent 1500px:w-[55%] 1100px:w-[78%]">
					<input
						type="search"
						placeholder="Search Courses..."
						className="bg-transparent border border-dark placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none dark:bg-[#575757] dark:border-none dark:placeholder:text=[#ffffffdd] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
					/>
					<div className="absolute flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer">
						<BiSearch className="text-white" size={30} />
					</div>
				</div>
				<br />
				<br />
				<div className="w-[90%] flex items-center 1500px:w-[55%] 1100px:w-[78%]">
					<Image
						src={require("../../public/assets/client-3.jpg")}
						alt=""
						className="rounded-full"
					/>
					<Image
						src={require("../../public/assets/client-1.jpg")}
						alt=""
						className="rounded-full ml-[-20px]"
					/>
					<Image
						src={require("../../public/assets/client-2.jpg")}
						alt=""
						className="rounded-full ml-[-20px]"
					/>
					<p className="text-[#000000b3] font-Josefin font-[600] text-[18px] pl-3 dark:text-[#edfff4] 1000px:dark:text-[#46e256] 1000px:text-crimson">
						500K+ People already trusted us.{" "}
						<Link
							href="/courses"
							className="text-[crimson] dark:text-[#46e256]"
						>
							View Courses
						</Link>
					</p>
				</div>
				<br />
			</div>
		</div>
	);
};

export default Hero;
