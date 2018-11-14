/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

let studentListHTML = document.querySelectorAll(".student-item");
const pageDiv = document.querySelector(".page");
const studentsPerPage = 10;

function hideStudentList(studentListHTML) {
  for (let i = 0; i < studentListHTML.length; i++) {
    studentListHTML[i].style.display = "none";
  }
}

function showPage(studentListHTML, pageNumber) {
  hideStudentList(studentListHTML);

  let index = (pageNumber * 10) - 10;
  let stopNumber = index + 10;
  if (stopNumber > studentListHTML.length) {
    stopNumber = studentListHTML.length;
  }
  for (index; index < stopNumber ; index += 1) {
    studentListHTML[index].style.display = "inherit";
  }
  activateButton(pageNumber);
}

function getNumberOfPages(students) {
  const numberOfPAges = students.length / studentsPerPage;
  return Math.ceil(numberOfPAges);
}

function activateButton(buttonNumber) {
  let studentUnorderedList = pageDiv.children[2].children[0];
  for(let i = 0 ; i < getNumberOfPages(studentListHTML) ; i += 1) {
    studentUnorderedList.children[i].children[0].className = "";
  }
  studentUnorderedList.children[buttonNumber - 1].children[0].className = "active";
}

function appendPageLinks(studentListHTML) {
  const pagination = document.createElement("div");
  pagination.className = "pagination";
  pageDiv.appendChild(pagination);

  const ul = document.createElement("ul");
  pagination.appendChild(ul);

  for (let i = 0 ; i < getNumberOfPages(studentListHTML) ; i += 1) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i + 1;

    li.appendChild(a);

    ul.appendChild(li);

    pagination.addEventListener("click", function(e) {
      showPage(studentListHTML, e.target.textContent);
    });
  }
}

appendPageLinks(studentListHTML);
showPage(studentListHTML, 1);
