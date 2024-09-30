"use client";
import { Book } from "@/public/icons/Books";
import { Calendar } from "@/public/icons/Calender";
import { Service } from "@/public/icons/Service";
import { ShoppingCart } from "@/public/icons/ShoppingCart";
import { Typography, Badge } from "@mui/material";
import React, { useEffect } from "react";
import {
	HomeOutlinedIcon,
	ArrowForwardIosIcon,
	ArrowBackIosIcon,
	PeopleOutlinedIcon,
	ReceiptOutlinedIcon,
	BarChartOutlinedIcon,
	MapOutlinedIcon,
	GroupsIcon,
	OndemandVideoIcon,
	VideoCallIcon,
	WebIcon,
	QuizIcon,
	WysiwygIcon,
	ManageHistoryIcon,
	SettingsIcon,
	ExitToAppIcon,
	StorefrontIcon,
} from "./Icon";
import {
	Menu,
	menuClasses,
	MenuItem,
	MenuItemStyles,
	Sidebar,
	SubMenu,
} from "react-pro-sidebar";
import { SidebarHeader } from "./AdminSideBarHeader";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";
import Link from "next/link";
import { TbTableRow } from "react-icons/tb";

const themes = {
	light: {
		sidebar: {
			backgroundColor: "#ffffff",
			color: "#607489",
		},
		menu: {
			menuContent: "#fbfcfd",
			icon: "#0098e5",
			hover: {
				backgroundColor: "#c5e4ff",
				color: "#44596e",
			},
			disabled: {
				color: "#9fb6cf",
			},
		},
	},
	dark: {
		sidebar: {
			backgroundColor: "#0b2948",
			color: "#8ba1b7",
		},
		menu: {
			menuContent: "#082440",
			icon: "#59d0ff",
			hover: {
				backgroundColor: "#00458b",
				color: "#b6c8d9",
			},
			disabled: {
				color: "#3e5e7e",
			},
		},
	},
};

