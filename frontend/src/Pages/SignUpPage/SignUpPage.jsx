import { useContext, useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar"
import SignUp from "../../Components/SignUp/SignUp"
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const _user = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (_user.user) {
            navigate("/")
        }
    }, [_user], navigate)
    return (
        <div>
            <NavBar />
            <SignUp />
        </div>
    )
}

export default SignUpPage