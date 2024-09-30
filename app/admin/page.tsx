"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import AdminSideBar from "../components/Admin/Sidebar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";
import AdminDashBoard from "../components/Admin/Dashboard/AdminDashBoard";

type Props = {};

const Page: FC<Props> = ({}) => {
	return (
		<>
			{/* <AdminProtected> */}
			<Heading
				title={`ADMIN - ART-0-GRAPHY`}
				description="ART-0-GRAPHY is a platform where user can learn and get help from tutors"
				keywords="Next, react, angular, node, redux"
			/>
			<div className="flex h-[200svh]">
				<div className="1500px:w-[16%] w-1/5">
					<AdminSideBar />
				</div>
				<div className="w-[85%]">
					<AdminDashBoard />
				</div>
			</div>
			{/* </AdminProtected> */}
		</>
	);
};

export default Page;
