import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    console.log('submit');
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    if (res.data.status === 'success') {
      showAlert('Success', 'Logged in successfuly');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert(' error', err.response.data);
    console.log(err.response.data);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1/api/v1/users/logout',
    });

    if (res.data.status == 'success') location.reload(true);
  } catch (error) {
    showAlert('error', 'login again');
  }
};
