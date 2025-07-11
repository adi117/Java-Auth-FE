import axios from "axios";

export async function registerUser(data: {
  name: string;
  username: string;
  password: string;
}) {
  const response= await axios.post(`http://localhost:8080/api/v1/public/users/register`, data);

  return response.data
}