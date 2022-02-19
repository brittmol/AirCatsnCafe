import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import { removeSpot } from "../../store/spots";

export default function SingleSpot() {
  const { spotId } = useParams();
  const history = useHistory();
  //   console.log("spotId", spotId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots(spotId));
  }, [dispatch, spotId]);

  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];

  return (
    <>
      <h1>I made it to {spot?.title} </h1>
      <button
        onClick={() => {
          dispatch(removeSpot(spot));
          history.push(`/spots`);
        }}
      >
        <i className="fas fa-trash-alt" />
        Delete Spot
      </button>
      <EditSpotForm />
      {/* <button>
        <Link to={`/spots/${spot?.id}/edit`} spot={spot}>
          Edit Spot
        </Link>
      </button> */}
    </>
  );
}
