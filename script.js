const apiKey = "DEMO_KEY";

window.onload = function () {
  getCurrentImageOfTheDay();
  addSearchToHistory();
};

function getCurrentImageOfTheDay() {
  const date = new Date().toISOString().split("T")[0];

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(res => res.json())
    .then(data => displayImage(data));
}

function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(res => res.json())
    .then(data => {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory();
    });
}

function displayImage(data) {
  document.getElementById("current-image-container").innerHTML = `
    <h2>${data.title}</h2>
    <img src="${data.url}">
    <p>${data.explanation}</p>
  `;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  if (!searches.includes(date)) {
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

function addSearchToHistory() {
  const list = document.getElementById("search-history");
  list.innerHTML = "";

  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  searches.forEach(date => {
    const li = document.createElement("li");
    li.textContent = date;
    li.onclick = () => getImageOfTheDay(date);
    list.appendChild(li);
  });
}

document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const date = document.getElementById("search-input").value;
  getImageOfTheDay(date);
});
