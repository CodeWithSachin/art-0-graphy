import { style } from "@/app/styles/style";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
	active: number;
	setActive: (active: number) => void;
	benefits: { title: string }[];
	setBenefits: (benefits: { title: string }[]) => void;
	prerequisites: { title: string }[];
	setPrerequisites: (benefits: { title: string }[]) => void;
};

const CourseData: React.FC<Props> = ({
	active,
	setActive,
	benefits,
	setBenefits,
	prerequisites,
	setPrerequisites,
}) => {
	const benefitHandler = (index: number, value: any) => {
		const updatedBenefits = [...benefits];
		updatedBenefits[index].title = value;
		setBenefits(updatedBenefits);
	};

	const addBenefitHandler = () => {
		setBenefits([...benefits, { title: "" }]);
	};
	const prerequisiteHandler = (index: number, value: any) => {
		const updatedPrerequisites = [...prerequisites];
		updatedPrerequisites[index].title = value;
		setPrerequisites(updatedPrerequisites);
	};

	const addPrerequisiteHandler = () => {
		setPrerequisites([...prerequisites, { title: "" }]);
	};
	const nextOptionHandler = () => {
		if (
			benefits.some((data: any) => !!!data.title) ||
			prerequisites.some((data: any) => !!!data.title)
		) {
			toast.error("Please complete all fields to proceed.");
		} else {
			setActive(active + 1);
		}
	};
	const prevOptionHandler = () => {
		setActive(active - 1);
	};

	return (
		<div className="w-[80%] m-auto mt-24 block">
			<div>
				<label htmlFor="benefit" className={`${style.label} text-[20px]`}>
					What are the Benefits for students in this course?
				</label>
				<br />
				{benefits.map((benefit: any, index: number) => (
					<input
						key={index}
						type="text"
						name="benefit"
						id="benefit"
						required
						value={benefit.title}
						onChange={(e: any) => benefitHandler(index, e.target.value)}
						className={`${style.input} my-2`}
						placeholder="You will be able to build fullstack LMS platform..."
					/>
				))}
				<AddCircleIcon
					className="dark:text-white text-black"
					style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
					onClick={addBenefitHandler}
				/>
			</div>
			<br />
			<div>
				<label htmlFor="benefit" className={`${style.label} text-[20px]`}>
					What are the Prerequisites for students in this course?
				</label>
				<br />
				{prerequisites.map((prerequisite: any, index: number) => (
					<input
						key={index}
						type="text"
						name="prerequisite"
						id="prerequisite"
						required
						value={prerequisite.title}
						onChange={(e: any) => prerequisiteHandler(index, e.target.value)}
						className={`${style.input} my-2`}
						placeholder="You need basic knowledge of MERN stack..."
					/>
				))}
				<AddCircleIcon
					className="dark:text-white text-black"
					style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
					onClick={addPrerequisiteHandler}
				/>
			</div>
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

export default CourseData;
