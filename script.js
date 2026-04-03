const libs = [
  { id:1,  name:"Shadcn UI",          tier:"S", free:true,  react:true,  next:true,  link:"ui.shadcn.com",                      install:"npx shadcn@latest init",          desc:"Component সরাসরি প্রজেক্টে থাকে — সম্পূর্ণ নিজের নিয়ন্ত্রণে। সবচেয়ে জনপ্রিয় ও আপডেটেড।", isNew:false, anim:false },
  { id:2,  name:"Magic UI",           tier:"S", free:false, react:true,  next:true,  link:"magicui.design",                     install:"npx magicui-cli@latest init",     desc:"150+ animated component — Shadcn UI-এর পারফেক্ট companion। Motion দিয়ে তৈরি।", isNew:true, anim:true },
  { id:3,  name:"Aceternity UI",      tier:"S", free:true,  react:true,  next:true,  link:"ui.aceternity.com",                  install:"Copy-paste",                      desc:"Tailwind + Framer Motion দিয়ে তৈরি দারুণ animated component। Landing page-এ অসাধারণ।", isNew:true, anim:true },
  { id:4,  name:"DaisyUI",            tier:"S", free:true,  react:true,  next:true,  link:"daisyui.com",                        install:"npm install daisyui",             desc:"সহজ class-based UI — Shadcn-এর সাথে একসাথে ব্যবহার করবেন না (theme conflict)।", isNew:false, anim:false },
  { id:5,  name:"Preline UI",         tier:"S", free:true,  react:true,  next:true,  link:"preline.co",                         install:"npm install preline",             desc:"60+ component, 170+ section — বড় প্রজেক্টের জন্য পারফেক্ট।", isNew:false, anim:false },
  { id:6,  name:"Next UI (HeroUI)",   tier:"S", free:true,  react:true,  next:true,  link:"heroui.com",                         install:"npm install @heroui/react",       desc:"Next.js-এর জন্য তৈরি, dark mode built-in, 50+ component।", isNew:false, anim:false },
  { id:7,  name:"Animate UI",         tier:"A", free:true,  react:true,  next:true,  link:"animate-ui.com",                     install:"Copy-paste",                      desc:"Animated React component লাইব্রেরি — Motion-based smooth animation।", isNew:true, anim:true },
  { id:8,  name:"Eldora UI",          tier:"A", free:true,  react:true,  next:true,  link:"eldoraui.site",                      install:"Copy-paste",                      desc:"Tailwind + Framer Motion দিয়ে তৈরি modern animated section ও component।", isNew:true, anim:true },
  { id:9,  name:"Inspira UI",         tier:"A", free:true,  react:true,  next:true,  link:"inspira-ui.com",                     install:"Copy-paste",                      desc:"Aceternity UI-এর অনুপ্রেরণায় তৈরি — beautiful animated component collection।", isNew:true, anim:true },
  { id:10, name:"Sera UI",            tier:"A", free:true,  react:true,  next:true,  link:"seraui.com",                         install:"Copy-paste",                      desc:"Marquee, Orbiting Circles, Network Visualization — unique animated components।", isNew:true, anim:true },
  { id:11, name:"MVP Blocks",         tier:"A", free:true,  react:true,  next:true,  link:"blocks.mvp-subha.me",                install:"Copy-paste",                      desc:"Copy-paste ready modern blocks — landing page দ্রুত তৈরির জন্য।", isNew:true, anim:false },
  { id:12, name:"Flowbite",           tier:"A", free:false, react:true,  next:true,  link:"flowbite.com",                       install:"npm install flowbite-react",      desc:"600+ UI component, chart ও table সহ। React version আলাদাভাবে আছে।", isNew:false, anim:false },
  { id:13, name:"Radix UI",           tier:"A", free:true,  react:true,  next:true,  link:"radix-ui.com",                       install:"npm install @radix-ui/react-*",   desc:"Headless — Shadcn UI এর ভেতরে ব্যবহার হয়। Accessibility সবচেয়ে ভালো।", isNew:false, anim:false },
  { id:14, name:"Headless UI",        tier:"A", free:true,  react:true,  next:true,  link:"headlessui.com",                     install:"npm install @headlessui/react",   desc:"Tailwind Labs-এর তৈরি। Dropdown, Dialog, Combobox — fully accessible।", isNew:false, anim:false },
  { id:15, name:"Hyper UI",           tier:"A", free:true,  react:true,  next:true,  link:"hyperui.dev",                        install:"Copy-paste",                      desc:"শুধু Tailwind — যেকোনো প্রজেক্টে conflict ছাড়া কাজ করে।", isNew:false, anim:false },
  { id:16, name:"Float UI",           tier:"A", free:true,  react:true,  next:true,  link:"floatui.com",                        install:"Copy-paste",                      desc:"SaaS landing page-এর জন্য সুন্দর section।", isNew:false, anim:false },
  { id:17, name:"Neobrutalism",       tier:"A", free:true,  react:true,  next:true,  link:"neobrutalism.dev",                   install:"Copy-paste",                      desc:"Bold border, bright color — unique brutalist design।", isNew:false, anim:false },
  { id:18, name:"Ripple UI",          tier:"A", free:true,  react:true,  next:true,  link:"ripple-ui.com",                      install:"npm install ripple-ui",           desc:"DaisyUI-এর মতো কিন্তু আরো আধুনিক ডিজাইন।", isNew:false, anim:false },
  { id:19, name:"Flyon UI",           tier:"A", free:true,  react:true,  next:true,  link:"flyonui.com",                        install:"npm install flyonui",             desc:"DaisyUI + Tailwind-এর উপর তৈরি, সুন্দর dark theme।", isNew:false, anim:false },
  { id:20, name:"Nur UI",             tier:"B", free:true,  react:true,  next:true,  link:"nurui.vercel.app",                   install:"Copy-paste",                      desc:"Tailwind-based component collection — সুন্দর minimal design।", isNew:true, anim:false },
  { id:21, name:"Material Tailwind",  tier:"B", free:false, react:true,  next:true,  link:"material-tailwind.com",              install:"npm install @material-tailwind/react", desc:"Google Material Design + Tailwind একসাথে।", isNew:false, anim:false },
  { id:22, name:"Meraki UI",          tier:"B", free:true,  react:true,  next:true,  link:"merakiui.com",                       install:"Copy-paste",                      desc:"RTL সাপোর্ট আছে — বাংলা/আরবি layout-এর জন্য ভালো।", isNew:false, anim:false },
  { id:23, name:"Sailboat UI",        tier:"B", free:true,  react:true,  next:true,  link:"sailboatui.com",                     install:"Copy-paste",                      desc:"Clean minimal design, 150+ component।", isNew:false, anim:false },
  { id:24, name:"Kometa UI",          tier:"B", free:true,  react:true,  next:true,  link:"kometa.ui.com",                      install:"Copy-paste",                      desc:"Landing page section-এর জন্য ভালো।", isNew:false, anim:false },
  { id:25, name:"Flowrift",           tier:"B", free:true,  react:false, next:false, link:"flowrift.com",                       install:"Copy-paste",                      desc:"Beautiful landing page blocks।", isNew:false, anim:false },
  { id:26, name:"Tailus",             tier:"B", free:false, react:true,  next:true,  link:"tailus.io",                          install:"Copy-paste",                      desc:"Modern glassmorphism design।", isNew:false, anim:false },
  { id:27, name:"Tailgrids",          tier:"B", free:false, react:true,  next:true,  link:"tailgrids.com",                      install:"Copy-paste",                      desc:"500+ component & template।", isNew:false, anim:false },
  { id:28, name:"Myna UI",            tier:"B", free:true,  react:true,  next:true,  link:"mynaui.com",                         install:"Copy-paste",                      desc:"Shadcn-এর মতো copy-paste, সুন্দর icon set সহ।", isNew:false, anim:false },
  { id:29, name:"Tailwind Flex",      tier:"B", free:true,  react:false, next:false, link:"tailwindflex.com",                   install:"Copy-paste",                      desc:"Community-contributed component।", isNew:false, anim:false },
  { id:30, name:"Mamba UI",           tier:"B", free:true,  react:false, next:false, link:"mambaui.com",                        install:"Copy-paste",                      desc:"35+ section, dark mode সহ।", isNew:false, anim:false },
  { id:31, name:"LangUI",             tier:"B", free:true,  react:false, next:false, link:"langui.dev",                         install:"Copy-paste",                      desc:"AI/ChatGPT-style UI — chat interface, prompt box-এর জন্য পারফেক্ট।", isNew:false, anim:false },
  { id:32, name:"Wind UI",            tier:"B", free:true,  react:true,  next:true,  link:"wind-ui.com",                        install:"Copy-paste",                      desc:"Form ও dashboard component ভালো।", isNew:false, anim:false },
  { id:33, name:"Tail Spark",         tier:"B", free:false, react:false, next:false, link:"tailspark.co",                       install:"Copy-paste",                      desc:"200+ component, React snippet সহ।", isNew:false, anim:false },
  { id:34, name:"Tailwind UI Kit",    tier:"C", free:true,  react:true,  next:true,  link:"tailwinduikit.com",                  install:"Copy-paste",                      desc:"সীমিত component, আপডেট কম।", isNew:false, anim:false },
  { id:35, name:"Tailwind-kit",       tier:"C", free:true,  react:true,  next:true,  link:"tailwind-kit.com",                   install:"Copy-paste",                      desc:"Basic component, বড় প্রজেক্টে যথেষ্ট নয়।", isNew:false, anim:false },
  { id:36, name:"WickedBlocks",       tier:"C", free:true,  react:true,  next:true,  link:"wickedblocks.dev",                   install:"Copy-paste",                      desc:"Landing page block, copy-paste।", isNew:false, anim:false },
  { id:37, name:"Kutty",              tier:"C", free:true,  react:false, next:false, link:"kutty.netlify.app",                  install:"Copy-paste",                      desc:"কম আপডেট, Alpine.js নির্ভর।", isNew:false, anim:false },
  { id:38, name:"Windmill UI",        tier:"C", free:true,  react:true,  next:false, link:"windmillui.com",                     install:"npm install windmill-react-ui",   desc:"Dashboard-এর জন্য ভালো কিন্তু আপডেট কম।", isNew:false, anim:false },
  { id:39, name:"Tailwind Starter Kit",tier:"C",free:true,  react:true,  next:true,  link:"creative-tim.com/tailwind-starter-kit",install:"Copy-paste",                   desc:"Basic starter, নতুনদের জন্য।", isNew:false, anim:false },
  { id:40, name:"Tailblocks",         tier:"C", free:true,  react:true,  next:true,  link:"tailblocks.cc",                      install:"Copy-paste",                      desc:"Simple page block, পুরনো।", isNew:false, anim:false },
  { id:41, name:"Tailwind Toolbox",   tier:"C", free:true,  react:true,  next:true,  link:"tailwindtoolbox.com",                install:"Copy-paste",                      desc:"Template সংগ্রহ, component নয়।", isNew:false, anim:false },
  { id:42, name:"UI Layouts",         tier:"A", free:true,  react:true,  next:true,  link:"ui-layouts.com",                     install:"Copy-paste",                      desc:"Animated section, hero, text effects — অন্য কোথাও পাওয়া যায় না এমন unique design।", isNew:false, anim:true },
];

