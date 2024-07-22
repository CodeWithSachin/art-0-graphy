"use client";
import Protected from "@/app/hooks/userProtected";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

type Props = {};

const Page: FC<Props> = () => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(5);
	const [route, setRoute] = useState("Login");
	const { user } = useSelector((state: any) => state.auth);
	return (
		<Protected>
			<Heading
				title={`${user?.name} Profile = ART-0-GRAPHY`}
				description="ART-0-GRAPHY is a platform where user can learn and get help from tutors"
				keywords="Next, react, angular, node, redux"
			/>
			<Header
				open={open}
				activeItem={activeItem}
				setOpen={setOpen}
				route={route}
				setRoute={setRoute}
			/>
			<Profile user={user} />
		</Protected>
	);
};

export default Page;
