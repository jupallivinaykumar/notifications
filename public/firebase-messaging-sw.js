importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDimYwGCNdw9VfA5XSO6kQ9yn7sDWRezpg",
  authDomain: "notifictions-88846.firebaseapp.com",
  projectId: "notifictions-88846",
  storageBucket: "notifictions-88846.firebasestorage.app",
  messagingSenderId: "817050390176",
  appId: "1:817050390176:web:8758186afa4a9a36a1c3c5",
  measurementId: "G-J0BR8CT3F8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background Message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "/logo192.png"
    }
  );
});