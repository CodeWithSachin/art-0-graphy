"use client";
import React from "react";
import "./Loader.css";

type Props = {};

const Loader: React.FC<Props> = ({}) => {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="loader"></div>
		</div>
	);
};

export default Loader;
