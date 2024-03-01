import axios from "axios";
const backendUrl = "http://localhost:3010/api/v1/tasks";

export const getAnalyticsData = async () => {
  try {
    const requestUrl = `${backendUrl}/analytics`;
    const token = localStorage.getItem("tokenPro");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(requestUrl);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getTasks = async (typeOfFilter) => {
  try {
    const requestUrl = `${backendUrl}/all?typeOfFilter=${typeOfFilter}`;
    const token = localStorage.getItem("tokenPro");

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.get(requestUrl);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const checkItems = async (taskId, itemId, selected) => {
  try {
    const requestUrl = `${backendUrl}/checklist/${taskId}/${itemId}`;
    const payload = { selected };

    const token = localStorage.getItem("tokenPro");

    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.put(requestUrl, payload);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
