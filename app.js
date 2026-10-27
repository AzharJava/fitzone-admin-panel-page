const members = [
  ["Rohit Sharma", "FTZ0001", "Premium", "27 Oct 2026", "Active"],
  ["Neha Das", "FTZ0002", "Standard", "27 Oct 2026", "Active"],
  ["Amit Roy", "FTZ0003", "Basic", "26 Oct 2026", "Active"],
  ["Pooja Verma", "FTZ0008", "Premium", "26 Oct 2026", "Active"],
  ["Sayan Khan", "FTZ0005", "Standard", "25 Oct 2026", "Active"],
  ["Kunal Das", "FTZ0010", "Basic", "24 Oct 2026", "Expiring"],
  ["Riya Sen", "FTZ0006", "Standard", "22 Oct 2026", "Active"],
  ["Vikram Roy", "FTZ0007", "Premium", "20 Oct 2026", "Expired"]
];

const enquiries = [
  ["Rahul Sharma", "+91 98765 43210", "Premium Plan", "Website", "New"],
  ["Neha Das", "+91 91234 56789", "Standard Plan", "Instagram", "Contacted"],
  ["Amit Roy", "+91 99887 66554", "Personal Training", "Website", "Trial Scheduled"],
  ["Pooja Verma", "+91 88776 55443", "Basic Plan", "Google Search", "Converted"],
  ["Sayan Khan", "+91 77665 44332", "Standard Plan", "Facebook", "Contacted"],
  ["Riya Sen", "+91 99876 55421", "Premium Plan", "Website", "New"],
  ["Vikram Roy", "+91 98712 33455", "Personal Training", "Instagram", "Lost"],
  ["Arjun Mehta", "+91 91238 77661", "Annual Plan", "Website", "Contacted"]
];

const payments = [
  ["RCP001258", "Rohit Sharma", "Premium (6M)", "₹12,499", "UPI", "27 Oct 2026, 10:24 AM", "Success"],
  ["RCP001257", "Neha Das", "Standard (3M)", "₹3,999", "Cash", "27 Oct 2026, 09:18 AM", "Success"],
  ["RCP001256", "Amit Roy", "Basic (1M)", "₹1,499", "Card", "27 Oct 2026, 08:45 AM", "Success"],
  ["RCP001255", "Pooja Verma", "Premium (6M)", "₹6,999", "UPI", "26 Oct 2026, 07:32 PM", "Success"],
  ["RCP001254", "Sayan Khan", "Standard (3M)", "₹2,000", "Cash", "26 Oct 2026, 06:10 PM", "Partial"],
  ["RCP001253", "Kunal Das", "Registration", "₹500", "UPI", "26 Oct 2026, 05:20 PM", "Success"]
];

const palette = { green: "#12b76a", blue: "#168ff0", orange: "#ffad0d", red: "#f04455", purple: "#9b51e0" };
const pageHost = document.querySelector("#pageHost");
const appShell = document.querySelector("#appShell");
const loginScreen = document.querySelector("#loginScreen");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalBody = document.querySelector("#modalBody");
const toast = document.querySelector("#toast");
let activePage = "dashboard";
let toastTimer;

function stat(label, number, note, icon, tone = "green", trend = "") {
  return `<article class="card stat-card"><span class="stat-icon" style="--tone:${palette[tone]}">${icon}</span><div><span class="stat-label">${label}</span><strong class="stat-number">${number}</strong>${trend ? `<span class="trend ${trend.startsWith("↓") ? "down" : ""}">${trend}</span>` : ""}<span class="stat-note">${note}</span></div></article>`;
}

function badge(value) {
  const cls = /partial|lost|expired|failed/i.test(value) ? "red" : /contact|follow|expiring|pending/i.test(value) ? "orange" : /new|trial|read/i.test(value) ? "blue" : "";
  return `<span class="badge ${cls}">${value}</span>`;
}

function person(name) {
  const initials = name.split(" ").map(word => word[0]).join("").slice(0,2);
  return `<span class="person"><i class="avatar">${initials}</i>${name}</span>`;
}

