import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBooking } from "../../../store/spots";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";
import "react-datepicker/dist/react-datepicker.css";

function CreateReservationForm({ spot }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  let dateNextHr = setMinutes(setSeconds(new Date().addHours(1), 0), 0);

  const [hrs, setHrs] = useState(null);
  const [numGuests, setNumGuests] = useState(1);
  const [price, setPrice] = useState(null);
  const [startDate, setStartDate] = useState(dateNextHr);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    let diffHrs = (endDate?.getTime() - startDate?.getTime()) / 3600000;
    let newDiffHrs = Math.abs(Math.round(diffHrs));
    setHrs(newDiffHrs);
    setPrice(spot?.hrPrice * hrs * numGuests);
  }, [endDate, startDate, spot, hrs, numGuests]);

  useEffect(() => {
    if (startDate >= endDate) setEndDate(new Date(startDate).addHours(1));
  }, [startDate, endDate]);

  // console.log("start date", startDate);
  // console.log("end date", endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: spot.id,
      userId: sessionUser.id,
      startTime: startDate,
      endTime: endDate,
      hours: hrs,
      numGuests,
      price,
    };

    const booking = await dispatch(createBooking(payload));

    if (booking) {
      history.push(`/spots/${spot.id}`);
      // TODO: push to user page with booking
    }

    setHrs(null);
    setNumGuests(1);
    setPrice(null);
    setStartDate(dateNextHr);
    setEndDate(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div> Hours: {hrs} </div>
        <div> Price: ${price} </div>
        <DatePicker
          placeholderText="Click to select a Date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
          dateFormat="MMMM d, yyyy"
        />
        <DatePicker
          placeholderText="Click to select a Start Time"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          showTimeSelectOnly
          filterTime={
            (time) =>
              new Date(time) > new Date().getTime() && // selected time > current time
              new Date(time) > setHours(new Date(time), 8).getTime() && // between 9am
              new Date(time) < setHours(new Date(time), 19).getTime() // and 6pm
          }
          timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="h:mm aa"
        />
        <DatePicker
          placeholderText="Click to select a End Time"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          filterDate={(date) => date === startDate}
          showTimeSelect
          showTimeSelectOnly
          filterTime={
            (time) =>
              new Date(time) > startDate.getTime() && // selected time > start time
              new Date(time) > setHours(startDate, 9).getTime() && // between 10am
              new Date(time) < setHours(startDate, 19).getTime() // and 7pm
          }
          timeFormat="h:mm aa"
          timeIntervals={60}
          timeCaption="time"
          dateFormat="h:mm aa"
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
