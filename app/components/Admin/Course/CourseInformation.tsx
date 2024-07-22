import { style } from "@/app/styles/style";
import React from "react";

type Props = {
	active: number;
	setActive: (active: number) => void;
	courseInfo: any;
	setCourseInfo: (courseInfo: any) => void;
};

const CourseInformation: React.FC<Props> = ({
	active,
	setActive,
	courseInfo,
	setCourseInfo,
}) => {
	const [dragging, setDragging] = React.useState(false);
	const handleActive = (e: any) => {
		e.preventDefault();
		setActive(active + 1);
	};
	const fileChangeHandler = async (e: any) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		fileReader.onload = () => {
			if (fileReader.readyState === 2) {
				setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
			}
		};
		fileReader.readAsDataURL(file);
	};

	const handleDragOver = (e: any) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = (e: any) => {
		e.preventDefault();
		setDragging(false);
	};

	const handleDrop = (e: any) => {
		e.preventDefault();
		setDragging(false);
		const file = e.dataTransfer.files?.[0];
		if (file) {
			const fileReader = new FileReader();
			fileReader.onload = () => {
				setCourseInfo({ ...courseInfo, thumbnail: fileReader.result });
			};
			fileReader.readAsDataURL(file);
		}
	};
	return (
		<div className="w-[80%] m-auto mt-24">
			<form onSubmit={handleActive} className={`${style.label}`}>
				<div>
					<label htmlFor="courseName">Course name</label>
					<input
						type="text"
						name=""
						id="courseName"
						required
						value={courseInfo.name}
						onChange={(e: any) =>
							setCourseInfo({ ...courseInfo, name: e.target.value })
						}
						className={`${style.input}`}
						placeholder="MERN stack LMS platform with NextJs"
					/>
				</div>
				<br />
				<div>
					<label htmlFor="courseDescription">Course Description</label>
					<textarea
						cols={30}
						rows={10}
						name=""
						id="courseDescription"
						required
						value={courseInfo.description}
						onChange={(e: any) =>
							setCourseInfo({ ...courseInfo, description: e.target.value })
						}
						className={`${style.input} !py-2 !h-min`}
						placeholder="Write something amazing..."
					></textarea>
				</div>
				<br />
				<div className="w-full flex justify-between">
					<div className="w-[48%]">
						<label htmlFor="coursePrice">Course Price</label>
						<input
							type="number"
							name=""
							id="coursePrice"
							required
							value={courseInfo.price}
							onChange={(e: any) =>
								setCourseInfo({ ...courseInfo, price: e.target.value })
							}
							className={`${style.input}`}
							placeholder="29"
						/>
					</div>
					<div className="w-[48%]">
						<label htmlFor="courseEstimatedPrice">
							Course Estimated Price (Optional)
						</label>
						<input
							type="number"
							name=""
							id="courseEstimatedPrice"
							value={courseInfo.estimatedPrice}
							onChange={(e: any) =>
								setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
							}
							className={`${style.input}`}
							placeholder="29"
						/>
					</div>
				</div>
				<br />
				<div>
					<label htmlFor="courseTags">Course Tags</label>
					<input
						type="text"
						name=""
						id="courseTags"
						required
						value={courseInfo.tags}
						onChange={(e: any) =>
							setCourseInfo({ ...courseInfo, tags: e.target.value })
						}
						className={`${style.input} !py-2 !h-min`}
						placeholder="MERN, NextJs, Socket.io, tailwind css, LMS"
					></input>
				</div>
				<br />
				<div className="w-full flex justify-between">
					<div className="w-[48%]">
						<label htmlFor="courseLevel">Course Level</label>
						<input
							type="text"
							name=""
							id="courseLevel"
							required
							value={courseInfo.level}
							onChange={(e: any) =>
								setCourseInfo({ ...courseInfo, level: e.target.value })
							}
							className={`${style.input}`}
							placeholder="Beginner / Intermediate / Expert"
						/>
					</div>
					<div className="w-[48%]">
						<label htmlFor="courseDemoUrl">Demo URL</label>
						<input
							type="text"
							name=""
							id="courseDemoUrl"
							value={courseInfo.demoUrl}
							onChange={(e: any) =>
								setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
							}
							className={`${style.input}`}
							placeholder="Dulnr8YvJW8"
						/>
					</div>
				</div>
				<br />
				<div className="w-full">
					<input
						type="file"
						name="thumbnail"
						className="hidden"
						id="thumbnail"
						accept="image/*"
						onChange={fileChangeHandler}
					/>
					<label
						htmlFor="thumbnail"
						className={`rounded-md w-full min-h-[10vh] border-2 dark:border-white border-[#00000026] p-3  flex items-center justify-center ${
							dragging ? "bg-blue-500" : "bg-transparent"
						}
						`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						{courseInfo.thumbnail ? (
							// eslint-disable-next-line @next/next/no-img-element
							<img
								src={courseInfo.thumbnail}
								alt="thumbnail"
								className="max-h-full w-full object-cover"
							/>
						) : (
							<span className="text-black dark:text-white">
								Drag and drop thumbnail here or click to browse
							</span>
						)}
					</label>
				</div>
				<br />
				<input
					type="submit"
					value="Next"
					className={`${style.profileButton}`}
				/>
			</form>
		</div>
	);
};

export default CourseInformation;
