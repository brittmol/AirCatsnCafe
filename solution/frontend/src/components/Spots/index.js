import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
// import { Link } from "react-router-dom";

export default function Spots() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const spots = useSelector((store) => store.spotReducer);
  const spotsArr = Object.values(spots);
  console.log("spots Array ****", spotsArr);

  return (
    <>
      <h1>spots!</h1>
      {spotsArr?.map((spot) => (
        <div key={spot?.id}>{spot.title}</div>
      ))}
    </>
  );
}