function pageHeading(title, subtitle, actions = "") {
  return `<header class="page-heading"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="heading-actions">${actions}</div></header>`;
}

function barChart(values = [28,38,33,42,31,48,43,36,55,48,60,36,62,50,55,66,41,31,68,37,28,45,52,62,75,55,65,83,74,68]) {
  return `<div class="chart"><div class="bars">${values.map((v,i) => `<i class="bar" style="--h:${v}%;animation-delay:${i*18}ms"></i>`).join("")}</div><div class="axis-labels"><span>1 Oct</span><span>10 Oct</span><span>20 Oct</span><span>31 Oct</span></div></div>`;
}

function lineChart() {
  return `<div class="line-chart"><svg viewBox="0 0 500 190" preserveAspectRatio="none"><defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffc31e" stop-opacity=".42"/><stop offset="1" stop-color="#ffc31e" stop-opacity=".05"/></linearGradient></defs><path class="fill" d="M0,155 L80,105 L160,86 L240,101 L320,39 L400,82 L500,58 L500,190 L0,190 Z"/><path class="line" d="M0,155 L80,105 L160,86 L240,101 L320,39 L400,82 L500,58"/>${[[0,155],[80,105],[160,86],[240,101],[320,39],[400,82],[500,58]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join("")}</svg></div>`;
}

function memberRows(limit = members.length) {
  return members.slice(0,limit).map((m,i)=>`<tr><td>${i+1}</td><td>${person(m[0])}</td><td>${m[1]}</td><td>${m[2]}</td><td>${m[3]}</td><td>${badge(m[4])}</td><td><button class="icon-btn" data-toast="Member actions are simulated in this demo.">•••</button></td></tr>`).join("");
}

