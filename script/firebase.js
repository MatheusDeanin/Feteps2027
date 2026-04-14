import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyMghZo93kMIouIJkq-4PG8ZU4FrhQdGk",
  authDomain: "feteps2027.firebaseapp.com",
  projectId: "feteps2027",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };