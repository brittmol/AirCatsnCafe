import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { updateSpot } from "../../store/spots";

function EditSpotForm({ spot }) {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState(spot?.title || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [address, setAddress] = useState(spot?.address || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [zipCode, setZipCode] = useState(spot?.zipCode || "");
  const [errors, setErrors] = useState([]);

  //   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: spotId,
      title,
      description,
      address,
      city,
      state,
      zipCode,
      hostId: sessionUser.id,
    };

    // console.log("errorrrrrrrrrrrrrrrrrrrrrs", errors);
    setErrors([]);
    const spot = await dispatch(updateSpot(payload)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) return setErrors(data.errors);
    });
    // console.log("errors after", errors);

    if (spot) {
      history.push(`/spots/${spotId}`);
    }
  };

  return (
    <>
      <h1>Edit Spot</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <button type="submit">Edit Spot</button>
      </form>
    </>
  );
}

export default EditSpotForm;
