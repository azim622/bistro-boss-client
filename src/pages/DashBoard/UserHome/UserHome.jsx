import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
    const {user} = useAuth()
  return (
    <div>
      <div>
        <h2 className="text-2xl">
          <span>Welcome Back</span>
        </h2>
        {user?.displayName ? user?.displayName : "back"}
      </div>
    </div>
  );
};

export default UserHome;
