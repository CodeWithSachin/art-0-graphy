import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Link, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
	useDeleteCourseMutation,
	useGetAllCoursesQuery,
} from "@/redux/features/course/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { style } from "@/app/styles/style";

type Props = {};

const AllCourses = (props: Props) => {
	const { theme, setTheme } = useTheme();
	const [courseId, setCourseId] = useState("");
	const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
		{},
		{ refetchOnMountOrArgChange: true }
	);
	const [open, setOpen] = useState(false);

	const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
		useDeleteCourseMutation({});

	useEffect(() => {
		// if (updateError) {
		// 	if ("data" in updateError) {
		// 		const errorMessage = updateError as any;
		// 		toast.error(errorMessage.data.message);
		// 	}
		// }
		// if (updateSuccess) {
		// 	refetch();
		// 	toast.success("User role updated successfully");
		// 	setOpen(false);
		// }
		if (deleteSuccess) {
			refetch();
			toast.success("Course Deleted successfully!");
			setOpen(false);
		}
		if (deleteError) {
			if ("data" in deleteError) {
				const errorMessage = deleteError as any;
				toast.error(errorMessage.data.message);
			}
		}
	}, [deleteSuccess, deleteError]);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.3 },
		{ field: "title", headerName: "Course Title", flex: 1 },
		{ field: "ratings", headerName: "Ratings", flex: 0.5 },
		{ field: "purchased", headerName: "Purchased", flex: 0.5 },
		{ field: "createdAt", headerName: "Created At", flex: 0.5 },
		{
			field: " ",
			headerName: "Edit",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<>
						<Link
							href={`/admin/edit-course/${params.row.id}`}
							className="items-center flex justify-center h-full"
						>
							<AiOutlineEdit className="dark:text-white text-black" size={20} />
						</Link>
					</>
				);
			},
		},
		{
			field: "",
			headerName: "Delete",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<>
						<Button
							onClick={() => {
								setOpen(true);
								setCourseId(params.row.id);
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
	];

	const rows: any[] = [];

	{
		data &&
			data.course.forEach((item: any) => {
				rows.push({
					id: item._id,
					title: item.name,
					purchased: item.purchased,
					ratings: item.ratings,
					createdAt: format(item.createdAt),
				});
			});
	}
	const deleteCourseHandler = async () => {
		await deleteCourse(courseId);
	};

	return (
		<div className="mt-[120px]">
			{isLoading ? (
				<Loader />
			) : (
				<Box
					m="20px "
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
								theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
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
							Are you Sure you want delete this Course?
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
								onClick={deleteCourseHandler}
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

export default AllCourses;
