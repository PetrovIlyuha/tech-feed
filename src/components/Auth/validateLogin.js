export default function validateLogin(values) {
  let errors = {};
  let emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;
  if (!values.email) {
    errors.email = "Email required";
  } else if (!emailRegexp.test(values.email)) {
    errors.email = "Please provide valid email";
  }
  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 6) {
    errors.password = "Password too short";
  }
  return errors;
}
