import { style } from "@/app/styles/style";
import {
	useEditLayoutMutation,
	useGetLayoutQuery,
} from "@/redux/features/layout/layoutApi";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
	const { data, isLoading, refetch } = useGetLayoutQuery("FAQ", {
		refetchOnMountOrArgChange: true,
	});
	const [question, setQuestion] = React.useState<any[]>([]);
	const [editLayout, { isLoading: isLoadingEdit, isSuccess, error }] =
		useEditLayoutMutation();

	React.useEffect(() => {
		if (data) {
			setQuestion(data?.layout?.faq);
		}
		if (isSuccess) {
			refetch();
			toast.success("FAQ updated successfully");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				toast.error(errorData?.data?.message);
			}
		}
	}, [data, isSuccess, error]);

	const handleQuestionToggle = (id: any) => {
		setQuestion((prev: any) =>
			prev.map((item: any) =>
				item._id === id ? { ...item, active: !item.active } : item
			)
		);
	};
	const handleQuestionChange = (id: any, value: any) => {
		setQuestion((prev: any) =>
			prev.map((item: any) =>
				item._id === id ? { ...item, question: value } : item
			)
		);
	};
	const handleAnswerChange = (id: any, value: any) => {
		setQuestion((prev: any) =>
			prev.map((item: any) =>
				item._id === id ? { ...item, answer: value } : item
			)
		);
	};

	const newFaqHandler = () => {
		setQuestion([...question, { question: "", answer: "" }]);
	};

	const areQuestionsUnchanged = (
		originalQuestions: any[],
		newQuestions: any[]
	) => {
		if (JSON.stringify(originalQuestions) === JSON.stringify(newQuestions))
			return true;
		return false;
	};

	const isAnyQuestionEmpty = (questions: any[]) => {
		return questions.some((q) => q.question === "" || q.answer === "");
	};

	const handleSave = async () => {
		if (
			!areQuestionsUnchanged(data?.layout?.faq, question) &&
			!isAnyQuestionEmpty(question)
		) {
			await editLayout({
				type: "FAQ",
				faq: question,
			});
		}
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="w-[90%] m-auto mt-[120px] 800px:w-[80%]">
					<div className="mt-12">
						<dl className="space-y-8">
							{question.map((q: any) => (
								<div
									key={q._id}
									className={`${
										q._id !== question[0]._id && "border-t"
									} border-gray-200 pt-6`}
								>
									<dt className="text-lg leading-6 font-medium text-gray-900">
										<button
											className="flex items-center w-full justify-center dark:text-white text-black text-left focus:outline-none"
											onClick={() => handleQuestionToggle(q._id)}
										>
											<input
												type="text"
												placeholder="Add your question here"
												name=""
												id=""
												value={q.question}
												onChange={(e) =>
													handleQuestionChange(q._id, e.target.value)
												}
												className={`${style.input} border-none`}
											/>
											<span className="ml-6 flex-shrink-0">
												{q.active ? (
													<HiMinus className="text-black dark:text-white h-6 w-6" />
												) : (
													<HiPlus className="text-black dark:text-white h-6 w-6" />
												)}
											</span>
										</button>
									</dt>
									{q.active && (
										<dd className="mt-2 pr-12">
											<input
												value={q.answer}
												onChange={(e: any) =>
													handleAnswerChange(q._id, e.target.value)
												}
												className={`${style.input} border-none`}
												placeholder="Add your answer here"
											/>
											<span className="ml-6 flex-shrink-0">
												<AiOutlineDelete
													className="text-black dark:text-white h-6 w-6"
													onClick={() =>
														setQuestion((previousQuestion) =>
															previousQuestion.filter(
																(item: any) => item._id !== q._id
															)
														)
													}
												/>
											</span>
										</dd>
									)}
								</div>
							))}
						</dl>
						<br />
						<br />
						<br />
						<IoMdAddCircleOutline
							className="text-black dark:text-white h-6 w-6"
							onClick={newFaqHandler}
						/>
					</div>
					<br />
					<br />
					<div
						className={`${
							style.button
						} !w-[100px] !min-w-[40px] dark:bg-white text-black bg-[#cccccc34]  ${
							!areQuestionsUnchanged(data?.layout?.faq, question) ||
							!isAnyQuestionEmpty(question)
								? "!cursor-pointer !bg-[#42d383]"
								: "!cursor-not-allowed !bg-[#4a4a4a]"
						} absolute right-12 bottom-12`}
						onClick={
							!areQuestionsUnchanged(data?.layout?.faq, question) ||
							!isAnyQuestionEmpty(question)
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

export default EditFaq;