const tierLabel = { S:"🏆 S-Tier", A:"✅ A-Tier", B:"👍 B-Tier", C:"ℹ️ C-Tier" };
let activeFilter = 'all';

function buildCard(lib) {
  return `
    <div class="lib-card tier-${lib.tier}">
      <div class="card-header">
        <div class="card-name-wrap">
          <span class="card-name">${lib.name}</span>
          ${lib.isNew ? '<span class="new-badge">নতুন</span>' : ''}
          ${lib.anim ? '<span class="anim-badge">✨ Animation</span>' : ''}
        </div>
        <span class="tier-badge tb-${lib.tier}">${tierLabel[lib.tier]}</span>
      </div>
      <div class="card-desc">${lib.desc}</div>
      <div class="card-footer">
        <span class="tag ${lib.free ? 'tag-free' : 'tag-paid'}">${lib.free ? '✓ ফ্রি' : '⚡ ফ্রি+Paid'}</span>
        ${lib.react ? '<span class="tag tag-react">⚛ React</span>' : ''}
        ${lib.next ? '<span class="tag tag-next">▲ Next.js</span>' : ''}
        ${lib.install && lib.install !== 'Copy-paste' ? `<span class="tag tag-install">${lib.install}</span>` : ''}
        <a class="card-link" href="https://${lib.link}" target="_blank" rel="noopener">${lib.link} ↗</a>
      </div>
    </div>
  `;
}

