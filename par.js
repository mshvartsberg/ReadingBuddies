/*var firebaseConfig = {
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
const booksRef = dbRef.child('Recommendations');
const weeksRef = dbRef.child('weeks');

//code that reads from the database 
//code that prints list at the top of the website screen
const userListUI = document.getElementById("userList");
booksRef.on("child_added", snap => {
    console.log(snap.val());
    let book = snap.val();
    let $li = document.createElement("li");
    $li.innerHTML = `${book.author} ${book.title} Week ${book.week}+1`; //book.author + " " + book.title....
    $li.setAttribute("child-key", snap.key);
    //$li.addEventListener("click", userClicked);
    userListUI.append($li);
    //var $p = document.createElement("p");
   //$p.innerHTML = snap.key + " - " + snap.val() userDetailUI.append($p);
});
//printing code ends here

var firebaseConfig = {
    apiKey: "AIzaSyBYh0agqK9gBAOIGg7atIbwuZen-xlVJiQ",
    authDomain: "readingbuddies-27591.firebaseapp.com",
    projectId: "readingbuddies-27591",
    storageBucket: "readingbuddies-27591.appspot.com",
    messagingSenderId: "190798231029",
    appId: "1:190798231029:web:542382995913803b931cbc",
    measurementId: "G-LH4BGZH7C6",
    databaseURL: "https://readingbuddies-27591-default-rtdb.firebaseio.com/"
};
*/


// firebase.initializeApp(firebaseConfig);
// const dbRef = firebase.database().ref();
//const booksRef = dbRef.child('books');
//const weeksRef = dbRef.child('weeks');
//code that populate Week drop downn

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
//const recRef = dbRef.child('Recommendations');
const buttonRecs = document.getElementById("buttonRecs");
// recRef.on("child_added", snap => {
//     console.log(snap.val());
//     let rec = snap.val();
//     let $button = document.createElement("button");
//     $button.type="button";
//     $button.innerHTML = rec.title;
//     var t = rec.title;
    
//     //var reqArr = requestsArr;
//    // $button.setAttribute("value", snap.key);
//     $button.addEventListener("click", function(){
//         saveRequest(t);
//     });
//     buttonRecs.append($button);
    
// });
document.getElementById("lib").addEventListener('build', (e) => { 
    console.log("event")
    recomm.forEach(rec => {
        console.log(rec);
        let $button = document.createElement("button");
        $button.innerHTML = rec;
        var t = rec;
        

        $button.addEventListener("click", function(){
            saveRequest(t);
        });
        buttonRecs.append($button);
    });
}, false);


//var requestsRef = firebase.database()
//  .ref('Requests'); //Collected Data

//const querySnapshot = await firestore.collection('Collected Data').get();


document.getElementById('contactForm')
    .addEventListener('submit', submitFormm);

//Process when user clicks submit button

function submitFormm(e) {
    e.preventDefault();

    // Get values
    var title = getInputVal('titlee');
    if (saveRequest(title))
        document.getElementById('contactForm').reset();
}
// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}
const requestsArr = [];
requestsRef.on("child_added", snap => {
    console.log(snap.val());
    let request = snap.val();
    if (request && request.title && request.week)
        requestsArr.push(request.title.toLowerCase()+request.week);
});
// Save recommendations to firebase
function saveRequest(title) {    
    var week = getInputVal('weekList');
    if(week == ""){
        alert("Please fill in the week.");
        return false;
    } else if(title == ""){
            alert("Please fill in the book title.");
            return false;
    } else {
        week = parseInt(week);
        if(!requestsArr.includes(((title + week).toLowerCase()))){
            var newMessageRef = requestsRef.push();
            newMessageRef.set({
                week: week,
                title: title,
            });
        }
        alert("Thank you, your request was received.");
        return true;
    }
    
    
}