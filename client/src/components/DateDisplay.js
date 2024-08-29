import "./DateDisplay.css";

const DateDisplay = () => {
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = dayNames[date.getDay()];

  return (
    <div className="date-display">
      <p className="date-heading">
        {day}, {month} {date.getDate()}, {year}
      </p>
    </div>
  );
};

export default DateDisplay;
