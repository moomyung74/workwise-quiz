/* Developer dashboard: reads events from Supabase (login required) and shows statistics. */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pct = (a, b) => b ? Math.round(a / b * 1000) / 10 : null;
const fmt = v => v === null ? "–" : v + "%";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  $("#login").hidden = false;
  $("#msg").textContent = "Fill in SUPABASE_URL and SUPABASE_ANON_KEY in config.js first.";
  $("#go").disabled = true;
} else {
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  $("#go").onclick = async () => {
    $("#msg").textContent = "";
    const { error } = await sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#pass").value });
    if (error) { $("#msg").textContent = error.message; return; }
    show();
  };
  $("#pass").onkeydown = e => { if (e.key === "Enter") $("#go").click(); };

  async function show() {
    const { data } = await sb.auth.getSession();
    if (!data.session) { $("#login").hidden = false; $("#dash").hidden = true; return; }
    try { localStorage.setItem("ww_dev", "1"); } catch (e) {}   // do not count the developer's own visits
    $("#login").hidden = true; $("#dash").hidden = false;
    $("#dash").innerHTML = '<p class="sub">Loading…</p>';
    const rows = [];
    for (let from = 0; from < 50000; from += 1000) {
      const { data: part, error } = await sb.from("events").select("*").order("id").range(from, from + 999);
      if (error) { $("#dash").innerHTML = `<div class="card msg">${esc(error.message)}</div>`; return; }
      rows.push(...part);
      if (part.length < 1000) break;
    }
    render(rows);
  }

  function render(ev) {
    const of = t => ev.filter(e => e.type === t);
    const visits = of("visit"), starts = of("quiz_start"), subs = of("quiz_submit"), answers = of("answer");
    const day = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth()+1).padStart(2,"0") + "-" + String(x.getDate()).padStart(2,"0"); };
    const today = day(Date.now());
    const avg = subs.length ? pct(subs.reduce((a, e) => a + (e.total ? e.score / e.total : 0), 0), subs.length) * 1 : null;
    const kpi = (n, l) => `<div class="kpi"><div class="n">${n}</div><div class="l">${l}</div></div>`;

    const days = [];
    for (let i = 13; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(day(d)); }
    const dv = Object.fromEntries(days.map(d => [d, 0])), ds = { ...dv };
    visits.forEach(e => { const k = day(e.created_at); if (k in dv) dv[k]++; });
    subs.forEach(e => { const k = day(e.created_at); if (k in ds) ds[k]++; });
    const maxV = Math.max(1, ...Object.values(dv));

    const byQuiz = DATA.quizzes.map(z => {
      const s = starts.filter(e => e.quiz_id === z.id).length, m = subs.filter(e => e.quiz_id === z.id);
      const a = m.length ? pct(m.reduce((t, e) => t + (e.total ? e.score / e.total : 0), 0), m.length) : null;
      return `<tr><td>${esc(z.title)}</td><td>${s}</td><td>${m.length}</td><td>${fmt(pct(m.length, s))}</td><td>${fmt(a)}</td></tr>`;
    }).join("");

    const qrows = [];
    DATA.quizzes.forEach(z => z.questions.forEach((q, i) => {
      const a = answers.filter(e => e.quiz_id === z.id && e.question_idx === i), ok = a.filter(e => e.correct).length;
      qrows.push({ z, i, q, n: a.length, ok, p: pct(ok, a.length) });
    }));
    qrows.sort((x, y) => (x.p === null) - (y.p === null) || x.p - y.p);
    const qhtml = qrows.map(r => `<tr><td>${esc(r.z.id.toUpperCase())} · Q${r.i + 1}</td><td>${esc(r.q.q.length > 80 ? r.q.q.slice(0, 80) + "…" : r.q.q)}</td><td>${r.n}</td><td>${r.ok}</td><td>${r.n - r.ok}</td><td style="min-width:110px">${fmt(r.p)}<div class="bar ${r.p !== null && r.p < 50 ? "low" : ""}" style="width:${r.p || 0}%"></div></td></tr>`).join("");

    $("#dash").innerHTML = `
      <div class="row" style="margin-bottom:14px"><h2 style="margin:0">Overview</h2>
        <div><button class="btn alt" id="refresh">Refresh</button> <button class="btn alt" id="out">Log out</button></div></div>
      ${ev.length ? "" : '<div class="card">No data yet. If you already have visits, check that the email in supabase.sql matches this account.</div>'}
      <div class="kpis">
        ${kpi(visits.length, "Total visits")}
        ${kpi(new Set(visits.map(e => e.visitor_id)).size, "Unique visitors")}
        ${kpi(visits.filter(e => day(e.created_at) === today).length, "Visits today")}
        ${kpi(starts.length, "Quizzes started")}
        ${kpi(subs.length, "Quizzes submitted")}
        ${kpi(fmt(avg), "Average score")}
      </div>
      <div class="card"><div class="qn">Last 14 days</div><div class="scroll"><table class="tbl">
        <tr><th>Date</th><th>Visits</th><th>Submitted</th><th></th></tr>
        ${days.map(d => `<tr><td>${d}</td><td>${dv[d]}</td><td>${ds[d]}</td><td style="width:40%"><div class="bar" style="width:${dv[d] / maxV * 100}%"></div></td></tr>`).join("")}
      </table></div></div>
      <div class="card"><div class="qn">By quiz</div><div class="scroll"><table class="tbl">
        <tr><th>Quiz</th><th>Started</th><th>Submitted</th><th>Completion</th><th>Avg score</th></tr>${byQuiz}</table></div></div>
      <div class="card"><div class="qn">Correct vs wrong by question</div><p class="hint">Hardest questions first.</p><div class="scroll"><table class="tbl">
        <tr><th>Quiz</th><th>Question</th><th>Answers</th><th>Correct</th><th>Wrong</th><th>Correct rate</th></tr>${qhtml}</table></div></div>`;
    $("#refresh").onclick = show;
    $("#out").onclick = async () => { await sb.auth.signOut(); try { localStorage.removeItem("ww_dev"); } catch (e) {} show(); };
  }
  show();
}
