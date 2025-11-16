export const generateOtp = (): string => {
  let otp = '';
  for (let i = 0; i < 5; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};
