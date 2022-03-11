import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBooking, removeBooking } from "../../../store/spots";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import "react-datepicker/dist/react-datepicker.css";

function EditBooking({ booking }) {
  const dispatch = useDispatch();

  const date = (bookingTime) =>
    new Date(bookingTime).toLocaleDateString("en-US");
  const time = (bookingTime) =>
    new Date(bookingTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  // edit: startTime, endTime, numGuests
  // re-render: hours, price
  const [numGuests, setNumGuests] = useState(booking?.numGuests || null);
  const [hrs, setHrs] = useState(booking?.hours || null);
  const [price, setPrice] = useState(booking?.price || null);
  const [startDate, setStartDate] = useState(
    new Date(booking?.startTime) || null
  );
  const [endDate, setEndDate] = useState(new Date(booking?.endTime) || null);

  useEffect(() => {
    let diffHrs = (endDate?.getTime() - startDate?.getTime()) / 3600000;
    let newDiffHrs = Math.abs(Math.round(diffHrs));
    setHrs(newDiffHrs);
    setPrice(booking?.Spot?.hrPrice * hrs * numGuests);
  }, [endDate, startDate, booking, hrs, numGuests]);

  useEffect(() => {
    if (startDate >= endDate) setEndDate(new Date(startDate).addHours(1));
  }, [startDate, endDate]);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const onEdit = () => {
    setInEditMode({
      status: true,
      rowKey: booking?.id,
    });
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setNumGuests(booking?.numGuests);
    setHrs(booking?.hours);
    setPrice(booking?.price);
    setStartDate(new Date(booking?.startTime));
    setEndDate(new Date(booking?.endTime));
  };

  const onSave = () => {
    const payload = {
      id: booking?.id,
      spotId: booking?.spotId,
      userId: booking?.userId,
      startTime: startDate,
      endTime: endDate,
      hours: hrs,
      numGuests,
      price,
    };
    dispatch(updateBooking(payload));
  };

  return (
    <tr key={booking?.id}>
      <td>{booking?.id}</td>
      <td>{booking?.Spot?.title}</td>
      <td>{booking?.User?.firstName}</td>
      {inEditMode.status && inEditMode.rowKey === booking?.id ? (
        <>
          <td>
            <DatePicker
              placeholderText="Click to select a Date"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              dateFormat="MMMM d, yyyy"
            />
          </td>
          <td>
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
          </td>
          <td>
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
          </td>
          <td>{hrs}</td>
          <td>
            <input
              type="number"
              id="numGuests"
              name="numGuests"
              min="1"
              max="10"
              value={numGuests}
              onChange={(e) => setNumGuests(e.target.value)}
            />
          </td>
          <td>${price}</td>
        </>
      ) : (
        <>
          <td>{date(booking?.startTime)}</td>
          <td>{time(booking?.startTime)}</td>
          <td>{time(booking?.endTime)}</td>
          <td>{booking?.hours}</td>
          <td>{booking?.numGuests}</td>
          <td>${booking?.price}</td>
        </>
      )}

      <td>
        {inEditMode.status && inEditMode.rowKey === booking?.id ? (
          <>
            <button onClick={() => onSave()}>Save</button>
            <button onClick={() => onCancel()}>X</button>
          </>
        ) : (
          <button onClick={() => onEdit()}>Edit</button>
        )}
      </td>
      <td>
        <button
          onClick={() => {
            dispatch(removeBooking(booking));
          }}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </td>
    </tr>
  );
}

export default EditBooking;
