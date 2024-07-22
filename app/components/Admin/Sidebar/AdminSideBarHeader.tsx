import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ArrowBackIosIcon } from "./Icon";
import Image from "next/image";
import avatar from "@/public/assets/user.png";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
	collapsed: boolean;
	setCollapsed: (collapsed: boolean) => void;
	user: any;
}

const StyledSidebarHeader = styled.div`
	height: 64px;
	min-height: 64px;
	display: flex;
	align-items: center;
	padding: 0 20px;

	> div {
		width: 100%;
		overflow: hidden;
	}
`;

const StyledLogo = styled.div<{ rtl?: boolean }>`
	width: 35px;
	min-width: 35px;
	height: 35px;
	min-height: 35px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	color: white;
	font-size: 24px;
	font-weight: 700;
	background-color: #009fdb;
	background: linear-gradient(45deg, rgb(21 87 205) 0%, rgb(90 225 255) 100%);
	${({ rtl }) =>
		rtl
			? `
      margin-left: 10px;
      margin-right: 4px;
      `
			: `
      margin-right: 10px;
      margin-left: 4px;
      `}
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
	children,
	collapsed,
	setCollapsed,
	user,
	...rest
}) => {
	return (
		<>
			<StyledSidebarHeader {...rest}>
				<div
					style={{ display: "flex", alignItems: "center" }}
					className="space-x-4 justify-start"
				>
					<StyledLogo
						className="flex items-center cursor-pointer"
						onClick={() => setCollapsed(!collapsed)}
					>
						<ArrowBackIosIcon className="text-[#ffffffc1] ml-2" />
					</StyledLogo>
					<Typography variant="subtitle1" fontWeight={700} color="#0098e5">
						ART-0-GRAPHY
					</Typography>
				</div>
			</StyledSidebarHeader>
			<div className="flex flex-col mb-4">
				<Box display="flex" justifyContent="center" alignItems="center">
					<Image
						alt="profile-user"
						width={100}
						height={100}
						src={user?.avatar ? user?.avatar.url : avatar}
						style={{
							cursor: "pointer",
							borderRadius: "50%",
							border: "3px solid #5b6fe6",
						}}
						className="aspect-square object-cover"
					/>
				</Box>
				<Box textAlign="center">
					<Typography
						variant="h4"
						className="!text-[20px] text-black dark:text-[#ffffffc1]"
						sx={{ m: "10px 0 0 0" }}
					>
						{user?.name}
					</Typography>
					<Typography
						variant="h6"
						sx={{ m: "10px 0 0 0" }}
						className="!text-[12px] text-black dark:text-[#ffffffc1] capitalize"
					>
						- Admin
					</Typography>
				</Box>
			</div>
		</>
	);
};
