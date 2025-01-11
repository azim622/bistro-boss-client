import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import UseAxiosPublic from "../../hooks/UseAxiosPublic";
import { useNavigate } from "react-router-dom";

const Sociallogin = () => {
    const axiosPublic = UseAxiosPublic()
    const {googleSignIn} = useAuth()
    const navigate = useNavigate()
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                email: result.user?.email,
                name : result.user?.displayName
            }
            axiosPublic.post('/users' , userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
    return (
        <div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-neutral">
                    <FaGoogle></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default Sociallogin;