import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateReservationForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [hours, setHours] = useState(1);
  const [numGuests, setNumGuests] = useState(1);
  const [price, setPrice] = useState(10);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  console.log("start date", startDate);
  console.log("end date", endDate);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      spotId: 1,
      userId: sessionUser.id,
      startTime: startDate,
      endTime: endDate,
      hours,
      numGuests,
      price,
    };
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          // maxDate={startDate}
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
        <div>
          <label htmlFor="hours">Hours: </label>
          <input
            type="number"
            id="hours"
            name="hours"
            min="1"
            max="5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <button type="submit">Reserve Spot</button>
      </form>
    </>
  );
}

export default CreateReservationForm;
