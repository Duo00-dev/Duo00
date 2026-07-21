// Course catalog and multi-course enrollment helpers.
//
// The remote section endpoint only carries content for es/de/fr/ja, so every
// other course here is served by buildSectionData() below. Loaded as a plain
// script before learn.js, matching the rest of the codebase.

const COURSE_CATALOG = {
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  it: "Italian",
  ko: "Korean",
  zh: "Chinese",
  pt: "Portuguese",
  ru: "Russian",
  ar: "Arabic",
  hi: "Hindi",
  nl: "Dutch",
  tr: "Turkish",
  pl: "Polish",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  el: "Greek",
  he: "Hebrew",
  cs: "Czech",
  uk: "Ukrainian",
  ro: "Romanian",
  hu: "Hungarian",
  vi: "Vietnamese",
  id: "Indonesian",
  cy: "Welsh",
  ga: "Irish",
  gd: "Scottish Gaelic",
  la: "Latin",
  eo: "Esperanto",
  sw: "Swahili",
  ht: "Haitian Creole",
  yi: "Yiddish",
  nv: "Navajo",
  haw: "Hawaiian",
  zu: "Zulu",
  tl: "Tagalog",
  ca: "Catalan",
  tlh: "Klingon",
  hv: "High Valyrian",
  chess: "Chess"
};

const DEFAULT_COURSE = "es";

// Courses the remote endpoint actually has content for.
const REMOTE_COURSES = ["es", "de", "fr", "ja"];

const isKnownCourse = (code) => Object.prototype.hasOwnProperty.call(COURSE_CATALOG, code);

const getCourseName = (code) => COURSE_CATALOG[code] || "Languages";

const getAllCourseCodes = () => Object.keys(COURSE_CATALOG);

// A user is enrolled in many courses; learnLang points at the active one.
const getEnrolledCourses = (userData) => {
  if (userData && Array.isArray(userData.courses) && userData.courses.length) {
    return userData.courses.filter(isKnownCourse);
  }
  if (userData && isKnownCourse(userData.learnLang)) {
    return [userData.learnLang];
  }
  return [DEFAULT_COURSE];
};

const getActiveCourse = (userData) => {
  if (userData && isKnownCourse(userData.learnLang)) {
    return userData.learnLang;
  }
  return getEnrolledCourses(userData)[0];
};

// ---------------------------------------------------------------------------
// Locally generated course content
// ---------------------------------------------------------------------------

const LANGUAGE_CHAPTERS = [
  "Form basic sentences",
  "Greet people",
  "Order food",
  "Describe your family",
  "Talk about work",
  "Ask for directions",
  "Describe your day",
  "Make plans",
  "Talk about the weather"
];

const LANGUAGE_UNITS = [
  "Use basic phrases, greet people",
  "Order food, describe places",
  "Describe what people do, make comparisons",
  "Talk about the past, tell stories",
  "Discuss travel, book a room",
  "Share opinions, give advice",
  "Talk about the future, make plans"
];

const CHESS_CHAPTERS = [
  "Move the pawns",
  "Move the knight",
  "Move the bishop",
  "Move the rook",
  "Move the queen",
  "Move the king",
  "Capture a piece",
  "Escape a check",
  "Deliver checkmate"
];

const CHESS_UNITS = [
  "Learn how the pieces move",
  "Control the centre, develop pieces",
  "Spot forks, pins and skewers",
  "Castle early, keep the king safe",
  "Trade pieces, count material",
  "Convert simple endgames",
  "Play a full game"
];

// Mirrors the shape returned by the remote section-details endpoint.
const buildSectionData = (code, sectionId) => {
  const isChess = code === "chess";
  const chapters = isChess ? CHESS_CHAPTERS : LANGUAGE_CHAPTERS;
  const unitDescriptions = isChess ? CHESS_UNITS : LANGUAGE_UNITS;

  const units = unitDescriptions.map((description, index) => ({
    name: `Unit ${index + 1}`,
    description: description,
    chapters: chapters.slice()
  }));

  return {
    section: {
      name: `Section ${sectionId}: Rookie`,
      totalChaptersInUnit: chapters.length,
      totalUnitsInSection: units.length,
      units: units
    }
  };
};

const hasRemoteContent = (code) => REMOTE_COURSES.includes(code);
