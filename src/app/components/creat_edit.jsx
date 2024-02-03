import React, { useEffect, useState } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";
import { getDate } from "../utils/getData";

const CreatEdit = ({ history }) => {
  const studentData = getDate();

  const [data, setData] = useState({
    name: studentData ? studentData.name : "",
    surname: studentData ? studentData.surname : "",
    yearOfBirth: studentData ? studentData.yearOfBirth : "",
    portfolio: studentData ? studentData.portfolio : "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validatorConfig = {
    name: {
      isRequired: { message: "Поле 'Имя' обязательно для заполнения" },
    },
    surname: {
      isRequired: { message: "Поле 'Фамилия' обязательно для заполнения" },
    },
    yearOfBirth: {
      isRequired: { message: "Поле 'Год рождения' обязательно для заполнения" },
      isCorrect: {
        message: "Поле 'Год рождения' не корректно",
      },
    },
    portfolio: {
      isRequired: { message: "Поле 'Портфолио' обязательно для заполнения" },
      isLink: { message: "Поле 'Портфолио' должно быть ссылкой" },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };
  const toggleMoweToPage = () => {
    localStorage.setItem("studentCard", JSON.stringify(data));
    history.push(`/`);
  };
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h3 className="mb-4">Создать</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              value={data.name}
              onChange={handleChange}
              name="name"
              error={errors.name}
            />
            <TextField
              label="Фамилия"
              type="surname"
              value={data.surname}
              onChange={handleChange}
              name="surname"
              error={errors.surname}
            />
            <TextField
              label="Год рождения"
              type="yearOfBirth"
              value={data.yearOfBirth}
              onChange={handleChange}
              name="yearOfBirth"
              error={errors.yearOfBirth}
            />
            <TextField
              label="Портфолио"
              type="portfolio"
              value={data.portfolio}
              onChange={handleChange}
              name="portfolio"
              error={errors.portfolio}
            />
            <div>
              {studentData ? (
                <>
                  <button
                    type="submit"
                    onClick={goBack}
                    disabled={!isValid}
                    className="btn btn-secondary mx-auto"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    onClick={toggleMoweToPage}
                    disabled={!isValid}
                    className="btn btn-primary mx-2"
                  >
                    Обновить
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  onClick={toggleMoweToPage}
                  disabled={!isValid}
                  className="btn btn-primary mx-auto"
                >
                  Создать
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatEdit;
