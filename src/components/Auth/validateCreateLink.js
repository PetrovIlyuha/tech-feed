export default function validateCreateLink(values) {
  let errors = {};
  if (!values.description) {
    errors.description = "Description required";
  } else if (values.description.length < 10) {
    errors.description = "Description too short.. 10 or more characters";
  }
  if (!values.url) {
    errors.url = "URL is needed";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "given URL is not valid";
  }
  return errors;
}
