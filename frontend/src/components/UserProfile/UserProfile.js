import { useSelector } from "react-redux";

export default function UserProfile() {

    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <h2>{sessionUser?.firstName} {sessionUser?.lastName} Profile</h2>
        </>
    )
}
