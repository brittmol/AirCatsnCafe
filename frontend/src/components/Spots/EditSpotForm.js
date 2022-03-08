import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSpot } from "../../store/spots";

function EditSpotForm({ spot }) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  console.log("spot hostId", spot?.hostId);
  console.log("session user", sessionUser?.id);

  const [title, setTitle] = useState(spot?.title || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [address, setAddress] = useState(spot?.address || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [zipCode, setZipCode] = useState(spot?.zipCode || "");
  const [hrPrice, setHrPrice] = useState(spot?.hrPrice || "");
  const [errors, setErrors] = useState([]);

  const [clickEdit, setClickEdit] = useState(false);

  //   if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: spot?.id,
      title,
      description,
      address,
      city,
      state,
      zipCode,
      hrPrice,
      hostId: sessionUser.id,
    };

    setErrors([]);
    const updatedSpot = await dispatch(updateSpot(payload)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) return setErrors(data.errors);
      }
    );

    if (updatedSpot) {
      setClickEdit(false);
    }
  };

  let form;
  if (clickEdit) {
    form = (
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          // placeholder="Title"
          placeholder={title}
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
        <button type="submit">Edit Spot</button>
        <button
          onClick={() => {
            setClickEdit(false);
          }}
        >
          X
        </button>
      </form>
    );
  } else {
    form = <button onClick={() => setClickEdit(true)}>Edit Spot</button>;
  }

  return <>{spot?.hostId === sessionUser?.id ? form : null}</>;
}

export default EditSpotForm;
