const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const dashboardTabs = document.querySelectorAll("[data-dashboard-tab]");
const dashboardPanels = document.querySelectorAll("[data-dashboard-panel]");
const communityButtons = document.querySelectorAll(".community-select");
const communitySelect = document.getElementById("communitySelect");
const interestChips = document.querySelectorAll(".interest-chip");
const joinForm = document.getElementById("joinForm");
const planModal = document.getElementById("planModal");
const planModalTitle = document.getElementById("planModalTitle");
const planModalCopy = document.getElementById("planModalCopy");
const planButtons = document.querySelectorAll(".plan-button");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}

function closeMenu() {
  primaryNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function activateDashboardTab(tabName) {
  dashboardTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.dashboardTab === tabName);
  });

  dashboardPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.dashboardPanel === tabName);
  });
}

dashboardTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateDashboardTab(tab.dataset.dashboardTab);
  });
});

communityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const community = button.closest(".community-card").dataset.community;
    communitySelect.value = community;
    document.getElementById("join").scrollIntoView({ behavior: "smooth" });
    showToast(`${community} selected.`);
  });
});

interestChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("is-selected");

    const interest = chip.dataset.interest;
    const relatedCheckboxes = [...document.querySelectorAll('input[name="interests"]')];
    const relatedCheckbox = relatedCheckboxes.find((checkbox) =>
      interest.toLowerCase().includes(checkbox.value.toLowerCase().split(" ")[0])
    );

    if (relatedCheckbox) {
      relatedCheckbox.checked = chip.classList.contains("is-selected");
    }
  });
});

function openPlanModal(planName) {
  planModalTitle.textContent = planName;

  const copyByPlan = {
    "Meet Me at Lakeside":
      "Residents could choose a date and time, set the plan for their apartment or the full district, and see who is interested in meeting at Lakeside Social.",
    "Meet at Urban Prime":
      "This could become a coffee meetup, dinner group, tasting, remote-worker lunch, or another resident-created plan.",
    "Workout at Sweat Haven":
      "Residents could find workout partners, coordinate classes, or create recurring fitness and wellness groups.",
    "Dog Park Meetup":
      "This could become a casual dog meetup, walking group, puppy play time, or recurring neighborhood gathering.",
    "Tonight in Viera":
      "The live dashboard could show nearby plans, events, resident interest, and simple ways to join without needing to create a formal event.",
    "Sunset Dog Walk":
      "A resident could join the plan, see the public meeting point, and choose whether their profile is visible to other attendees.",
    "Saturday Walking Group":
      "Recurring plans could make it easy for nearby residents to build routines and see familiar faces each week.",
    "Trivia Team Needed":
      "Cross-community plans help residents find the right number of people for activities that are difficult to organize inside one apartment alone.",
    "Remote Workers Lunch":
      "Residents who work from home could meet nearby for lunch, coworking, coffee, or a midday walk.",
    "New to Viera Meetup":
      "A monthly new-resident meetup could help people build local connections soon after moving into the district.",
    "Explore The Avenue":
      "The Avenue can support movie nights, restaurant crawls, shopping challenges, coffee groups, family meetups, fitness activities, seasonal events, and a large network of future Passport partners.",
    "Movie & Dinner Night":
      "Residents could choose a movie, coordinate dinner before or dessert afterward, and open the plan to their apartment or the entire district."
  };

  planModalCopy.textContent =
    copyByPlan[planName] ||
    "In the full platform, residents could choose a time, audience, location, and whether the plan appears inside their community or across the district.";

  planModal.classList.add("is-open");
  planModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closePlanModal() {
  planModal.classList.remove("is-open");
  planModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openPlanModal(button.dataset.plan || "Make a Plan");
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closePlanModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && planModal.classList.contains("is-open")) {
    closePlanModal();
  }
});

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(joinForm);
  const submission = {
    firstName: formData.get("firstName"),
    email: formData.get("email"),
    community: formData.get("community"),
    interests: formData.getAll("interests"),
    idea: formData.get("idea"),
    submittedAt: new Date().toISOString()
  };

  const existingSubmissions = JSON.parse(
    localStorage.getItem("vieraLocalPrototypeSubmissions") || "[]"
  );

  existingSubmissions.push(submission);
  localStorage.setItem(
    "vieraLocalPrototypeSubmissions",
    JSON.stringify(existingSubmissions)
  );

  const firstName = submission.firstName || "Neighbor";
  joinForm.reset();
  interestChips.forEach((chip) => chip.classList.remove("is-selected"));

  showToast(`Thanks, ${firstName}! Your prototype signup was saved in this browser.`);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    closeMenu();
  }
});
