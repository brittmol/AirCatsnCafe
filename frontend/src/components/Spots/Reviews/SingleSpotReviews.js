import React, { useState } from "react";

function DisplayReviews({ spot }) {
  const [clickShowRes, setClickShowRes] = useState(true);

  const reviews = spot?.Reviews;

  let showReviews;
  if (clickShowRes) {
    showReviews = (
      <div>
        <h2>Reviews<button onClick={() => setClickShowRes(false)}>Hide</button></h2>
        {reviews?.map((review) => {
          return (
            <div key={review.id}>
              <ul>
                <li>User: {review?.User.firstName}</li>
                <li>Spot: {review?.Spot?.title}</li>
                <li>Rating: {review?.rating}</li>
                <li>{review?.comment}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  } else {
    showReviews = (
        <h2>Reviews<button onClick={() => setClickShowRes(true)}>Show</button></h2>
    );
  }

  return <>{showReviews}</>;
}

export default DisplayReviews;
