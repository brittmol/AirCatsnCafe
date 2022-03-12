import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../../store/spots";
import "./reviews.css";

function CreateReviewForm({ spot }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  //   const [hover, setHover] = useState(0);

  const [inCreateMode, setInCreateMode] = useState(false);
  const onCreate = () => setInCreateMode(true);
  const onCancel = () => {
    setInCreateMode(false);
    setComment("");
    setRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: spot.id,
      userId: sessionUser.id,
      comment,
      rating,
    };

    await dispatch(createReview(payload));
    setInCreateMode(false);
    setComment("");
    setRating(0);
  };

  return (
    <>
      {inCreateMode ? (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="How did you like this spot?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="star-rating">
            {[...Array(5)].map((star, i) => {
              i += 1;
              return (
                <button
                  id="starRatingBtn"
                  type="button"
                  key={i}
                  className={i <= rating ? "on" : "off"}
                  //   className={i <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(i)}
                  //   onMouseEnter={() => setHover(i)}
                  //   onMouseLeave={() => setHover(rating)}
                >
                  <span className="star">&#9733;</span>
                  {/* &#9733; is HTML for star icon */}
                </button>
              );
            })}
          </div>
          <button type="submit">Post Comment</button>
          <button onClick={() => onCancel()}>X</button>
        </form>
      ) : (
        <button onClick={() => onCreate()}>
          Want to share your experience?
        </button>
      )}
    </>
  );
}

export default CreateReviewForm;
