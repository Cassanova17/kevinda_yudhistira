// ========== Navigation Toggle ==========
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");
mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// ========== Intersection Observer (Reveal) ==========
const reveals = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => observer.observe(el));

// ========== Case Study Data ==========
const caseStudies = {
  taekwondo: {
    title: "Taekwondo Event Registration System",
    subtitle: "End-to-end registration platform for martial arts events.",
    sections: [
      {
        heading: "Overview",
        content:
          "Built a full-featured event registration system to replace a manual paper-based process. The platform handled participant registration, payment tracking, and automated confirmation for events with over 1,000 participants.",
      },
      {
        heading: "Problem",
        content:
          "The event organizer previously managed registrations manually — paper forms, manual payment verification, and spreadsheet-based participant lists. This led to data entry errors, duplicate registrations, and a heavy administrative burden.",
      },
      {
        heading: "Solution",
        content:
          "Developed a Laravel + MySQL web application with a clean admin dashboard. Implemented automated payment tracking, unique registration codes, and email confirmations. The system validated participant data and provided real-time registration status.",
      },
      {
        heading: "Architecture & Tech Stack",
        content:
          "Laravel 10, MySQL, Blade templating, RESTful API for internal use, Git version control. Deployed on shared hosting with zero downtime during the event.",
      },
      {
        heading: "Key Features",
        content:
          "• Participant registration form with validation\n• Payment status tracking & automated confirmation\n• Admin dashboard to manage participants\n• Export participant data to CSV\n• Event capacity management",
      },
      {
        heading: "Result",
        content:
          "Successfully used by 1,000+ participants. The event ran smoothly with zero system downtime. Payment verification time reduced from hours to minutes. The organizer reported a 70% reduction in administrative workload.",
      },
      {
        heading: "Lessons Learned",
        content:
          "Scalability planning is critical — I optimized database queries and implemented caching to handle peak loads. Also, user feedback during development helped refine the registration flow.",
      },
      {
        heading: "Future Improvements",
        content:
          "Add QR code check-in, integrate with payment gateways, and build a mobile companion app for on-site management.",
      },
    ],
    tech: ["Laravel", "MySQL", "Blade", "REST API"],
  },
  dojang: {
    title: "Dojang Management Mobile Application",
    subtitle:
      "Cross-platform mobile app for Taekwondo dojang internal management.",
    sections: [
      {
        heading: "Overview",
        content:
          "Developed a Flutter mobile app for managing athletes, attendance, and daily dojang operations. The app syncs data in real-time using Supabase, enabling trainers and admins to track athlete progress.",
      },
      {
        heading: "Problem",
        content:
          "The dojang tracked attendance and athlete data manually using paper logs. There was no centralized system for trainers to view athlete history or communicate updates.",
      },
      {
        heading: "Solution",
        content:
          "Built a cross-platform app (iOS & Android) with Flutter and Supabase as the backend. Implemented role-based access: admins manage all data, trainers view and update attendance, athletes view their own profiles.",
      },
      {
        heading: "Architecture & Tech Stack",
        content:
          "Flutter, Supabase (PostgreSQL), real-time subscriptions, authentication with email/password. State management with Provider.",
      },
      {
        heading: "Key Features",
        content:
          "• Real-time attendance marking\n• Athlete profile management\n• Role-based access (Admin, Trainer, Athlete)\n• Training session history\n• Push notifications for schedule updates",
      },
      {
        heading: "Result",
        content:
          "The app is currently used by the dojang for daily operations. Attendance tracking time reduced by 80%. Data is now centralized and accessible from any device.",
      },
      {
        heading: "Lessons Learned",
        content:
          "Real-time sync with Supabase is powerful but requires careful handling of offline scenarios. I implemented optimistic updates to improve UX.",
      },
      {
        heading: "Future Improvements",
        content:
          "Add performance analytics, training program management, and integration with wearable devices.",
      },
    ],
    tech: ["Flutter", "Supabase", "PostgreSQL", "Dart"],
  },
};

// ========== Open Modal ==========
function openCaseStudy(id) {
  const study = caseStudies[id];
  if (!study) return;

  const modal = document.getElementById("caseModal");
  const body = document.getElementById("modalBody");

  let html = `
                <h2>${study.title}</h2>
                <div class="modal-sub">${study.subtitle}</div>
                <div class="modal-tech">
                    ${study.tech.map((t) => `<span>${t}</span>`).join("")}
                </div>
            `;

  study.sections.forEach((s) => {
    const contentFormatted = s.content
      .replace(/\n/g, "<br>")
      .replace(/• /g, "<br>• ");
    html += `
                    <div class="modal-section">
                        <h4>${s.heading}</h4>
                        <p>${contentFormatted}</p>
                    </div>
                `;
  });

  // Screenshot placeholders
  // === Screenshots dengan gambar asli ===
  // Tentukan path gambar berdasarkan project ID
  let screenshots = [];
  if (id === "taekwondo") {
    screenshots = [
      "assets/images/regis-web2.jpg",
      "assets/images/regis-web3.jpg",
    ];
  } else if (id === "dojang") {
    screenshots = [
      "assets/images/mobile-app2.jpg",
      "assets/images/mobile-app3.jpg",
    ];
  }

  // Buat HTML untuk screenshot
  let screenshotHtml = `
    <div class="modal-section">
        <h4>Screenshots</h4>
        <div class="modal-screenshots">
`;

  // Loop untuk menampilkan screenshot
  screenshots.forEach((src, index) => {
    screenshotHtml += `
        <img 
            src="${src}" 
            alt="Screenshot ${index + 1}" 
            loading="lazy"
            class="modal-screenshot-img"
            onclick="openLightbox('${src}')"
        />
    `;
  });

  screenshotHtml += `
        </div>
    </div>
`;

  // Tambahkan ke html
  html += screenshotHtml;

  body.innerHTML = html;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ========== Close Modal ==========
function closeModal() {
  document.getElementById("caseModal").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("caseModal").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// ========== Download CV (placeholder) ==========
document.getElementById("downloadCV").addEventListener("click", function (e) {
  e.preventDefault();
  const link = document.createElement("a");
  link.href = "assets/cv/CV_Kevinda_Yudhistira.pdf"; // path file CV
  link.download = "Kevinda_Yudhistira_CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// ========== Smooth nav scroll (prevent default anchor jumps) ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

console.log("🚀 Kevinda Yudhistira · Portfolio ready");
