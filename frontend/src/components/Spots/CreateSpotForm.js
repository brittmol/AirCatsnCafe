import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSpot } from "../../store/spots";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [hrPrice, setHrPrice] = useState("");
  const [errors, setErrors] = useState([]);

  //   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      address,
      city,
      state,
      zipCode,
      hrPrice,
      hostId: sessionUser.id,
    };

    // console.log("errorrrrrrrrrrrrrrrrrrrrrs", errors);
    setErrors([])
    const spot = await dispatch(createSpot(payload))
        .catch(async(res) => {
            const data = await res.json()
            if(data && data.errors) return setErrors(data.errors)
        })
    // console.log("errors after", errors);

    if (spot) {
      history.push(`/spots/${spot.id}`);
    }
  };

  return (
    <>
      <h1>Create Spot</h1>
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
          type="integer"
          placeholder="Price $"
          value={hrPrice}
          onChange={(e) => setHrPrice(e.target.value)}
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
        <button type="submit">Create Spot</button>
      </form>
    </>
  );
}

export default CreateSpotForm;
