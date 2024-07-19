import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { style } from "../../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
	setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
	name: Yup.string().required("Please enter your Name"),
	email: Yup.string()
		.email("Invalid email")
		.required("Please enter your email"),
	password: Yup.string().required("Please enter your password").min(6),
});

const SignUp: React.FC<Props> = ({ setRoute }) => {
	const [show, setShow] = useState(false);
	const [register, { isSuccess, data, error }] = useRegisterMutation();
	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Registration Successful";
			toast.success(message);
			setRoute("Verification");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	const formik = useFormik({
		initialValues: { name: "", email: "", password: "" },
		validationSchema: schema,
		onSubmit: async ({ name, email, password }) => {
			const data = { name, email, password };
			await register(data);
		},
	});

	const { errors, touched, values, handleChange, handleSubmit } = formik;

	return (
		<div className="w-full">
			<h1 className={`${style.title}`}>Join to ART_0_GRAPHY</h1>
			<form onSubmit={handleSubmit}>
				<div className="w-full mt-5 relative mb-1">
					<label htmlFor="name" className={`${style.label}`}>
						Enter your Name
					</label>
					<input
						type="text"
						name=""
						value={values.name}
						onChange={handleChange}
						id="name"
						placeholder="John Doe"
						className={`${errors.name && touched.name && "border-red-500"} ${
							style.input
						}`}
					/>
				</div>
				{errors.name && touched.name && (
					<span className="text-red-500 pt-2 block">{errors.name}</span>
				)}
				<div className="w-full mt-5 relative mb-1">
					<label htmlFor="email" className={`${style.label}`}>
						Enter your Email
					</label>
					<input
						type="email"
						name=""
						value={values.email}
						onChange={handleChange}
						id="email"
						placeholder="SignUp@gmail.com"
						className={`${errors.email && touched.email && "border-red-500"} ${
							style.input
						}`}
					/>
				</div>
				{errors.email && touched.email && (
					<span className="text-red-500 pt-2 block">{errors.email}</span>
				)}
				<div className="w-full mt-5 relative mb-1">
					<label htmlFor="password" className={`${style.label}`}>
						Enter your password
					</label>
					<input
						type={!show ? "password" : "text"}
						name=""
						value={values.password}
						onChange={handleChange}
						id="password"
						placeholder="password@!#"
						className={`${
							errors.password && touched.password && "border-red-500"
						} ${style.input}`}
					/>
					{!show ? (
						<AiOutlineEye
							className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
							size={20}
							onClick={() => setShow(true)}
						/>
					) : (
						<AiOutlineEyeInvisible
							className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
							size={20}
							onClick={() => setShow(false)}
						/>
					)}
				</div>
				{errors.password && touched.password && (
					<span className="text-red-500 pt-2 block">{errors.email}</span>
				)}
				<div className="w-full mt-5">
					<input type="submit" value="SignUp" className={`${style.button}`} />
				</div>
				<h5 className={`${style.heading5}`}>Or join with</h5>
				<div className="flex justify-center items-center my-3">
					<FcGoogle size={30} className="cursor-pointer mr-2" />
					<AiFillGithub
						size={30}
						className="cursor-pointer ml-2 dark:text-white text-black"
					/>
				</div>
				<h5 className={`${style.heading5}`}>
					Already have an account?{" "}
					<span
						className="text-blue-500 pl-1 cursor-pointer"
						onClick={() => setRoute("Login")}
					>
						{" "}
						Sign In
					</span>
				</h5>
			</form>
		</div>
	);
};

export default SignUp;
