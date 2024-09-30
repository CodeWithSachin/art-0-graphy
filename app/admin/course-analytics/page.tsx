"use client";
import CourseAnalytics from "@/app/components/Admin/Analytics/CourseAnalytics";
import AdminDashBoard from "@/app/components/Admin/Dashboard/AdminDashBoard";
import AdminSideBar from "@/app/components/Admin/Sidebar/AdminSideBar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const Page: React.FC<Props> = ({}) => {
	return (
		<>
			<AdminProtected>
				<Heading
					title={`ADMIN - ART-0-GRAPHY`}
					description="ART-0-GRAPHY is a platform where user can learn and get help from tutors"
					keywords="Next, react, angular, node, redux"
				/>
				<div className="flex h-screen">
					<div className="1500px:w-[16%] w-1/5">
						<AdminSideBar />
					</div>
					<div className="w-[85%]">
						<AdminDashBoard />
						<CourseAnalytics />
					</div>
				</div>
			</AdminProtected>
		</>
	);
};

export default Page;
