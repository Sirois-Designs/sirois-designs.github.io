const USERS = {
  brandon: { id: "brandon", name: "Brandon", initials: "BC", community: "Luna at Viera", color: "coral", interests: ["Dog Parents", "Foodies", "Events"], admin: true },
  morgan: { id: "morgan", name: "Morgan", initials: "MS", community: "The Pearl of Viera", color: "aqua", interests: ["Coffee & Conversation", "New to Viera"], admin: false },
  jordan: { id: "jordan", name: "Jordan", initials: "JT", community: "Centre Pointe", color: "green", interests: ["Fitness", "Trivia & Games"], admin: false },
  alex: { id: "alex", name: "Alex", initials: "AL", community: "Marisol at Viera", color: "gold", interests: ["Movies", "Foodies", "Dog Parents"], admin: false }
};

const seedPosts = [
  { id: "p1", scope: "community", community: "Luna at Viera", type: "introduction", author: "Morgan S.", initials: "MS", title: "Just moved into Luna", body: "Hi everyone! I am new to Viera and would love to meet a few people for coffee, walks, or checking out Lakeside once it opens.", time: "18 min ago", likes: 9, comments: [{ author: "Brandon", text: "Welcome! A weekend coffee group would be great." }] },
  { id: "p2", scope: "community", community: "Luna at Viera", type: "meetup", author: "Jamie R.", initials: "JR", title: "Poolside meetup Friday", body: "A few of us are meeting near the pool around 6:00 PM. Very casual—come by for a little while or stay longer.", time: "1 hr ago", likes: 14, comments: [] },
  { id: "p3", scope: "community", community: "The Pearl of Viera", type: "question", author: "Morgan S.", initials: "MS", title: "Best nearby walking route?", body: "What route do people like for an evening walk that stays well lit?", time: "42 min ago", likes: 4, comments: [] },
  { id: "p4", scope: "community", community: "Centre Pointe", type: "meetup", author: "Jordan T.", initials: "JT", title: "Morning workout partner", body: "Looking for someone who wants to keep each other accountable two or three mornings each week.", time: "2 hrs ago", likes: 6, comments: [] },
  { id: "p5", scope: "community", community: "Marisol at Viera", type: "recommendation", author: "Alex L.", initials: "AL", title: "Dog groomer recommendation", body: "Does anyone have a groomer nearby they really trust?", time: "3 hrs ago", likes: 3, comments: [] },
  { id: "p6", scope: "neighborhood", type: "event", author: "Taylor K.", initials: "TK", title: "Dinner and a movie at The Avenue", body: "Planning dinner first and then an AMC movie Friday night. Open to residents from all four communities.", time: "24 min ago", likes: 18, comments: [{ author: "Alex", text: "I would be interested depending on the movie." }] },
  { id: "p7", scope: "neighborhood", type: "question", author: "Chris D.", initials: "CD", title: "Would anyone join a weekly dog walk?", body: "Thinking Tuesday or Thursday evenings starting at the dog park and looping around the district.", time: "55 min ago", likes: 23, comments: [] },
  { id: "p8", scope: "neighborhood", type: "recommendation", author: "Priya N.", initials: "PN", title: "Best casual dinner for a group?", body: "Where would you take a group of 8–10 nearby without needing something too formal?", time: "1 hr ago", likes: 11, comments: [] },
  { id: "p9", scope: "neighborhood", type: "event", author: "Jordan T.", initials: "JT", title: "Trivia team needs two more", body: "We have four people and need two more for a casual trivia night team. No expertise required.", time: "2 hrs ago", likes: 15, comments: [] }
];

