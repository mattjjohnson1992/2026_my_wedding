import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyA2IFhPdWaLkXVavZYygSmFrZdrwVg9XIg',
  authDomain: 'my-wedding-3b5d9.firebaseapp.com',
  projectId: 'my-wedding-3b5d9',
  storageBucket: 'my-wedding-3b5d9.firebasestorage.app',
  messagingSenderId: '933039073669',
  appId: '1:933039073669:web:962e324643180adac23cec',
  measurementId: 'G-LNSSFJTGXH'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Listen for response submission after DOM loaded
// Expose Firestore helpers to global window for index.html
window.db = db;
window.collection = collection;
window.addDoc = addDoc;

window.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitResponse');
  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      // Delay to allow existing logic to update allResponses array
      setTimeout(async () => {
        try {
          if (typeof allResponses !== 'undefined' && allResponses.length > 0) {
            const latest = allResponses[allResponses.length - 1];
            await addDoc(collection(db, 'RSVPs'), latest);
          }
        } catch (error) {
          console.error('Error saving to Firestore', error);
        }
      }, 1200);
    });
  }
});
