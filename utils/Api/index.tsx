import axios from "axios";

// export const authToken = window.localStorage.getItem("authToken")

export const REACT_API_BASE_URL = process.env.BASEURL;

export const getData = (url: string, token: string | null) => {
  return axios
    .get(`${REACT_API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const postData = (url: string, data: any) => {
  return axios
    .post(`${REACT_API_BASE_URL}${url}`, data, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const postDataWithToken = (
  url: string,
  data: any,
  token: string | null,
  multipart?: boolean
) => {
  return axios
    .post(`${REACT_API_BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": multipart ? "multipart/form-data" : "application/json",
        accept: "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const putDataWithToken = (
  url: string,
  data: any,
  token: string | null,
  multipart?: boolean
) => {
  return axios
    .put(`${REACT_API_BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": multipart ? "multipart/form-data" : "application/json",
        accept: "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

// export const modifyData = (url, data) => {
//   return axios
//     .put(`${url}`, data, {
//       headers: {
//         "Content-Type": "application/json",
//         "accept": "application/json",
//       },
//     })
//     .then(function (response) {
//       return response;
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// };
// export const modifyDataWithTokenAndParams = (url, data, token) => {
//   return axios
//     .put(`${url}`, null, {
//       params: data,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//         "accept": "application/json",
//       },
//     })
//     .then(function (response) {
//       return response;
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// };
export const modifyDataWithToken = (
  url: string,
  data: any,
  token: string | null
) => {
  return axios
    .put(`${REACT_API_BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      return err;
    });
};
export const deleteData = (url: String, token: String | null) => {
  return axios
    .delete(`${REACT_API_BASE_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return console.log(err);
    });
};
