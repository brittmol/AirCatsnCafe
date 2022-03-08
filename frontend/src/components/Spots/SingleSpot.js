import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { useParams} from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import DeleteSpotForm from "./DeleteSpotForm";

export default function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch, spotId]);

  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <DeleteSpotForm spot={spot} />
      <EditSpotForm spot={spot} />
    </>
  );
}
