/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

let studentListHTML = document.querySelectorAll(".student-item");
const pageDiv = document.querySelector(".page");
const studentsPerPage = 10;

function hideStudentList(studentListHTML) {
  for (let i = 0; i < studentListHTML.length; i += 1) {
    studentListHTML[i].style.display = "none";
  }
}

function showPage(studentList, pageNumber) {
  hideStudentList(studentListHTML);

  let index = (pageNumber * 10) - 10;
  let stopNumber = index + 10;
  if (stopNumber > studentList.length) {
    stopNumber = studentList.length;
  }
  for (index; index < stopNumber ; index += 1) {
    studentList[index].style.display = "inherit";
  }

  activateButton(studentList, pageNumber);
}

function getNumberOfPages(students) {
  const numberOfPAges = students.length / studentsPerPage;
  return Math.ceil(numberOfPAges);
}

function activateButton(studentList, buttonNumber) {
  let studentUnorderedList = document.querySelector(".pagination").children[0];
  if (studentUnorderedList.children[0] !== undefined) {
    for(let i = 0 ; i < getNumberOfPages(studentList) ; i += 1) {
      studentUnorderedList.children[i].children[0].className = "";
    }
    studentUnorderedList.children[buttonNumber - 1].children[0].className = "active";
  }
}

function appendPageLinks(studentListHTML) {
  if (document.querySelector(".pagination") !== null) {
    let node = document.querySelector(".pagination");
    pageDiv.removeChild(node);
  }
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  pageDiv.appendChild(pagination);

  const ul = document.createElement("ul");
  pagination.appendChild(ul);

  for (let i = 0 ; i < getNumberOfPages(studentListHTML) ; i += 1) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i + 1;

    ul.appendChild(li);
    li.appendChild(a);
  }

  pagination.addEventListener("click", function(e) {
    showPage(studentListHTML, e.target.textContent);
  });
}

function appendPageSearchBar() {
  const div = document.createElement("div");
  div.className = "student-search";
  const input = document.createElement("input");
  input.placeholder = "Search for students...";
  const button = document.createElement("button");
  button.textContent = "Search";

  const pageHeader = document.querySelector(".page-header");

  pageHeader.appendChild(div);
  div.appendChild(input);
  div.appendChild(button);

  div.addEventListener('keyup', function(event){
    showResult(event.target.value)
  });

  const p = document.createElement("p");
  p.textContent = "No hay resultados";
  p.className = "no-result"
  pageDiv.appendChild(p);
  p.style.display = "none";
}

function showResult(inputString) {
  let noResults = document.querySelector(".no-result");
  let students = getStudentArray(studentListHTML);
  let filteredStudents = [];
  for (var i = 0; i < students.length; i+= 1) {
    if ((students[i].name.includes(inputString)) ||
        (students[i].email.includes(inputString)) ||
        (students[i].date.includes(inputString))) {
      filteredStudents.push(studentListHTML[i]);
    }
  }

  if (filteredStudents.length > 0 ) {
    appendPageLinks(filteredStudents);
    showPage(filteredStudents, 1);
    noResults.style.display = "none";
  } else {
    appendPageLinks(filteredStudents);
    showPage(filteredStudents, 1);
    noResults.style.display = "";
  }
}

function getStudentArray(studentListHTML) {
  let students = [];
  for (let i = 0 ; i < studentListHTML.length ; i += 1) {
    let student = {
      name:studentListHTML[i].children[0].children[1].textContent,
      email:studentListHTML[i].children[0].children[2].textContent,
      date:studentListHTML[i].children[1].children[0].textContent
    };
    students[i] = student;
  }
  return students;
}

appendPageLinks(studentListHTML);
appendPageSearchBar();
showPage(studentListHTML, 1);
