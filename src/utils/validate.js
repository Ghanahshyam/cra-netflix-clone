export const checkValidateData = (isSignInForm, email, password, name = '') => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isFullNameValid = /^[A-Z][a-z]+\s[a-zA-Z\s\.]+$/.test(name);
  
  if (!isSignInForm && !isFullNameValid) {
    return "Full Name is not valid";
  }

  if (!isEmailValid) return "Email Id is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
}
