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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
	setRoute: (route: string) => void;
	setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email")
		.required("Please enter your email"),
	password: Yup.string().required("Please enter your password").min(6),
});

const Login: React.FC<Props> = ({ setRoute, setOpen }) => {
	const [show, setShow] = useState(false);

	const [login, { isSuccess, error }] = useLoginMutation();
	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			const message = "Logged In Successfully";
			toast.success(message);
			// setRoute("Verification");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);

	const formik = useFormik({
		initialValues: { email: "", password: "" },
		validationSchema: schema,
		onSubmit: async ({ email, password }) => {
			await login({ email, password });
		},
	});

	const { errors, touched, values, handleChange, handleSubmit } = formik;

	return (
		<div className="w-full">
			<h1 className={`${style.title}`}>Login with ART_0_GRAPHY</h1>
			<form onSubmit={handleSubmit}>
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
						placeholder="login@gmail.com"
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
					<input type="submit" value="Login" className={`${style.button}`} />
				</div>
				<h5 className={`${style.heading5}`}>Or join with</h5>
				<div className="flex justify-center items-center my-3">
					<FcGoogle
						size={30}
						className="cursor-pointer mr-2"
						onClick={() => signIn("google")}
					/>
					<AiFillGithub
						size={30}
						className="cursor-pointer ml-2 dark:text-white text-black"
						onClick={() => signIn("github")}
					/>
				</div>
				<h5 className={`${style.heading5}`}>
					Not have any account?{" "}
					<span
						className="text-blue-500 pl-1 cursor-pointer"
						onClick={() => setRoute("Sign-Up")}
					>
						{" "}
						Sign Up
					</span>
				</h5>
			</form>
		</div>
	);
};

export default Login;
