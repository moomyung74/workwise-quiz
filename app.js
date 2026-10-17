/* UI logic. Content lives in data.js (the DATA variable). */

const $ = s => document.querySelector(s), app = $("#app");
const norm = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const L = i => String.fromCharCode(65+i);
const opts = q => q.type==="tf" ? ["True","False"] : q.options;
const ans = q => [].concat(q.answer);
let tab = "quiz", cur = null, sel = [], done = false, cat = "All", kw = "";

function setTab(t){
  tab = t; cur = null; done = false;
  $("#t-quiz").classList.toggle("on", t==="quiz"); $("#t-know").classList.toggle("on", t==="know");
  render();
}
$("#t-quiz").onclick = () => setTab("quiz");
$("#t-know").onclick = () => setTab("know");

function render(){ tab==="quiz" ? (cur ? renderQuiz() : renderList()) : renderKnow(); window.scrollTo(0,0); }

function renderList(){
  app.innerHTML = `<h2>Choose a quiz</h2><p class="sub">Each quiz is multiple choice. Submit to see your results and explanations.</p>` +
    DATA.quizzes.map(z => `<div class="card row"><div><div class="qn">${esc(z.title)}</div><div class="sub" style="margin:0">${esc(z.desc)} · ${z.questions.length} questions</div></div><button class="btn" data-id="${z.id}">Start quiz</button></div>`).join("");
  app.querySelectorAll("[data-id]").forEach(b => b.onclick = () => { cur = DATA.quizzes.find(z => z.id===b.dataset.id); sel = []; done = false; render(); });
}

function renderQuiz(){
  const qs = cur.questions;
  let score = 0;
  const cards = qs.map((q,i) => {
    const o = opts(q), right = ans(q), mine = sel[i] || [];
    const ok = done && right.length===mine.length && right.every(x => mine.includes(x));
    if (ok) score++;
    const multi = q.type==="multi";
    const items = o.map((t,j) => {
      let cls = "";
      if (done) cls = right.includes(j) ? "right" : (mine.includes(j) ? "wrong" : "");
      const mark = done ? (right.includes(j) ? `<span class="mark">✓ Correct answer</span>` : (mine.includes(j) ? `<span class="mark">✗ Your answer</span>` : "")) : "";
      return `<label class="opt ${cls}"><input type="${multi?"checkbox":"radio"}" name="q${i}" value="${j}" ${mine.includes(j)?"checked":""} ${done?"disabled":""}><span>${q.type==="tf"?"":L(j)+". "}${esc(t)}</span>${mark}</label>`;
    }).join("");
    const fb = done ? `<div class="verdict ${ok?"ok":"bad"}" style="margin-top:12px">${ok?"✓ Correct":(mine.length?"✗ Incorrect":"✗ Not answered")}</div><div class="exp" style="margin-top:0">${esc(q.exp)}<div class="ref">Source: ${esc(q.ref)}</div></div>` : "";
    return `<div class="card"><p class="qn">${i+1}. ${esc(q.q)}</p>${multi?`<p class="hint">Select all that apply</p>`:""}${items}${fb}</div>`;
  }).join("");
  const pct = Math.round(score/qs.length*100);
  const head = done
    ? `<div class="card res"><div class="score">${score}/${qs.length}</div><div class="verdict ${pct>=70?"ok":"bad"}">${pct>=80?"Great job! You really know your stuff.":pct>=50?"Pretty good, review the explanations below.":"Needs review, check the Knowledge tab to learn more."}</div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn" id="retry">Try again</button><button class="btn alt" id="back">Back to list</button></div></div>`
    : `<button class="btn alt" id="back" style="margin-bottom:14px">← All quizzes</button>`;
  app.innerHTML = `${head}<h2>${esc(cur.title)}</h2><p class="sub">${esc(cur.desc)}</p>${cards}${done?"":`<button class="btn" id="submit" style="width:100%">Submit</button>`}`;
  $("#back").onclick = () => { cur = null; done = false; render(); };
  if (done) $("#retry").onclick = () => { sel = []; done = false; render(); };
  else $("#submit").onclick = () => {
    sel = qs.map((_,i) => [...app.querySelectorAll(`[name=q${i}]:checked`)].map(x => +x.value));
    const miss = sel.filter(s => !s.length).length;
    if (miss && !confirm(`You have ${miss} unanswered question(s). Submit anyway?`)) return;
    done = true; render();
  };
}

function hl(text, k){
  const t = esc(text); if (!k) return t;
  const n = norm(text), i = n.indexOf(k);
  if (i < 0 || n.length !== text.length) return t;
  return esc(text.slice(0,i)) + "<mark>" + esc(text.slice(i,i+k.length)) + "</mark>" + esc(text.slice(i+k.length));
}

function renderKnow(){
  const cats = ["All", ...new Set(DATA.knowledge.map(k => k.cat))];
  app.innerHTML = `<h2>Knowledge Hub</h2><p class="sub">Search by keyword or pick a section.</p>
    <input class="search" id="kw" type="search" placeholder="Search: probation, contract, Article 17…" value="${esc(kw)}" aria-label="Search knowledge">
    <div class="chips">${cats.map(c => `<button class="chip ${c===cat?"on":""}" data-c="${esc(c)}">${esc(c)}</button>`).join("")}</div><div id="list"></div>`;
  app.querySelectorAll(".chip").forEach(b => b.onclick = () => { cat = b.dataset.c; renderKnow(); window.scrollTo(0,0); });
  const input = $("#kw");
  input.oninput = () => { kw = input.value; list(); };
  list();
}
function list(){
  const k = norm(kw.trim());
  const rows = DATA.knowledge.filter(x => (cat==="All" || x.cat===cat) && (!k || norm(`${x.title} ${x.body} ${x.ref} ${x.cat}`).includes(k)));
  $("#list").innerHTML = rows.length ? rows.map(x => `<details class="card" ${k?"open":""}><summary><span class="pill ${x.kind==="law"?"":"rec"}">${x.kind==="law"?"Law":"Tip"}</span>${hl(x.title,k)}<div class="ref">${esc(x.cat)} · ${esc(x.ref)}</div></summary><p>${hl(x.body,k)}</p></details>`).join("") : `<div class="empty">No matching results.</div>`;
}
render();
