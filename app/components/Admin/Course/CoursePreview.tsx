"use client";
import { style } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React from "react";
import { BiChevronsRight } from "react-icons/bi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

type Props = {
	active: number;
	setActive: (active: number) => void;
	courseData: any;
	setCourseData: (courseData: any) => void;
	createCourseHandler: any;
};

const CoursePreview: React.FC<Props> = ({
	active,
	setActive,
	courseData,
	setCourseData,
	createCourseHandler,
}) => {
	const discountedPricePercentage = (
		((courseData.estimatedPrice - courseData.price) /
			courseData.estimatedPrice) *
		100
	).toFixed(0);

	const prevOptionHandler = () => {
		setActive(active - 1);
	};

	return (
		<div className="w-[80%] m-auto py-5 mb-5">
			<div className="w-full relative">
				<div className="w-full mt-10">
					<CoursePlayer
						videoUrl={courseData.demoUrl}
						title={courseData.title}
					/>
				</div>
				<div className="flex items-center">
					<h1 className="text-[25px] pt-5 dark:text-white text-black">
						{courseData.price === 0 ? "Free" : courseData.price + " $"}
					</h1>
					<h5 className="pl-3 line-through mt-2 opacity-80 text-[20px] dark:text-white text-black">
						{courseData.estimatedPrice}$
					</h5>
					<h4 className="pl-5 pt-4 text-[22px] dark:text-white text-black">
						{discountedPricePercentage}% Off
					</h4>
				</div>
				<div className="flex items-center">
					<div
						className={`${style.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
					>
						Buy Now {courseData.price}$
					</div>
				</div>
				<div className="flex items-center">
					<input
						type="text"
						name="coupon"
						id="coupon"
						placeholder="Discount Code..."
						className={`${style.input} 1500px:!w-[50%] !w-[60%] ml-3 !mt-0]`}
					/>
					<div
						className={`${style.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
					>
						Apply
					</div>
				</div>
				<p className="pb-1 dark:text-white text-black flex items-center">
					<BiChevronsRight className="dark:text-white text-black mr-1" />
					Source Code Included
				</p>
				<p className="pb-1 dark:text-white text-black flex items-center">
					<BiChevronsRight className="dark:text-white text-black mr-1" />
					Lifetime Access
				</p>
				<p className="pb-1 dark:text-white text-black flex items-center">
					<BiChevronsRight className="dark:text-white text-black mr-1" />
					Certificate of completion
				</p>
				<p className="pb-3 800px:pb-1 dark:text-white text-black flex items-center">
					<BiChevronsRight className="dark:text-white text-black mr-1" />
					Premium Support
				</p>
			</div>
			<div className="w-full 800px:pr-5">
				<h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
					{courseData?.name}
				</h1>
				<div className="flex items-center justify-between pt-3">
					<div className="flex items-center">
						<Ratings rating={0} />
						<h5 className="dark:text-white text-black">0 Reviews</h5>
					</div>
					<h5 className="dark:text-white text-black">0 Students</h5>
				</div>
				<br />
				<h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
					What you will learn from this course?
				</h1>
			</div>
			{courseData.benefits.map((benefit: any, index: number) => (
				<div className="flex w-full py-2 800px:items-center" key={index}>
					<div className="w-[15px] mr-1">
						<IoCheckmarkDoneCircle className="w-[20px] dark:text-white text-black" />
					</div>
					<p className="pl-2 dark:text-white text-black">{benefit.title}</p>
				</div>
			))}
			<br />
			<br />
			<h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
				What are the prerequisites for starting this course?
			</h1>
			{courseData.prerequisites.map((prerequisite: any, index: number) => (
				<div className="flex w-full py-2 800px:items-center" key={index}>
					<div className="w-[15px] mr-1">
						<IoCheckmarkDoneCircle className="w-[20px] dark:text-white text-black" />
					</div>
					<p className="pl-2 dark:text-white text-black">
						{prerequisite.title}
					</p>
				</div>
			))}

			<br />
			<br />
			<div className="w-full">
				<h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
					Course Details
				</h1>
				<p className="dark:text-white text-black text-[25px] mt-[20px] whitespace-pre-line overflow-hidden w-full">
					{courseData.description}
				</p>
			</div>
			<br />
			<br />
			<div className="flex justify-between space-x-4">
				<div className={`${style.profileButton}`} onClick={prevOptionHandler}>
					Previous{" "}
				</div>
				<div
					className={`${style.profileButton}`}
					onClick={() => createCourseHandler()}
				>
					Next
				</div>
			</div>
		</div>
	);
};

export default CoursePreview;