function dashboardPage() {
  const recentEnquiries = enquiries.slice(0,5).map((e,i)=>`<tr><td>${i+1}</td><td>${e[0]}</td><td>${e[1]}</td><td>Oct ${27-i}</td><td>${badge(e[4])}</td></tr>`).join("");
  return `${pageHeading("Dashboard", "Welcome back, Admin! Here's what's happening at FITZONE today.", `<button class="secondary-btn">▣ &nbsp; Oct 27, 2026 &nbsp;⌄</button>`)}
  <section class="stats-grid">${stat("Total Members","248","vs last month","♟","orange","↑ 12%")}${stat("Active Members","192","vs last month","♟","green","↑ 8%")}${stat("Expiring Soon","28","in next 30 days","▣","orange","↓ 5%")}${stat("Expired Members","32","vs last month","●","red","↑ 10%")}${stat("New Members","12","Today","♟","blue","↑ 100%")}${stat("This Week","36","vs last week","▤","purple","↑ 28%")}${stat("This Month","94","vs last month","▱","red","↑ 16%")}${stat("Today's Attendance","86","of active members","✓","green","↓ 62%")}</section>
  <section class="dashboard-grid">
    <article class="card panel"><div class="panel-head"><h2>Revenue Overview</h2><button class="outline-btn">This Month⌄</button></div><div><strong class="revenue-total">₹2,45,000</strong><span class="trend">↑ 18%</span><span class="stat-note">Total Revenue</span></div>${barChart()}</article>
    <article class="card panel"><div class="panel-head"><h2>Membership Status</h2><button class="outline-btn" data-page-link="members">View All →</button></div><div class="donut-wrap"><div class="donut-graphic"><div class="donut"></div><div class="donut-value">248<small>Members</small></div></div><div class="legend"><span class="legend-row"><i class="dot" style="--tone:${palette.green}"></i>Active<b>192</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.orange}"></i>Expiring<b>28</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.red}"></i>Expired<b>32</b></span><span class="legend-row"><i class="dot" style="--tone:#a8b4c4"></i>Pending<b>12</b></span></div></div></article>
    <article class="card panel"><div class="panel-head"><h2>Attendance Trend</h2><button class="outline-btn">This Week⌄</button></div>${lineChart()}</article>
  </section>
  <section class="table-grid">
    <article class="card table-card"><div class="panel-head"><h2>Recent Members</h2><button class="outline-btn" data-page-link="members">View All →</button></div><table class="data-table"><thead><tr><th>#</th><th>Name</th><th>Plan</th><th>Join Date</th><th>Status</th></tr></thead><tbody>${members.slice(0,5).map((m,i)=>`<tr><td>${i+1}</td><td>${person(m[0])}</td><td>${m[2]}</td><td>${m[3]}</td><td>${badge(m[4])}</td></tr>`).join("")}</tbody></table></article>
    <article class="card table-card"><div class="panel-head"><h2>Recent Enquiries</h2><button class="outline-btn" data-page-link="enquiries">View All →</button></div><table class="data-table"><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Date</th><th>Status</th></tr></thead><tbody>${recentEnquiries}</tbody></table></article>
    <article class="card panel"><div class="panel-head"><h2>Today's Activity</h2><button class="outline-btn">View All →</button></div><div class="activity-list">${[["♟","New member registered","Rohit Sharma joined (Premium)","10:30 AM","green"],["✓","Check-in","Neha Das checked in","10:15 AM","blue"],["▣","Payment received","₹12,000 from Amit Roy","09:45 AM","orange"],["▱","New enquiry","Kunal Das submitted enquiry","09:20 AM","purple"],["△","Membership expired","Suman Dey's plan expired","08:50 AM","red"]].map(a=>`<div class="activity"><i class="activity-icon" style="--tone:${palette[a[4]]}">${a[0]}</i><span><strong>${a[1]}</strong><small>${a[2]}</small></span><time>${a[3]}</time></div>`).join("")}</div></article>
  </section>
  <section class="quick-actions"><button class="quick-action" data-modal="member"><span class="stat-icon" style="--tone:${palette.orange}">♟</span><span><strong>Add New Member</strong><small>Register a new gym member</small></span>›</button><button class="quick-action" data-page-link="attendance"><span class="stat-icon" style="--tone:${palette.green}">▣</span><span><strong>Mark Attendance</strong><small>Quick member check-in</small></span>›</button><button class="quick-action" data-modal="payment"><span class="stat-icon" style="--tone:${palette.orange}">▣</span><span><strong>Record Payment</strong><small>Add membership payment</small></span>›</button><button class="quick-action" data-page-link="plans"><span class="stat-icon" style="--tone:${palette.orange}">⚙</span><span><strong>Manage Plans</strong><small>Create or edit membership plans</small></span>›</button></section>`;
}

function membersPage() {
  return `${pageHeading("Members", "View and manage all gym members.", `<button class="secondary-btn">⇩ Export</button><button class="primary-btn small-primary" data-modal="member">＋ Add Member</button>`)}
  <section class="stats-grid">${stat("Total Members","248","vs last month","♟","orange","↑ 12%")}${stat("Active Members","192","with valid membership","✓","green","↑ 8%")}${stat("Expiring Soon","28","in next 30 days","◷","orange")}${stat("Expired Members","32","renewal required","!","red")}</section>
  <div class="card filter-row"><input class="table-search" placeholder="Search member by name, phone or member ID..."><select><option>All Status</option><option>Active</option><option>Expired</option></select><select><option>All Plans</option><option>Premium</option><option>Standard</option><option>Basic</option></select><button class="primary-btn small-primary">⌕ Search</button></div>
  <section class="card table-card big-table"><table class="data-table searchable"><thead><tr><th>#</th><th>Name</th><th>Member ID</th><th>Plan</th><th>Join Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${memberRows()}</tbody></table><div class="pagination"><span>Showing 1 to 8 of 248 members</span><div class="pages"><button class="page-chip">‹</button><button class="page-chip active">1</button><button class="page-chip">2</button><button class="page-chip">3</button><button class="page-chip">…</button><button class="page-chip">31</button><button class="page-chip">›</button></div></div></section>`;
}

