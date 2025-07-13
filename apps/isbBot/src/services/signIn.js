import axios from "axios";

export const signInUser = async (phone) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/login/`,
    { phone: phone }
  );
  return resp.data;
};

export const isUserRegister = async (phone) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/login/phone/${phone}`);
  return resp;
};

export const OTPVerification = async (data) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/verify-otp/`,
    data
  );
  return resp.data;
};
