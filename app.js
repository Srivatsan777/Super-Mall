// Import the necessary Firebase modules from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    query, 
    where, 
    getDocs,
    updateDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWFVu75VS-kuhG7HVk_5Z4FwVQoi4zw1o",
    authDomain: "super-mall-web-applicati-ed295.firebaseapp.com",
    databaseURL: "https://super-mall-web-applicati-ed295-default-rtdb.firebaseio.com",
    projectId: "super-mall-web-applicati-ed295",
    storageBucket: "super-mall-web-applicati-ed295.appspot.com",
    messagingSenderId: "915871527411",
    appId: "1:915871527411:web:d1869d7ee5a6a5629ee286",
    measurementId: "G-XVB79KK70L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const adminCheckbox = document.getElementById('admin-checkbox');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const adminSection = document.getElementById('admin-section');
const userSection = document.getElementById('user-section');

// Helper function to toggle visibility of sections
const toggleSections = (showAuth, showAdmin, showUser) => {
    authSection.style.display = showAuth ? 'block' : 'none';
    adminSection.style.display = showAdmin ? 'block' : 'none';
    userSection.style.display = showUser ? 'block' : 'none';
};

// Check authentication state on page load
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        console.log("User is authenticated:", user);
        // Call the function to add shop details here if needed
    } else {
        // User is signed out
        console.log("User is not authenticated.");
    }
});



// Login button event listener
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        toggleSections(false, adminCheckbox.checked, !adminCheckbox.checked);
    } catch (error) {
        console.error("Error logging in:", error);
        alert(error.message);
    }
});

// Register button event listener
registerBtn.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
    } catch (error) {
        console.error("Error registering:", error);
        alert(error.message);
    }
});

// Logout button event listener
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        toggleSections(true, false, false);
    } catch (error) {
        console.error("Error signing out:", error);
        alert(error.message);
    }
});

// Admin checkbox event listener
adminCheckbox.addEventListener('change', () => {
    const isAdmin = adminCheckbox.checked;
    toggleSections(false, isAdmin, !isAdmin);
});
document.getElementById('create-shop-btn').addEventListener('click', async () => {
    const shopName = prompt("Enter shop name:");
    const shopDetails = prompt("Enter shop details:");

    if (shopName && shopDetails) {
        try {
            const docRef = await addDoc(collection(db, "shops"), {
                name: shopName,
                details: shopDetails
            });
            alert("Shop created successfully!");
        } catch (error) {
            console.error("Error creating shop:", error);
            alert(error.message);
        }
    } else {
        alert("Shop name and details are required.");
    }
});

document.getElementById('manage-shop-btn').addEventListener('click', async () => {
    const querySnapshot = await getDocs(collection(db, "shops"));
    let shopsList = "";
    querySnapshot.forEach((doc) => {
        shopsList += `${doc.id}: ${doc.data().name}\n`;
    });
    alert(shopsList || "No shops available.");
});

document.getElementById('manage-offer-btn').addEventListener('click', async () => {
    const offerName = prompt("Enter offer name:");
    const offerDetails = prompt("Enter offer details:");

    if (offerName && offerDetails) {
        try {
            const docRef = await addDoc(collection(db, "offers"), {
                name: offerName,
                details: offerDetails,
                createdAt: new Date()
            });
            alert("Offer created successfully!");
        } catch (error) {
            console.error("Error creating offer:", error);
            alert(error.message);
        }
    } else {
        alert("Offer name and details are required.");
    }
});


document.getElementById('manage-category-btn').addEventListener('click', async () => {
    const categoryName = prompt("Enter category name:");
    const categoryDetails = prompt("Enter category details:");

    if (categoryName && categoryDetails) {
        try {
            const docRef = await addDoc(collection(db, "categories"), {
                name: categoryName,
                details: categoryDetails,
                createdAt: new Date()
            });
            alert("Category created successfully!");
        } catch (error) {
            console.error("Error creating category:", error);
            alert(error.message);
        }
    } else {
        alert("Category name and details are required.");
    }
});


// Here you can add more functionalities for each button in the admin and user sections
document.getElementById('category-wise-btn').addEventListener('click', async () => {
    // Logic to show category-wise details
});

document.getElementById('list-shop-btn').addEventListener('click', async () => {
    const querySnapshot = await getDocs(collection(db, "shops"));
    let shopsList = "";
    querySnapshot.forEach((doc) => {
        shopsList += `${doc.id}: ${doc.data().name}\n`;
    });
    alert(shopsList || "No shops available.");
});

document.getElementById('list-offer-btn').addEventListener('click', async () => {
    // Logic to list offer products
});

document.getElementById('compare-products-btn').addEventListener('click', async () => {
    const productId1 = prompt("Enter first product ID:");
    const productId2 = prompt("Enter second product ID:");
    
    // Fetch and compare logic
});

document.getElementById('filter-btn').addEventListener('click', async () => {
    const filterCriteria = prompt("Enter filter criteria (e.g., category):");
    // Logic to filter based on criteria
});

document.getElementById('shop-offers-btn').addEventListener('click', async () => {
    // Logic to display shop-wise offers
});

document.getElementById('floor-details-btn').addEventListener('click', async () => {
    // Logic to show floor-wise details
});

document.getElementById('view-shop-details-btn').addEventListener('click', async () => {
    const shopId = prompt("Enter shop ID:");
    const docRef = doc(db, "shops", shopId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        alert(`Shop Name: ${docSnap.data().name}\nDetails: ${docSnap.data().details}`);
    } else {
        alert("No such shop!");
    }
});