const seedEvents = [
  { id: "e1", title: "Meet Me at Lakeside", scope: "neighborhood", community: null, date: "2026-08-01", time: "6:30 PM", location: "Lakeside Social", place: "Lakeside Social", host: "Viera Local", going: ["brandon", "morgan"], interested: 14, petFriendly: true, familyFriendly: true },
  { id: "e2", title: "Dinner and a Movie", scope: "neighborhood", community: null, date: "2026-08-02", time: "6:00 PM", location: "The Avenue Viera", place: "The Avenue Viera", host: "Alex L.", going: ["alex"], interested: 18, petFriendly: false, familyFriendly: false },
  { id: "e3", title: "Sunset Dog Walk", scope: "neighborhood", community: null, date: "2026-07-31", time: "7:15 PM", location: "Free Dog Park", place: "Dog Park", host: "Chris D.", going: ["brandon"], interested: 12, petFriendly: true, familyFriendly: true },
  { id: "e4", title: "Luna Poolside Meetup", scope: "community", community: "Luna at Viera", date: "2026-07-31", time: "6:00 PM", location: "Luna pool area", place: "Luna at Viera", host: "Jamie R.", going: ["brandon"], interested: 8, petFriendly: false, familyFriendly: false },
  { id: "e5", title: "Remote Workers Lunch", scope: "neighborhood", community: null, date: "2026-08-05", time: "12:00 PM", location: "Urban Prime", place: "Urban Prime", host: "Morgan S.", going: ["morgan"], interested: 9, petFriendly: false, familyFriendly: false },
  { id: "e6", title: "Saturday Walking Group", scope: "neighborhood", community: null, date: "2026-08-08", time: "8:30 AM", location: "Town Center loop", place: "Viera Town Center", host: "Jordan T.", going: ["jordan"], interested: 11, petFriendly: true, familyFriendly: true }
];

const groups = [
  { name: "Dog Parents", icon: "🐕", members: 42, description: "Dog walks, park meetups, pet recommendations, and neighborhood pet talk." },
  { name: "Foodies", icon: "🍴", members: 37, description: "Restaurants, coffee, tastings, group dinners, and local discoveries." },
  { name: "Fitness & Wellness", icon: "💪", members: 31, description: "Workout partners, walking groups, classes, and healthy routines." },
  { name: "Trivia & Games", icon: "🎲", members: 24, description: "Trivia teams, board games, casual tournaments, and movie nights." },
  { name: "New to Viera", icon: "🌴", members: 29, description: "A welcoming place for new residents to ask questions and meet people." },
  { name: "Remote Workers", icon: "💻", members: 18, description: "Lunches, coffee breaks, coworking ideas, and midday walks." },
  { name: "Parents & Families", icon: "👨‍👩‍👧", members: 26, description: "Family-friendly activities, recommendations, and neighborhood support." },
  { name: "Local Creatives", icon: "🎨", members: 16, description: "Artists, makers, photographers, designers, and creative meetups." }
];

const stamps = [
  { id: "founding", icon: "✓", name: "Founding Local", detail: "Joined the pilot", earned: true },
  { id: "hello", icon: "👋", name: "Hello, Neighbor", detail: "Shared an introduction", earned: true },
  { id: "beyond", icon: "🏙️", name: "Beyond Your Building", detail: "Connected across communities", earned: true },
  { id: "lakeside", icon: "🌅", name: "Meet Me at Lakeside", detail: "Attend a gathering", earned: false },
  { id: "dogpark", icon: "🐾", name: "Dog Park Local", detail: "Join a dog walk", earned: false },
  { id: "avenue", icon: "🎬", name: "Avenue Adventurer", detail: "Complete an Avenue outing", earned: false },
  { id: "explorer", icon: "📍", name: "Local Explorer", detail: "Try a featured nearby place", earned: false },
  { id: "builder", icon: "⭐", name: "Community Builder", detail: "Invite another resident", earned: false },
  { id: "volunteer", icon: "💚", name: "Neighbor Helping Neighbor", detail: "Take part in a community effort", earned: false }
];

const seedChats = {
  community: [
    { author: "Jamie", initials: "JR", text: "Anyone else going to the pool meetup Friday?", time: "2:12 PM" },
    { author: "Morgan", initials: "MS", text: "I am! I just moved in this week.", time: "2:15 PM" },
    { author: "Brandon", initials: "BC", text: "Welcome! I will probably stop by too.", time: "2:18 PM" }
  ],
  neighborhood: [
    { author: "Alex", initials: "AL", text: "What movie would people want to see at The Avenue?", time: "1:42 PM" },
    { author: "Jordan", initials: "JT", text: "I vote for something fun, not too serious.", time: "1:47 PM" },
    { author: "Morgan", initials: "MS", text: "Dinner beforehand would make it easier to meet everyone.", time: "1:50 PM" }
  ]
};

