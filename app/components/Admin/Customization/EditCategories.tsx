import {
	useGetLayoutQuery,
	useEditLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import React from "react";
import Loader from "../../Loader/Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
	const { data, isLoading, refetch } = useGetLayoutQuery("Categories", {
		refetchOnMountOrArgChange: true,
	});
	const [editCategories, { isSuccess, error }] = useEditLayoutMutation();
	const [categories, setCategories] = React.useState<any[]>([]);
	React.useEffect(() => {
		if (data) {
			setCategories(data?.layout?.categories);
		}
		if (isSuccess) {
			refetch();
			toast.success("Categories updated successfully");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData?.data?.message);
			}
		}
	}, [data, isSuccess, error]);

	const handleCategoryAdd = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		setCategories(
			categories.map((category, i) =>
				i === index ? { ...category, title: e.target.value } : category
			)
		);
	};
	const newCategoriesHandler = () => {
		if (categories[categories.length - 1].title === "") {
			toast.error("Category Title is required");
		} else {
			setCategories([...categories, { title: "" }]);
		}
	};
	const areCategoriesUnchanged = (
		oldCategories: any[],
		newCategories: any[]
	) => {
		return JSON.stringify(oldCategories) === JSON.stringify(newCategories);
	};

	const isAnyCategoryEmpty = (categories: any[]) => {
		return categories.some((category) => category.title === "");
	};

	const handleSave = () => {
		if (
			!areCategoriesUnchanged(data?.layout?.categories, categories) &&
			!isAnyCategoryEmpty(categories)
		) {
			const payload = {
				type: "category",
				categories,
			};
			editCategories(payload);
		}
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="mt-[120px] text-center">
					<h1 className={`${style.title}`}>All Categories</h1>
					{categories &&
						categories.map((category: any, index: number) => {
							return (
								<div key={index} className="p-3">
									<div className="flex w-full items-center justify-center">
										<input
											value={category.title}
											onChange={(e) => handleCategoryAdd(e, index)}
											placeholder="Category Title"
											className={`${style.input} w-[unset] !border-none !text-[20px]`}
										/>
										<AiOutlineDelete
											className="dark:text-white text-[18px] cursor-pointer"
											onClick={() =>
												setCategories(
													categories.filter(
														(item: any) => item._id !== category._id
													)
												)
											}
										/>
									</div>
								</div>
							);
						})}
					<br />
					<br />
					<div className="w-full flex justify-center">
						<IoMdAddCircleOutline
							className="dark:text-white text-[30px] cursor-pointer"
							onClick={newCategoriesHandler}
						/>
					</div>
					<br />
					<br />
					<div
						className={`${
							style.button
						} !w-[100px] !min-w-[40px] dark:bg-white text-black bg-[#cccccc34]  ${
							!areCategoriesUnchanged(data?.layout?.categories, categories) ||
							!isAnyCategoryEmpty(categories)
								? "!cursor-pointer !bg-[#42d383]"
								: "!cursor-not-allowed !bg-[#4a4a4a]"
						} absolute right-12 bottom-12`}
						onClick={
							!areCategoriesUnchanged(data?.layout?.categories, categories) ||
							!isAnyCategoryEmpty(categories)
								? handleSave
								: () => Promise<void>
						}
					>
						Save
					</div>
				</div>
			)}
		</>
	);
};

export default EditCategories;
