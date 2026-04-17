// ================= DATA =================
let toWatch = JSON.parse(localStorage.getItem("toWatch")) || [];
let watched = JSON.parse(localStorage.getItem("watched")) || [];

// ================= SAVE =================
function saveData() {
  localStorage.setItem("toWatch", JSON.stringify(toWatch));
  localStorage.setItem("watched", JSON.stringify(watched));
}

// ================= ADD =================
function addMovie() {
  const input = document.getElementById("movieInput");
  const name = input.value.trim();

  if (!name) return;

  toWatch.push({
    name: name,
    rating: 0,
    favorite: false
  });

  input.value = "";
  saveData();
  displayMovies();
}

// ================= MOVE TO WATCHED =================
function markAsWatched(index) {
  const movie = toWatch.splice(index, 1)[0];
  watched.push(movie);

  saveData();
  displayMovies();
}

// ================= DELETE =================
function deleteMovie(index, type) {
  if (type === "toWatch") {
    toWatch.splice(index, 1);
  } else {
    watched.splice(index, 1);
  }

  saveData();
  displayMovies();
}

// ================= EDIT =================
function editMovie(index, type) {
  const newName = prompt("Edit movie name:");
  if (!newName) return;

  if (type === "toWatch") {
    toWatch[index].name = newName;
  } else {
    watched[index].name = newName;
  }

  saveData();
  displayMovies();
}

// ================= FAVORITE TOGGLE =================
function toggleFavorite(index, type) {
  if (type === "toWatch") {
    toWatch[index].favorite = !toWatch[index].favorite;
  } else {
    watched[index].favorite = !watched[index].favorite;
  }

  saveData();
  displayMovies();
}

// ================= RATING =================
function setRating(index, rating) {
  watched[index].rating = rating;
  saveData();
  displayMovies();
}

// ⭐ Stars
function getStars(index, currentRating) {
  let stars = "";

  for (let i = 1; i <= 5; i++) {
    stars += `<span class="stars" onclick="setRating(${index}, ${i})">
      ${i <= currentRating ? "★" : "☆"}
    </span>`;
  }

  return stars;
}

// ❤️ Heart UI
function getHeart(index, type, isFav) {
  return `
    <span class="heart ${isFav ? "active" : ""}" 
          onclick="toggleFavorite(${index}, '${type}')">
      ${isFav ? "💚" : "🤍"}
    </span>
  `;
}

// ================= DISPLAY =================
function displayMovies() {
  const search = document.getElementById("searchInput").value.toLowerCase();

  const toWatchList = document.getElementById("toWatchList");
  const watchedList = document.getElementById("watchedList");

  toWatchList.innerHTML = "";
  watchedList.innerHTML = "";

  // ========= TO WATCH =========
  toWatch.forEach((movie, index) => {
    if (!movie.name.toLowerCase().includes(search)) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        ${movie.name}
      </div>
      <div class="actions">
        ${getHeart(index, "toWatch", movie.favorite)}
        <button onclick="markAsWatched(${index})">✔</button>
        <button onclick="editMovie(${index}, 'toWatch')">✏️</button>
        <button onclick="deleteMovie(${index}, 'toWatch')">❌</button>
      </div>
    `;

    toWatchList.appendChild(li);
  });

  // ========= WATCHED =========
  watched.forEach((movie, index) => {
    if (!movie.name.toLowerCase().includes(search)) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        ${movie.name}<br>
        ${getStars(index, movie.rating)}
      </div>
      <div class="actions">
        ${getHeart(index, "watched", movie.favorite)}
        <button onclick="editMovie(${index}, 'watched')">✏️</button>
        <button onclick="deleteMovie(${index}, 'watched')">❌</button>
      </div>
    `;

    watchedList.appendChild(li);
  });
}

// ================= INIT =================
displayMovies();