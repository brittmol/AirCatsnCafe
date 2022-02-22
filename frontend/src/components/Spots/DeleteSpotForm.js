import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeSpot } from "../../store/spots";

function DeleteSpotForm({spot}) {
//   const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
//   const spots = useSelector((store) => store.spotReducer);
//   const spot = spots[spotId];

  console.log("spot hostId", spot?.hostId);
  console.log("session user", sessionUser?.id);


  let deleteBtn = <button
  onClick={() => {
    dispatch(removeSpot(spot));
    history.push(`/spots`);
  }}
>
  <i className="fas fa-trash-alt" />
  Delete Spot
</button>

  return  <>{spot?.hostId === sessionUser?.id ? deleteBtn : null}</>;
}

export default DeleteSpotForm;
