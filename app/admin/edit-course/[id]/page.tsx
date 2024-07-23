"use client";
import EditCourse from "@/app/components/Admin/Course/EditCourse";
import AdminDashboardHeader from "@/app/components/Admin/Dashboard/AdminDashboardHeader";
import AdminSideBar from "@/app/components/Admin/Sidebar/AdminSideBar";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const Page: React.FC<Props> = ({ params }: any) => {
	const id = params.id;
	return (
		<>
			<Heading
				title={`ADMIN - ART-0-GRAPHY`}
				description="ART-0-GRAPHY is a platform where user can learn and get help from tutors"
				keywords="Next, react, angular, node, redux"
			/>
			<div className="flex h-screen overflow-auto">
				<div className="1500px:w-[16%] wi-1/5">
					<AdminSideBar />
				</div>
				<div className="w-[85%]">
					<AdminDashboardHeader />
					<EditCourse id={id} />
				</div>
			</div>
		</>
	);
};

export default Page;
