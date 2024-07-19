import { style } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
	setRoute: (route: string) => void;
};

type TVerifyNumber = {
	"0": string;
	"1": string;
	"2": string;
	"3": string;
};

const Verification: React.FC<Props> = ({ setRoute }) => {
	const { token } = useSelector((state: any) => state.auth);
	const [activation, { isSuccess, error }] = useActivationMutation();

	const [invalidError, setInvalidError] = useState<boolean>(false);

	useEffect(() => {
		if (isSuccess) {
			const message = "Account Activated Successfully";
			toast.success(message);
			setRoute("Login");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData.data.message);
				setInvalidError(true);
			} else {
				console.log("An Error occurred: ", error);
			}
		}
	}, [isSuccess, error]);

	const inputRefs = [
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
		useRef<HTMLInputElement>(null),
	];

	const [verifyNumber, setVerifyNumber] = useState<TVerifyNumber>({
		0: "",
		1: "",
		2: "",
		3: "",
	});

	const verificationHandler = async () => {
		const verificationNumber = Object.values(verifyNumber).join("");
		if (verificationNumber.length !== 4) {
			setInvalidError(true);
			return;
		}
		await activation({
			activation_token: token,
			activation_code: verificationNumber,
		});
	};

	const handleInputChange = (index: number, value: string) => {
		setInvalidError(false);
		const newVerifyNumber = { ...verifyNumber, [index]: value };
		setVerifyNumber(newVerifyNumber);
		if (value === "" && index > 0) {
			inputRefs[index - 1].current?.focus();
		} else if (value.length === 1 && index < 3) {
			inputRefs[index + 1].current?.focus();
		}
	};

	return (
		<div>
			<h1 className={`${style.title}`}>Verify your Account</h1>
			<br />
			<div className="w-full flex justify-center items-center mt-2">
				<div className="flex justify-center items-center w-[80px] h-[80px] rounded-full bg-blue-500">
					<VscWorkspaceTrusted
						size={40}
						className="text-black dark:text-white"
					/>
				</div>
			</div>
			<br />
			<br />
			<div className="1100px:w-[70%] m-auto flex justify-around items-center">
				{Object.keys(verifyNumber).map((key, index) => (
					<input
						type="number"
						key={key}
						ref={inputRefs[index]}
						className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white text-[18px] font-Poppins outline-none text-center ${
							invalidError
								? "shake border-red-500"
								: "dark:border-white border-[#0000004a]"
						} 
                    
                        `}
						maxLength={1}
						value={verifyNumber[key as keyof TVerifyNumber]}
						onChange={(e) => handleInputChange(index, e.target.value)}
					/>
				))}
			</div>
			<br />
			<br />
			<div className="w-full flex justify-center">
				<button className={`${style.button}`} onClick={verificationHandler}>
					Verify OTP
				</button>
			</div>
			<br />
			<h5 className={`${style.heading5}`}>
				Go back to Sign In?{" "}
				<span
					className="text-blue-500 pl-1 cursor-pointer"
					onClick={() => setRoute("Login")}
				>
					{" "}
					Sign In
				</span>
			</h5>
		</div>
	);
};

export default Verification;
