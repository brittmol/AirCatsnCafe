import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";

export default function SingleSpot() {
  const { spotId } = useParams();
  //   console.log("spotId", spotId);
  // idk
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch, spotId]);

  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];

  return (
    <>
      <h1>I made it to {spot?.title} </h1>

      <EditSpotForm spot={spot} />
    </>
  );
}
