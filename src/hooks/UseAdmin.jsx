import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxios from "./UseAxios";

const UseAdmin = () => {
    const {user} = useAuth()
    const axiosSecure = UseAxios()
    const {data: isAdmin , isPending:isAdminLoading} =useQuery({
        queryKey : [user?.email , 'isAdmin'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`)
            console.log(res.data)
            return res.data?.admin
        }

    })
    return [isAdmin , isAdminLoading]
};

export default UseAdmin;