const seedNotifications = [
  { id: "n1", text: "Morgan replied to your welcome comment.", time: "12 minutes ago", read: false },
  { id: "n2", text: "Sunset Dog Walk now has 12 interested residents.", time: "38 minutes ago", read: false },
  { id: "n3", text: "You earned the Beyond Your Building stamp.", time: "Yesterday", read: false },
  { id: "n4", text: "Luna Poolside Meetup was updated.", time: "Yesterday", read: true }
];

let state = {
  user: null,
  posts: JSON.parse(localStorage.getItem("vl_posts") || "null") || seedPosts,
  events: JSON.parse(localStorage.getItem("vl_events") || "null") || seedEvents,
  chats: JSON.parse(localStorage.getItem("vl_chats") || "null") || seedChats,
  notifications: JSON.parse(localStorage.getItem("vl_notifications") || "null") || seedNotifications,
  joinedGroups: JSON.parse(localStorage.getItem("vl_groups") || "[]"),
  stamps: JSON.parse(localStorage.getItem("vl_stamps") || "null") || stamps,
  selectedDemo: null,
  feedFilter: "all",
  neighborhoodFilter: "all",
  eventFilter: "all"
};

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const authScreen = $("#authScreen"), appShell = $("#appShell"), toast = $("#toast");
function save() { localStorage.setItem("vl_posts", JSON.stringify(state.posts)); localStorage.setItem("vl_events", JSON.stringify(state.events)); localStorage.setItem("vl_chats", JSON.stringify(state.chats)); localStorage.setItem("vl_notifications", JSON.stringify(state.notifications)); localStorage.setItem("vl_groups", JSON.stringify(state.joinedGroups)); localStorage.setItem("vl_stamps", JSON.stringify(state.stamps)) ;}
let toastTimer; function showToast(msg) { clearTimeout(toastTimer); toast.textContent = msg; toast.classList.add("is-visible"); toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600) ;}
function initials(name) { return name.split(/\s+/).map(x => x[0]).join("").slice(0, 2).toUpperCase() ;}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])) ;}
function userColorClass() { return `avatar--${state.user?.color || "coral"}` ;}
function formatDate(date) { return new Date(date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" }) ;}
function dateParts(date) { const d = new Date(date + "T12:00:00"); return { day: String(d.getDate()).padStart(2, "0"), month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase() } ;}
function currentPosts(scope) { return state.posts.filter(p => p.scope === scope && (scope !== "community" || p.community === state.user.community)) ;}
function postCard(p) {  
return `<article class="feed-card" data-post-id="${p.id}">
<div class="feed-head"><span class="avatar">${escapeHtml(p.initials)}</span><span><strong>${escapeHtml(p.author)}</strong><small>${escapeHtml(p.community || "Viera Local neighborhood")}</small></span><span class="feed-time">${escapeHtml(p.time)}</span></div>
<h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.body)}</p>
<div class="feed-actions"><button data-like-post="${p.id}">♡ ${p.likes}</button><button data-open-post="${p.id}">💬 ${p.comments.length}</button><span class="scope-pill">${p.scope === "community" ? "My Community" : "Neighborhood"}</span></div></article>`
;}
function renderHome() {
  $("#communityColumnTitle").textContent = state.user.community; $("#communityPageTitle").textContent = state.user.community; $("#communityPageTitle").textContent = state.user.community;
  $("#homeCommunityFeed").innerHTML = currentPosts("community").slice(0, 3).map(postCard).join("");
  $("#homeNeighborhoodFeed").innerHTML = currentPosts("neighborhood").slice(0, 3).map(postCard).join("");
  $("#homeEvents").innerHTML = state.events.slice(0, 4).map(e => { const d = dateParts(e.date); return `<div class="mini-event"><span class="date-box"><strong>${d.day}</strong><small>${d.month}</small></span><p><strong>${escapeHtml(e.title)}</strong><small>${escapeHtml(e.location)} · ${e.time}</small></p><button class="text-link" data-open-event="${e.id}">View</button></div>` ;}).join("");
  updatePassportCounts();
}
function renderFeeds() {
  let cp = currentPosts("community"); if (state.feedFilter !== "all") cp = cp.filter(p => p.type === state.feedFilter); $("#communityFeed").innerHTML = cp.map(postCard).join("") || `<div class="panel"><p>No posts match this filter yet.</p></div>`;
  let np = currentPosts("neighborhood"); if (state.neighborhoodFilter !== "all") np = np.filter(p => p.type === state.neighborhoodFilter); $("#neighborhoodFeed").innerHTML = np.map(postCard).join("") || `<div class="panel"><p>No posts match this filter yet.</p></div>`;
}
function renderChats() {
  ["community", "neighborhood"].forEach(scope => { $(`#${scope}Chat`).innerHTML = state.chats[scope].map(m => `<div class="chat-message"><span class="avatar">${escapeHtml(m.initials)}</span><div><strong>${escapeHtml(m.author)}</strong><p>${escapeHtml(m.text)}</p><small>${escapeHtml(m.time)}</small></div></div>`).join("") ;});
}
function renderEvents() {
  let list = state.events;
  if (state.eventFilter === "community") list = list.filter(e => e.scope === "community" && e.community === state.user.community);
  if (state.eventFilter === "neighborhood") list = list.filter(e => e.scope === "neighborhood");
  if (state.eventFilter === "going") list = list.filter(e => e.going.includes(state.user.id));
  $("#eventsGrid").innerHTML = list.map(e => { const d = formatDate(e.date), going = e.going.includes(state.user.id); return `<article class="event-card"><div class="event-art" data-place="${escapeHtml(e.place)}"><span>${e.scope === "community" ? "My Community" : "Neighborhood"}</span></div><div class="event-body"><p class="eyebrow">${d}</p><h3>${escapeHtml(e.title)}</h3><div class="event-meta"><span>🕒 ${e.time}</span><span>📍 ${escapeHtml(e.location)}</span><span>Hosted by ${escapeHtml(e.host)}</span></div><div class="event-footer"><div class="attendees">${e.going.slice(0, 3).map(id => `<span>${USERS[id]?.initials || "VL"}</span>`).join("")}<span>+${e.interested}</span></div><button class="rsvp-button ${going ? "is-going" : ""}" data-rsvp="${e.id}">${going ? "Going ✓" : "I’m Going"}</button></div></div></article>` ;}).join("");
}
function renderGroups() {
  $("#groupsGrid").innerHTML = groups.map(g => { const joined = state.joinedGroups.includes(g.name); return `<article class="group-card"><span class="group-icon">${g.icon}</span><h3>${escapeHtml(g.name)}</h3><p>${escapeHtml(g.description)}</p><div class="group-footer"><small>${g.members + (joined ? 1 : 0)} members</small><button class="join-group ${joined ? "is-joined" : ""}" data-join-group="${escapeHtml(g.name)}">${joined ? "Joined ✓" : "Join group"}</button></div></article>` ;}).join("");
}
function renderPassport() {
  $("#passportUserName").textContent = state.user.name; $("#passportCommunityName").textContent = state.user.community;
  $("#stampsGrid").innerHTML = state.stamps.map(s => `<div class="stamp ${s.earned ? "is-earned" : ""}"><span>${s.icon}</span><strong>${escapeHtml(s.name)}</strong><small>${escapeHtml(s.detail)}</small></div>`).join(""); updatePassportCounts();
}
function updatePassportCounts() { const count = state.stamps.filter(s => s.earned).length; $("#homeStampCount").textContent = count; $("#homePassportProgress").textContent = `${Math.min(count, 5)}/5`; $("#rewardProgressText").textContent = `${Math.min(count, 5)} of 5 stamps`; $("#rewardProgressBar").style.width = `${Math.min(count / 5 * 100, 100)}%` ;}
function renderNotifications() {
  $("#notificationList").innerHTML = state.notifications.map(n => `<div class="notification-item ${n.read ? "" : "is-unread"}"><div></div><p>${escapeHtml(n.text)}<small>${escapeHtml(n.time)}</small></p><button class="text-link" data-read-notification="${n.id}">${n.read ? "Read" : "Mark read"}</button></div>`).join(""); updateNotificationCount();
}
function updateNotificationCount() { const n = state.notifications.filter(x => !x.read).length; $("#notificationCount").textContent = n; $("#notificationCount").style.display = n ? "grid" : "none" ;}
function renderAll() { renderHome(); renderFeeds(); renderChats(); renderEvents(); renderGroups(); renderPassport(); renderNotifications(); $("#communityResidentCount").textContent = state.user.community === "Luna at Viera" ? "38" : "24" ;}
function login(user) { state.user = user; authScreen.classList.add("is-hidden"); appShell.classList.remove("is-hidden"); $("#sidebarName").textContent = user.name; $("#sidebarCommunity").textContent = user.community; $("#sidebarAvatar").textContent = user.initials; $("#sidebarAvatar").className = `avatar ${userColorClass()}`; $("#profileBubble").textContent = user.initials; $("#profileName").textContent = user.name; $("#profileCommunity").textContent = user.community; $("#profileAvatar").textContent = user.initials; $("#profileAvatar").className = `avatar avatar--large ${userColorClass()}`; $("#profileTags").innerHTML = user.interests.map(i => `<span>${escapeHtml(i)}</span>`).join(""); $$(".admin-only").forEach(x => x.style.display = user.admin ? "flex" : "none"); $("#pageTitle").textContent = `Good afternoon, ${user.name}.`; renderAll() ;}
function goPage(page) { $$(".nav-item").forEach(n => n.classList.toggle("is-active", n.dataset.page === page)); $$(".page").forEach(p => p.classList.toggle("is-active", p.dataset.pagePanel === page)); const titles = { home: `Good afternoon, ${state.user.name}.`, community: state.user.community, neighborhood: "The Neighborhood", events: "Events & Meetups", groups: "Groups & Channels", passport: "Viera Local Passport", notifications: "Notifications", admin: "Admin Preview" }; $("#pageTitle").textContent = titles[page]; $("#sidebar").classList.remove("is-open") ;}
function openModal(id) { $(id).classList.add("is-open"); $(id).setAttribute("aria-hidden", "false") ;}
function closeModal(el) { el.classList.remove("is-open"); el.setAttribute("aria-hidden", "true") ;}
$$(".auth-tab").forEach(b => b.addEventListener("click", () => { $$(".auth-tab").forEach(x => x.classList.remove("is-active")); $$(".auth-view").forEach(x => x.classList.remove("is-active")); b.classList.add("is-active"); $(`[data-auth-view="${b.dataset.authTab}"]`).classList.add("is-active") ;}));
$$(".demo-user").forEach(b => b.addEventListener("click", () => { $$(".demo-user").forEach(x => x.classList.remove("is-selected")); b.classList.add("is-selected"); state.selectedDemo = b.dataset.user; $("#continueDemo").disabled = false ;}));
$("#continueDemo").addEventListener("click", () => login(USERS[state.selectedDemo]));
$$("[data-register-interest]").forEach(b => b.addEventListener("click", () => b.classList.toggle("is-selected")));
$("#registerForm").addEventListener("submit", e => { e.preventDefault(); const fd = new FormData(e.target), name = fd.get("name"), community = fd.get("community"); login({ id: "pilot_" + Date.now(), name, initials: initials(name), community, color: "aqua", interests: $$("[data-register-interest].is-selected").map(x => x.dataset.registerInterest), admin: false }); showToast("Pilot account created in this browser.") ;});
$$(".nav-item").forEach(b => b.addEventListener("click", () => goPage(b.dataset.page)));
$$("[data-go-page]").forEach(b => b.addEventListener("click", () => goPage(b.dataset.goPage)));
$("#mobileMenu").addEventListener("click", () => $("#sidebar").classList.toggle("is-open"));
$("#openComposer").addEventListener("click", () => prepareComposer("post"));
$$("[data-open-create]").forEach(b => b.addEventListener("click", () => prepareComposer(b.dataset.openCreate, b.dataset.scope)));
function prepareComposer(kind, scope) { $("#composerTitle").textContent = kind === "event" ? "Create an Event or Meetup" : "Create a Post"; $("#composerForm [name=contentType]").value = kind; $("#eventFields").classList.toggle("is-hidden", kind !== "event"); if (scope) $("#composerScope").value = scope; openModal("#composerModal") ;}
$("#composerScope").addEventListener("change", e => $("#groupSelectWrap").classList.toggle("is-hidden", e.target.value !== "group"));
$$("[data-close-modal]").forEach(b => b.addEventListener("click", () => closeModal($("#composerModal"))));
$$("[data-close-detail]").forEach(b => b.addEventListener("click", () => closeModal($("#detailModal"))));
$$("[data-close-profile]").forEach(b => b.addEventListener("click", () => closeModal($("#profileModal"))));
$("#profileButton").addEventListener("click", () => openModal("#profileModal")); $("#profileBubble").addEventListener("click", () => openModal("#profileModal"));
$("#logoutButton").addEventListener("click", () => location.reload());
$("#composerForm").addEventListener("submit", e => { e.preventDefault(); const fd = new FormData(e.target), kind = fd.get("contentType"), scope = fd.get("scope"), title = fd.get("title"), body = fd.get("body"); if (kind === "event") { state.events.unshift({ id: "e" + Date.now(), title, scope, community: scope === "community" ? state.user.community : null, date: fd.get("date") || "2026-08-15", time: fd.get("time") || "6:00 PM", location: fd.get("location") || "Viera Town Center", place: fd.get("location") || "Viera Town Center", host: state.user.name, going: [state.user.id], interested: 1, petFriendly: false, familyFriendly: false }); state.notifications.unshift({ id: "n" + Date.now(), text: `Your event “${title}” was published.`, time: "Just now", read: false }) ;} else { state.posts.unshift({ id: "p" + Date.now(), scope, community: scope === "community" ? state.user.community : null, type: fd.get("type"), author: state.user.name, initials: state.user.initials, title, body, time: "Just now", likes: 0, comments: [] }) ;} save(); renderAll(); closeModal($("#composerModal")); e.target.reset(); showToast(kind === "event" ? "Event published to the pilot." : "Post published to the pilot.") ;});
document.addEventListener("click", e => {
  const like = e.target.closest("[data-like-post]"); if (like) { const p = state.posts.find(x => x.id === like.dataset.likePost); p.likes++; save(); renderAll(); showToast("You liked this post."); return ;}
  const op = e.target.closest("[data-open-post]"); if (op) { openPost(op.dataset.openPost); return ;}
  const oe = e.target.closest("[data-open-event]"); if (oe) { const ev = state.events.find(x => x.id === oe.dataset.openEvent); $("#detailContent").innerHTML = `<p class="eyebrow">${formatDate(ev.date)}</p><h2>${escapeHtml(ev.title)}</h2><p>${escapeHtml(ev.location)} · ${escapeHtml(ev.time)}</p><button class="primary-button full" data-rsvp="${ev.id}">I’m Going</button>`; openModal("#detailModal"); return ;}
  const r = e.target.closest("[data-rsvp]"); if (r) { const ev = state.events.find(x => x.id === r.dataset.rsvp), i = ev.going.indexOf(state.user.id); if (i >= 0) ev.going.splice(i, 1); else { ev.going.push(state.user.id); state.notifications.unshift({ id: "n" + Date.now(), text: `You joined “${ev.title}”.`, time: "Just now", read: false }) ;} save(); renderAll(); showToast(i >= 0 ? "RSVP removed." : "You’re going!"); return ;}
  const g = e.target.closest("[data-join-group]"); if (g) { const name = g.dataset.joinGroup, i = state.joinedGroups.indexOf(name); if (i >= 0) state.joinedGroups.splice(i, 1); else state.joinedGroups.push(name); save(); renderGroups(); showToast(i >= 0 ? "Left group." : "Group joined."); return ;}
  const n = e.target.closest("[data-read-notification]"); if (n) { state.notifications.find(x => x.id === n.dataset.readNotification).read = true; save(); renderNotifications(); return ;}
});
function openPost(id) { const p = state.posts.find(x => x.id === id); $("#detailContent").innerHTML = `<div class="detail-post"><p class="eyebrow">${p.scope === "community" ? escapeHtml(p.community) : "Neighborhood"}</p><h2>${escapeHtml(p.title)}</h2><p>${escapeHtml(p.body)}</p><div class="comment-list">${p.comments.map(c => `<div class="comment"><strong>${escapeHtml(c.author)}</strong><p>${escapeHtml(c.text)}</p></div>`).join("")}</div><form class="comment-form" data-comment-post="${p.id}"><input required placeholder="Write a comment..."><button type="submit">Reply</button></form></div>`; openModal("#detailModal") ;}
$("#detailContent").addEventListener("submit", e => { if (!e.target.matches("[data-comment-post]")) return; e.preventDefault(); const p = state.posts.find(x => x.id === e.target.dataset.commentPost), input = e.target.querySelector("input"); p.comments.push({ author: state.user.name, text: input.value }); save(); openPost(p.id); renderAll(); showToast("Comment added.") ;});
$$("[data-feed-filter]").forEach(b => b.addEventListener("click", () => { $$("[data-feed-filter]").forEach(x => x.classList.remove("is-active")); b.classList.add("is-active"); state.feedFilter = b.dataset.feedFilter; renderFeeds() ;}));
$$("[data-neighborhood-filter]").forEach(b => b.addEventListener("click", () => { $$("[data-neighborhood-filter]").forEach(x => x.classList.remove("is-active")); b.classList.add("is-active"); state.neighborhoodFilter = b.dataset.neighborhoodFilter; renderFeeds() ;}));
$$("[data-event-filter]").forEach(b => b.addEventListener("click", () => { $$("[data-event-filter]").forEach(x => x.classList.remove("is-active")); b.classList.add("is-active"); state.eventFilter = b.dataset.eventFilter; renderEvents() ;}));
$$(".mini-chat-form").forEach(f => f.addEventListener("submit", e => { e.preventDefault(); const scope = f.dataset.chat, input = f.querySelector("input"); state.chats[scope].push({ author: state.user.name, initials: state.user.initials, text: input.value, time: "Just now" }); input.value = ""; save(); renderChats(); showToast("Message sent.") ;}));
$("#markAllRead").addEventListener("click", () => { state.notifications.forEach(n => n.read = true); save(); renderNotifications(); showToast("All notifications marked read.") ;});
$("#createGroupButton").addEventListener("click", () => showToast("Group suggestions would be sent to moderators."));
$$("[data-place]").forEach(b => b.addEventListener("click", () => { prepareComposer("event", "neighborhood"); $("#composerForm [name=location]").value = b.dataset.place; $("#composerForm [name=title]").value = `Meet at ${b.dataset.place}` ;}));
$("#adminAwardStamp").addEventListener("click", () => { const s = state.stamps.find(x => !x.earned); if (s) { s.earned = true; state.notifications.unshift({ id: "n" + Date.now(), text: `You earned the ${s.name} stamp.`, time: "Just now", read: false }); save(); renderAll(); showToast(`${s.name} awarded.`) ;} else showToast("All demo stamps are already earned.") ;});
$("#searchButton").addEventListener("click", () => showToast("Search would cover residents, posts, groups, events, and places."));
document.addEventListener("keydown", e => { if (e.key === "Escape") $$(".modal.is-open").forEach(closeModal) ;});
