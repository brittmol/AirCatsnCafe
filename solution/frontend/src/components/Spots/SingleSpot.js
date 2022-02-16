import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function SingleSpot() {
  const { spotId } = useParams();
  console.log("spotId", spotId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch]);

  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId]

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
    </>
  );
}
