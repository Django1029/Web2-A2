async function loadEvents() {
  const res = await fetch("http://localhost:3000/api/events");
  const events = await res.json();
  const eventsContainer = document.getElementById("events");

  eventsContainer.innerHTML = "";
  if (events.length === 0) {
    eventsContainer.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.event_date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Organisation:</strong> ${event.organisation}</p>
      <a href="event-details.html?id=${event.event_id}" class="btn">View Details</a>
    `;
    eventsContainer.appendChild(card);
  });
}

loadEvents();