function render(data) {
  const grid = document.getElementById('libGrid');
  const noResult = document.getElementById('noResult');
  const count = document.getElementById('resultCount');

  if (data.length === 0) {
    grid.innerHTML = '';
    noResult.classList.remove('hidden');
  } else {
    noResult.classList.add('hidden');
    grid.innerHTML = data.map((lib, i) => {
      const card = buildCard(lib);
      return card.replace('class="lib-card', `class="lib-card" style="animation-delay:${i * 30}ms" class="lib-card`).replace('class="lib-card" style', 'style').replace('class="lib-card', 'class="lib-card');
    }).join('');
    // re-apply animation delay properly
    grid.innerHTML = data.map((lib, i) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = buildCard(lib);
      const card = wrapper.firstElementChild;
      card.style.animationDelay = `${i * 25}ms`;
      return card.outerHTML;
    }).join('');
  }
  count.textContent = `${data.length}টি লাইব্রেরি দেখাচ্ছে`;
}

function getFiltered() {
  const q = document.getElementById('search').value.toLowerCase().trim();
  return libs.filter(lib => {
    const matchQ = !q || lib.name.toLowerCase().includes(q) || lib.desc.toLowerCase().includes(q) || lib.link.toLowerCase().includes(q);
    const matchF =
      activeFilter === 'all'  ? true :
      activeFilter === 'free' ? lib.free :
      activeFilter === 'new'  ? lib.isNew :
      activeFilter === 'anim' ? lib.anim :
      lib.tier === activeFilter;
    return matchQ && matchF;
  });
}

// Filter buttons
document.querySelectorAll('.fbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render(getFiltered());
  });
});

// Search
const searchInput = document.getElementById('search');
const clearBtn = document.getElementById('clearBtn');

searchInput.addEventListener('input', () => {
  clearBtn.classList.toggle('visible', searchInput.value.length > 0);
  render(getFiltered());
});

function clearSearch() {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  render(getFiltered());
}

// Initial render
render(libs);
