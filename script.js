(function () {
  var EMAIL = "sohaib87165@gmail.com";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  $("#yr").textContent = new Date().getFullYear();

  /* Nav: sticky style, progress bar, mobile menu */
  var nav = $("#nav"), bar = $("#progress"), burger = $("#burger"), links = $("#links");
  function onScroll() {
    var h = document.documentElement;
    nav.classList.toggle("stuck", h.scrollTop > 30);
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function closeMenu() { links.classList.remove("open"); burger.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(function (a) { a.addEventListener("click", closeMenu); });

  /* Cursor glow */
  var glow = $("#glow");
  if (!still && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("mousemove", function (e) { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });
  }

  /* Typed role */
  var roles = ["machine learning models.", "computer vision systems.", "NLP experiments.", "data-driven solutions."];
  var t = $("#typed"), ri = 0, ci = 0, del = false;
  function type() {
    var w = roles[ri];
    t.textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; return setTimeout(type, 1600); }
    if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
    ci += del ? -1 : 1;
    setTimeout(type, del ? 35 : 70);
  }
  still ? (t.textContent = roles[0]) : setTimeout(type, 1300);

  /* Scroll reveal + counters */
  function count(el) {
    var end = +el.dataset.count, start = performance.now(), dur = 1400;
    if (still) { el.textContent = end; return; }
    (function tick(n) {
      var p = Math.min((n - start) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      $$("[data-count]", e.target).forEach(count);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  $$(".reveal").forEach(function (el) { io.observe(el); });

  /* Active nav link */
  var navMap = {};
  $$(".links a[href^='#']").forEach(function (a) { navMap[a.getAttribute("href").slice(1)] = a; });
  var so = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting || !navMap[e.target.id]) return;
      $$(".links a").forEach(function (a) { a.classList.remove("act"); });
      navMap[e.target.id].classList.add("act");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(function (s) { so.observe(s); });

  /* Projects */
  var P = [
    { f: "cv", tag: "Final year project · Computer vision", t: "CricketSense", d: "AI cricket analysis system: ball detection, trajectory tracking, shot classification and shot recommendation.", r: "In progress", k: ["Python", "YOLO", "OpenCV", "Deep Learning"], v: 1 },
    { f: "nlp", tag: "NLP", t: "Urdu Sentiment Analysis", d: "Sentiment classification on Urdu text, comparing classical ML, deep learning and pretrained transformer models.", r: "Naive Bayes, SVM, LSTM, Transformers", k: ["Python", "NLP", "Scikit-learn"], u: "https://github.com/sohaibali66/urdu-sentiment-analysis" },
    { f: "ml", tag: "DecodeLabs · Machine learning", t: "Credit Card Fraud Detection", d: "Pipeline for 284,807 transactions with heavy class imbalance, balanced with SMOTE and tuned with GridSearchCV.", r: "Precision, recall, F1 and ROC-AUC", k: ["Logistic Regression", "Random Forest", "SMOTE"], u: "https://github.com/sohaibali66/DecodeLabs-Internship" },
    { f: "ml", tag: "Arch Technologies · Recommender", t: "Movie Recommendation System", d: "Collaborative filtering on MovieLens 100K with Truncated SVD to predict ratings and recommend a top 10.", r: "RMSE 1.03 · MAE 0.82", k: ["Python", "SciPy", "SVD"], u: "https://github.com/sohaibali66/data-science-internship-archtechnologies" },
    { f: "ml", tag: "Both internships · Clustering", t: "Customer Segmentation", d: "Grouped customers with K-Means after scaling and PCA, then described each segment as a persona.", r: "Silhouette score 0.34", k: ["K-Means", "PCA", "Elbow method"], u: "https://github.com/sohaibali66/data-science-internship-archtechnologies" },
    { f: "ml", tag: "Arch Technologies · Regression", t: "Apple Stock Price Prediction", d: "Linear Regression on historical prices to predict the next trading day's closing price.", r: "R² 0.992 · RMSE 3.71", k: ["Pandas", "Scikit-learn", "Matplotlib"], u: "https://github.com/sohaibali66/data-science-internship-archtechnologies" },
    { f: "ml", tag: "Both internships · Classification", t: "Titanic: Survival Prediction", d: "Cleaned the data, handled outliers, engineered features and compared two classifiers.", r: "Random Forest 81.56% accuracy", k: ["EDA", "Feature engineering", "Random Forest"], u: "https://github.com/sohaibali66/DecodeLabs-Internship" },
    { f: "web", tag: "Web development", t: "E-Challan System", d: "Multi-page traffic management site with registration and profile forms, validation, dynamic tables and a PHP backend.", r: "Academic project", k: ["HTML", "CSS", "JavaScript", "PHP"] }
  ];
var CRICKET = '<svg viewBox="0 0 480 240" role="img" aria-label="Animated cricket ball being tracked after a bat shot"><defs><linearGradient id="pg" x1="0" x2="1"><stop offset="0" stop-color="#3a2a7a"/><stop offset="1" stop-color="#1a1238"/></linearGradient></defs><polygon points="10,205 470,62 470,102 10,238" fill="url(#pg)" stroke="#6d58c9" stroke-opacity=".5"/><rect x="30" y="172" width="3" height="38" rx="1" fill="#d8ccff"/><rect x="37" y="172" width="3" height="38" rx="1" fill="#d8ccff"/><rect x="44" y="172" width="3" height="38" rx="1" fill="#d8ccff"/><path d="M440 50 C370 80 250 200 124 180 C190 130 330 8 455 18" fill="none" stroke="#b79bff" stroke-opacity=".55" stroke-dasharray="4 7"/><g transform="translate(90 120)"><g><animateTransform attributeName="transform" type="rotate" values="55;55;-35;-35;55" keyTimes="0;.38;.5;.85;1" dur="3.6s" repeatCount="indefinite"/><rect x="-3" y="-4" width="6" height="26" rx="3" fill="#2b2250"/><rect x="-9" y="20" width="18" height="56" rx="7" fill="#e3c79a"/></g></g><circle cx="124" cy="180" r="0" fill="none" stroke="#fff" stroke-width="2"><animate attributeName="r" values="0;0;26" keyTimes="0;.47;.62" dur="3.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.47;.5;.64" dur="3.6s" repeatCount="indefinite"/></circle><g><animateMotion dur="3.6s" repeatCount="indefinite" calcMode="linear" keyPoints="0;.49;1" keyTimes="0;.47;1" path="M440 50 C370 80 250 200 124 180 C190 130 330 8 455 18"/><circle r="6" fill="#ff5d7a"/><rect x="-14" y="-14" width="28" height="28" rx="3" fill="none" stroke="#e6a8ff" stroke-width="1.5"/><text x="-14" y="-19" fill="#e6a8ff" font-size="10" font-family="JetBrains Mono,monospace">ball 0.97</text></g><text x="18" y="30" fill="#e6a8ff" font-size="12" font-family="JetBrains Mono,monospace" opacity="0">shot: lofted drive 0.94<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;.5;.58;.9;1" dur="3.6s" repeatCount="indefinite"/></text></svg>';
  var grid = $("#grid");
  function render(f) {
    grid.innerHTML = "";
    P.filter(function (p) { return f === "all" || p.f === f; }).forEach(function (p, i) {
      var a = document.createElement("article");
      a.className = "card proj";
      a.style.animationDelay = i * 0.06 + "s";
      a.innerHTML = '<span class="tag"></span><h3></h3><p></p><div class="res"></div><div class="tools"></div>';
      $(".tag", a).textContent = p.tag;
      $("h3", a).textContent = p.t;
      $("p", a).textContent = p.d;
      $(".res", a).textContent = p.r;
      p.k.forEach(function (k) { var s = document.createElement("span"); s.textContent = k; $(".tools", a).appendChild(s); });
      if (p.u) {
        var l = document.createElement("a");
        l.className = "link"; l.href = p.u; l.target = "_blank"; l.rel = "noopener"; l.textContent = "View on GitHub ↗";
        a.appendChild(l);
      }
      if (p.v) {
        a.classList.add("feat");
        var body = document.createElement("div"), vis = document.createElement("div");
        body.className = "body"; vis.className = "vis"; vis.innerHTML = CRICKET;
        while (a.firstChild) body.appendChild(a.firstChild);
        a.appendChild(vis); a.appendChild(body);
      }
      grid.appendChild(a);
    });
  }
  function still_() { if (still) $$("svg", grid).forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); }); }
  render("all"); still_();
  $("#filters").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    $$("#filters button").forEach(function (x) { x.classList.remove("on"); });
    b.classList.add("on");
    render(b.dataset.f); still_();
  });

  /* Contact form: sends straight to the inbox via FormSubmit, falls back to the mail app */
  var form = $("#form"), status = $("#status"), send = $("#send");
  function say(msg, cls) { status.textContent = msg; status.className = "status " + cls; }
  function fallback(d) {
    var body = encodeURIComponent(d.message + "\n\n" + d.name + "\n" + d.email);
    window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Portfolio message from " + d.name) + "&body=" + body;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };
    var ok = true;
    [["name", d.name], ["email", /^\S+@\S+\.\S+$/.test(d.email) && d.email], ["message", d.message]].forEach(function (c) {
      form[c[0]].classList.toggle("bad", !c[1]);
      if (!c[1]) ok = false;
    });
    if (!ok) return say("Please fill in your name, a valid email and a message.", "err");
    send.disabled = true; send.textContent = "Sending…"; say("", "");
    fetch("https://formsubmit.co/ajax/" + EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name: d.name, email: d.email, message: d.message, _subject: "Portfolio message from " + d.name, _replyto: d.email, _template: "table", _captcha: "false" })
    }).then(function (r) { return r.json(); }).then(function (j) {
      if (String(j.success) !== "true") throw new Error("failed");
      say("Message sent. Thank you, I'll reply soon.", "ok");
      form.reset();
    }).catch(function () {
      say("Could not send online. Opening your email app instead.", "err");
      setTimeout(function () { fallback(d); }, 900);
    }).finally(function () { send.disabled = false; send.textContent = "Send message"; });
  });
})();
