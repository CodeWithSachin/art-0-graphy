import { style } from "@/app/styles/style";
import React from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsPencil, BsLink45Deg } from "react-icons/bs";
import toast from "react-hot-toast";

type Props = {
	active: number;
	setActive: (active: number) => void;
	courseContentData: any;
	setCourseContentData: (courseContentData: any) => void;
	submitHandler: any;
};

const CourseContent: React.FC<Props> = ({
	active,
	setActive,
	courseContentData,
	setCourseContentData,
	submitHandler: courseSubmitHandler,
}) => {
	const [isCollapsed, setIsCollapsed] = React.useState(
		Array(courseContentData.length).fill(false)
	);
	const [activeSection, setActiveSection] = React.useState(1);

	const submitHandler = (e: any) => {
		e.preventDefault();
	};
	const collapsedToggleHandler = (index: number) => {
		const updatedCollapsed = [...isCollapsed];
		updatedCollapsed[index] = !updatedCollapsed[index];
		setIsCollapsed(updatedCollapsed);
	};

	const deleteLinkHandler = (index: number, linkIndex: number) => {
		const updatedData = [...courseContentData];
		updatedData[index].links.splice(linkIndex, 1);
		setCourseContentData(updatedData);
	};
	const addLinkHandler = (index: number) => {
		const updatedData = [...courseContentData];
		updatedData[index].links.push({ title: "", url: "" });
		setCourseContentData(updatedData);
	};
	const addCourseContentHandler = (item: any) => {
		if (
			!!!item.title ||
			!!!item.description ||
			!!!item.videoUrl ||
			!!!item.links[0].title ||
			!!!item.links[0].url
		) {
			toast.error("Please complete all fields to proceed.");
		} else {
			let newVideoSection = "";
			if (courseContentData.length > 0) {
				const lastVideoSection =
					courseContentData[courseContentData.length - 1].videoSection;

				if (lastVideoSection) {
					newVideoSection = lastVideoSection;
				}
			}
			const newContent = {
				videoUrl: "",
				title: "",
				description: "",
				videoLength: "",
				videoSection: newVideoSection,
				links: [{ title: "", url: "" }],
				suggestion: "",
			};
			setCourseContentData([...courseContentData, newContent]);
		}
	};

	const addNewSectionHandler = async () => {
		if (
			!!!courseContentData[courseContentData.length - 1].title ||
			!!!courseContentData[courseContentData.length - 1].description ||
			!!!courseContentData[courseContentData.length - 1].videoUrl ||
			!!!courseContentData[courseContentData.length - 1].videoLength ||
			!!!courseContentData[courseContentData.length - 1].links[0].title ||
			!!!courseContentData[courseContentData.length - 1].links[0].url
		) {
			toast.error("Please complete all fields to proceed.");
		} else {
			setActiveSection(activeSection + 1);
			const newContent = {
				videoUrl: "",
				title: "",
				description: "",
				videoSection: `Untitled Section ${activeSection}`,
				links: [{ title: "", url: "" }],
				suggestion: "",
			};
			setCourseContentData([...courseContentData, newContent]);
		}
	};

	const nextOptionHandler = () => {
		if (
			!!!courseContentData[courseContentData.length - 1].title ||
			!!!courseContentData[courseContentData.length - 1].description ||
			!!!courseContentData[courseContentData.length - 1].videoUrl ||
			!!!courseContentData[courseContentData.length - 1].videoLength ||
			!!!courseContentData[courseContentData.length - 1].links[0].title ||
			!!!courseContentData[courseContentData.length - 1].links[0].url
		) {
			toast.error("Section can't be empty.");
		} else {
			setActive(active + 1);
			courseSubmitHandler();
		}
	};
	const prevOptionHandler = () => {
		setActive(active - 1);
	};

	return (
		<div className="w-[80%] m-auto mt-24 p-3">
			<form onSubmit={submitHandler}>
				{courseContentData.map((item: any, index: number) => {
					const showInputSection =
						index === 0 ||
						item.videoSection !== courseContentData[index - 1].videoSection;
					return (
						<>
							<div
								key={index}
								className={`w-full bg-[#cdc8c817] p-4 ${
									showInputSection ? "mt-10" : "mb-0"
								}`}
							>
								{showInputSection && (
									<>
										<div className="flex w-ull items-center">
											<input
												type="text"
												name="videoSection"
												id="videoSection"
												className={`text-[20px] ${
													item.videoSection.includes("Untitled Section")
														? "w-[170px]"
														: "w-min"
												} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
												value={item.videoSection}
												onChange={(e) => {
													const updatedData = [...courseContentData];
													updatedData[index].videoSection = e.target.value;
													setCourseContentData(updatedData);
												}}
											/>
											<BsPencil className="dark:text-white text-black" />
										</div>
									</>
								)}
								<div className="w-full flex justify-between items-center my-0">
									{isCollapsed[index] ? (
										<>
											{item.title ? (
												<p className="font-Poppins dark:text-white text-black">
													{" "}
													{index + 1}.{item.title}
												</p>
											) : (
												<></>
											)}
										</>
									) : (
										<div></div>
									)}
									<div className="flex items-center">
										<AiOutlineDelete
											className={`dark:text-white text-black text-[20px] ${
												index > 0 ? "cursor-pointer" : "cursor-no-drop"
											}`}
											onClick={() => {
												if (index > 0) {
													const updatedData = [...courseContentData];
													updatedData.splice(index, 1);
													setCourseContentData(updatedData);
												}
											}}
										/>
										<MdOutlineKeyboardArrowDown
											className={`dark:text-white text-black text-[20px]`}
											style={{
												transform: isCollapsed[index]
													? "rotate(180deg)"
													: "rotate(0deg)",
											}}
											onClick={() => {
												collapsedToggleHandler(index);
											}}
										/>
									</div>
								</div>
								{!isCollapsed[index] ? (
									<>
										<div className="my-3">
											<label htmlFor="videoTitle" className={style.label}>
												Video Title
											</label>
											<input
												type="text"
												name="videoTitle"
												id="videoTitle"
												className={`${style.input}`}
												value={item.title}
												onChange={(e) => {
													const updatedData = [...courseContentData];
													updatedData[index].title = e.target.value;
													setCourseContentData(updatedData);
												}}
												placeholder="Project plan..."
											/>
										</div>
										<div className="my-3">
											<label htmlFor="videoUrl" className={style.label}>
												Video URL
											</label>
											<input
												type="text"
												name="videoUrl"
												id="videoUrl"
												className={`${style.input}`}
												value={item.videoUrl}
												onChange={(e) => {
													const updatedData = [...courseContentData];
													updatedData[index].videoUrl = e.target.value;
													setCourseContentData(updatedData);
												}}
												placeholder="Project plan..."
											/>
										</div>
										<div className="my-3">
											<label htmlFor="videoLength" className={style.label}>
												Video Length
											</label>
											<input
												type="number"
												name="videoLength"
												id="videoLength"
												className={`${style.input}`}
												value={item.videoLength}
												onChange={(e) => {
													const updatedData = [...courseContentData];
													updatedData[index].videoLength = e.target.value;
													setCourseContentData(updatedData);
												}}
												placeholder="Video Length in Minutes"
											/>
										</div>
										<div className="my-3">
											<label htmlFor="videoDescription" className={style.label}>
												Video Description
											</label>
											<textarea
												rows={8}
												cols={30}
												name="videoDescription"
												id="videoDescription"
												className={`${style.input} !py-2 !h-min`}
												value={item.description}
												onChange={(e) => {
													const updatedData = [...courseContentData];
													updatedData[index].description = e.target.value;
													setCourseContentData(updatedData);
												}}
												placeholder="Project Description..."
											/>
											<br />
											<br />
											<br />
										</div>
										{item?.links.map((link: any, linkIndex: number) => (
											<div className="mb-3 block" key={linkIndex}>
												<div className="w-full flex justify-between items-center">
													<label htmlFor="link" className={style.label}>
														Link {linkIndex + 1}
													</label>
													<AiOutlineDelete
														className={`dark:text-white text-black text-[20px] cursor-pointer`}
														onClick={() => {
															deleteLinkHandler(index, linkIndex);
														}}
													/>
												</div>
												<input
													type="text"
													name="videoUrl"
													id="videoUrl"
													className={`${style.input}`}
													value={link.title}
													onChange={(e) => {
														const updatedData = [...courseContentData];
														updatedData[index].links[linkIndex].title =
															e.target.value;
														setCourseContentData(updatedData);
													}}
													placeholder="Source Code ... [Link Title]"
												/>
												<input
													type="text"
													name="videoUrl"
													id="videoUrl"
													className={`${style.input}`}
													value={link.url}
													onChange={(e) => {
														const updatedData = [...courseContentData];
														updatedData[index].links[linkIndex].url =
															e.target.value;
														setCourseContentData(updatedData);
													}}
													placeholder="Source Code ... [Link URL]"
												/>
											</div>
										))}
										<br />
										<div className="inline-block-mb-4">
											<p
												className="flex items-center text-[14px] dark:text-white text-black cursor-pointer"
												onClick={() => addLinkHandler(index)}
											>
												<BsLink45Deg className="mr-2 text-[18px]" /> Add Link
											</p>
										</div>
									</>
								) : (
									<div></div>
								)}
								<br />
								{index === courseContentData.length - 1 && (
									<div>
										<p
											className="flex items-center text-[14px] dark:text-white text-black cursor-pointer"
											onClick={() => addCourseContentHandler(item)}
										>
											<AiOutlinePlusCircle className="mr-2 text-[18px]" /> Add
											New Content
										</p>
									</div>
								)}
							</div>
						</>
					);
				})}
				<br />
				<div
					className="flex items-center cursor-pointer text-[20px] dark:text-white text-black"
					onClick={addNewSectionHandler}
				>
					<AiOutlinePlusCircle className="mr-2 text-[18px]" />
					Add Section
				</div>
			</form>
			<br />
			<div className="flex justify-between space-x-4">
				<div className={`${style.profileButton}`} onClick={prevOptionHandler}>
					Previous{" "}
				</div>
				<div className={`${style.profileButton}`} onClick={nextOptionHandler}>
					Next
				</div>
			</div>
		</div>
	);
};

export default CourseContent;
