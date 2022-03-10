import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBooking, removeBooking } from "../../../store/spots";
import DatePicker from "react-datepicker";

function EditBooking({ booking }) {
  const dispatch = useDispatch();

  const date = (bookingTime) =>
    new Date(bookingTime).toLocaleDateString("en-US");
  const time = (bookingTime) =>
    new Date(bookingTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  // edit: startTime, endTime, numGuests
  // re-render: hours, price
  const [numGuests, setNumGuests] = useState(booking?.numGuests || null);
  const [hrs, setHrs] = useState(booking?.hours || null);
  const [price, setPrice] = useState(booking?.price || null);
  const [startDate, setStartDate] = useState(booking?.startTime || null);
  const [endDate, setEndDate] = useState(booking?.endTime || null);

  //   let d = new Date();
  //   console.log("get time", d.getTime());

  useEffect(() => {
    // let diffHrs = (endDate?.getTime() - startDate?.getTime()) / 3600000;
    // let newDiffHrs = Math.abs(Math.round(diffHrs));
    // setHrs(newDiffHrs);
    setPrice(booking?.Spot?.hrPrice * hrs * numGuests);
  }, [endDate, startDate, booking, hrs, numGuests]);

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
    setStartDate(booking?.startTime);
    setEndDate(booking?.endTime);
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
    setInEditMode({
      status: false,
      rowKey: null,
    });
  };

  return (
    <tr key={booking?.id}>
      <td>{booking?.id}</td>
      <td>{booking?.Spot?.title}</td>
      <td>{booking?.User?.firstName}</td>
      <td>{date(booking?.startTime)}</td>

      <td>{time(booking?.startTime)}</td>
      <td>{time(booking?.endTime)}</td>
      <td>{booking?.hours}</td>
      {/* <td>{booking?.numGuests}</td> */}
      <td>
        {inEditMode.status && inEditMode.rowKey === booking?.id ? (
          <input
            type="number"
            min="1"
            max="10"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
          />
        ) : (
          booking?.numGuests
        )}
      </td>
      <td>${booking?.price}</td>

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
