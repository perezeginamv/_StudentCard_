import { thisYear } from "./getBirthYear";

export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case "isRequired":
        statusValidate = data.trim() === "";
        break;
      case "isCorrect": {
        const presenceLetters = /[a-zA-Z]+/g;
        const punctuationMarks = /(?:[^\w\s]|_)+/g;
        statusValidate =
          thisYear - Number(data) > 120 ||
          thisYear - Number(data) < 18 ||
          presenceLetters.test(data) ||
          punctuationMarks.test(data);
        break;
      }
      case "isLink": {
        const link = /^https?:\/\/\S+\.\S+$/g;
        statusValidate = !link.test(data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
