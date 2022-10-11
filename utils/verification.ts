// @TODO - For production: utilze an API to generate random tokens
// Generate a random four digit number in the form of a string
const generateVerificationNo = () => {
  let verificationNo = "";

  for (let i = 0; i < 4; ++i) {
    const randVal = Math.round(Math.random() * 9);
    verificationNo += randVal;
  }

  return verificationNo;
};

export { generateVerificationNo };