function attendancePage() {
  return `${pageHeading("Attendance", "Real-time gym attendance and member check-ins.", `<button class="secondary-btn">▣ &nbsp; Oct 27, 2026</button><button class="primary-btn small-primary" data-modal="checkin">⌖ Manual Check-in</button>`)}
  <section class="stats-grid">${stat("Today's Check-ins","86","vs yesterday","♟","green","↑ 12%")}${stat("Current Occupancy","42","in gym now","♟","blue")}${stat("Active Members","192","with valid membership","✓","orange")}${stat("Expired Members","32","cannot check-in","!","red")}</section>
  <section class="split-grid"><article class="card table-card big-table"><div class="panel-head"><h2>Live Check-ins</h2><button class="outline-btn">View All →</button></div><table class="data-table"><thead><tr><th>#</th><th>Time</th><th>Member</th><th>ID</th><th>Plan</th><th>Status</th></tr></thead><tbody>${members.slice(0,6).map((m,i)=>`<tr><td>${i+1}</td><td>09:${12+i*5} AM</td><td>${person(m[0])}</td><td>${m[1]}</td><td>${m[2]}</td><td>${badge("Checked In")}</td></tr>`).join("")}</tbody></table></article><div><article class="card panel"><div class="panel-head"><h2>Today's Attendance</h2><button class="outline-btn">Today⌄</button></div><div class="donut-wrap"><div class="donut-graphic"><div class="donut" style="--segments:conic-gradient(${palette.green} 0 45%,${palette.red} 45% 58%,${palette.orange} 58%)"></div><div class="donut-value">86<small>Check-ins</small></div></div><div class="legend"><span class="legend-row"><i class="dot" style="--tone:${palette.green}"></i>Present<b>86</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.red}"></i>Absent<b>24</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.orange}"></i>Not Marked<b>112</b></span></div></div></article><article class="card panel" style="margin-top:13px"><div class="panel-head"><h2>Hourly Check-ins</h2><button class="outline-btn">Today⌄</button></div>${barChart([16,28,22,38,31,44,50,67,52,72,48,63,34,44,56,72,53,65,59,70,62,66,48,42])}</article></div></section>`;
}

function paymentsPage() {
  return `${pageHeading("Payments Overview", "Track all payments, collections, dues and revenue.", `<button class="secondary-btn">▣ &nbsp; Oct 2026</button><button class="primary-btn small-primary" data-modal="payment">＋ Collect Payment</button>`)}
  <section class="stats-grid">${stat("Today's Collection","₹12,450","vs yesterday","▣","green","↑ 18%")}${stat("This Month Revenue","₹2,45,000","vs last month","▣","blue","↑ 12%")}${stat("Pending Dues","₹48,500","36 members","₹","orange")}${stat("Refunds (This Month)","₹2,000","2 transactions","↶","red")}</section>
  <section class="split-grid" style="margin-bottom:13px"><article class="card panel"><div class="panel-head"><h2>Revenue Trend</h2><button class="outline-btn">This Year⌄</button></div>${barChart([26,38,44,55,47,68,80,56,61,79,90])}</article><article class="card panel"><div class="panel-head"><h2>Payment Method</h2><button class="outline-btn">This Month⌄</button></div><div class="donut-wrap"><div class="donut-graphic"><div class="donut" style="--segments:conic-gradient(${palette.green} 0 45%,${palette.orange} 45% 75%,${palette.red} 75% 90%,#6962b6 90% 98%,#a8b4c4 98%)"></div><div class="donut-value">₹2.45L<small>Total Revenue</small></div></div><div class="legend"><span class="legend-row"><i class="dot" style="--tone:${palette.green}"></i>Cash<b>45%</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.orange}"></i>UPI<b>30%</b></span><span class="legend-row"><i class="dot" style="--tone:${palette.red}"></i>Card<b>15%</b></span><span class="legend-row"><i class="dot" style="--tone:#6962b6"></i>Bank<b>8%</b></span></div></div></article></section>
  <section class="card table-card big-table"><div class="panel-head"><h2>Recent Payments</h2><button class="outline-btn">View All →</button></div><table class="data-table"><thead><tr><th>#</th><th>Receipt No</th><th>Member</th><th>Plan</th><th>Amount</th><th>Method</th><th>Date &amp; Time</th><th>Status</th><th>Actions</th></tr></thead><tbody>${payments.map((p,i)=>`<tr><td>${i+1}</td><td>${p[0]}</td><td>${person(p[1])}</td><td>${p[2]}</td><td><b>${p[3]}</b></td><td>${badge(p[4])}</td><td>${p[5]}</td><td>${badge(p[6])}</td><td><button class="icon-btn" data-toast="Receipt preview is simulated.">•••</button></td></tr>`).join("")}</tbody></table><div class="pagination"><span>Showing 1 to 6 of 1,248 records</span><div class="pages"><button class="page-chip active">1</button><button class="page-chip">2</button><button class="page-chip">3</button><button class="page-chip">…</button><button class="page-chip">125</button></div></div></section>`;
}

