"use client";
import React from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type Props = {};

const CreateCourse: React.FC<Props> = ({}) => {
	const [createCourse, { isSuccess, error, isLoading }] =
		useCreateCourseMutation();
	React.useEffect(() => {
		if (isSuccess) {
			toast.success("Course created successfully");
			redirect("/admin/courses");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error, isLoading]);

	const [active, setActive] = React.useState(0);
	const [courseInfo, setCourseInfo] = React.useState({
		name: "",
		description: "",
		price: "",
		estimatedPrice: "",
		tags: "",
		categories: "",
		level: "",
		demoUrl: "",
		thumbnail: "",
	});
	const [benefits, setBenefits] = React.useState([{ title: "" }]);
	const [prerequisites, setPrerequisites] = React.useState([{ title: "" }]);
	const [courseContentData, setCourseContentData] = React.useState([
		{
			videoUrl: "",
			title: "",
			description: "",
			videoLength: "",
			videoSection: "Untitled Section",
			links: [{ title: "", url: "" }],
			suggestion: "",
		},
	]);
	console.log("🚀 ~ courseContentData:", courseContentData);
	const [courseData, setCourseData] = React.useState({});

	const submitHandler = async () => {
		// Format benefits array
		const formattedBenefits = benefits.map((benefit) => ({
			title: benefit.title,
		}));
		// Format prerequisites array
		const formattedPrerequisites = prerequisites.map((prerequisite) => ({
			title: prerequisite.title,
		}));
		// Format course content array
		const formattedCourseContentData = courseContentData.map(
			(courseContent) => ({
				videoUrl: courseContent.videoUrl,
				title: courseContent.title,
				description: courseContent.description,
				videoSection: courseContent.videoSection,
				links: courseContent.links.map((link) => ({
					title: link.title,
					url: link.url,
				})),
				suggestion: courseContent.suggestion,
			})
		);
		// prepare our data object
		const data = {
			name: courseInfo.name,
			description: courseInfo.description,
			price: courseInfo.price,
			estimatedPrice: courseInfo.estimatedPrice,
			tags: courseInfo.tags,
			thumbnail: courseInfo.thumbnail,
			level: courseInfo.level,
			demoUrl: courseInfo.demoUrl,
			totalVideos: courseContentData.length,
			benefits: formattedBenefits,
			prerequisites: formattedPrerequisites,
			courseData: formattedCourseContentData,
		};
		setCourseData(data);
	};

	const createCourseHandler = async () => {
		const data = courseData;
		if (!isLoading) {
			await createCourse(data);
		}
	};

	return (
		<div className="flex w-full h-screen">
			<div className="w-[80%]">
				{active === 0 && (
					<CourseInformation
						active={active}
						setActive={setActive}
						courseInfo={courseInfo}
						setCourseInfo={setCourseInfo}
					/>
				)}
				{active === 1 && (
					<CourseData
						active={active}
						setActive={setActive}
						benefits={benefits}
						setBenefits={setBenefits}
						prerequisites={prerequisites}
						setPrerequisites={setPrerequisites}
					/>
				)}
				{active === 2 && (
					<CourseContent
						active={active}
						setActive={setActive}
						courseContentData={courseContentData}
						setCourseContentData={setCourseContentData}
						submitHandler={submitHandler}
					/>
				)}
				{active === 3 && (
					<CoursePreview
						active={active}
						setActive={setActive}
						courseData={courseData}
						setCourseData={setCourseData}
						createCourseHandler={createCourseHandler}
						isEdit={false}
					/>
				)}
			</div>
			<div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
				<CourseOptions active={active} setActive={setActive} />
			</div>
		</div>
	);
};

export default CreateCourse;
