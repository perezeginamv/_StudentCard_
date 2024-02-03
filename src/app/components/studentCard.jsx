import { Link } from "react-router-dom";
import { getDate } from "../utils/getData";
import { thisYear } from "../utils/getBirthYear";

const StudentCard = () => {
  const studentData = getDate();
  const getBirthYear = () => {
    let numberOfYears = thisYear - studentData.yearOfBirth;
    let last = numberOfYears.toString().slice(-1);
    if (0 < Number(last) && Number(last) <= 1) {
      return `${numberOfYears} год`;
    } else if (2 <= Number(last) && Number(last) <= 4) {
      return `${numberOfYears} года`;
    } else return `${numberOfYears} лет`;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 ">
          <h1>Карточка студента</h1>
          {studentData ? (
            <>
              <div>
                <b>Имя:</b> {studentData.name}
              </div>
              <div>
                <b>Фамилия:</b> {studentData.surname}
              </div>
              <div>
                <b>Год рождения:</b>{" "}
                {`${studentData.yearOfBirth} (${getBirthYear()})`}
              </div>
              <div>
                <b>Портфолио:</b>{" "}
                <a href={studentData.portfolio}>{studentData.portfolio}</a>
              </div>
              <Link to="/creat_edit">
                <button className="btn btn-primary mt-3 mx-auto" type="button">
                  Редактировать
                </button>
              </Link>
            </>
          ) : (
            <div>
              <p>Нет данных</p>
              <Link to="/creat_edit">
                <button className="btn btn-primary  mx-auto" type="button">
                  Добавить
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
