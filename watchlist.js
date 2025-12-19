//class film-item är filmens container

const getWatchList = () => JSON.parse(localStorage.getItem("WatchListKey")) || [];
const saveWatchList = (list) => localStorage.setItem("WatchListKey", JSON.stringify(list));

const watchlistContainer = document.getElementById("watchlist-container");
const watchlist = JSON.parse(localStorage.getItem("WatchListKey")) || [];

if (watchlistContainer) {
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `<p class="empty-watchlist">It’s empty here!</p>`;
    } else {
        let filmList = '';
        watchlist.forEach(film => {
            const posterUrl = film.poster !== "N/A" ? film.poster : "https://dummyimage.com/300x450/cccccc/969696?text=No+Poster";
            filmList += `
                <div class="film-item">
                    <div class="film-poster">
                        <img class="film-poster-img" src="${posterUrl}" alt="Poster of ${film.title}" style="width: 100px;" onerror="this.src='https://dummyimage.com/300x450/cccccc/969696?text=No+Poster'">
                    </div>
                    <div class="film-details">
                        <h3>${film.title}</h3>
                        <p>⭐${film.rating}</p>                        <p>Length: ${film.runtime}</p>
                        <button class="remove-watchlist-btn" data-id="${film.imdbID}">Remove</button>
                        <p>Description: ${film.plot}</p>
                    </div>
                </div>
                <hr>
            `;
        });
        watchlistContainer.innerHTML = filmList;

        document.querySelectorAll(".remove-watchlist-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;

                // hämta aktuell lista, filtrera bort filmen, spara
                const updated = getWatchList().filter(f => f.imdbID !== id);
                saveWatchList(updated);

                // ta bort kort + ev. hr
                const card = btn.closest(".film-item");
                if (card) {
                    const hr = card.nextElementSibling;
                    card.remove();
                    if (hr && hr.tagName === "HR") hr.remove();
                }

                // om listan nu är tom, visa meddelande
                if (updated.length === 0 && watchlistContainer) {
                    watchlistContainer.innerHTML = `<p class="empty-watchlist">It’s empty here!</p>`;
                }
            });
        });
    }
}






