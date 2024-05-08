import {useMutation} from "@tanstack/react-query";
import {login as loginApi} from "../../services/apiAuth.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
	const navigate = useNavigate();
	const {mutate: login, isLoading} = useMutation({
		mutationFn: ({email, password}) => loginApi({email, password}),
		onSuccess: () => {
			navigate("/dashboard");
		},
		onError: error => {
			console.log('ERROR', error.message);
			toast.error("Provided email or password didn't match!");
		}
	})


	return {login, isLoading};
}
