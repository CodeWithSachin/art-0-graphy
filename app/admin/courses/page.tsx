"use client";
import AllCourses from "@/app/components/Admin/Course/AllCourses";
import AdminDashboardHeader from "@/app/components/Admin/Dashboard/AdminDashboardHeader";
import AdminSideBar from "@/app/components/Admin/Sidebar/AdminSideBar";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const Page: React.FC<Props> = ({}) => {
	return (
		<>
			<Heading
				title={`ADMIN - ART-0-GRAPHY`}
				description="ART-0-GRAPHY is a platform where user can learn and get help from tutors"
				keywords="Next, react, angular, node, redux"
			/>
			<div className="flex h-[200svh]">
				<div className="1500px:w-[16%] wi-1/5">
					<AdminSideBar />
				</div>
				<div className="w-[85%]">
					<AdminDashboardHeader />
					<AllCourses />
				</div>
			</div>
		</>
	);
};

export default Page;
