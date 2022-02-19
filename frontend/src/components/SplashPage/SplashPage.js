import { Link } from "react-router-dom";

export default function SplashPage() {
  return (
    <>
      <break></break>
      <Link to={`/spots/`}>Give me all the Cat Cafes!</Link>
    </>
  );
}
