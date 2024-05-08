import useUser from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {
	const navigate = useNavigate();
	// 1. Load the Authenticated user
	const {user, isLoading, isAuthenticated} = useUser();

	// 2. While loading show a spinner

	if (isLoading)
		return (
			<FullPage>
				<Spinner/>
			</FullPage>
		)

	console.log(user)
	// 3. If there is NO authenticated user, redirect to the /login


	return children;
}

export default ProtectedRoute;
