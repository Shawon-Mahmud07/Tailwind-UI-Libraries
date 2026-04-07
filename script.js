// ── Constants & State ───────────────────────────────────────
const DATA_URL = "./data.json";


const tierLabel = { S: "🏆 S-Tier", A: "✅ A-Tier", B: "👍 B-Tier", C: "ℹ️ C-Tier" };
let activeFilter = "all";
let libs = [];

// ── Card HTML তৈরি ──────────────────────────────────────────
function buildCard(lib) {
  const installText = lib.install || "Copy-paste";
  const isNpmInstall = installText.toLowerCase().includes("npm");

  return `
    <div class="lib-card tier-${lib.tier}">
      <div class="card-header">
        <div class="card-name-wrap">
          <span class="card-name">${lib.name}</span>
          ${lib.isNew ? '<span class="new-badge">নতুন</span>' : ""}
          ${lib.anim ? '<span class="anim-badge">✨ Animation</span>' : ""}
        </div>
        <span class="tier-badge tb-${lib.tier}">${tierLabel[lib.tier]}</span>
      </div>
      
      <div class="card-desc">${lib.desc}</div>
      
      <div class="card-footer">
        <span class="tag ${lib.free ? "tag-free" : "tag-paid"}">${lib.free ? "✓ ফ্রি" : "⚡ ফ্রি+Paid"}</span>
        ${lib.react ? '<span class="tag tag-react">⚛ React</span>' : ""}
        ${lib.next ? '<span class="tag tag-next">▲ Next.js</span>' : ""}

        <!-- Install Button -->
        ${isNpmInstall ? `
          <button class="copy-install-btn" data-install="${installText}">
            📋 ${installText}
          </button>
        ` : `
          <span class="copy-install-disabled">
            📋 Copy-paste
          </span>
        `}

        <a class="card-link" href="https://${lib.link}" target="_blank" rel="noopener">
          ${lib.link} ↗
        </a>
      </div>
    </div>
  `;
}

// ── Grid রেন্ডার ─────────────────────────────────────────────
function render(data) {
  const grid = document.getElementById("libGrid");
  const noResult = document.getElementById("noResult");
  const count = document.getElementById("resultCount");

  if (data.length === 0) {
    grid.innerHTML = "";
    noResult.classList.remove("hidden");
  } else {
    noResult.classList.add("hidden");
    grid.innerHTML = data
      .map((lib, i) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = buildCard(lib);
        const card = wrapper.firstElementChild;
        card.style.animationDelay = `${i * 25}ms`;
        return card.outerHTML;
      })
      .join("");
  }

  count.textContent = `${data.length}টি লাইব্রেরি দেখাচ্ছে`;
}

// ── Filter + Search ──────────────────────────────────────────
function getFiltered() {
  const q = document.getElementById("search").value.toLowerCase().trim();
  return libs.filter((lib) => {
    const matchQ =
      !q ||
      lib.name.toLowerCase().includes(q) ||
      lib.desc.toLowerCase().includes(q) ||
      lib.link.toLowerCase().includes(q);

    const matchF =
      activeFilter === "all"  ? true :
      activeFilter === "free" ? lib.free :
      activeFilter === "new"  ? lib.isNew :
      activeFilter === "anim" ? lib.anim :
      lib.tier === activeFilter;

    return matchQ && matchF;
  });
}

// ── Loading / Error UI ───────────────────────────────────────
function showLoading() {
  document.getElementById("libGrid").innerHTML = `
    <div style="grid-column:1/-1; text-align:center; padding:60px 0; color:#555f6e;">
      <div style="font-size:28px; margin-bottom:12px;">⏳</div>
      <p style="font-size:14px;">লাইব্রেরি লোড হচ্ছে...</p>
    </div>`;
}

function showError(msg) {
  document.getElementById("libGrid").innerHTML = `
    <div style="grid-column:1/-1; text-align:center; padding:60px 0; color:#f87171;">
      <div style="font-size:28px; margin-bottom:12px;">❌</div>
      <p style="font-size:14px;">${msg}</p>
    </div>`;
}

// ── JSON Fetch ───────────────────────────────────────────────
async function loadData() {
  showLoading();
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    libs = await res.json();
    render(libs);
  } catch (err) {
    showError("ডেটা লোড করা যায়নি। (" + err.message + ")");
    console.error("Fetch error:", err);
  }
}

// ── Copy Install Command ─────────────────────────────────────
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('copy-install-btn')) {
    const btn = e.target;
    const textToCopy = btn.getAttribute('data-install');

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = btn.innerHTML;
      
      btn.classList.add('copied');
      btn.innerHTML = `✅ Copied!`;

      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = originalHTML;
      }, 2000);
    });
  }
});

// ── Filter Buttons ───────────────────────────────────────────
document.querySelectorAll(".fbtn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".fbtn").forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render(getFiltered());
  });
});

// ── Search with Debounce ─────────────────────────────────────
var searchInput = document.getElementById("search");
var clearBtn = document.getElementById("clearBtn");
let searchTimeout = null;

searchInput.addEventListener("input", function() {
  const query = this.value.trim();

  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Show/Hide clear button
  clearBtn.classList.toggle("visible", query.length > 0);

  // Debounce: Wait 300ms before rendering
  searchTimeout = setTimeout(() => {
    render(getFiltered());
  }, 300);
});

function clearSearch() {
  searchInput.value = "";
  clearBtn.classList.remove("visible");
  
  // Clear any pending timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  render(getFiltered());
}
// ── Theme Switcher ───────────────────────────────────────────
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Active class update
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === theme);
  });
}

// Load saved theme or default
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

// Add click listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(btn.dataset.theme);
  });
});


// ── Start ────────────────────────────────────────────────────
loadData();
