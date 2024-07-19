import { style } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
	user: any;
};

const ChangePassword: FC<Props> = ({ user }) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success("Password updated successfully");
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	const handleChangePassword = async (e: any) => {
		e.preventDefault();
		if (newPassword === confirmPassword) {
			await updatePassword({ oldPassword, newPassword });
		} else {
			toast.error("New password and confirmation password do not match");
		}
	};

	return (
		<>
			<div className="w-full flex justify-center">
				<h1 className="text-[25px] 800px:text-[30px] text-black dark:text-white font-Poppins block">
					Change Password
				</h1>
			</div>
			<br />
			<br />
			<div className="w-full pl-6 800px:pl-10">
				<form onSubmit={handleChangePassword}>
					<div className="m-auto block pb-4 800px:w-[50%]">
						<div className="w-full my-4">
							<label htmlFor="userName" className="dark:text-white text-black">
								Old Password
							</label>
							<input
								type="password"
								name="userName"
								id="userName"
								required
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								className={`${style.input} !w-[95%] mb-2 800px:mb-0`}
							/>
						</div>
						<div className="w-full my-4">
							<label htmlFor="userName" className="dark:text-white text-black">
								New Password
							</label>
							<input
								type="password"
								name="userName"
								id="userName"
								required
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className={`${style.input} !w-[95%] mb-2 800px:mb-0`}
							/>
						</div>
						<div className="w-full my-4">
							<label htmlFor="userName" className="dark:text-white text-black">
								Confirm Password
							</label>
							<input
								type="password"
								name="userName"
								id="userName"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
