"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props {}

const Page: FC<Props> = () => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(0);
	const [route, setRoute] = useState("Login");
	return (
		<>
			<Heading
				title="ART-0-GRAPHY"
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
			<Hero />
		</>
	);
};

export default Page;
