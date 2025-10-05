async function loadCategories() {
  try {
    const res = await fetch("http://localhost:3000/api/categories");
    const categories = await res.json();
    const select = document.getElementById("category");
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat.category_id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
  }
}

async function searchEvents(e) {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const category = document.getElementById("category").value;

  let url = "http://localhost:3000/api/search?";
  if (date) url += `date=${date}&`;
  if (location) url += `location=${encodeURIComponent(location)}&`;
  if (category) url += `category=${category}&`;

  try {
    const res = await fetch(url);
    const events = await res.json();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (events.length === 0) {
      resultsDiv.innerHTML = "<p>No matching events found.</p>";
      return;
    }

    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.event_date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <a href="event-details.html?id=${event.event_id}" class="btn">View Details</a>
      `;
      resultsDiv.appendChild(card);
    });
  } catch (err) {
    console.error("Error searching events:", err);
  }
}

document.getElementById("searchForm").addEventListener("submit", searchEvents);
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("searchForm").reset();
  document.getElementById("results").innerHTML = "";
});

loadCategories();
