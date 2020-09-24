const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
const modal = document.getElementById("modal");

const viewShows = (shows) => {
  let showHtml = shows
    .map((show) => {
      return `
        <div class="panel" data-id="${show.show.id}">
        <div class="img-box">
          <img data-id="${show.show.id}" src="${
        show.show.image !== null ? show.show.image.medium : ""
      }" />
        </div>
        <div class="content" data-id="${show.show.id}">
          <h2 data-id="${show.show.id}">${show.show.name}</h2>
          <p data-id="${show.show.id}">Premiered: ${
        show.show.premiered !== null ? show.show.premiered : "Unavailable"
      }</p>
          <p data-id="${show.show.id}">Language: ${show.show.language}</p>
          <p data-id="${show.show.id}">Score: ${show.score}</p>
        </div>
        </div>
        `;
    })
    .join("");

  matchList.style.display = "flex";
  matchList.innerHTML = showHtml;
};

const expandShow = (e) => {
  const id = e.target.getAttribute("data-id");

  if (id !== null) {
    searchId(id);
  }
};

const viewModal = (show) => {
  let modalHtml = `
      <div class="modal-content">
      <div class="img-box">
          <img src="${show.image !== null ? show.image.original : ""}" />
      </div>
      <div class="content">
          <h2>${show.name}</h2>
          <p>Premiered: ${
            show.premiered !== null ? show.premiered : "Unavailable"
          }</p>
          <p>Language: ${show.language}</p>
          <p>Genre: ${
            show.genres !== undefined ? show.genres.join(", ") : "Unavailable"
          }</p>
          <p>Rating: ${
            show.rating.average !== null ? show.rating.average : "Unavailable"
          }</p>
          <p>Status: ${show.status}</p>
          <p>Official Site: <a href="${
            show.officialSite
          }" target="_blank">Goto Official Site</a></p>
      </div>
      <div class="summary">
          <h2>Summary</h2>
          ${show.summary !== null ? show.summary : "Unavailable"}
      </div>
      <button class="close">Close</button>
      </div>
    `;

  modal.innerHTML = modalHtml;
  modal.style.display = "flex";
  window.scrollTo(0, window.innerHeight / 2 + 450);
};

const closeModal = (e) => {
  if (e.target.classList.contains("close")) {
    modal.style.display = "none";
  }
};

modal.addEventListener("click", (e) => closeModal(e));
matchList.addEventListener("click", (e) => expandShow(e));
search.addEventListener("input", () => searchShows(search.value));

async function searchShows(value) {
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${value}`);
  const data = await res.json();

  viewShows(data);

  if (value === "") {
    matchList.innerHTML = "";
    matchList.style.display = "none";
  }
}

async function searchId(id) {
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const data = await res.json();

  viewModal(data);
}