function websitePage() {
  const tiles = [["Homepage","Hero section, highlights, banners","▣","orange"],["About Us","Gym story, mission, facilities","▱","red"],["Services","Facilities and services list","✣","purple"],["Trainers","Our trainers and their profiles","♟","green"],["Membership Plans","Pricing and membership plans","♕","orange"],["Offers & Promotions","Special offers and discounts","◆","red"],["Gallery","Images and videos","▧","blue"],["Testimonials","Member reviews","☁","red"],["FAQs","Frequently asked questions","?","blue"],["Contact Information","Phone, email, address, map","▥","orange"],["SEO Settings","Meta titles, descriptions, og images","⌕","blue"],["Social Media","Facebook, Instagram, YouTube etc.","f","red"]];
  return `${pageHeading("Website Content", "Manage your gym website content. Update information and publish changes without a developer.", `<button class="primary-btn small-primary" data-toast="Public website preview is simulated in this demo.">◉ &nbsp; View Website</button>`)}<section class="content-grid">${tiles.map(t=>`<button class="content-tile" data-toast="${t[0]} editor opened in demo mode."><span class="stat-icon" style="--tone:${palette[t[3]]}">${t[2]}</span><span><h3>${t[0]}</h3><p>${t[1]}</p></span>›</button>`).join("")}</section>`;
}

function enquiriesPage() {
  return `${pageHeading("Enquiries", "Manage website enquiries and leads. Track, follow up and convert to members.", `<button class="primary-btn small-primary" data-modal="enquiry">＋ Add Enquiry</button>`)}
  <section class="stats-grid">${stat("Total Enquiries","248","vs last month","▣","orange","↑ 12%")}${stat("New Enquiries","36","this month","♟","green","↑ 25%")}${stat("Contacted","88","follow-ups","▤","red")}${stat("Trial Scheduled","42","upcoming","♜","purple")}${stat("Converted","56","22.6%","✓","green")}${stat("Lost","26","10.5%","×","red","↓ 8%")}</section>
  <div class="card filter-row"><input class="table-search" placeholder="Search by name, phone, plan or message..."><select><option>All Status</option></select><select><option>All Sources</option></select><select><option>All Staff</option></select><button class="secondary-btn">⇩ Export</button></div>
  <section class="card table-card big-table"><table class="data-table searchable"><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Interested Plan</th><th>Source</th><th>Message</th><th>Status</th><th>Follow Up</th><th>Actions</th></tr></thead><tbody>${enquiries.map((e,i)=>`<tr><td>${i+1}</td><td>${person(e[0])}</td><td>${e[1]}</td><td>${e[2]}</td><td>${e[3]}</td><td>Interested in ${e[2].toLowerCase()}...</td><td>${badge(e[4])}</td><td>${27+i%3} Oct 2026</td><td><button class="icon-btn" data-toast="Contact actions are simulated.">☎ &nbsp;●</button></td></tr>`).join("")}</tbody></table><div class="pagination"><span>Showing 1 to 8 of 248 enquiries</span><div class="pages"><button class="page-chip active">1</button><button class="page-chip">2</button><button class="page-chip">3</button><button class="page-chip">…</button><button class="page-chip">31</button></div></div></section>`;
}

