/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Contains the list of student items of the page
const studentListHTML = document.querySelectorAll(".student-item");
const pageDiv = document.querySelector(".page");
// Required number of students per page
const studentsPerPage = 10;
// I use this variable to avoid "magic numbers"
const firstPage = 1;

// Shows a given page of a given set of students
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

// Hides every element in the student list
function hideStudentList(studentListHTML) {
  for (let i = 0; i < studentListHTML.length; i += 1) {
    studentListHTML[i].style.display = "none";
  }
}

// Given a set of students it calculates the ammount of pages needed to display them
function getNumberOfPages(studentList) {
  const numberOfPAges = studentList.length / studentsPerPage;
  return Math.ceil(numberOfPAges);
}

// This methods appends the right ammount of pagination buttons to the bottom of the page
// and adds to them a listener to change the page when one of them is clicked
function appendPageLinks(studentList) {
  if (document.querySelector(".pagination") !== null) {
    const node = document.querySelector(".pagination");
    pageDiv.removeChild(node);
  }

  const pagination = document.createElement("div");
  pagination.className = "pagination";
  const ul = document.createElement("ul");

  pageDiv.appendChild(pagination);
  pagination.appendChild(ul);

  for (let i = 0 ; i < getNumberOfPages(studentList) ; i += 1) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i + 1;

    ul.appendChild(li);
    li.appendChild(a);
  }

  pagination.addEventListener("click", function(e) {
    showPage(studentList, e.target.textContent);
  });
}

// Given a student list and the number of the button clicked, it activates the right button on
// the bottom of the page
function activateButton(studentList, buttonNumber) {
  const studentUnorderedList = document.querySelector(".pagination").children[0];
  if (studentUnorderedList.children[0] !== undefined) {
    for(let i = 0 ; i < getNumberOfPages(studentList) ; i += 1) {
      studentUnorderedList.children[i].children[0].className = "";
    }
    studentUnorderedList.children[buttonNumber - 1].children[0].className = "active";
  }
}

// When a new set of students is shown, this method appends the right number of
// buttons to the page and shows the requested students
function createPage(studentList) {
  appendPageLinks(studentList);
  showPage(studentList, firstPage);
}

// Adds a search bar to the top of the page and handles its searches
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

  button.addEventListener("click", function() {
    showResult(input.value);
  });
  input.addEventListener('keyup', function(event){
    showResult(event.target.value);
  });

  // It creates a message in the page in case no results where found and hides it
  // for later use
  const p = document.createElement("p");
  p.textContent = "Sorry, no results found.";
  p.className = "no-result"
  pageDiv.appendChild(p);
  p.style.display = "none";
}

// Gets a list of filtered students based on a search made by the user and
// shows the results, if no results are returned, it displays a message
function showResult(inputString) {
  const students = getStudentArray(studentListHTML);
  let filteredStudents = [];
  for (var i = 0; i < students.length; i+= 1) {
    if (students[i].name.includes(inputString) || students[i].email.includes(inputString)) {
      filteredStudents.push(studentListHTML[i]);
    }
  }
  const noResults = document.querySelector(".no-result");
  if (filteredStudents.length > 0 ) {
    createPage(filteredStudents);
    noResults.style.display = "none";
  } else {
    createPage(filteredStudents);
    noResults.style.display = "";
  }
}

// Generates a list of student objects given a list of students
function getStudentArray(studentListHTML) {
  let students = [];
  for (let i = 0 ; i < studentListHTML.length ; i += 1) {
    let student = {
      name:studentListHTML[i].children[0].children[1].textContent,
      email:studentListHTML[i].children[0].children[2].textContent
    };
    students[i] = student;
  }
  return students;
}

// Appends the search bar to the page
appendPageSearchBar();
// Shows the first page of students when the page is accesed
createPage(studentListHTML);
