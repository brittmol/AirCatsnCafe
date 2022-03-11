import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot, removeSpot } from "../../store/spots";

function EditSpotForm({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState(spot?.title || "");
  const [description, setDescription] = useState(spot?.description || "");
  const [address, setAddress] = useState(spot?.address || "");
  const [city, setCity] = useState(spot?.city || "");
  const [state, setState] = useState(spot?.state || "");
  const [zipCode, setZipCode] = useState(spot?.zipCode || "");
  const [hrPrice, setHrPrice] = useState(spot?.hrPrice || "");
  const [errors, setErrors] = useState([]);

  // const [clickEdit, setClickEdit] = useState(false);

  const [inEditMode, setInEditMode] = useState(false);
  const onEdit = () => setInEditMode(true);
  const onCancel = () => {
    setInEditMode(false);
    setTitle(spot?.title);
    setDescription(spot?.description);
    setAddress(spot?.address);
    setCity(spot?.city);
    setState(spot?.state);
    setZipCode(spot?.zipCode);
    setHrPrice(spot?.hrPrice);
  };

  // const onSave = () => {
  //   const payload = {
  //     id: spot?.id,
  //     title,
  //     description,
  //     address,
  //     city,
  //     state,
  //     zipCode,
  //     hrPrice,
  //     hostId: sessionUser.id,
  //   };
  //   dispatch(updateSpot(payload));
  //   setInEditMode(false);
  // };

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
      // setClickEdit(false);
      setInEditMode(false);
    }
  };

  return (
    <>
      {spot?.hostId === sessionUser?.id && inEditMode ? (
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <h1>
            I made it to:
            <input
              type="text"
              // placeholder="Title"
              placeholder={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h1>
          <ul>
            <li>Host: {spot?.User?.firstName}</li>
            <li>
              Description
              <textarea
                placeholder="Write a description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </li>
            <li>
              Price per Hour: $
              <input
                type="integer"
                placeholder="Price $"
                value={hrPrice}
                onChange={(e) => setHrPrice(e.target.value)}
              />
            </li>
            <li>
              <div>
                Address
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                City
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                State
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                ZipCode
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </li>
          </ul>
          {/* <button onClick={() => onSave()}>Save</button> */}
          <button type="submit">Save</button>
          <button onClick={() => onCancel()}>X</button>
        </form>
      ) : (
        <>
          <h1>I made it to {spot?.title} </h1>
          <ul>
            <li>Host: {spot?.User?.firstName}</li>
            <li>{spot?.description}</li>
            <li>Price per Hour: ${spot?.hrPrice}</li>
            <li>
              Address: {spot?.address} {spot?.city}, {spot?.state}{" "}
              {spot?.zipCode}
            </li>
          </ul>
          <button onClick={() => onEdit()}>Edit</button>
        </>
      )}
      <button
        onClick={() => {
          dispatch(removeSpot(spot));
          history.push(`/spots`);
        }}
      >
        <i className="fas fa-trash-alt" />
      </button>
    </>
  );

  //   if (sessionUser) return <Redirect to="/" />;

  //   let form;
  //   if (clickEdit) {
  //     form = (
  //       <form onSubmit={handleSubmit}>
  //         <ul>
  //           {errors.map((error, idx) => (
  //             <li key={idx}>{error}</li>
  //           ))}
  //         </ul>
  //         <input
  //           type="text"
  //           // placeholder="Title"
  //           placeholder={title}
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //         />
  //         <textarea
  //           placeholder="Write a description..."
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //         />
  //         <input
  //           type="integer"
  //           placeholder="Price $"
  //           value={hrPrice}
  //           onChange={(e) => setHrPrice(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Address"
  //           value={address}
  //           onChange={(e) => setAddress(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="City"
  //           value={city}
  //           onChange={(e) => setCity(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="State"
  //           value={state}
  //           onChange={(e) => setState(e.target.value)}
  //         />
  //         <input
  //           type="text"
  //           placeholder="Zip Code"
  //           value={zipCode}
  //           onChange={(e) => setZipCode(e.target.value)}
  //         />
  //         <button type="submit">Edit Spot</button>
  //         <button
  //           onClick={() => {
  //             setClickEdit(false);
  //           }}
  //         >
  //           X
  //         </button>
  //       </form>
  //     );
  //   } else {
  //     form = <button onClick={() => setClickEdit(true)}>Edit Spot</button>;
  //   }

  //   return <>{spot?.hostId === sessionUser?.id ? form : null}</>;
}

export default EditSpotForm;
