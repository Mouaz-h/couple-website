import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove, update } from 'firebase/database';

// Demo / Starter Firebase project config using real-time database
// (Users can replace this with their own config if desired)
const firebaseConfig = {
  databaseURL: "https://couple-website-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, push, remove, update };
