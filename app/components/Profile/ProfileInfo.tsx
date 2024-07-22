import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avatarDefault from "@/public/assets/user.png";
import { AiOutlineCamera } from "react-icons/ai";
import { style } from "@/app/styles/style";
import {
	useEditProfileMutation,
	useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
	user: any;
	avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
	const [name, setName] = useState(user && user.name);

	const [
		editProfile,
		{ isSuccess: editProfileIsSuccess, error: editProfileError },
	] = useEditProfileMutation();
	const [
		updateAvatar,
		{ isSuccess: updateAvatarIsSuccess, error: updateAvatarError },
	] = useUpdateAvatarMutation();
	const [loadUser, setLoadUser] = useState(false);
	const {} = useLoadUserQuery(undefined, { skip: !loadUser ? true : false });
	const imageHandler = async (e: any) => {
		const file = e.target.files[0];
		const fileReader = new FileReader();
		fileReader.onload = () => {
			if (fileReader.readyState === 2) {
				const avatar = fileReader.result;
				updateAvatar(avatar);
			}
		};
		fileReader.readAsDataURL(file);
	};
	useEffect(() => {
		if (updateAvatarIsSuccess || editProfileIsSuccess) {
			setLoadUser(true);
			toast.success(
				updateAvatarIsSuccess
					? "Avatar updated successfully"
					: "Profile updated successfully"
			);
		}
		if (updateAvatarError || editProfileError) {
			console.log(updateAvatarError);
		}
	}, [
		updateAvatarIsSuccess,
		editProfileIsSuccess,
		updateAvatarError,
		editProfileError,
	]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (!!!!name) {
			await editProfile({
				name: name,
			});
		}
	};
	return (
		<>
			<div className="w-full flex justify-center">
				<div className="relative">
					<Image
						src={
							user?.avatar || avatar
								? user?.avatar?.url || avatar
								: avatarDefault
						}
						alt=""
						className="rounded-full w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a29a] aspect-square object-cover"
						width={120}
						height={120}
					/>
					<input
						type="file"
						name="avatar"
						id="avatar"
						className="hidden"
						onChange={imageHandler}
						accept="image/png, image/jpg, image/jpeg"
					/>
					<label htmlFor="avatar">
						<div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
							<AiOutlineCamera size={20} className="text-white  z-1" />
						</div>
					</label>
				</div>
			</div>
			<br />
			<br />
			<div className="w-full pl-6 800px:pl-10">
				<form onSubmit={handleSubmit}>
					<div className="m-auto block pb-4 800px:w-[50%]">
						<div className="w-full my-4">
							<label htmlFor="userName" className="dark:text-white text-black">
								Full Name
							</label>
							<input
								type="text"
								name="userName"
								id="userName"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className={`${style.input} !w-[95%] mb-2 800px:mb-0`}
							/>
						</div>
						<div className="w-full my-4">
							<label htmlFor="userEmail" className="dark:text-white text-black">
								Email
							</label>
							<input
								type="text"
								name="userEmail"
								id="userEmail"
								readOnly
								value={user.email}
								className={`${style.input} !w-[95%] mb-2 800px:mb-0`}
							/>
						</div>
						<input
							className={`${style.profileButton} mt-4`}
							type="submit"
							value="Update"
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProfileInfo;