function reportsPage() {
  const tiles = [["Attendance Reports","Daily, weekly and monthly attendance reports.","▣","orange"],["Membership Reports","New registrations, renewals and plan wise reports.","♟","green"],["Revenue Reports","Collection, payment method and staff reports.","₹","orange"],["Member Reports","Active, expired and member analytics.","♟","blue"],["Enquiry Reports","Enquiry to membership conversion reports.","☁","purple"],["Outstanding Dues","Pending payments and collection status.","▤","red"],["Plan Popularity","Most popular membership plans.","▥","red"],["Staff Reports","Cash collection by staff and performance.","♟","orange"],["Export Reports","Download reports in CSV or Excel format.","▧","blue"]];
  return `${pageHeading("Reports & Analytics", "Get detailed insights about your gym business, members, attendance, revenue and more.", `<button class="secondary-btn">▣ &nbsp; Oct 01, 2026 - Oct 31, 2026</button>`)}
  <section class="stats-grid">${stat("Total Members","248","vs last month","♟","green","↑ 12%")}${stat("Active Members","192","with valid membership","♟","blue","↑ 8%")}${stat("Expired Members","32","membership expired","!","red","↓ 4%")}${stat("Total Revenue","₹2,45,000","vs last month","◇","blue","↑ 18%")}</section>
  <section class="report-grid">${tiles.map(t=>`<button class="card report-tile" data-toast="${t[0]} opened in demo mode."><span class="stat-icon" style="--tone:${palette[t[3]]}">${t[2]}</span><span><h3>${t[0]}</h3><p>${t[1]}</p></span>›</button>`).join("")}</section>`;
}

