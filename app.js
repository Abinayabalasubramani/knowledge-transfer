const D = window.KT, $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const parts = ps => (ps || []).map(p =>
  p.p ? `<p>${p.p}</p>` :
  p.ul ? `<${p.ordered ? "ol" : "ul"}>${p.ul.map(i => `<li>${i}</li>`).join("")}</${p.ordered ? "ol" : "ul"}>` :
  p.code ? `<pre>${esc(p.code)}</pre>` :
  p.table ? `<div class="tw"><table>${p.table.head ? `<thead><tr>${p.table.head.map(c => `<th>${c}</th>`).join("")}</tr></thead>` : ""}<tbody>${p.table.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""
).join("");
const state = t => t.owner === "TBD" ? "unowned" : (Date.now() - new Date(t.updated) > 90 * 864e5 ? "stale" : "");

if ($("#grid")) {
  const render = () => {
    const q = $("#q").value.toLowerCase();
    $("#grid").innerHTML = D.filter(t => JSON.stringify(t).toLowerCase().includes(q)).map(t =>
      `<a class="card" href="topic.html?id=${t.id}"><span class="tag">${esc(t.kind)}</span><h3>${esc(t.name)}</h3>
      <p>${esc(t.summary)}</p></a>`
    ).join("") || '<p class="sub">No matches.</p>';
  };
  $("#q").oninput = render; render();
} else if ($("#t")) {
  const t = D.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!t) { $("#t").innerHTML = "<h1>Not found</h1>"; }
  else {
    document.title = t.name + " – Knowledge Transfer";
    const rel = (t.related || []).map(id => D.find(x => x.id === id)).filter(Boolean);
    const slug = (s, i) => "s" + (i + 1) + "-" + s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    $("#t").innerHTML = `<header><span class="tag">${esc(t.kind)}</span><h1>${esc(t.name)}</h1><p class="sub">${esc(t.summary)}</p></header>
      <div class="layout"><nav class="toc"><h4>Contents</h4>${t.sections.map((s, i) => `<a href="#${slug(s.title, i)}" data-id="${slug(s.title, i)}">${esc(s.title)}</a>`).join("")}</nav>
      <div class="content">${t.intro && t.intro.length ? `<div class="sec">${parts(t.intro)}</div>` : ""}
      ${t.sections.map((s, i) => `<div class="sec" id="${slug(s.title, i)}"><h2>${esc(s.title)}</h2>${s.parts ? parts(s.parts) : `<p>${esc(s.body)}</p>`}</div>`).join("")}</div></div>`;
    const links = [...document.querySelectorAll(".toc a")];
    const mark = id => links.forEach(a => a.classList.toggle("on", a.dataset.id === id));
    links.forEach(a => a.onclick = e => { e.preventDefault(); document.getElementById(a.dataset.id).scrollIntoView({ behavior: "smooth" }); mark(a.dataset.id); });
    const secs = t.sections.map((s, i) => document.getElementById(slug(s.title, i)));
    const spy = () => { let cur = secs[0].id; secs.forEach(s => { if (s.getBoundingClientRect().top <= 120) cur = s.id; }); mark(cur); };
    addEventListener("scroll", spy, { passive: true }); spy();
  }
}
