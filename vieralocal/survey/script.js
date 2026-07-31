const STORAGE = {
  draft: "vieraLocalSurveyDraft",
  responses: "vieraLocalSurveyResponses"
};

/* =========================================================
   SAFE BROWSER STORAGE
   Allows the survey to run from local files even when a
   browser blocks localStorage for file:// pages.
   ========================================================= */

const memoryStorage = {};

function storageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return Object.prototype.hasOwnProperty.call(memoryStorage, key)
      ? memoryStorage[key]
      : null;
  }
}

function storageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    memoryStorage[key] = value;
  }
}

function storageRemove(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    delete memoryStorage[key];
  }
}

const sections = [
  {
    title: "Current resident experience",
    short: "Resident experience",
    intro: "Tell us what connecting with neighbors and learning about activities feels like today.",
    questions: [
      q(1, "community", "single", "Which apartment community do you live in?", ["Luna at Viera", "The Pearl of Viera", "Centre Pointe", "Marisol at Viera", "Another nearby community", "Prefer not to say"]),
      q(2, "residencyLength", "single", "How long have you lived in your current community?", ["Less than 3 months", "3–6 months", "6–12 months", "1–2 years", "More than 2 years"]),
      q(3, "connectedness", "slider", "How connected do you currently feel to people in your apartment community?", ["Not connected at all", "Slightly connected", "Somewhat connected", "Very connected", "Extremely connected"]),
      q(4, "socialNeighborCount", "single", "Approximately how many neighbors do you know well enough to contact socially?", ["None", "1–2", "3–5", "6–10", "More than 10"]),
      q(5, "activityAwareness", "single", "How easy is it currently to learn about social activities involving residents of your community?", ["Very difficult", "Difficult", "Neither easy nor difficult", "Easy", "Very easy", "I am not aware of any resident activities"]),
      q(6, "residentExperienceStatement", "single", "Which statement best describes your experience?", ["I would like to know more people in my apartment community.", "I already know enough people in my apartment community.", "I prefer not to socialize with neighbors.", "I am interested mainly in activities, not meeting people.", "I am unsure."])
    ]
  },
  {
    title: "The Viera Local concept",
    short: "Core concept",
    intro: "Viera Local would provide one dashboard where residents could view activity inside their own apartment community and across the surrounding neighborhood.",
    questions: [
      {
        number: 7,
        id: "dashboardUsefulness",
        type: "multiSlider",
        title: "How useful would each part of the Viera Local dashboard be to you?",
        help: "Move any sliders you want. Each one starts in the middle until you answer it.",
        rows: [
          "Updates and conversations from my apartment community",
          "Updates and conversations across nearby apartment communities",
          "Events and activities around Viera Town Center",
          "Nearby businesses, restaurants, and destinations",
          "Passport offers, rewards, and neighborhood challenges"
        ],
        options: ["Not useful", "Slightly useful", "Moderately useful", "Very useful", "Extremely useful"]
      },
      q(8, "comfortableAreas", "multi", "Which parts of the Viera Local app would you feel comfortable participating in?", ["A private app area for verified residents of my apartment community", "A shared app area connecting nearby apartment communities", "A broader neighborhood feed for the Viera Town Center area", "Interest-based groups inside the app", "Conversation pages attached to specific events", "One-to-one private messages with other residents", "I would mainly read updates rather than post"]),
      {
        number: 9,
        id: "featureInterest",
        type: "groupedMulti",
        title: "Which community features would you be most likely to use?",
        help: "Choose as many as genuinely interest you.",
        groups: [
          {
            title: "Stay informed",
            icon: "📣",
            options: ["Apartment community announcements", "Local events calendar", "Safety or neighborhood updates", "Polls and community voting"]
          },
          {
            title: "Connect and talk",
            icon: "💬",
            options: ["Apartment resident chat", "Greater-neighborhood chat", "Interest groups", "New-resident introductions"]
          },
          {
            title: "Make plans",
            icon: "📅",
            options: ["Resident-created meetups", "Dog walks and pet meetups", "Restaurant and coffee meetups", "Fitness and walking groups", "Movie or shopping outings", "Volunteer opportunities"]
          },
          {
            title: "Explore and exchange",
            icon: "📍",
            options: ["Local business offers", "Viera Local Passport", "Classifieds / items for sale or giveaway", "Local recommendations"]
          }
        ]
      },
      q(10, "returnFeature", "single", "Which single feature would make you most likely to return regularly?", ["Apartment conversations", "Neighborhood conversations", "Events and meetups", "Local activity calendar", "Passport deals", "Groups based on interests", "Local recommendations", "Something else"])
    ]
  },
  {
    title: "Chat and communication",
    short: "Communication",
    intro: "Help us understand which conversations would be useful and what would make the platform feel comfortable.",
    questions: [
      q(11, "conversationTypes", "multi", "What types of conversations would you find useful?", ["General apartment community discussion", "General neighborhood discussion", "Event-specific chat", "Dog-owner chat", "Food and restaurant discussions", "Fitness and wellness", "Parents and families", "New to Viera", "Remote workers", "Local recommendations", "Lost and found", "Buy, sell, or give away items", "I would not use chat"]),
      q(12, "conversationOrganization", "single", "How would you prefer conversations to be organized?", ["One feed for my apartment and one for the larger neighborhood", "Separate channels based on topics", "A combination of feeds and topic channels", "Mostly event-specific conversations", "I am unsure"]),
      q(13, "privacyProtections", "multi", "Which privacy protections would make you more comfortable?", ["Resident verification", "Unit numbers never displayed", "Ability to use only a first name", "Control over profile visibility", "Ability to block users", "Ability to report posts", "Apartment-only conversations", "Moderated neighborhood conversations", "Optional direct messaging", "Notification controls"])
    ]
  },
  {
    title: "Events and real-world activity",
    short: "Activities",
    intro: "Tell us what you might actually join and what information helps you decide whether to attend.",
    questions: [
      q(14, "activityInterest", "multi", "Which activities would you realistically consider joining?", ["Casual gathering at Lakeside Social", "Dinner group", "Dinner and a movie at The Avenue", "Coffee meetup", "Dog park meetup", "Walking or running group", "Fitness class or workout group", "Trivia or game night", "Live music outing", "Shopping or local-business event", "New-resident meetup", "Family activity", "Volunteer or cleanup event", "Apartment-versus-apartment challenge", "I probably would not attend events"]),
      q(15, "activityFrequency", "single", "How often might you participate in a nearby activity?", ["Several times per week", "About once per week", "A few times per month", "About once per month", "Occasionally", "Probably never"]),
      q(16, "activityTiming", "multi", "When would you most likely attend activities?", ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Friday evenings", "Saturday mornings", "Saturday afternoons", "Saturday evenings", "Sunday mornings", "Sunday afternoons", "Sunday evenings"]),
      q(17, "attendanceDecision", "multi", "How do you normally decide whether to attend a local activity?", ["I already know someone attending", "The activity sounds interesting", "It is within walking distance", "It is free", "There is a discount or reward", "I can see how many people are attending", "The group is small", "It is officially hosted", "It is family-friendly", "It is pet-friendly", "I can participate without committing far in advance"], 3, "Choose up to three."),
      q(18, "whosGoingComfort", "single", "Would a “Who’s Going?” feature make you more or less comfortable joining an activity?", ["Much more comfortable", "Slightly more comfortable", "No difference", "Slightly less comfortable", "Much less comfortable", "It depends on the privacy settings"])
    ]
  },
  {
    title: "Passport validation",
    short: "Passport",
    intro: "A free Community Passport could award stamps for participating. A paid Local Perks Pass could include one-time offers from nearby businesses.",
    questions: [
      q(19, "communityPassportInterest", "slider", "How interested would you be in the free Community Passport?", ["Not interested", "Slightly interested", "Moderately interested", "Very interested", "Extremely interested"]),
      q(20, "stampActions", "multi", "Which actions should earn Passport stamps?", ["Joining Viera Local", "Introducing yourself", "Attending a meetup", "Visiting a local business", "Trying a new restaurant", "Attending an Avenue or Lakeside event", "Participating in a dog walk", "Joining a fitness activity", "Helping a neighbor", "Volunteering", "Inviting another resident", "Completing an apartment challenge"]),
      q(21, "passportRewards", "multi", "Which Passport rewards would motivate you?", ["Restaurant deals", "Free food or drink add-ons", "Movie-related offers", "Retail offers", "Fitness classes or trials", "Giveaway entries", "Exclusive events", "Viera Local merchandise", "Apartment challenge prizes", "Digital badges", "Viera VIP benefits", "Recognition within the community"], 5, "Choose up to five."),
      q(22, "paidPassInterest", "single", "Would you consider purchasing an annual Local Perks Pass if its offers were worth substantially more than its price?", ["Definitely not", "Probably not", "Maybe", "Probably yes", "Definitely yes"]),
      q(23, "annualPassPrice", "single", "What price would feel reasonable for an annual pass containing offers from numerous nearby businesses?", ["Under $25", "$25–$39", "$40–$59", "$60–$79", "$80 or more", "It depends entirely on the offers", "I would not purchase one"]),
      q(24, "wantedBusinesses", "text", "Which businesses or destinations would you most want included?", [], null, "Restaurants, shops, activities, fitness, entertainment, services...")
    ]
  },
  {
    title: "Final validation",
    short: "Final validation",
    intro: "These final questions help us measure whether residents would actually use, recommend, or test Viera Local.",
    questions: [
      q(25, "accountLikelihood", "numberSlider", "How likely would you be to create an account for Viera Local?", [], null, "0 means not at all likely. 10 means extremely likely."),
      q(26, "recommendLikelihood", "numberSlider", "How likely would you be to recommend Viera Local to a nearby resident?", [], null, "0 means not at all likely. 10 means extremely likely."),
      q(27, "biggestProblem", "text", "What is the biggest problem Viera Local could solve for you?", [], null, "Tell us what is missing from apartment or neighborhood life today..."),
      q(28, "reasonNotUse", "text", "What would make you decide not to use it?", [], null, "Privacy, usefulness, moderation, time, notifications, something else..."),
      q(29, "pilotTesting", "single", "Would you be willing to help test an early version?", ["Yes", "Maybe", "No"])
    ]
  },
  {
    title: "Optional demographics",
    short: "Optional details",
    intro: "These optional details help us understand whether different resident groups have different needs.",
    questions: [
      q(30, "ageRange", "single", "What is your age range?", ["18–24", "25–34", "35–44", "45–54", "55–64", "65 or older", "Prefer not to say"]),
      q(31, "householdType", "single", "Which best describes your household?", ["Living alone", "Living with a partner", "Living with roommates", "Family with children", "Other", "Prefer not to say"]),
      q(32, "dogOwner", "single", "Are you a dog owner?", ["Yes", "No", "Prefer not to say"]),
      q(33, "parentGuardian", "single", "Are you a parent or guardian?", ["Yes", "No", "Prefer not to say"]),
      q(34, "workFromHome", "single", "Do you work from home regularly?", ["Yes", "Sometimes", "No", "Prefer not to say"]),
      q(35, "newToViera", "single", "Are you new to the Viera area?", ["Yes, within the last 6 months", "Yes, within the last 1–2 years", "No", "Prefer not to say"])
    ]
  }
];

function q(number, id, type, title, options = [], maxSelections = null, help = "") {
  return { number, id, type, title, options, maxSelections, help };
}

const allQuestions = sections.flatMap(section => section.questions);
let state = { sectionIndex: 0, answers: {}, startedAt: null, celebratedSections: [] };
let toastTimer;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function showScreen(id) {
  $$(".screen").forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
}

function hasAnswer(id) {
  const value = state.answers[id];
  if (Array.isArray(value)) return value.length > 0;
  if (value && typeof value === "object") return Object.values(value).some(Boolean);
  return value !== undefined && value !== null && value !== "";
}

function answeredCount() {
  return allQuestions.filter(question => hasAnswer(question.id)).length;
}

function sectionAnswered(section) {
  return section.questions.filter(question => hasAnswer(question.id)).length;
}

function saveDraft() {
  storageSet(STORAGE.draft, JSON.stringify(state));
  $("#resumeButton").style.display = "inline-flex";
}

function loadDraft() {
  const draft = JSON.parse(storageGet(STORAGE.draft) || "null");
  if (!draft) return false;
  state = {
    ...draft,
    celebratedSections: Array.isArray(draft.celebratedSections) ? draft.celebratedSections : []
  };
  return true;
}

function clearDraft() {
  storageRemove(STORAGE.draft);
  state = { sectionIndex: 0, answers: {}, startedAt: null, celebratedSections: [] };
}

function renderSurvey() {
  const section = sections[state.sectionIndex];
  $("#sectionNumber").textContent = `Section ${state.sectionIndex + 1} of ${sections.length}`;
  $("#sectionTitle").textContent = section.title;
  $("#sectionDescription").textContent = section.intro;
  $("#questionList").innerHTML = section.questions.map(renderQuestion).join("");
  $("#previousButton").disabled = state.sectionIndex === 0;
  $("#nextButton").textContent = state.sectionIndex === sections.length - 1 ? "Review my answers →" : "Next section →";
  bindQuestionEvents();
  renderSectionNav();
  updateProgress();
}

function renderSectionNav() {
  $("#sectionNav").innerHTML = sections.map((section, index) => {
    const count = sectionAnswered(section);
    return `<button class="${index === state.sectionIndex ? "active" : ""} ${count === section.questions.length ? "complete" : ""}" data-section="${index}"><span class="nav-number">${index + 1}</span><span>${escapeHtml(section.short)}</span><span class="nav-count">${count}/${section.questions.length}</span></button>`;
  }).join("");
  $$('[data-section]').forEach(button => button.addEventListener("click", () => {
    state.sectionIndex = Number(button.dataset.section);
    saveDraft();
    renderSurvey();
  }));
}

function renderQuestion(question) {
  return `<article class="question-card ${hasAnswer(question.id) ? "answered" : ""}" data-card="${question.id}">
    <div class="question-title-row"><span class="question-number">${question.number}</span><h3>${escapeHtml(question.title)}</h3><span class="optional">Optional</span></div>
    ${question.help ? `<p class="question-help">${escapeHtml(question.help)}</p>` : ""}
    <div class="answer-area">${renderControl(question)}</div>
  </article>`;
}

function renderControl(question) {
  if (question.type === "single") return choiceControl(question, false);
  if (question.type === "multi") return choiceControl(question, true);
  if (question.type === "groupedMulti") return groupedMultiControl(question);
  if (question.type === "scale") return scaleControl(question);
  if (question.type === "slider") return sliderControl(question);
  if (question.type === "numberScale") return numberScaleControl(question);
  if (question.type === "numberSlider") return numberSliderControl(question);
  if (question.type === "multiSlider") return multiSliderControl(question);
  if (question.type === "matrix") return matrixControl(question);
  if (question.type === "text") return textControl(question);
  return "";
}

function choiceControl(question, multiple) {
  const current = multiple ? (Array.isArray(state.answers[question.id]) ? state.answers[question.id] : []) : state.answers[question.id];
  return `<div class="choice-grid">${question.options.map(option => {
    const selected = multiple ? current.includes(option) : current === option;
    return `<label class="choice ${selected ? "selected" : ""}"><input type="${multiple ? "checkbox" : "radio"}" name="${question.id}" value="${escapeHtml(option)}" ${selected ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`;
  }).join("")}</div>${question.maxSelections ? `<p class="limit-note">${current.length} of ${question.maxSelections} selected</p>` : ""}`;
}

function groupedMultiControl(question) {
  const current = Array.isArray(state.answers[question.id]) ? state.answers[question.id] : [];
  return `<div class="feature-groups">${question.groups.map(group => `
    <section class="feature-group">
      <div class="feature-group-heading"><span>${group.icon}</span><h4>${escapeHtml(group.title)}</h4></div>
      <div class="choice-grid grouped-choice-grid">${group.options.map(option => {
        const selected = current.includes(option);
        return `<label class="choice ${selected ? "selected" : ""}"><input type="checkbox" name="${question.id}" value="${escapeHtml(option)}" ${selected ? "checked" : ""}><span>${escapeHtml(option)}</span></label>`;
      }).join("")}</div>
    </section>`).join("")}</div><p class="limit-note">${current.length} selected · choose as many as you like</p>`;
}

function sliderControl(question) {
  const selectedIndex = Math.max(question.options.indexOf(state.answers[question.id]), 0);
  const answered = hasAnswer(question.id);
  return `<div class="slider-answer ${answered ? "answered-slider" : ""}">
    <div class="slider-value" data-slider-label="${question.id}">${answered ? escapeHtml(question.options[selectedIndex]) : "Move the slider to answer"}</div>
    <input type="range" min="0" max="${question.options.length - 1}" step="1" value="${answered ? selectedIndex : Math.floor((question.options.length - 1) / 2)}" data-slider="${question.id}">
    <div class="slider-endpoints"><span>${escapeHtml(question.options[0])}</span><span>${escapeHtml(question.options[question.options.length - 1])}</span></div>
  </div>`;
}

function numberSliderControl(question) {
  const answered = hasAnswer(question.id);
  const value = answered ? Number(state.answers[question.id]) : 5;
  return `<div class="slider-answer number-slider-answer ${answered ? "answered-slider" : ""}">
    <div class="number-slider-value"><strong data-number-slider-label="${question.id}">${answered ? value : "—"}</strong><span>${answered ? sliderNumberMessage(value) : "Move the slider to answer"}</span></div>
    <input type="range" min="0" max="10" step="1" value="${value}" data-number-slider="${question.id}">
    <div class="slider-endpoints"><span>0 · Not at all likely</span><span>10 · Extremely likely</span></div>
  </div>`;
}

function sliderNumberMessage(value) {
  if (value <= 2) return "Not very likely";
  if (value <= 4) return "A little unlikely";
  if (value <= 6) return "Maybe";
  if (value <= 8) return "Likely";
  return "Very likely";
}

function multiSliderControl(question) {
  const current = state.answers[question.id] && typeof state.answers[question.id] === "object" ? state.answers[question.id] : {};
  const midpoint = Math.floor((question.options.length - 1) / 2);
  return `<div class="mini-slider-list">${question.rows.map((row, index) => {
    const answered = current[row] !== undefined;
    const selectedIndex = answered ? question.options.indexOf(current[row]) : midpoint;
    return `<article class="mini-slider-card ${answered ? "is-set" : ""}">
      <div class="mini-slider-heading"><strong>${escapeHtml(row)}</strong><span data-multi-slider-label="${question.id}_${index}">${answered ? escapeHtml(current[row]) : "Not answered"}</span></div>
      <input type="range" min="0" max="${question.options.length - 1}" step="1" value="${selectedIndex}" data-multi-slider="${question.id}" data-row="${escapeHtml(row)}" data-label-id="${question.id}_${index}">
      <div class="slider-endpoints compact"><span>${escapeHtml(question.options[0])}</span><span>${escapeHtml(question.options[question.options.length - 1])}</span></div>
    </article>`;
  }).join("")}</div>`;
}

function scaleControl(question) {
  return `<div class="scale-grid">${question.options.map(option => `<button type="button" class="scale-option ${state.answers[question.id] === option ? "selected" : ""}" data-scale="${question.id}" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}</div>`;
}

function numberScaleControl(question) {
  return `<div class="scale-grid eleven">${Array.from({ length: 11 }, (_, index) => index).map(value => `<button type="button" class="scale-option ${Number(state.answers[question.id]) === value ? "selected" : ""}" data-number-scale="${question.id}" data-value="${value}">${value}</button>`).join("")}</div>`;
}

function matrixControl(question) {
  const current = state.answers[question.id] || {};
  return `<div class="matrix-wrap"><table class="matrix"><thead><tr><th>Area</th>${question.columns.map(column => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead><tbody>${question.rows.map((row, rowIndex) => `<tr><td>${escapeHtml(row)}</td>${question.columns.map(column => `<td><input type="radio" name="${question.id}_${rowIndex}" value="${escapeHtml(column)}" data-matrix="${question.id}" data-row="${escapeHtml(row)}" ${current[row] === column ? "checked" : ""}></td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function textControl(question) {
  return `<textarea class="text-answer" data-text="${question.id}" placeholder="${escapeHtml(question.help || "")}">${escapeHtml(state.answers[question.id] || "")}</textarea>`;
}

function bindQuestionEvents() {
  $$('#questionList input[type="radio"]:not([data-matrix])').forEach(input => input.addEventListener("change", () => {
    state.answers[input.name] = input.value;
    saveDraft();
    checkSectionCelebration();
    renderSurvey();
  }));

  $$('#questionList input[type="checkbox"]').forEach(input => input.addEventListener("change", () => {
    const question = allQuestions.find(item => item.id === input.name);
    let values = Array.isArray(state.answers[input.name]) ? [...state.answers[input.name]] : [];
    if (input.checked) {
      if (question.maxSelections && values.length >= question.maxSelections) {
        input.checked = false;
        showToast(`Choose up to ${question.maxSelections} options.`);
        return;
      }
      values.push(input.value);
    } else {
      values = values.filter(value => value !== input.value);
    }
    state.answers[input.name] = [...new Set(values)];
    saveDraft();
    checkSectionCelebration();
    renderSurvey();
  }));

  $$('[data-scale]').forEach(button => button.addEventListener("click", () => {
    state.answers[button.dataset.scale] = button.dataset.value;
    saveDraft();
    renderSurvey();
  }));

  $$('[data-number-scale]').forEach(button => button.addEventListener("click", () => {
    state.answers[button.dataset.numberScale] = Number(button.dataset.value);
    saveDraft();
    renderSurvey();
  }));

  $$('[data-slider]').forEach(slider => slider.addEventListener("input", () => {
    const question = allQuestions.find(item => item.id === slider.dataset.slider);
    state.answers[slider.dataset.slider] = question.options[Number(slider.value)];
    saveDraft();
    const label = $(`[data-slider-label="${slider.dataset.slider}"]`);
    if (label) label.textContent = state.answers[slider.dataset.slider];
    slider.closest('.slider-answer')?.classList.add('answered-slider');
    updateProgress();
    renderSectionNav();
    updateCardState(slider.dataset.slider);
    checkSectionCelebration();
  }));

  $$('[data-number-slider]').forEach(slider => slider.addEventListener("input", () => {
    const value = Number(slider.value);
    state.answers[slider.dataset.numberSlider] = value;
    saveDraft();
    const label = $(`[data-number-slider-label="${slider.dataset.numberSlider}"]`);
    if (label) {
      label.textContent = value;
      label.nextElementSibling.textContent = sliderNumberMessage(value);
    }
    slider.closest('.slider-answer')?.classList.add('answered-slider');
    updateProgress();
    renderSectionNav();
    updateCardState(slider.dataset.numberSlider);
    checkSectionCelebration();
  }));

  $$('[data-multi-slider]').forEach(slider => slider.addEventListener("input", () => {
    const question = allQuestions.find(item => item.id === slider.dataset.multiSlider);
    const current = state.answers[question.id] && typeof state.answers[question.id] === 'object' ? { ...state.answers[question.id] } : {};
    current[slider.dataset.row] = question.options[Number(slider.value)];
    state.answers[question.id] = current;
    saveDraft();
    const label = $(`[data-multi-slider-label="${slider.dataset.labelId}"]`);
    if (label) label.textContent = current[slider.dataset.row];
    slider.closest('.mini-slider-card')?.classList.add('is-set');
    updateProgress();
    renderSectionNav();
    updateCardState(question.id);
    checkSectionCelebration();
  }));

  $$('[data-matrix]').forEach(input => input.addEventListener("change", () => {
    const current = state.answers[input.dataset.matrix] || {};
    current[input.dataset.row] = input.value;
    state.answers[input.dataset.matrix] = current;
    saveDraft();
    updateProgress();
    renderSectionNav();
    updateCardState(input.dataset.matrix);
    checkSectionCelebration();
  }));

  $$('[data-text]').forEach(textarea => textarea.addEventListener("input", () => {
    state.answers[textarea.dataset.text] = textarea.value.trim();
    saveDraft();
    updateProgress();
    renderSectionNav();
    const card = $(`[data-card="${textarea.dataset.text}"]`);
    if (card) card.classList.toggle("answered", hasAnswer(textarea.dataset.text));
    checkSectionCelebration();
  }));
}


function updateCardState(questionId) {
  const card = $(`[data-card="${questionId}"]`);
  if (card) card.classList.toggle("answered", hasAnswer(questionId));
}

function completedSectionCount() {
  return sections.filter(section => sectionAnswered(section) === section.questions.length).length;
}

function checkSectionCelebration() {
  const section = sections[state.sectionIndex];
  const complete = sectionAnswered(section) === section.questions.length;
  state.celebratedSections = Array.isArray(state.celebratedSections) ? state.celebratedSections : [];
  if (!complete || state.celebratedSections.includes(state.sectionIndex)) return;
  state.celebratedSections.push(state.sectionIndex);
  saveDraft();
  showSectionCelebration(completedSectionCount(), section.title);
}

function showSectionCelebration(level, sectionTitle) {
  const celebration = $("#sectionCelebration");
  const titles = ["Nice work!", "You are on a roll!", "Halfway hero!", "Neighborhood builder!", "Research superstar!", "Almost there!", "You completed every section!"];
  const icons = ["✓", "✦", "★", "🏡", "🌴", "🚀", "🏆"];
  $("#celebrationTitle").textContent = titles[Math.min(level - 1, titles.length - 1)];
  $("#celebrationIcon").textContent = icons[Math.min(level - 1, icons.length - 1)];
  $("#celebrationMessage").textContent = `${sectionTitle} is complete. ${level} section${level === 1 ? "" : "s"} finished so far.`;
  $("#celebrationBurst").innerHTML = Array.from({ length: 8 + level * 2 }, (_, index) => `<i style="--i:${index};--total:${8 + level * 2}"></i>`).join("");
  celebration.classList.add("show", `level-${Math.min(level, 7)}`);
  celebration.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    celebration.className = "section-celebration";
    celebration.setAttribute("aria-hidden", "true");
  }, 2100 + level * 100);
}

function updateProgress() {
  const count = answeredCount();
  const percent = Math.round((count / allQuestions.length) * 100);
  $("#answeredCount").textContent = count;
  $("#totalQuestionCount").textContent = allQuestions.length;
  $("#completionPercent").textContent = `${percent}%`;
  $("#progressBar").style.width = `${percent}%`;
  $("#progressMessage").textContent = percent === 0 ? "Every answer helps." : percent < 25 ? "Nice start. Submit whenever you like." : percent < 50 ? "You are already giving us useful direction." : percent < 75 ? "You are helping shape the real product." : percent < 100 ? "Almost every major area is covered." : "You answered everything. Amazing.";
}

function showReview() {
  $("#reviewCount").textContent = answeredCount();
  $("#reviewGrid").innerHTML = sections.slice(0, 6).map(section => `<article><strong>${sectionAnswered(section)}/${section.questions.length}</strong><small>${escapeHtml(section.short)}</small></article>`).join("");
  showScreen("reviewScreen");
}

function getResponses() {
  return JSON.parse(storageGet(STORAGE.responses) || "[]");
}

function saveResponses(responses) {
  storageSet(STORAGE.responses, JSON.stringify(responses));
}

function submitResponse() {
  const response = {
    id: `response_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    submittedAt: new Date().toISOString(),
    startedAt: state.startedAt,
    answeredCount: answeredCount(),
    completionPercentage: Math.round((answeredCount() / allQuestions.length) * 100),
    answers: { ...state.answers },
    contact: {
      firstName: $("#contactName").value.trim(),
      email: $("#contactEmail").value.trim(),
      interview: $("#contactInterview").checked,
      host: $("#contactHost").checked
    }
  };
  const responses = getResponses();
  responses.push(response);
  saveResponses(responses);
  clearDraft();
  showScreen("thanksScreen");
}

function renderPreview() {
  $("#previewGrid").innerHTML = sections.map((section, index) => `<article class="preview-card" data-preview-section="${index}" tabindex="0" role="button" aria-expanded="false">
    <div class="preview-card-top"><div><span>SECTION ${index + 1}</span><h3>${escapeHtml(section.title)}</h3><p>${section.questions.length} questions</p></div><b>+</b></div>
    <div class="preview-details"><p>${escapeHtml(section.intro)}</p><ul>${section.questions.slice(0, 5).map(question => `<li>${escapeHtml(question.title)}</li>`).join("")}${section.questions.length > 5 ? `<li>Plus ${section.questions.length - 5} more...</li>` : ""}</ul></div>
  </article>`).join("");
  $$('[data-preview-section]').forEach(card => {
    const toggle = () => {
      const open = card.classList.toggle('expanded');
      card.setAttribute('aria-expanded', String(open));
      card.querySelector('b').textContent = open ? '−' : '+';
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } });
  });
}

function openModal(id) { $("#" + id).classList.add("open"); }
function closeModal(id) { $("#" + id).classList.remove("open"); }

function renderDashboard() {
  const responses = getResponses();
  $("#responseMetric").textContent = responses.length;
  const completion = responses.length ? Math.round(responses.reduce((sum, response) => sum + response.completionPercentage, 0) / responses.length) : 0;
  $("#completionMetric").textContent = `${completion}%`;
  const accountCount = responses.filter(response => Number(response.answers.accountLikelihood) >= 7).length;
  $("#accountMetric").textContent = responses.length ? `${Math.round(accountCount / responses.length * 100)}%` : "0%";
  const passportCount = responses.filter(response => ["Very interested", "Extremely interested"].includes(response.answers.communityPassportInterest)).length;
  $("#passportMetric").textContent = responses.length ? `${Math.round(passportCount / responses.length * 100)}%` : "0%";
  renderChart("connectednessChart", countSingle(responses, "connectedness"));
  renderRanking("featureRanking", countMulti(responses, "featureInterest"));
  renderRanking("activityRanking", countMulti(responses, "activityInterest"));
  renderRanking("concernRanking", countMulti(responses, "privacyProtections"));
  renderChart("priceChart", countSingle(responses, "annualPassPrice"));
  renderComments();
}

function countSingle(responses, id) {
  const counts = {};
  responses.forEach(response => {
    const value = response.answers[id];
    if (value !== undefined && value !== null && value !== "") counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function countMulti(responses, id) {
  const counts = {};
  responses.forEach(response => (Array.isArray(response.answers[id]) ? response.answers[id] : []).forEach(value => counts[value] = (counts[value] || 0) + 1));
  return counts;
}

function renderChart(id, counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(entry => entry[1]), 1);
  $("#" + id).innerHTML = entries.length ? entries.map(([label, value]) => `<div class="chart-row"><span class="chart-label">${escapeHtml(label)}</span><span class="chart-track"><i style="width:${Math.round(value / max * 100)}%"></i></span><span class="chart-value">${value}</span></div>`).join("") : `<p class="comment-note">No responses yet.</p>`;
}

function renderRanking(id, counts) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  $("#" + id).innerHTML = entries.length ? entries.map(([label, value], index) => `<div class="rank-row"><span class="rank-number">${index + 1}</span><strong>${escapeHtml(label)}</strong><span>${value}</span></div>`).join("") : `<p class="comment-note">No responses yet.</p>`;
}

function renderComments() {
  const id = $("#commentFilter").value;
  const comments = getResponses().map(response => response.answers[id]).filter(Boolean);
  $("#commentWall").innerHTML = comments.length ? comments.map(comment => `<article class="comment-note">${escapeHtml(comment)}</article>`).join("") : `<p class="comment-note">No written responses yet.</p>`;
}

function addSampleData() {
  const samples = [
    { connectedness: "Slightly connected", featureInterest: ["Apartment resident chat", "Local events calendar", "Resident-created meetups", "Dog walks and pet meetups", "Viera Local Passport"], activityInterest: ["Casual gathering at Lakeside Social", "Dinner and a movie at The Avenue", "Dog park meetup"], privacyProtections: ["Resident verification", "Unit numbers never displayed", "Notification controls"], communityPassportInterest: "Very interested", annualPassPrice: "$40–$59", accountLikelihood: 9, biggestProblem: "I live near hundreds of people but do not have an easy way to meet them.", reasonNotUse: "Too much spam or if my apartment number could be seen.", wantedBusinesses: "AMC, Urban Prime, coffee shops, restaurants at The Avenue" },
    { connectedness: "Not connected at all", featureInterest: ["Apartment community announcements", "Greater-neighborhood chat", "Interest groups", "Local recommendations", "Local business offers"], activityInterest: ["Coffee meetup", "Walking or running group", "New-resident meetup"], privacyProtections: ["Moderated neighborhood conversations", "Ability to block users"], communityPassportInterest: "Extremely interested", annualPassPrice: "$25–$39", accountLikelihood: 8, biggestProblem: "Helping new residents learn what is happening and meet people quickly.", reasonNotUse: "If the conversations became negative or political.", wantedBusinesses: "Restaurants, fitness classes, movie theater, grocery and coffee" },
    { connectedness: "Somewhat connected", featureInterest: ["Local events calendar", "Fitness and walking groups", "Movie or shopping outings", "Polls and community voting", "Safety or neighborhood updates"], activityInterest: ["Fitness class or workout group", "Trivia or game night", "Live music outing"], privacyProtections: ["Ability to report posts", "Control over profile visibility"], communityPassportInterest: "Moderately interested", annualPassPrice: "It depends entirely on the offers", accountLikelihood: 7, biggestProblem: "Knowing what is happening nearby without checking several different websites.", reasonNotUse: "If it becomes mostly advertisements.", wantedBusinesses: "Sweat Haven, restaurants, local events, AMC" },
    { connectedness: "Very connected", featureInterest: ["Resident-created meetups", "Restaurant and coffee meetups", "Local business offers", "Viera Local Passport", "Volunteer opportunities"], activityInterest: ["Dinner group", "Casual gathering at Lakeside Social", "Shopping or local-business event"], privacyProtections: ["Resident verification", "Apartment-only conversations"], communityPassportInterest: "Very interested", annualPassPrice: "$60–$79", accountLikelihood: 8, biggestProblem: "Connecting apartment communities instead of keeping everyone separated.", reasonNotUse: "If resident verification and moderation are weak.", wantedBusinesses: "The Avenue restaurants, local boutiques, fitness and entertainment" }
  ];
  const responses = getResponses();
  samples.forEach((answers, index) => responses.push({ id: `sample_${Date.now()}_${index}`, submittedAt: new Date().toISOString(), startedAt: new Date().toISOString(), answeredCount: 30, completionPercentage: 83, answers, contact: {} }));
  saveResponses(responses);
  renderDashboard();
  showToast("Sample responses added.");
}

function exportCsv() {
  const responses = getResponses();
  if (!responses.length) return showToast("There are no responses to export.");
  const ids = allQuestions.map(question => question.id);
  const headers = ["response_id", "submitted_at", "completion_percentage", "answered_count", ...ids, "contact_first_name", "contact_email", "contact_interview", "contact_host"];
  const rows = responses.map(response => [response.id, response.submittedAt, response.completionPercentage, response.answeredCount, ...ids.map(id => {
    const value = response.answers[id];
    if (Array.isArray(value)) return value.join(" | ");
    if (value && typeof value === "object") return Object.entries(value).map(([key, answer]) => `${key}: ${answer}`).join(" | ");
    return value ?? "";
  }), response.contact?.firstName || "", response.contact?.email || "", response.contact?.interview ? "Yes" : "No", response.contact?.host ? "Yes" : "No"]);
  const csv = [headers, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `viera-local-survey-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

$("#startButton").addEventListener("click", () => { if (!state.startedAt) state.startedAt = new Date().toISOString(); renderSurvey(); showScreen("surveyScreen"); saveDraft(); });
$("#previewButton").addEventListener("click", () => openModal("previewModal"));
$("#startPreviewButton").addEventListener("click", () => { closeModal("previewModal"); if (!state.startedAt) state.startedAt = new Date().toISOString(); renderSurvey(); showScreen("surveyScreen"); saveDraft(); });
$("#resumeButton").addEventListener("click", () => { if (!loadDraft()) return showToast("No saved survey found."); renderSurvey(); showScreen("surveyScreen"); });
$("#dashboardButton").addEventListener("click", () => { renderDashboard(); showScreen("dashboardScreen"); });
$("#previousButton").addEventListener("click", () => { if (state.sectionIndex > 0) { state.sectionIndex--; saveDraft(); renderSurvey(); window.scrollTo({ top: 0, behavior: "smooth" }); } });
$("#nextButton").addEventListener("click", () => { if (state.sectionIndex < sections.length - 1) { state.sectionIndex++; saveDraft(); renderSurvey(); window.scrollTo({ top: 0, behavior: "smooth" }); } else showReview(); });
$("#saveExitButton").addEventListener("click", () => { saveDraft(); showScreen("welcomeScreen"); showToast("Your progress was saved."); });
$("#submitAnytimeButton").addEventListener("click", () => openModal("earlySubmitModal"));
$("#reviewEarlyButton").addEventListener("click", () => { closeModal("earlySubmitModal"); showReview(); });
$("#clearDraftButton").addEventListener("click", () => { if (confirm("Clear all answers in this draft?")) { clearDraft(); state.startedAt = new Date().toISOString(); renderSurvey(); } });
$("#returnButton").addEventListener("click", () => { renderSurvey(); showScreen("surveyScreen"); });
$("#finalSubmitButton").addEventListener("click", submitResponse);
$("#thanksDashboardButton").addEventListener("click", () => { renderDashboard(); showScreen("dashboardScreen"); });
$("#newResponseButton").addEventListener("click", () => { clearDraft(); showScreen("welcomeScreen"); });
$("#dashboardBackButton").addEventListener("click", () => showScreen(storageGet(STORAGE.draft) ? "surveyScreen" : "welcomeScreen"));
$("#sampleDataButton").addEventListener("click", addSampleData);
$("#exportButton").addEventListener("click", exportCsv);
$("#commentFilter").addEventListener("change", renderComments);
$("#deleteResponsesButton").addEventListener("click", () => { if (confirm("Delete all responses saved in this browser?")) { storageRemove(STORAGE.responses); renderDashboard(); } });
$$('[data-close]').forEach(element => element.addEventListener("click", () => closeModal(element.dataset.close)));
document.addEventListener("keydown", event => { if (event.key === "Escape") $$(".modal.open").forEach(modal => modal.classList.remove("open")); });

renderPreview();
$("#resumeButton").style.display = storageGet(STORAGE.draft) ? "inline-flex" : "none";


/* =========================================================
   MOBILE SURVEY NAVIGATION
   ========================================================= */

const mobileSectionsButton = document.getElementById("mobileSectionsButton");
const mobileSaveButton = document.getElementById("mobileSaveButton");
const mobilePreviousButton = document.getElementById("mobilePreviousButton");
const mobileNextButton = document.getElementById("mobileNextButton");
const mobileSubmitButton = document.getElementById("mobileSubmitButton");
const surveyDrawerBackdrop = document.getElementById("surveyDrawerBackdrop");
const surveySidebar = document.querySelector(".survey-sidebar");

function updateMobileSurveyUi() {
  const answered = getAnsweredCount();
  const total = allQuestions.length;
  const percent = Math.round((answered / total) * 100);

  const mobileAnswered = document.getElementById("mobileAnsweredCount");
  const mobileTotal = document.getElementById("mobileTotalQuestionCount");
  const mobilePercent = document.getElementById("mobileCompletionPercent");
  const mobileBar = document.getElementById("mobileProgressBar");

  if (mobileAnswered) mobileAnswered.textContent = answered;
  if (mobileTotal) mobileTotal.textContent = total;
  if (mobilePercent) mobilePercent.textContent = `${percent}%`;
  if (mobileBar) mobileBar.style.width = `${percent}%`;

  if (mobilePreviousButton) {
    mobilePreviousButton.disabled = state.sectionIndex === 0;
  }

  if (mobileNextButton) {
    mobileNextButton.innerHTML = state.sectionIndex === sections.length - 1
      ? 'Review <span>→</span>'
      : 'Next <span>→</span>';
  }
}

function openSurveyDrawer() {
  surveySidebar?.classList.add("is-open");
  surveyDrawerBackdrop?.classList.add("is-visible");
  document.body.classList.add("mobile-drawer-open");
  mobileSectionsButton?.setAttribute("aria-expanded", "true");
}

function closeSurveyDrawer() {
  surveySidebar?.classList.remove("is-open");
  surveyDrawerBackdrop?.classList.remove("is-visible");
  document.body.classList.remove("mobile-drawer-open");
  mobileSectionsButton?.setAttribute("aria-expanded", "false");
}

mobileSectionsButton?.addEventListener("click", () => {
  if (surveySidebar?.classList.contains("is-open")) {
    closeSurveyDrawer();
  } else {
    openSurveyDrawer();
  }
});

surveyDrawerBackdrop?.addEventListener("click", closeSurveyDrawer);

mobileSaveButton?.addEventListener("click", () => {
  saveDraft();
  showToast("Your progress was saved.");
});

mobilePreviousButton?.addEventListener("click", () => {
  document.getElementById("previousButton")?.click();
});

mobileNextButton?.addEventListener("click", () => {
  document.getElementById("nextButton")?.click();
});

mobileSubmitButton?.addEventListener("click", () => {
  document.getElementById("submitAnytimeButton")?.click();
});

document.getElementById("sectionNav")?.addEventListener("click", (event) => {
  if (event.target.closest("button")) {
    closeSurveyDrawer();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeSurveyDrawer();
  }
});

// Keep mobile controls synchronized after survey interaction and rendering.
const originalRenderSurveyForMobile = renderSurvey;
renderSurvey = function mobileAwareRenderSurvey(...args) {
  const result = originalRenderSurveyForMobile.apply(this, args);
  updateMobileSurveyUi();
  return result;
};

const originalUpdateProgressForMobile = updateProgress;
updateProgress = function mobileAwareUpdateProgress(...args) {
  const result = originalUpdateProgressForMobile.apply(this, args);
  updateMobileSurveyUi();
  return result;
};

updateMobileSurveyUi();
