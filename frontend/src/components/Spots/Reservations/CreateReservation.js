import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createBooking } from "../../../store/spots";

function CreateReservationForm({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  const [hours, setHours] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [price, setPrice] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date().addHours(1));

  useEffect(() => {
    let diffHrs = (endDate?.getTime() - startDate?.getTime()) / 3600000;
    let newDiffHrs = Math.abs(Math.round(diffHrs));
    setHours(newDiffHrs);

    setPrice(spot?.hrPrice * hours * numGuests);
  }, [endDate, startDate, spot, hours, numGuests]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: spot.id,
      userId: sessionUser.id,
      startTime: startDate,
      endTime: endDate,
      hours,
      numGuests,
      price,
    };

    const booking = await dispatch(createBooking(payload));

    if (booking) {
      history.push(`/spots/${spot.id}`);
      // TODO: push to user page with booking
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div> Hours: {hours} </div>
        <div> Price: ${price} </div>

        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(date);
          }}
          minDate={new Date()}
          // isClearable
          // showMonthDropdown
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
          }}
          minDate={startDate}
          maxDate={startDate}
          showTimeSelect
          // showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <div>
          <label htmlFor="numGuests">Number of Guests: </label>
          <input
            type="number"
            id="numGuests"
            name="numGuests"
            min="1"
            max="10"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </div>
        <button type="submit">Reserve Spot</button>
      </form>
    </>
  );
}

export default CreateReservationForm;
