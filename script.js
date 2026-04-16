// ── Constants & State ───────────────────────────────────────
const DATA_URL = "./data.json";

const tierLabel = {
  S: "🏆 S-Tier",
  A: "✅ A-Tier",
  B: "👍 B-Tier",
  C: "ℹ️ C-Tier",
};
let activeFilter = "all";
let libs = [];
// ── Card HTML তৈরি ──────────────────────────────────────────
function buildCard(lib) {
  const installText = lib.install || "Copy-paste";
  const isNpmInstall = installText.toLowerCase().includes("npm") || 
                       installText.toLowerCase().includes("npx");

  return `
    <div class="lib-card tier-${lib.tier}" onclick="showLibraryModal(${lib.id})" style="cursor: pointer;">
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

        ${isNpmInstall 
          ? `<button class="copy-install-btn" data-install="${installText}">📋 ${installText}</button>` 
          : `<span class="copy-install-disabled">📋 Copy-paste</span>`
        }

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
      activeFilter === "all"
        ? true
        : activeFilter === "free"
          ? lib.free
          : activeFilter === "new"
            ? lib.isNew
            : activeFilter === "anim"
              ? lib.anim
              : lib.tier === activeFilter;

    return matchQ && matchF;
  });
}

// ── Loading Skeleton ───────────────────────────────────────
function showLoading() {
  const grid = document.getElementById("libGrid");
  let skeletonHTML = '<div class="skeleton-grid">';

  for (let i = 0; i < 8; i++) {
    skeletonHTML += `
      <div class="skeleton-card">
        <div class="skeleton-header">
          <div class="skeleton-title"></div>
          <div class="skeleton-badge"></div>
        </div>
        <div class="skeleton-desc"></div>
        <div class="skeleton-desc"></div>
        <div class="skeleton-footer">
          <div class="skeleton-tag"></div>
          <div class="skeleton-tag"></div>
        </div>
      </div>
    `;
  }

  skeletonHTML += "</div>";
  grid.innerHTML = skeletonHTML;
}

// ── JSON Fetch ───────────────────────────────────────────────
async function loadData() {
  showLoading();
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error("HTTP " + res.status);
    libs = await res.json();
    render(libs);
    setupExportButtons();
  } catch (err) {
    showError("ডেটা লোড করা যায়নি। (" + err.message + ")");
    console.error("Fetch error:", err);
  }
}

// ── Copy Install Command ─────────────────────────────────────
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("copy-install-btn")) {
    const btn = e.target;
    const textToCopy = btn.getAttribute("data-install");

    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalHTML = btn.innerHTML;

      btn.classList.add("copied");
      btn.innerHTML = `✅ Copied!`;

      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = originalHTML;
      }, 2000);
    });
  }
});

// ── Filter Buttons ───────────────────────────────────────────
document.querySelectorAll(".fbtn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".fbtn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render(getFiltered());
  });
});

// ── Search with Debounce ─────────────────────────────────────
var searchInput = document.getElementById("search");
var clearBtn = document.getElementById("clearBtn");
let searchTimeout = null;

searchInput.addEventListener("input", function () {
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
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Active class update
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === theme);
  });
}

// Load saved theme or default
const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

// Add click listeners
document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTheme(btn.dataset.theme);
  });
});

// ── Export Functions ─────────────────────────────────────────

// Export as JSON
function exportAsJSON() {
  const filteredData = getFiltered();

  const dataStr = JSON.stringify(filteredData, null, 2);
  const dataUri =
    "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

  const exportFileDefaultName = `tailwind-ui-libraries-${new Date().toISOString().slice(0, 10)}.json`;

  const linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", exportFileDefaultName);
  linkElement.click();
}

// Export as CSV (Improved)
function exportAsCSV() {
  const filteredData = getFiltered();

  let csvRows = [];
  csvRows.push([
    "Name",
    "Tier",
    "Free",
    "React",
    "Next.js",
    "Install",
    "Link",
    "Description",
  ]);

  filteredData.forEach((lib) => {
    csvRows.push([
      lib.name || "",
      lib.tier || "",
      lib.free ? "TRUE" : "FALSE",
      lib.react ? "TRUE" : "FALSE",
      lib.next ? "TRUE" : "FALSE",
      lib.install || "Copy-paste",
      lib.link || "",
      lib.desc || "",
    ]);
  });

  let csvContent = csvRows
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  const bom = "\uFEFF";
  const finalContent = bom + csvContent;

  const encodedUri =
    "data:text/csv;charset=utf-8," + encodeURIComponent(finalContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `tailwind-ui-libraries-${new Date().toISOString().slice(0, 10)}.csv`,
  );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Attach Event Listeners for Export Buttons
function setupExportButtons() {
  const jsonBtn = document.getElementById("exportJSON");
  const csvBtn = document.getElementById("exportCSV");

  if (jsonBtn) jsonBtn.addEventListener("click", exportAsJSON);
  if (csvBtn) csvBtn.addEventListener("click", exportAsCSV);
}

// ── Library Detail Modal ─────────────────────────────────────
let currentLib = null;

function showLibraryModal(id) {
  currentLib = libs.find(lib => lib.id === parseInt(id));
  if (!currentLib) return;

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  const tierColors = {
    S: "background: var(--s-bg); color: var(--s-color);",
    A: "background: var(--a-bg); color: var(--a-color);",
    B: "background: var(--b-bg); color: var(--b-color);",
    C: "background: var(--c-bg); color: var(--c-color);"
  };

  const isNpmInstall = (currentLib.install || "").toLowerCase().includes("npm") || 
                       (currentLib.install || "").toLowerCase().includes("npx");

  modalBody.innerHTML = `
    <div class="modal-header">
      <div style="display:flex; justify-content:space-between; align-items:start; gap:12px;">
        <div>
          <h2 class="modal-title">${currentLib.name}</h2>
          <span class="modal-tier" style="${tierColors[currentLib.tier]}">
            ${tierLabel[currentLib.tier]}
          </span>
        </div>
      </div>
    </div>

    <div class="modal-desc">
      ${currentLib.desc}
    </div>

    <div class="modal-section">
      <h3>📦 Install Command</h3>
      <div style="background:var(--bg2); padding:14px 16px; border-radius:8px; font-family:var(--font-display); font-size:14px; word-break:break-all;">
        ${currentLib.install || "Copy-paste components"}
      </div>
    </div>

    <div class="modal-footer">
      <a href="https://${currentLib.link}" target="_blank" class="export-btn" style="flex:1; text-align:center;">
        🌐 Visit Official Website
      </a>
      
      ${isNpmInstall ? `
        <button onclick="copyInstallFromModal()" class="export-btn" style="flex:1;">
          📋 Copy Install Command
        </button>
      ` : `
        <button class="export-btn" style="flex:1; opacity:0.5; cursor:not-allowed;" disabled>
          📋 Copy Install Command
        </button>
      `}
    </div>
  `;

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
  document.body.style.overflow = "auto";
}

document.getElementById("modal-close").addEventListener("click", closeModal);

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
  }
});

// Copy from Modal
function copyInstallFromModal() {
  if (!currentLib) return;
  const text = currentLib.install || "Copy-paste";

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector(".modal-footer button:last-child");
    if (btn) {
      const original = btn.innerHTML;
      btn.innerHTML = "✅ Copied!";
      setTimeout(() => {
        btn.innerHTML = original;
      }, 2000);
    }
  });
}
// ── Start ────────────────────────────────────────────────────
loadData();