// hex to rgba converter
const hexToRgba = (hex: any, alpha: any) => {
	const r = parseInt(hex?.slice(1, 3), 16);
	const g = parseInt(hex?.slice(3, 5), 16);
	const b = parseInt(hex?.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AdminSideBar = () => {
	const [selected, setSelected] = React.useState("Dashboard");
	const [collapsed, setCollapsed] = React.useState(false);
	const [toggled, setToggled] = React.useState(false);
	const [broken, setBroken] = React.useState(false);
	const [hasImage, setHasImage] = React.useState(true);
	const { user } = useSelector((state: any) => state.auth);
	const { theme, setTheme } = useTheme();

	// handle on theme change event
	const handleThemeChange = (e: any) => {
		setTheme(e.target.checked ? "dark" : "light");
	};

	// handle on image change event
	const handleImageChange = (e: any) => {
		setHasImage(e.target.checked);
	};

	const menuItemStyles = {
		root: {
			fontSize: "13px",
			fontWeight: 400,
		},
		icon: {
			color: themes[theme]?.menu.icon,
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme]?.menu.disabled.color,
			},
		},
		SubMenuExpandIcon: {
			color: "#b6b7b9",
		},
		subMenuContent: ({ level }: any) => ({
			backgroundColor:
				level === 0
					? hexToRgba(
							themes[theme]?.menu.menuContent,
							hasImage && !collapsed ? 0.4 : 1
					  )
					: "transparent",
		}),
		button: {
			[`&.${menuClasses.disabled}`]: {
				color: themes[theme]?.menu.disabled.color,
			},
			"&:hover": {
				backgroundColor: hexToRgba(
					themes[theme]?.menu.hover.backgroundColor,
					hasImage ? 0.8 : 1
				),
				color: themes[theme]?.menu.hover.color,
			},
			"&.active": {
				backgroundColor: hexToRgba(
					themes[theme]?.menu.hover.backgroundColor,
					hasImage ? 0.8 : 1
				),
				color: themes[theme]?.menu.hover.color,
			},
		},
		label: ({ open }: any) => ({
			fontWeight: open ? 600 : undefined,
		}),
	};

	const dynamicStyle = (
		theme: any,
		hasImage: any,
		collapsed: any,
		isActive: any
	) => ({
		button: {
			backgroundColor: isActive
				? hexToRgba(
						themes[theme]?.menu.hover.backgroundColor,
						hasImage ? 0.8 : 1
				  )
				: "transparent",
			color: isActive
				? themes[theme]?.menu.hover.color
				: themes[theme]?.menu.icon,
			"&:hover": {
				backgroundColor: hexToRgba(
					themes[theme]?.menu.hover.backgroundColor,
					hasImage ? 0.8 : 1
				),
				color: themes[theme]?.menu.hover.color,
			},
		},
	});

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				height: "100vh",
				zIndex: 99999999999999,
			}}
		>
			<Sidebar
				collapsed={collapsed}
				toggled={toggled}
				onBackdropClick={() => setToggled(false)}
				onBreakPoint={setBroken}
				image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
				breakPoint="md"
				backgroundColor={hexToRgba(
					themes[theme]?.sidebar.backgroundColor,
					hasImage ? 0.9 : 1
				)}
				rootStyles={{
					color: themes[theme]?.sidebar.color,
					height: "100vh",
				}}
			>
				<div
					style={{ display: "flex", flexDirection: "column", height: "100%" }}
				>
					<SidebarHeader
						collapsed={collapsed}
						setCollapsed={setCollapsed}
						user={user}
						style={{ marginBottom: "24px", marginTop: "16px" }}
					/>
					<div style={{ flex: 1, marginBottom: "32px" }}>
						<div style={{ padding: "0 24px", marginBottom: "8px" }}>
							<Typography
								variant="body2"
								fontWeight={600}
								style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
							>
								General
							</Typography>
						</div>
						<Menu menuItemStyles={menuItemStyles}>
							<Link href="/admin" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Dashboard"
										).button
									}
									icon={<HomeOutlinedIcon />}
									active={selected === "Dashboard"}
									onClick={() => setSelected("Dashboard")}
								>
									Dashboard
								</MenuItem>
							</Link>
							<div style={{ padding: "0 24px", marginBottom: "8px" }}>
								<Typography
									variant="body2"
									fontWeight={600}
									style={{
										opacity: collapsed ? 0 : 0.7,
										letterSpacing: "0.5px",
									}}
								>
									Data
								</Typography>
							</div>
							<Link href="/admin/users" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Users"
										).button
									}
									icon={<GroupsIcon />}
									active={selected === "Users"}
									onClick={() => setSelected("Users")}
								>
									Users
								</MenuItem>
							</Link>
							<Link href="/admin/invoices" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Invoices"
										).button
									}
									icon={<BarChartOutlinedIcon />}
									active={selected === "Invoices"}
									onClick={() => setSelected("invoices")}
								>
									invoices
								</MenuItem>
							</Link>
							<div style={{ padding: "0 24px", marginBottom: "8px" }}>
								<Typography
									variant="body2"
									fontWeight={600}
									style={{
										opacity: collapsed ? 0 : 0.7,
										letterSpacing: "0.5px",
									}}
								>
									Content
								</Typography>
							</div>
							<Link href="/admin/create-course" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Create Course"
										).button
									}
									icon={<VideoCallIcon />}
									active={selected === "Create Course"}
									onClick={() => setSelected("Create Course")}
								>
									Create Course
								</MenuItem>
							</Link>
							<Link href="/admin/courses" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Live Courses"
										).button
									}
									icon={<OndemandVideoIcon />}
									active={selected === "Live Courses"}
									onClick={() => setSelected("Live Courses")}
								>
									Live Courses
								</MenuItem>
							</Link>
							<div style={{ padding: "0 24px", marginBottom: "8px" }}>
								<Typography
									variant="body2"
									fontWeight={600}
									style={{
										opacity: collapsed ? 0 : 0.7,
										letterSpacing: "0.5px",
									}}
								>
									Customization
								</Typography>
							</div>
							<Link href="/admin/hero" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Hero"
										).button
									}
									icon={<TbTableRow />}
									active={selected === "Hero"}
									onClick={() => setSelected("Hero")}
								>
									Hero
								</MenuItem>
							</Link>
							<Link href="/admin/faq" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "FAQ's"
										).button
									}
									icon={<QuizIcon />}
									active={selected === "FAQ's"}
									onClick={() => setSelected("FAQ's")}
								>
									FAQ's
								</MenuItem>
							</Link>
							<Link href="/admin/categories" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Categories"
										).button
									}
									icon={<WysiwygIcon />}
									active={selected === "Categories"}
									onClick={() => setSelected("Categories")}
								>
									Categories
								</MenuItem>
							</Link>
							<div style={{ padding: "0 24px", marginBottom: "8px" }}>
								<Typography
									variant="body2"
									fontWeight={600}
									style={{
										opacity: collapsed ? 0 : 0.7,
										letterSpacing: "0.5px",
									}}
								>
									Controllers
								</Typography>
							</div>
							<Link href="/admin/teams" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Teams"
										).button
									}
									icon={<PeopleOutlinedIcon />}
									active={selected === "Teams"}
									onClick={() => setSelected("Teams")}
								>
									Manage Teams
								</MenuItem>
							</Link>
							<div style={{ padding: "0 24px", marginBottom: "8px" }}>
								<Typography
									variant="body2"
									fontWeight={600}
									style={{
										opacity: collapsed ? 0 : 0.7,
										letterSpacing: "0.5px",
									}}
								>
									Analytics
								</Typography>
							</div>
							<Link href="/admin/course-analytics" passHref>
								<MenuItem
									style={
										dynamicStyle(
											theme,
											hasImage,
											collapsed,
											selected === "Course Analytics"
										).button
									}
									icon={<PeopleOutlinedIcon />}
									active={selected === "Course Analytics"}
									onClick={() => setSelected("Course Analytics")}
								>
									Course Analytics
								</MenuItem>
							</Link>
						</Menu>

						<div
							style={{
								padding: "0 24px",
								marginBottom: "8px",
								marginTop: "32px",
							}}
						>
							<Typography
								variant="body2"
								fontWeight={600}
								style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px" }}
							>
								Extra
							</Typography>
						</div>

						<Menu menuItemStyles={menuItemStyles}>
							<MenuItem
								style={
									dynamicStyle(
										theme,
										hasImage,
										collapsed,
										selected === "Dashboard"
									).button
								}
								icon={<Calendar />}
								suffix={<Badge variant="success">New</Badge>}
								active={selected === "Calendar"}
								onClick={() => setSelected("Calendar")}
							>
								Calendar
							</MenuItem>
							<MenuItem
								style={
									dynamicStyle(
										theme,
										hasImage,
										collapsed,
										selected === "Dashboard"
									).button
								}
								icon={<Book />}
								active={selected === "Documentation"}
								onClick={() => setSelected("Documentation")}
							>
								Documentation
							</MenuItem>
							<MenuItem
								style={
									dynamicStyle(
										theme,
										hasImage,
										collapsed,
										selected === "Dashboard"
									).button
								}
								disabled
								icon={<Service />}
								active={selected === "Examples"}
								onClick={() => setSelected("Examples")}
							>
								Examples
							</MenuItem>
						</Menu>
					</div>
				</div>
			</Sidebar>
		</div>
	);
};

export default AdminSideBar;
