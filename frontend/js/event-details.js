// 从 URL 获取 event id
function getEventId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadEvent() {
  const id = getEventId();
  if (!id) {
    document.getElementById("eventDetails").innerHTML = "<p>❌ No event ID provided.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/events/${id}`);
    const event = await res.json();

    if (!event || !event.event_id) {
      document.getElementById("eventDetails").innerHTML = "<p>❌ Event not found.</p>";
      return;
    }

    document.getElementById("eventDetails").innerHTML = `
      <h2>${event.name}</h2>
      <p><strong>Date:</strong> ${event.event_date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Organisation:</strong> ${event.organisation}</p>
      <p><strong>Description:</strong> ${event.description}</p>
      <p><strong>Ticket Price:</strong> $${event.ticket_price}</p>
      <p><strong>Goal:</strong> $${event.goal_amount}</p>
      <p><strong>Raised:</strong> $${event.raised_amount}</p>
      <button class="register-btn" onclick="registerEvent()">Register</button>
    `;
  } catch (err) {
    console.error("Error loading event:", err);
    document.getElementById("eventDetails").innerHTML = "<p>❌ Error loading event.</p>";
  }
}

function registerEvent() {
  alert("🛠️ This feature is currently under construction.");
}

loadEvent();
