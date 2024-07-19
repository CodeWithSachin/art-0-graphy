import React, { FC } from "react";
import { navLinks } from "../constant.index";
import Link from "next/link";
type Props = {
	activeItem: number;
	isMobile: boolean;
};
const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
	return (
		<>
			<div className="hidden 800px:flex">
				{navLinks &&
					navLinks.map((nav: any, index: number) => (
						<Link href={nav.url} key={index}>
							<span
								className={`${
									activeItem === index
										? "dark:text-[#37a39a] text-[crimson]"
										: "dark:text-white text-black"
								} text-[18px] px-6 font-Poppins font-[400]`}
							>
								{nav.name}
							</span>
						</Link>
					))}
			</div>
			{isMobile && (
				<div className="800:hidden mt-5">
					<div className="w-full text-center py-6">
						<Link
							href={"/"}
							className="text-[25px] text-black dark:text-white font-Poppins font-[500]"
						>
							{" "}
							ART_0_GRAPHY
						</Link>
					</div>
					{navLinks &&
						navLinks.map((nav: any, index: number) => (
							<Link href={nav.url} key={index}>
								<span
									className={`${
										activeItem === index
											? "dark:text-[#37a39a] text-[crimson]"
											: "dark:text-white text-black"
									} block text-[18px] py-5 px-6 font-Poppins font-[400]`}
								>
									{nav.name}
								</span>
							</Link>
						))}
				</div>
			)}
		</>
	);
};

export default NavItems;
