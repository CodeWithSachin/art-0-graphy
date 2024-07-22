"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import Loader from "../Loader/Loader";
import {
	useDeleteUserMutation,
	useGetAllUsersQuery,
	useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { style } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
	isTeam: boolean;
};

const AllUsers: React.FC<Props> = ({ isTeam }) => {
	const [active, setActive] = useState(false);
	const { theme, setTheme } = useTheme();
	const [email, setEmail] = useState("");
	const [role, setRole] = useState("admin");
	const [userId, setUserId] = useState("");
	const [open, setOpen] = useState(false);

	const [updateUserRole, { error: updateError, isSuccess: updateSuccess }] =
		useUpdateUserRoleMutation();
	const { isLoading, data, refetch } = useGetAllUsersQuery(
		{},
		{ refetchOnMountOrArgChange: true }
	);
	const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
		useDeleteUserMutation({});

	useEffect(() => {
		if (updateError) {
			if ("data" in updateError) {
				const errorMessage = updateError as any;
				toast.error(errorMessage.data.message);
			}
		}
		if (updateSuccess) {
			refetch();
			toast.success("User role updated successfully");
			setActive(false); // Changed setActive to setOpen
		}
		if (deleteSuccess) {
			refetch();
			toast.success("Delete user successfully!");
			setOpen(false);
		}
		if (deleteError) {
			if ("data" in deleteError) {
				const errorMessage = deleteError as any;
				toast.error(errorMessage.data.message);
			}
		}
	}, [updateError, updateSuccess, deleteSuccess, deleteError]);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.3 },
		{ field: "name", headerName: "Name", flex: 0.7 },
		{ field: "email", headerName: "Email", flex: 1 },
		{ field: "role", headerName: "Role", flex: 0.5 },
		{ field: "courses", headerName: "Purchased Courses", flex: 0.5 },
		{ field: "createdAt", headerName: "Joined At", flex: 0.5 },
		{
			field: "",
			headerName: "Delete",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<>
						<Button
							onClick={() => {
								setOpen(!open);
								setUserId(params.row.id);
							}}
						>
							<AiOutlineDelete
								className="dark:text-white text-black"
								size={20}
							/>
						</Button>
					</>
				);
			},
		},
		{
			field: " ",
			headerName: "Email",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<>
						<a href={`mailto${params.row.email}`} target="_blank">
							<Button>
								<AiOutlineMail
									className="dark:text-white text-black"
									size={20}
								/>
							</Button>
						</a>
					</>
				);
			},
		},
	];

	const rows: any[] = [];
	if (isTeam) {
		const newData =
			data && data.user.filter((data: any) => data.role === "admin");
		newData &&
			newData.forEach((item: any) => {
				rows.push({
					id: item._id,
					name: item.name,
					email: item.email,
					role: item.role,
					courses: item.courses.length,
					createdAt: format(item.createdAt),
				});
			});
	} else {
		data &&
			data.user.forEach((item: any) => {
				rows.push({
					id: item._id,
					name: item.name,
					email: item.email,
					role: item.role,
					courses: item.courses.length,
					createdAt: format(item.createdAt),
				});
			});
	}

	const deleteUserHandler = async () => {
		await deleteUser(userId);
	};
	const updateUserRoleHandler = async () => {
		if (!!!email || !!!role) {
			toast.error("Please fill all fields to proceed.");
		} else {
			await updateUserRole({ email, role });
		}
	};

	return (
		<div className="mt-[120px]">
			{isLoading ? (
				<Loader />
			) : (
				<Box m="20px">
					{isTeam && (
						<div className="flex justify-end w-full">
							<button
								className={`${style.button} !h-[35px] !w-[250px]`}
								onClick={() => setActive(!active)}
							>
								Add New Member
							</button>
						</div>
					)}
					<Box
						m="20px 0 0"
						height="80vh"
						sx={{
							"& .MuiDataGrid-root": {
								border: "none",
								outline: "none",
							},
							"& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-sortIcon": {
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-row": {
								color: theme === "dark" ? "#fff" : "#000",
								borderBottom:
									theme === "dark"
										? "1px solid #ffffff30!important"
										: "1px solid #ccc!important",
							},
							"& .MuiTablePagination-root": {
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-cell": {
								borderBottom: "none",
							},
							"& .name-column--cell": {
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-columnHeaders": {
								backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
								borderBottom: "none",
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-virtualScroller": {
								backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
							},
							"& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
								color: theme === "dark" ? "#fff" : "#000",
								backgroundColor:
									theme === "dark"
										? "#3e4396 !important"
										: "#A4A9FC !important",
							},
							"& .MuiDataGrid-footerContainer": {
								color: theme === "dark" ? "#fff" : "#000",
								borderTop: "none",
								backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
							},
							"& .MuiCheckbox-root": {
								color:
									theme === "dark" ? "#b7ebde !important" : "#000 !important",
							},
							"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
								color: "#fff !important",
							},
						}}
					>
						<DataGrid checkboxSelection rows={rows} columns={columns} />
					</Box>
				</Box>
			)}
			{active && (
				<Modal
					open={active}
					onClose={() => setActive(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none space-y-5">
						<div className="w-full my-4">
							<label htmlFor="userName" className="dark:text-white text-black">
								Email
							</label>
							<input
								type="email"
								name="email"
								id="userName"
								required
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`${style.input} !w-[95%] mb-2 800px:mb-0`}
							/>
						</div>
						<div className="w-full my-4">
							{/* <label htmlFor="userName" className="dark:text-white text-black">
								Role
							</label> */}
							<FormControl fullWidth>
								<InputLabel
									id="demo-simple-select-label"
									className={`!w-[95%] mb-2 800px:mb-0 dark:text-white text-black`}
								>
									Role
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={role}
									label="Age"
									onChange={(e: any) => setRole(e.target.value)}
									className={`dark:text-white text-black !w-[95%] mb-2 800px:mb-0`}
								>
									<MenuItem value={"admin"}>Admin</MenuItem>
									<MenuItem value={"user"}>User</MenuItem>
								</Select>
							</FormControl>
						</div>
						<div className="flex justify-center space-x-8 mb-4">
							<div
								className={`${style.button} !w-[120px] m-0 !h-[30px] !bg-red-600`}
								onClick={() => setActive(!active)}
							>
								Cancel
							</div>
							<div
								className={`${style.button} !w-[120px] !h-[30px]`}
								onClick={updateUserRoleHandler}
							>
								Add
							</div>
						</div>
					</Box>
				</Modal>
			)}
			{open && (
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none space-y-5">
						<h1 className={style.title}>
							Are you Sure you want delete this user?
						</h1>
						<div className="flex justify-center space-x-8 mb-4">
							<div
								className={`${style.button} !w-[120px] m-0 !h-[30px]`}
								onClick={() => setOpen(!open)}
							>
								Cancel
							</div>
							<div
								className={`${style.button} !w-[120px] !h-[30px] !bg-red-600 text-white`}
								onClick={deleteUserHandler}
							>
								Delete
							</div>
						</div>
					</Box>
				</Modal>
			)}
		</div>
	);
};

export default AllUsers;
