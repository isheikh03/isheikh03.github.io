/* =====================================================================
 *  PORTFOLIO DATA — Ibrahim Sheikh
 *  ---------------------------------------------------------------------
 *  Edit ONLY this file to update your portfolio. Everything on the page
 *  is rendered from this object.
 *
 *  Tips
 *  - Leave a string empty ("") or an array empty ([]) to hide that item.
 *    An empty array hides its whole section (e.g. testimonials: []).
 *  - Image paths are relative to index.html (e.g. "assets/images/...").
 *  - Icons:
 *      * "icon"       -> Google Material Symbols name
 *                        (https://fonts.google.com/icons) e.g. "code", "cloud"
 *      * social "icon"-> Bootstrap Icons name without "bi-"
 *                        (https://icons.getbootstrap.com) e.g. "github"
 *
 *  - {years} anywhere in a text is replaced with the years of experience,
 *    calculated from profile.careerStart (e.g. "{years}+ Years" -> "9+ Years").
 *  - {projects} is replaced with the number of projects listed below.
 *
 *  Lines marked  TODO  are placeholders / need your update.
 * ===================================================================== */

const PORTFOLIO = {
  /* ---------- SEO / page meta ---------- */
  meta: {
    title: "Ibrahim Sheikh — Senior Software Engineer",
    description: "Portfolio of Ibrahim Sheikh, Senior Software Engineer and Oracle Certified Java Professional with {years}+ years building enterprise web applications with Java, Spring Boot and Angular."
  },

  /* ---------- Profile / hero ---------- */
  profile: {
    name: "Ibrahim Sheikh",
    initials: "IS",
    title: "Senior Software Engineer",
    /* First job start (YYYY-MM). Years of experience are calculated from this
       and inserted wherever you write {years} in this file. */
    careerStart: "2017-07",
    roles: [
      "Senior Software Engineer",
      "Full-Stack Java Developer",
      "Oracle Certified Java Professional",
      "Enterprise Solutions Builder"
    ],
    tagline: "I build enterprise web applications with Java, Spring Boot and Angular — from freight-forwarding platforms to hospital management systems — with a focus on quality, maintainability and real business impact.",
    photo: "assets/images/profile.jpg",
    availability: "Open to new opportunities",   // TODO: "" to hide
    location: "Dhaka, Bangladesh",
    timezone: "Asia/Dhaka",                       // shows your local time in the hero ("" to hide)
    /* Shown in the hero code window. If empty, the first skill of each category is used. */
    stack: ["Java", "Spring Boot", "Angular", "Oracle"],
    email: "isheikh03@gmail.com",
    phone: "",                                    // TODO: add if you want it public
    resume: "",                                   // TODO: e.g. "assets/resume.pdf" (updated CV)
    floatingChips: [
      { icon: "workspace_premium", text: "{years}+ Years" },
      { icon: "verified", text: "Oracle Certified Java" }
    ]
  },

  /* ---------- Social links ---------- */
  socials: [
    { name: "GitHub",     icon: "github",     url: "https://github.com/isheikh03" },
    { name: "LinkedIn",   icon: "linkedin",   url: "https://www.linkedin.com/in/isheikh03" },
    { name: "HackerRank", icon: "hackerrank", url: "https://www.hackerrank.com/profile/isheikh03" },
    { name: "Facebook",   icon: "facebook",   url: "https://www.facebook.com/isheikh03" },
    { name: "X",          icon: "twitter-x",  url: "https://x.com/isheikh03" }
  ],

  /* ---------- Hero statistics ---------- */
  stats: [
    { value: "{years}+", label: "Years Experience" },
    { value: "{projects}+", label: "Projects Delivered" },
    { value: "3",   label: "Companies" },
    { value: "OCP", label: "Java SE Certified" }
  ],

  /* ---------- About ---------- */
  about: {
    heading: "Building reliable enterprise software since 2017",
    paragraphs: [
      "I'm Ibrahim Sheikh, a Senior Software Engineer at Innoweb Limited (Expo Group) and an Oracle Certified Professional, Java SE 6 Programmer. I'm a passionate full-stack engineer with over {years} years of professional experience in the dynamic, ever-evolving world of software development.",
      "I've built ERP systems, a hospital information system, a virtual-hospital platform and a freight-forwarding automation platform. My toolset centres on object-oriented Java, Spring Boot, Jasper Reports, relational databases (Oracle, PostgreSQL, MySQL), JavaScript and TypeScript (including Node.js), Angular and Bootstrap.",
      "My journey has been marked by continuous learning and innovation, and a deep commitment to delivering high-quality solutions, both as a team leader and as a team player."
    ],
    facts: [
      { label: "Current",       value: "Senior Software Engineer, Innoweb Ltd." },
      { label: "Location",      value: "Dhaka, Bangladesh" },
      { label: "Experience",    value: "{years}+ years (since Jul 2017)" },
      { label: "Certification", value: "Oracle Certified Professional, Java SE 6" },
      { label: "Education",     value: "Master in IT, Jahangirnagar University" },
      { label: "Languages",     value: "Bengali (native), English" }
    ],
    highlights: [
      { icon: "coffee",       title: "Java & Spring Boot",   text: "Object-oriented Java, Spring, Hibernate/JPA and RESTful APIs for robust back-ends." },
      { icon: "domain",       title: "Enterprise Systems",   text: "ERP, hospital information and freight-forwarding platforms for real businesses." },
      { icon: "web",          title: "Full-Stack Web",       text: "Angular, TypeScript, Bootstrap and Jasper Reports for complete, polished products." },
      { icon: "groups",       title: "Team Player & Leader", text: "Requirement analysis, mock-ups, product demos, mentoring and R&D on new technologies." }
    ]
  },

  /* ---------- Skills ----------
   * items can be plain strings (shown as chips)
   * or { name: "Java", level: 90 } (shown as progress bars)
   * ------------------------------------------------------------------- */
  skills: [
    { category: "Programming Languages", icon: "code",       items: ["Java", "Python (basic)", "C (basic)", "JavaScript", "TypeScript"] },
    { category: "Frameworks",            icon: "layers",     items: ["Spring", "Spring Boot", "Hibernate", "JPA", "JSF", "Thymeleaf", "Node.js", "JUnit"] },
    { category: "Web Technologies",      icon: "web",        items: ["Angular", "HTML", "CSS", "jQuery", "Bootstrap", "Ajax", "JSON", "RESTful API", "D3", "XML"] },
    { category: "Database",              icon: "database",   items: ["Oracle", "PostgreSQL", "MySQL", "SQLite", "NoSQL", "Firebase Firestore"] },
    { category: "Reporting & Build",     icon: "description",items: ["Jasper Reports", "Maven", "Tomcat", "UML"] },
    { category: "Mobile & Tools",        icon: "smartphone", items: ["Android", "Flutter", "Git", "GitHub", "GitLab", "Linux"] }
  ],
  tools: [],   // extra chips under the skill cards (optional)

  /* ---------- Experience (latest first) ---------- */
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Innoweb Limited, Expo Group",
      companyUrl: "",
      location: "Tejgaon, Dhaka",
      start: "Jul 2024",
      end: "Present",
      summary: "Developing and enhancing Shipment Online (SOL), a web platform that automates the freight-forwarding business.",
      achievements: [],                          // TODO: add your recent achievements
    },
    {
      role: "Software Development",
      company: "Innoweb Limited, Expo Group",
      companyUrl: "",
      location: "Tejgaon, Dhaka",
      start: "Mar 2022",
      end: "Jun 2024",
      summary: "Developed the Shipment Online application to automate the freight-forwarding business, and kept customer support running smoothly.",
      achievements: [
        "Developed 3 new modules for Shipment Online (SOL).",
        "Reduced existing user-support requests by 30%."
      ],
    },
    {
      role: "Software Engineer (Java Programmer)",
      company: "MySoft Limited",
      companyUrl: "",
      location: "Kawran Bazar, Dhaka",
      start: "Apr 2019",
      end: "Mar 2022",
      summary: "Worked on healthcare products: a full Hospital Information System (HIS) and MyHealthBD, the virtual hospital of Bangladesh.",
      achievements: [
        "Built features for the Hospital Information System, which covers OPD/IPD, pharmacy, pathology, radiology, accounting, HR/payroll and more.",
        "Contributed to MyHealthBD, which offers online appointments, telemedicine, EMR, a patient portal and home sample collection."
      ],
    },
    {
      role: "Java Programmer",
      company: "CTrends Software & Services Ltd.",
      companyUrl: "https://www.ctrends-software.com",
      location: "Gulshan, Dhaka",
      start: "Jul 2017",
      end: "Mar 2019",
      summary: "Programmer on CTrends EBS, the company's ERP product.",
      achievements: [
        "Gained thorough knowledge of ERP systems and gathered client requirements.",
        "Designed mock-ups and prototypes and verified them with the product owner.",
        "Built user interfaces, programmed the back-end and wrote database scripts.",
        "Did R&D on new technologies, managed the team and prepared product demos."
      ],
    }
  ],

  /* ---------- Projects ----------
   * category : used for the filter chips (auto-generated)
   * links    : live    -> opens the live site in a new tab
   *            details -> external case-study / details page ("" to hide)
   *            source  -> repository link ("" to hide)
   * steps    : shown in the details modal as an image slider + stepper.
   *            Each step = { title, image, description }
   *            If a step has no image, the project thumbnail is used.
   *            TODO: add real screenshots per step (e.g. assets/images/projects/sol/step-1.png)
   * ------------------------------------------------------------------- */
  projects: [
    {
      id: "shipment-online",
      title: "Shipment Online (SOL)",
      category: "Enterprise / ERP",
      featured: true,
      thumbnail: "assets/images/projects/shipment-online.png",
      shortDescription: "A web application that automates the freight-forwarding business, from order management to costing and partner collaboration.",
      overview: "Freight forwarders serve customers across trade lanes, modes and industries, where accurate, timely documentation is critical and margins are easily eroded by manual mistakes. Shipment Online gives them a platform to collaborate across partners and grow into new trade lanes and modes. It delivers flexible, agile order management with fine-grained costing.",
      role: "Analyst → Senior Software Engineer",
      duration: "2022 – Present",
      client: "Innoweb Limited, Expo Group",
      tech: ["Java", "Spring Boot", "Jasper Reports", "Oracle-DB"],          // TODO: verify
      features: [
        "Import / export operation management",
        "Ocean & air booking dashboards",
        "Partner and finance management",
        "Shipment tracking and reporting"
      ],
      links: { live: "http://www.shipmentonline.co/efl/grp1/users/userLogin.html", details: "", source: "" },
      steps: [
        { title: "Dashboard",                image: "", description: "A live overview of ocean and air bookings, with quick access to every operation module." },
        { title: "Order Management",         image: "", description: "Create and manage master files and general jobs, and open or close shipment files, with flexible, agile order handling." },
        { title: "Partners & Finance",       image: "", description: "Manage import partners, finance and fine-grained costing to protect the margin on every shipment." },
        { title: "Tracking & Reports",       image: "", description: "Track shipments end to end and generate finance and operational reports." }
      ]
    },
    {
      id: "hospital-information-system",
      title: "Hospital Information System",
      category: "Enterprise / ERP",
      featured: true,
      thumbnail: "assets/images/projects/hospital-information-system.png",
      shortDescription: "A complete, customisable ERP for managing all hospital operations.",
      overview: "Hospital Information System (HIS) is a customisable, comprehensive and integrated system designed to manage all hospital operations.",
      role: "Java Programmer",
      duration: "2019 – 2022",
      client: "MySoft Limited",
      tech: ["Java", "Spring Boot", "Microservice", "Angular Framework", "Jasper Report"],                            // TODO: add stack
      features: [
        "Outpatient & inpatient management",
        "Pharmacy, pathology & radiology",
        "Accounting, HR/payroll & inventory",
        "Doctor & patient portals",
        "Lab machine, biometric & HL7/PACS integration",
        "Business intelligence"
      ],
      links: { live: "", details: "", source: "" },
      steps: [
        { title: "Patient Management",  image: "", description: "Outpatient and inpatient management, online appointments and secured messaging." },
        { title: "Clinical Services",   image: "", description: "Pharmacy, pathology, radiology, blood bank and dietary modules." },
        { title: "Back Office",         image: "", description: "Accounting, HR/payroll, inventory and feedback management." },
        { title: "Integrations & BI",   image: "", description: "Lab machine and biometric integration, HL7/integrated PACS, and business intelligence." }
      ]
    },
    {
      id: "myhealthbd",
      title: "MyHealthBD",
      category: "Healthcare",
      featured: true,
      thumbnail: "assets/images/projects/myhealthbd/home.jpg",
      shortDescription: "Virtual Hospital of Bangladesh: a cloud healthcare platform for appointments, e-prescriptions, patient records and telemedicine.",
      overview: "MyHealthBD is a one-stop healthcare platform for Bangladesh, built to give an enhanced healthcare ecosystem. It connects patients, doctors, hospitals and diagnostic centres. Most people live in rural and suburban areas while most hospitals and renowned doctors are in the cities, so MyHealthBD acts as a digital healthcare database and a bridge between them. Patients get electronic health records through the patient portal, book doctors online and use telemedicine. Doctors get a cloud practice-management system for appointments, e-prescriptions and patient records.",
      role: "Java Programmer",
      duration: "2019 – 2022",
      client: "MySoft Limited",
      tech: ["Java", "Spring Boot", "Angular Framework", "Jasper Report"],   
      features: [
        "Doctor appointment management",
        "E-prescription system",
        "Centralised patient record management",
        "Online appointments at partner hospitals & diagnostic centres",
        "Telemedicine (video consultation) & teleradiology",
        "Patient portal with electronic health records",
        "Ambulance service & home sample collection",
        "Online payment"
      ],
      links: { live: "https://myhealthbd.com", details: "", source: "" },
      steps: [
        { title: "One-Stop Healthcare Platform", image: "assets/images/projects/myhealthbd/home.jpg",           description: "A cloud-based platform where doctors run their practice and patients reach doctors, hospitals and diagnostic services online." },
        { title: "E-Prescription & OPD",         image: "assets/images/projects/myhealthbd/e-prescription.jpg", description: "Doctors work through the OPD queue and record vitals, chief complaints, history, examinations and diagnoses. They write the Rx with dose and duration, view past consultations, and start a video consultation in one click." },
        { title: "Hospitals & Diagnostic Centres", image: "assets/images/projects/myhealthbd/hospitals.jpg",    description: "Patients choose from partner hospitals and diagnostic centres, such as Lubana General Hospital, Comfort Diagnostic Center and LABAID, and book a doctor's appointment online." },
        { title: "Virtual Hospital Ecosystem",   image: "assets/images/projects/myhealthbd/about.jpg",          description: "A digital healthcare database. The patient portal holds electronic health records, alongside telemedicine, teleradiology, ambulance service and home sample collection, connecting rural patients with city doctors." }
      ]
    },
    {
      id: "wallet-history",
      title: "Wallet-History",
      category: "Web App",
      featured: true,
      thumbnail: "assets/images/projects/wallet-history/cover.jpg",
      shortDescription: "An offline-first personal accounting app that tracks income, expenses, payables and receivables, installable as a PWA.",
      overview: "Wallet-History is personal accounting, simplified. It records credit and debit transactions by custom record type, tracks money you owe and are owed with full payment history, and shows period-based dashboards. It works offline and syncs automatically when you're back online. It also supports English and Bangla, Taka and Dollar, and light and dark themes.",
      role: "",                                  // TODO: e.g. "Designer & Developer"
      duration: "",
      client: "Personal project",
      tech: ["React", "Material UI", "Firebase Auth", "Cloud Firestore", "i18next", "PWA", "Vite"],
      features: [
        "Credit / debit dashboard with charts and trends",
        "Payable & receivable tracking with payment history",
        "Custom record types (Food, Transport, Salary…)",
        "Offline-first with automatic cloud sync",
        "Birthday reminders & to-do lists",
        "Card holder and bank / MFS account book",
        "English & Bangla, BDT & USD, light & dark themes",
        "Installable PWA for mobile and desktop"
      ],
      links: { live: "https://wallet-history-a2z.web.app/login", details: "", source: "" },
      steps: [
        { title: "Log In",                 image: "assets/images/projects/wallet-history/login.jpg",    description: "A clean, mobile-first login. Each user's data is private to their own account." },
        { title: "Create Account",         image: "assets/images/projects/wallet-history/register.jpg", description: "Sign up with an email and password (6–8 letters or numbers), with inline validation." },
        { title: "Dashboard",              image: "", description: "See credit, debit and balance for this month, last month, this year or a custom date range, with credit-vs-debit charts and debit by record type." },
        { title: "Transactions",           image: "", description: "Add credit or debit transactions under your own record types, with a date, amount and note." },
        { title: "Payable & Receivable",   image: "", description: "Track what you owe and what you're owed per person. Add partial payments and see the remaining balance and full history." },
        { title: "Personal Organiser",     image: "", description: "Birthday reminders with countdowns, to-do lists, and a secure book of cards and bank / MFS accounts." },
        { title: "Offline & Settings",     image: "", description: "Keep working offline and changes sync once you're back online. Switch language, currency and theme." }
      ]
    },
    {
      id: "alumni-portal",
      title: "Alumni Portal",
      category: "Web App",
      featured: true,
      thumbnail: "assets/images/projects/alumni-portal/cover.jpg",
      shortDescription: "An alumni registration and payment portal for North Kotalipara Ram Mohon High School (est. 1927).",
      overview: "A portal for the school's alumni association. Former students register, pay the registration fee for themselves and their guests by bank, bKash, Nagad or Rocket, share batch events, and browse the alumni album. Admins track registrations and payments from a dashboard.",
      role: "",                                  // TODO
      duration: "",
      client: "UKRM High School Alumni Association",
      tech: ["React", "Firebase Auth", "Cloud Firestore", "Cloudinary", "Cloudflare Workers", "jsPDF", "PWA", "Vite"],
      features: [
        "Alumni registration with guest count",
        "Pay now or pay later: bank / bKash / Nagad / Rocket with TrxID & slip upload",
        "Automatic fee calculation (self + guests)",
        "Batch events feed",
        "Registered alumni album",
        "Registration & payment dashboard",
        "Real-time notifications",
        "Role-based access (user / admin / super admin)",
        "Installable PWA"
      ],
      links: { live: "https://alumni-app.gsms2k23.workers.dev/", details: "", source: "" },
      steps: [
        { title: "Register",          image: "assets/images/projects/alumni-portal/registration.jpg", description: "Alumni register with their phone number, which is also their first password. They add their name, gender, blood group, T-shirt size, SSC batch (1927 onwards) and a profile photo. A video guide and an Install App button are built in." },
        { title: "Pay the Fee",       image: "assets/images/projects/alumni-portal/payment.jpg",      description: "Choose Pay Now or Pay Later. The payable amount updates automatically with the number of guests. Pay by bank, bKash, Nagad or Rocket, then enter the account number and TrxID and upload the payment slip." },
        { title: "Sign In",           image: "assets/images/projects/alumni-portal/login.jpg",        description: "Registered alumni sign in with their phone number and password to reach the portal." },
        { title: "Events",            image: "", description: "Share and discover what your batch is up to." },
        { title: "Alumni Album",      image: "", description: "Browse every registered alumnus in one album." },
        { title: "Admin Dashboard",   image: "", description: "Admins see a registration and payment overview at a glance, and manage users by role." }
      ]
    },
    {
      id: "ctrends-ebs",
      title: "CTrends EBS",
      category: "Enterprise / ERP",
      featured: false,
      thumbnail: "assets/images/projects/ctrends-ebs.jpg",
      shortDescription: "CTrends Enterprise Business Solution, an ERP product of CTrends Software & Services Ltd.",
      overview: "I worked as a programmer on CTrends EBS, the ERP product of CTrends Software and Services Ltd. My work covered requirement analysis, UI/UX mock-ups, back-end programming and database scripting.",
      role: "Java Programmer",
      duration: "2017 – 2019",
      client: "CTrends Software & Services Ltd.",
      tech: ["Java", "Oracle"],                  // TODO: verify
      features: [
        "ERP modules for enterprise business",
        "Client-driven requirements & prototypes",
        "Modern UI with database-backed back-end"
      ],
      links: { live: "https://www.ctrends-software.com/products", details: "", source: "" },
      steps: []
    },
    {
      id: "madrasa-fees",
      title: "Madrasa Fees",
      category: "Web App",
      featured: false,
      thumbnail: "assets/images/projects/madrasa-fees.png",
      shortDescription: "A madrasa student management system for admission, attendance, fees and reporting.",
      overview: "An online platform for managing madrasa activities, such as online admission, student attendance, student fees, email notifications and reporting.",
      role: "",                                  // TODO
      duration: "",
      client: "",
      tech: [],                                  // TODO
      features: [
        "Online admission management",
        "Student attendance management",
        "Student fee management",
        "Email notifications & reporting"
      ],
      links: { live: "https://madrasafees.com", details: "", source: "" },
      steps: [
        { title: "Online Admission", image: "", description: "Students apply online and administrators manage admissions in one place." },
        { title: "Attendance",       image: "", description: "Daily student attendance tracking." },
        { title: "Fee Management",   image: "", description: "Collect and track student fees, and send email notifications." },
        { title: "Reporting",        image: "", description: "Reports on admissions, attendance and fee collection." }
      ]
    },
    {
      id: "io-chat",
      title: "IO Chat",
      category: "Web App",
      featured: false,
      thumbnail: "assets/images/projects/io-chat.png",
      shortDescription: "A social chat application to connect with friends and family.",
      overview: "Three friends and I built a chat application called IO Chat. It uses Firebase Firestore and Node.js, is styled with Bootstrap 4, and runs on GitHub Pages.",
      role: "Co-creator (team of 3)",
      duration: "",
      client: "Personal project",
      tech: ["Firebase Firestore", "Node.js", "Bootstrap 4", "JavaScript"],
      features: [
        "Real-time messaging with Firestore",
        "Hosted on GitHub Pages"
      ],
      links: { live: "https://isheikh03.github.io/gossiping_web", details: "", source: "https://github.com/isheikh03/gossiping_web" },
      steps: []
    },
    {
      id: "advertisement-system",
      title: "Advertisement System",
      category: "Web App",
      featured: false,
      thumbnail: "assets/images/projects/advertisement-system.svg",   // TODO: screenshot
      shortDescription: "An online advertisement web application built with Java and Spring.",
      overview: "An online advertisement web application, built as a course group project with Java, the Spring Framework, Hibernate, MySQL and other web technologies.",
      role: "Course group project",
      duration: "",
      client: "",
      tech: ["Java", "Spring", "Hibernate", "MySQL"],
      features: [],
      links: { live: "", details: "", source: "https://github.com/isheikh03/Advertisement_System" },
      steps: []
    },
    {
      id: "tour-mate",
      title: "Tour Mate",
      category: "Android App",
      featured: false,
      thumbnail: "assets/images/projects/tour-mate.svg",              // TODO: screenshot
      shortDescription: "A tour management app for travel teams, with events, expenses, weather and maps.",
      overview: "A tour management app for tour teams, with events, moment sharing, financial calculations, weather reports, nearby locations on Google Maps, team messaging and more.",
      role: "",
      duration: "",
      client: "",
      tech: ["Android", "Java", "Google Maps"],
      features: [
        "Tour events & moment sharing",
        "Team financial calculation",
        "Weather report",
        "Nearby locations on Google Maps",
        "Team messaging"
      ],
      links: { live: "", details: "", source: "" },
      steps: [
        { title: "Events & Moments", image: "", description: "Create tour events and share moments with the team." },
        { title: "Expenses",         image: "", description: "Track and split the team's tour expenses." },
        { title: "Weather & Map",    image: "", description: "Weather reports and nearby places on Google Maps." },
        { title: "Team Messaging",   image: "", description: "Keep the whole team connected during the tour." }
      ]
    },
    {
      id: "mem-app",
      title: "MEM: Marketing Executive Monitoring",
      category: "Android App",
      featured: false,
      thumbnail: "assets/images/projects/mem-app.svg",                // TODO: screenshot
      shortDescription: "An Android app for SP Trading House that monitors marketing executives' tasks and reports.",
      overview: "A marketing executive monitoring app for SP Trading House. Among other features, it makes it easy to submit tasks and view reports.",
      role: "",
      duration: "",
      client: "SP Trading House",
      tech: ["Android", "Java"],
      features: [
        "Task submission",
        "Report viewing"
      ],
      links: { live: "", details: "", source: "" },
      steps: []
    }
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: "Master in Information Technology",
      institution: "Institute of Information Technology, Jahangirnagar University",
      start: "2020",
      end: "2022",
      details: ""
    },
    {
      degree: "Postgraduate Diploma in Enterprise Systems Analysis & Design (J2EE)",
      institution: "The Computers Limited, IDB-BISEW IT Scholarship Project",
      start: "2016",
      end: "2017",
      details: ""
    },
    {
      degree: "B.Sc. (Honours) in Chemistry",
      institution: "Govt. Titumir College, Dhaka",
      start: "2009",
      end: "2013",
      details: ""
    }
  ],

  /* ---------- Certifications ---------- */
  /* { name, issuer, year, credentialId, url, stars, note }
     url   -> adds a "Verify" link
     stars -> shows a star rating (e.g. HackerRank badge level, out of 5)
     note  -> small extra line (e.g. "21 challenges solved") */
  certifications: [
    { name: "Mastering DevOps: From Fundamentals to Advanced Practices", issuer: "Ostad", year: "", credentialId: "C40507", url: "https://ostad.app/share/certificate/c40507-ibrahim-sheikh" },   // TODO: add year
    { name: "Oracle Certified Professional, Java SE 6 Programmer", issuer: "Oracle University", year: "2017", credentialId: "OC1713195", url: "" },
    { name: "Java Badge", issuer: "HackerRank", year: "", stars: 4, note: "21 Java challenges solved", url: "https://www.hackerrank.com/profile/isheikh03" },
    { name: "Mobile Application Development – Android", issuer: "BASIS Institute of Technology & Management (BITM)", year: "2018", url: "" }
  ],

  /* ---------- Testimonials ---------- */
  testimonials: [],   // TODO: add e.g. LinkedIn recommendations { name, role, photo, quote }

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let's work together",
    text: "I'm available for work and open to any ideas for collaboration. Send me a message and I'll get back to you.",
    formEndpoint: ""   // optional, e.g. https://formspree.io/f/xxxx
  },

  /* ---------- Footer ---------- */
  footer: {
    text: "© {year} Ibrahim Sheikh. All rights reserved."
  }
};
