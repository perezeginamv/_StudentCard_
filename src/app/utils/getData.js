export function getDate() {
  let getStudentDate = localStorage.getItem("studentCard");
  return JSON.parse(getStudentDate);
}
