// Mirrors course enrollment changes from sessionStorage to Firestore, so a
// user's courses survive logout. learn.js fires "courses-changed" after it
// writes to sessionStorage.

import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { app } from "./firebaseConfig.js";

const db = getFirestore(app);

document.addEventListener("courses-changed", async () => {
  const userData = JSON.parse(sessionStorage.getItem("user-info"));
  if (!userData || !userData.userId) { return }

  try {
    await updateDoc(doc(db, 'UsersAuthList', userData.userId), {
      courses: userData.courses,
      learnLang: userData.learnLang
    });
  } catch (error) {
    // A failed sync still leaves the session copy correct.
    console.error("Could not save course changes:", error);
  }
});