function notificationsPage() {
  const rows = [["Membership Expiry","Rohit Sharma","Your Premium Plan will expire in 7 days...","WhatsApp","Sent"],["Payment Due","Neha Das","You have an outstanding balance of ₹2,000","SMS","Sent"],["New Enquiry","Amit Roy","New enquiry received from website","In-App","Read"],["Trial Session","Pooja Verma","Your trial session is tomorrow at 6:00 PM","Email","Pending"],["Renewal Confirmation","Sayan Khan","Your membership has been renewed!","WhatsApp","Sent"],["System Alert","Admin","New member registered: Kunal Das","In-App","Read"]];
  return `${pageHeading("Notifications & Reminders", "Manage automated reminders, messages and system notifications.", `<button class="primary-btn small-primary" data-modal="notification">＋ Send Notification</button>`)}
  <section class="stats-grid">${stat("Total Notifications","248","this month","♧","blue","↑ 12%")}${stat("Expiry Reminders","42","upcoming","▣","orange","↑ 5%")}${stat("Payment Reminders","36","pending dues","▤","red","↑ 18%")}${stat("New Enquiry Alerts","28","this month","♣","purple","↓ 8%")}</section>
  <div class="card filter-row"><select><option>All Notifications</option><option>Expiry Reminders</option><option>Payment Reminders</option></select><select><option>All Channels</option></select><select><option>All Status</option></select><input class="table-search" placeholder="Search by member name, phone or message..."></div>
  <section class="card table-card big-table"><table class="data-table searchable"><thead><tr><th>#</th><th>Type</th><th>Recipient</th><th>Message</th><th>Channel</th><th>Status</th><th>Date &amp; Time</th><th>Actions</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${badge(r[3])}</td><td>${badge(r[4])}</td><td>${27-Math.floor(i/2)} Oct 2026, ${10-i}:24 AM</td><td><button class="icon-btn" data-toast="Notification actions are simulated.">•••</button></td></tr>`).join("")}</tbody></table><div class="pagination"><span>Showing 1 to 6 of 248 notifications</span><div class="pages"><button class="page-chip active">1</button><button class="page-chip">2</button><button class="page-chip">3</button><button class="page-chip">…</button><button class="page-chip">42</button></div></div></section>`;
}

function genericPage(page) {
  const names = { plans: ["Plans & Memberships","Create and manage gym membership plans."], trainers:["Trainers","Manage your gym trainers and specializations."], classes:["Classes","Schedule and manage fitness classes."], gallery:["Gallery","Manage gym images and videos."], reviews:["Reviews","View and manage member feedback."], settings:["Settings","Configure your FITZONE admin panel."] };
  const [title, text] = names[page] || ["FITZONE", "Static admin panel demo"];
  return `${pageHeading(title,text,`<button class="primary-btn small-primary" data-toast="This action is simulated in the static demo.">＋ Add New</button>`)}<section class="card empty-state"><span class="stat-icon" style="--tone:${palette.orange}">⚙</span><h2>${title} module</h2><p>This section is included as a polished placeholder so the entire sidebar is navigable. Connect it to your preferred backend when moving beyond the static demo.</p><button class="primary-btn small-primary" data-toast="Demo action completed.">Try Demo Action</button></section>`;
}

const renderers = { dashboard: dashboardPage, members: membersPage, attendance: attendancePage, payments: paymentsPage, website: websitePage, enquiries: enquiriesPage, reports: reportsPage, notifications: notificationsPage };

function renderPage(page) {
  activePage = page;
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.page === page));
  pageHost.innerHTML = (renderers[page] || (() => genericPage(page)))();
  pageHost.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
  closeSidebar();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function modalTemplate(type) {
  const configs = {
    member: ["Add New Member","Register a new gym member.",[["Full Name","text","Enter full name"],["Phone Number","tel","+91 98765 43210"],["Email Address","email","member@example.com"],["Membership Plan","select","Premium Plan"],["Join Date","date",""]],"Save Member"],
    payment: ["Collect Payment","Record a new membership payment.",[["Member","select","Rohit Sharma"],["Payment Type","select","Membership Fee"],["Amount","number","12499"],["Payment Method","select","UPI"],["Reference Number","text","Optional transaction ID"],["Payment Date","date",""]],"Collect Payment"],
    enquiry: ["Add New Enquiry","Add an enquiry from walk-in, call or another source.",[["Full Name","text","Enter full name"],["Phone Number","tel","Enter phone number"],["Email Address","email","Enter email address"],["Interested Plan","select","Premium Plan"],["Enquiry Source","select","Website"],["Message / Notes","textarea","Enter enquiry message or notes..."]],"Save Enquiry"],
    notification: ["Create Notification","Send a custom message or use a saved template.",[["Title","text","Membership Expiry Reminder"],["Recipient","select","Rohit Sharma"],["Channel","select","WhatsApp"],["Message","textarea","Hi {member_name}, your plan will expire soon. Please renew now to continue your fitness journey with FITZONE."]],"Send Notification"],
    checkin: ["Manual Check-in","Search and select a member to mark attendance.",[["Member ID / Name","text","FTZ0001 or Rohit Sharma"],["Check-in Method","select","Manual Check-in"],["Date","date",""]],"Mark Attendance"]
  };
  const [title, subtitle, fields, submit] = configs[type];
  return `<h2 id="modalTitle">${title}</h2><p>${subtitle}</p><form class="demo-form" data-kind="${type}"><div class="form-grid">${fields.map(([label,kind,value])=>`<label class="form-field ${kind === "textarea" ? "full" : ""}">${label} <span class="required">*</span>${kind === "select" ? `<select class="form-control" required><option>${value}</option><option>Standard Plan</option><option>Cash</option></select>` : kind === "textarea" ? `<textarea class="form-control" placeholder="${value}" required>${type === "notification" ? value : ""}</textarea>` : `<input class="form-control" type="${kind}" placeholder="${value}" ${kind === "date" ? "value=2026-10-27" : type === "notification" && label === "Title" ? `value="${value}"` : type === "payment" && label === "Amount" ? `value="${value}"` : ""} required>`}</label>`).join("")}</div><div class="modal-actions"><button type="button" class="secondary-btn" data-close-modal>Cancel</button><button type="submit" class="primary-btn small-primary">${submit} →</button></div></form>`;
}

function openModal(type) {
  modalBody.innerHTML = modalTemplate(type);
  modalBackdrop.hidden = false;
  modalBody.querySelector("input,select,textarea")?.focus();
}

function closeModal() { modalBackdrop.hidden = true; }
function closeSidebar() { document.querySelector("#sidebar").classList.remove("open"); document.querySelector("#mobileOverlay").classList.remove("open"); }

document.querySelector("#loginForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) { event.currentTarget.reportValidity(); return; }
  loginScreen.hidden = true;
  appShell.hidden = false;
  sessionStorage.setItem("fitzone-demo-auth", "1");
  renderPage("dashboard");
  showToast("Welcome back, Admin!");
});

document.querySelector(".password-toggle").addEventListener("click", event => {
  const password = document.querySelector("#password");
  password.type = password.type === "password" ? "text" : "password";
  event.currentTarget.setAttribute("aria-label", password.type === "password" ? "Show password" : "Hide password");
});

document.querySelector("#logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem("fitzone-demo-auth");
  appShell.hidden = true;
  loginScreen.hidden = false;
  closeSidebar();
});

document.querySelector("#menuToggle").addEventListener("click", () => {
  document.querySelector("#sidebar").classList.toggle("open");
  document.querySelector("#mobileOverlay").classList.toggle("open");
});
document.querySelector("#mobileOverlay").addEventListener("click", closeSidebar);
document.querySelector("#modalClose").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", event => { if (event.target === modalBackdrop) closeModal(); });

document.addEventListener("click", event => {
  const nav = event.target.closest("[data-page]");
  const pageLink = event.target.closest("[data-page-link]");
  const modal = event.target.closest("[data-modal]");
  const toastButton = event.target.closest("[data-toast]");
  if (nav) renderPage(nav.dataset.page);
  if (pageLink) renderPage(pageLink.dataset.pageLink);
  if (modal) openModal(modal.dataset.modal);
  if (toastButton) showToast(toastButton.dataset.toast);
  if (event.target.closest("[data-close-modal]")) closeModal();
});

document.addEventListener("submit", event => {
  if (!event.target.matches(".demo-form")) return;
  event.preventDefault();
  if (!event.target.checkValidity()) { event.target.reportValidity(); return; }
  const kind = event.target.dataset.kind;
  closeModal();
  showToast({ member:"Member saved successfully.", payment:"Payment recorded successfully.", enquiry:"Enquiry saved successfully.", notification:"Notification sent successfully.", checkin:"Member checked in successfully." }[kind]);
});

document.addEventListener("input", event => {
  if (!event.target.matches(".table-search")) return;
  const query = event.target.value.toLowerCase();
  document.querySelectorAll(".searchable tbody tr").forEach(row => row.hidden = !row.textContent.toLowerCase().includes(query));
});

document.querySelector("#globalSearch").addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  const query = event.currentTarget.value.trim().toLowerCase();
  if (!query) return;
  if (query.includes("pay")) renderPage("payments");
  else if (query.includes("enquir")) renderPage("enquiries");
  else if (query.includes("report")) renderPage("reports");
  else { renderPage("members"); setTimeout(()=>{ const input=document.querySelector(".table-search"); if(input){input.value=query; input.dispatchEvent(new Event("input",{bubbles:true}));}},0); }
});

document.addEventListener("keydown", event => { if (event.key === "Escape") { closeModal(); closeSidebar(); } });

if (sessionStorage.getItem("fitzone-demo-auth") === "1") {
  loginScreen.hidden = true;
  appShell.hidden = false;
  renderPage("dashboard");
}
