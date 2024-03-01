export const getUserInfo = () => {
  return localStorage.getItem("usernamePro");
};

export const getCurrentDate = () => {
  const currDate = new Date();
  const day = currDate.getDate();
  const month = currDate.toLocaleString("default", { month: "short" });
  const year = currDate.getFullYear();

  let daySuffix;
  switch (day) {
    case 1:
    case 21:
    case 31:
      daySuffix = "st";
      break;
    case 2:
    case 22:
      daySuffix = "nd";
      break;
    case 3:
    case 23:
      daySuffix = "rd";
      break;
    default:
      daySuffix = "th";
  }

  return `${day}${daySuffix} ${month}, ${year}`;
};
