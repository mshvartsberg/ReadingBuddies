console.log("hey");
// const firebaseConfig = {
//     apiKey: "...",
//     authDomain: "...",
//     projectId: "...",
//     storageBucket: "...",
//     messagingSenderId: "...",
//     appId: "...",
//     measurementId: "...",
//     databaseURL: "..."
// };

const firebaseConfig = {
    apiKey: "AIzaSyBYh0agqK9gBAOIGg7atIbwuZen-xlVJiQ",
    authDomain: "readingbuddies-27591.firebaseapp.com",
    projectId: "readingbuddies-27591",
    storageBucket: "readingbuddies-27591.appspot.com",
    messagingSenderId: "190798231029",
    appId: "1:190798231029:web:542382995913803b931cbc",
    measurementId: "G-LH4BGZH7C6",
    databaseURL: "https://readingbuddies-27591-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);


const dbRef = firebase.database().ref();
const recRef = dbRef.child('Recommendations');
const weeksRef = dbRef.child('weeks');
const requestsRef = dbRef.child('Requests');

var weeksDict={};
weeksRef.on("value", snap => {
    console.log(snap.val());
    snap.forEach(val => {
        weeksDict[val.key] = val.val();
        
    });    
});
var recomm = [];
recRef.on("value", snap => {
    snap.forEach(val => {
        recomm.push( val.val().title);        
    });
    recomm.sort(); 
    const event = new Event('build');
    document.getElementById("lib").dispatchEvent(event);
});


//code that populate Week drop downn
/*
const weekListUI = document.getElementById("weekList");
weeksRef.on("child_added", snap => {
    console.log(snap.val());
    let week = snap.val();
    let $li = document.createElement("option");
    $li.innerHTML = week.descr;
    $li.setAttribute("value", snap.key);
    //$li.addEventListener("click", userClicked);
    weekListUI.append($li);
    //<option value="goldfish">Goldfish</option>
    
});
//code that prints list at the top of the website screen
const userListUI = document.getElementById("userList");
recRef.on("child_added", snap => { //occurs everytime we read a record from the database // snap represents the record that's currently being read...snap is just the variable name
    console.log(snap.val());
    let book = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = `${book.author} ${book.title} Week ${book.week}+1`; //book.author + " " + book.title....
    $li.setAttribute("child-key", snap.key);
    //$li.addEventListener("click", userClicked);
    userListUI.append($li);
    //var $p = document.createElement("p");
   //$p.innerHTML = snap.key + " - " + snap.val() userDetailUI.append($p);
}); */
//printing code ends here

// var messagesRef = firebase.database()
//     .ref('Recommendations'); //Collected Data

// //const querySnapshot = await firestore.collection('Collected Data').get();


// document.getElementById('contactForm')
//     .addEventListener('submit', submitForm);

// //Process when user clicks submit button

// function submitForm(e) {
//     e.preventDefault();

//     // Get values
//     var title = getInputVal('title');
//     if(!recArr.includes(title.toLowerCase())){
//         saveMessage(title);
//     }
//     alert("Thank you, your recommendation was received.");
//     document.getElementById('contactForm').reset();
// }

// // Function to get get form values
// function getInputVal(id) {
//     return document.getElementById(id).value;
// }

// // Save recommendations to firebase
// function saveMessage(title) {
//     var newMessageRef = messagesRef.push();
//     newMessageRef.set({
//         title: title
//     });
// }

// var recArr = [];
// var recListUI = document.getElementById("recList");
// if (recListUI  != null) {
//     recRef.on("child_added", snap => {
//         console.log(snap.val());
//         let rec = snap.val();
//         recArr.push(rec.title.toLowerCase());
    
//         let $li = document.createElement("li");
//         $li.innerHTML = `${rec.title}`; 
//         $li.setAttribute("child-key", snap.key);
//         recListUI.append($li);
//     });

//     // requestsRef.on("value", snap => {
//     //     console.log(snap.val());
//     // });
// }


