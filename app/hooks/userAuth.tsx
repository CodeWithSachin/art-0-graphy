import { useSelector } from "react-redux";
import type { RootState } from "../constant.index";

export default function UserAuth() {
	const { user } = useSelector((state: RootState) => state.auth);
	if (user) {
		return true;
	} else {
		return false;
	}
}
