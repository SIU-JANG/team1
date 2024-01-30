import axios from "axios";

export async function login(id, pw) {
  console.log(id, pw);
  try {
    const response = await axios.get(`/api/users`, {
      params: {
        userId: { id },
        userPassword: { pw },
      },
    });
    console.log(id, pw, response);
  } catch (e) {
    console.log(e);
  }
}
