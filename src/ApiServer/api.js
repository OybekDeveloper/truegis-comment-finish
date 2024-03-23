import axios from 'axios'
const baseUrl='https://admin13.uz/api'
export const ApiServer ={
    async getData(url) {
        const response = await axios({
          method: "GET",
          url: `${baseUrl}${url}`,
          headers: {
            Accept:"application/json",
          },
        });
        return response.data;
      },
      async postData(url, body) {
        const response = await axios({
          method: "POST",
          url: `${baseUrl}${url}`,
          headers: {
            Accept:"application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(body),
        });
        return response.data;
      },
      async putData(url, body) {
        const response = await axios({
          method: "PUT",
          url: `${baseUrl}${url}`,
          headers: {
            Accept:"application/json",
            "Content-Type": "application/json",
          },
          data: JSON.stringify(body),
        });
        return response.data;
      },
      async delData(url) {
        const response = await axios({
          method: "DELETE",
          url: `${baseUrl}${url}`,
          headers: {
            Accept:"application/json",
            "Content-Type": "application/json",
          },
        });
        return response.data;
      },
}