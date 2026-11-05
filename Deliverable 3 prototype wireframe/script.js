const commitments = ["Monday, 09:00–11:00 — Class"];
let studyTime = "Monday, 14:00–15:00";

const commitmentForm = document.getElementById("commitmentForm");
const assignmentForm = document.getElementById("assignmentForm");
const replanForm = document.getElementById("replanForm");

document.querySelectorAll("[data-screen]").forEach(function (button) {
  button.addEventListener("click", function () {
    showScreen(button.dataset.screen);
  });
});

function showScreen(screenId) {
  document.querySelectorAll("section").forEach(function (screen) {
    screen.hidden = screen.id !== screenId;
  });

  if (screenId === "plan") {
    updatePlan();
  }

  if (screenId === "replan") {
    document.getElementById("currentSession").textContent =
      "Current session: " + studyTime;
  }
}

commitmentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;
  const message = document.getElementById("commitmentMessage");

  if (end <= start) {
    message.textContent = "Choose an end time after the start time.";
    return;
  }

  const day = document.getElementById("day").value;
  const type = document.getElementById("type").value;

  commitments.push(`${day}, ${start}–${end} — ${type}`);
  displayCommitments("commitmentList");
  message.textContent = "Commitment added.";
});

assignmentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  showScreen("plan");
});

replanForm.addEventListener("submit", function (event) {
  event.preventDefault();
  studyTime = document.getElementById("newSlot").value;
  showScreen("plan");
});

function displayCommitments(listId) {
  const list = document.getElementById(listId);
  list.replaceChildren();

  commitments.forEach(function (commitment) {
    const item = document.createElement("li");
    item.textContent = commitment;
    list.appendChild(item);
  });
}

function updatePlan() {
  const name = document.getElementById("assignmentName").value;
  const deadline = document.getElementById("deadline").value;
  const task = document.getElementById("task").value;

  displayCommitments("planCommitments");

  document.getElementById("planAssignment").textContent =
    deadline ? `${name} · Due ${deadline}` : name;

  document.getElementById("planTask").textContent = task;
  document.getElementById("planTime").textContent = studyTime;
}

displayCommitments("commitmentList");