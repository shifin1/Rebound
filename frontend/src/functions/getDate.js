const getDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = yyyy + "-" + mm + "-" + dd;

  return formattedToday;
};

export default getDate;

// var myDate = new Date(event.startTimestamp * 1000);
// console.log(myDate.toLocaleString("en-IN"));

// const date = new Date();

// const dateWithTime = date.toLocaleString("en-IN");

// const dateWithoutTime = dateWithTime.slice(0, 8);

// var myDate = new Date(1677344400 * 1000);

// console.log(dateWithoutTime);
// console.log(myDate.toLocaleString("en-IN").slice(0, 8));
