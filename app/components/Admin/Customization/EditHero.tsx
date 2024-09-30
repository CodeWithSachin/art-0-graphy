import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import {
	useEditLayoutMutation,
	useGetLayoutQuery,
} from "@/redux/features/layout/layoutApi";
import { style } from "@/app/styles/style";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {};

const EditHero = (props: Props) => {
	const [image, setImage] = React.useState("");
	const [title, setTitle] = React.useState("");
	const [subTitle, setSubTitle] = React.useState("");
	const { data, refetch } = useGetLayoutQuery("Banner", {
		refetchOnMountOrArgChange: true,
	});

	const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

	React.useEffect(() => {
		if (data) {
			setImage(data?.layout?.banner?.image?.url);
			setTitle(data?.layout?.banner?.title);
			setSubTitle(data?.layout?.banner?.subTitle);
		}
		if (isSuccess) {
			refetch();
			toast.success("Layout updated successfully");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData?.data?.message);
			}
		}
	}, [data, isSuccess, error]);

	const handleSave = async () => {
		await editLayout({
			type: "Banner",
			image,
			title,
			subTitle,
		});
	};

	const handleImageChange = (e: any) => {
		const file = e.target.files?.[0];
		const reader = new FileReader();
		reader.onloadend = (img: any) => {
			setImage(img.target.result as string);
		};
		reader.readAsDataURL(file);
	};

	return (
		<div className="w-full 1000px:flex items-center pl-5">
			<div className="absolute top-[100px] w-[50vh] h-[50vh] hero_animation 1000px:top-[unset] 1500px:h-[600px] 1500px:w-[600px] 1100px:h-[500px] 1100px:w-[500px] rounded-full"></div>
			<div className="1000px:w-[40%] relative flex 1000px:min-h-screen items-center justify-end pl-10 pt-[70px] 1000px:pt-[0] z-10">
				<div className="relative flex justify-end items-center">
					<img
						src={image}
						alt="Banner image"
						className="object-contain w-[90%] h-[auto] z-[10] 1100px:max-w-[90%] 1500px:max-w-[85%]"
					/>
					<input
						type="file"
						name="image"
						id="banner_image"
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
					/>
					<label
						htmlFor="banner_image"
						className="absolute bottom-0 right-0  z-20 cursor-pointer"
					>
						<AiOutlineCamera className="dark:text-white text-[18px] text-black cursor-pointer" />
					</label>
				</div>
			</div>
			<div className="1000px:w-[80%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
				<textarea
					className="dark:text-white text-[#000000c7] h-full text-[25px] focus:outline-none px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px: leading-[75px] 1500px:w-[70%] bg-transparent resize-none"
					placeholder="Improve Your Online Learning Experience Instantly"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					rows={4}
				></textarea>
				<br />
				<textarea
					className="text-[#000000ac] font-Josefin focus:outline-none font-[600] h-full text-[18px] 1500px:!w-[70%] 1100px:!w-[78%] 1500px:dark:text-[#edfff4] bg-transparent resize-none"
					placeholder="We have 40k+ Online courses & 500K+ Online registered students. Find your desired Courses from them."
					value={subTitle}
					onChange={(e) => setSubTitle(e.target.value)}
				></textarea>
				<br />
				<br />
				<br />
				<br />
				<div
					className={`${
						style.button
					} !w-[100px] !min-w-[40px] dark:bg-white text-black bg-[#cccccc34] ${
						data?.layout?.banner?.title !== title ||
						data?.layout?.banner?.subtitle !== subTitle ||
						image !== data?.layout?.banner?.image?.url
							? "!cursor-pointer !bg-[#42d383]"
							: "!cursor-not-allowed !bg-[#4a4a4a]"
					} absolute right-12 bottom-12`}
					onClick={
						data?.layout?.banner?.title !== title ||
						data?.layout?.banner?.subtitle !== subTitle ||
						image !== data?.layout?.banner?.image?.url
							? handleSave
							: () => Promise<void>
					}
				>
					Save
				</div>
			</div>
		</div>
	);
};

export default EditHero;
