var messagesRef = firebase.database()
    .ref('Recommendations'); //Collected Data

//const querySnapshot = await firestore.collection('Collected Data').get();


document.getElementById('contactForm')
    .addEventListener('submit', submitForm);

//Process when user clicks submit button

function submitForm(e) {
    e.preventDefault();

    // Get values
    var title = getInputVal('title');
    if(!recArr.includes(title.toLowerCase())){
        saveMessage(title);
    }
    alert("Thank you, your recommendation was received.");
    document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save recommendations to firebase
function saveMessage(title) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        title: title
    });
}

const recArr = [];
const recListUI = document.getElementById("recList");
if (recListUI  != null) {
    // recRef.on("child_added", snap => {
    //     console.log(snap.val());
    //     let rec = snap.val();
    //     recArr.push(rec.title.toLowerCase());
    
    //     let $li = document.createElement("li");
    //     $li.innerHTML = `${rec.title}`; 
    //     $li.setAttribute("child-key", snap.key);
    //     recListUI.append($li);
    // });
    document.getElementById("lib").addEventListener('build', (e) => { 
        console.log("event")
        recomm.forEach(rec => {
            console.log(rec);
            //let rec = snap.val();
            recArr.push(rec.toLowerCase());
        
            let $li = document.createElement("li");
            $li.innerHTML = `${rec}`; 
            //$li.setAttribute("child-key", snap.key);
            recListUI.append($li);
        });
    }, false);
    

    requestsRef.on("value", snap => {
        console.log(snap.val());
        var reqDict = {}
        snap.forEach(val => {
            var req = val.val();
            if (Object.keys(reqDict) && Object.keys(reqDict).includes(`${req.week}`)) {
                reqDict[req.week].push(req.title);
            } else {
                reqDict[req.week] = new Array(req.title);
            }
        });

        console.log(reqDict);

        createRequestsTable(reqDict);
        
    });
}

function createRequestsTable(reqDict){
    const scoreDiv = document.querySelector("#requests") // Find the scoreboard div in our html
    let tableHeaders = ["Week", "Book Title"]
    const createScoreboardTable = () => {
        while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild) // Remove all children from scoreboard div (if any)
        let scoreboardTable = document.createElement('table') // Create the table itself
        scoreboardTable.className = 'scoreboardTable'
        let scoreboardTableHead = document.createElement('thead') // Creates the table header group element
        scoreboardTableHead.className = 'scoreboardTableHead'
        let scoreboardTableHeaderRow = document.createElement('tr') // Creates the row that will contain the headers
        scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow'
        // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
        tableHeaders.forEach(header => {
            let scoreHeader = document.createElement('th') // Creates the current header cell during a specific iteration
            scoreHeader.innerText = header
            scoreboardTableHeaderRow.append(scoreHeader) // Appends the current header cell to the header row
        })
        scoreboardTableHead.append(scoreboardTableHeaderRow) // Appends the header row to the table header group element
        scoreboardTable.append(scoreboardTableHead)
        let scoreboardTableBody = document.createElement('tbody') // Creates the table body group element
        scoreboardTableBody.className = "scoreboardTable-Body"
        scoreboardTable.append(scoreboardTableBody) // Appends the table body group element to the table
        scoreDiv.append(scoreboardTable) // Appends the table to the scoreboard div
    }
    // The function below will accept a single score and its index to create the global ranking
    const appendReqs = (weekIndex, titles) => {
        titles.sort();
        const scoreboardTable = document.querySelector('.scoreboardTable') // Find the table we created
        
        // Lines 72-85 create the 5 column cells that will be appended to the current table row
        var firstRow = true;
        titles.forEach(singleReq => {
            let scoreboardTableBodyRow = document.createElement('tr') // Create the current table row
            scoreboardTableBodyRow.className = 'scoreboardTableBodyRow'
            
            let title= document.createElement('td')
            title.innerText = singleReq;
            
            if (firstRow){
                let week= document.createElement('td')
                week.rowSpan=titles.length;
                week.innerText = weeksDict[`${weekIndex}`].descr;
                scoreboardTableBodyRow.append(week,title) // Append all 5 cells to the table row
                firstRow = false;
            } else {
                scoreboardTableBodyRow.append(title) // Append all 5 cells to the table row
            }
            scoreboardTable.append(scoreboardTableBodyRow) // Append the current row to the scoreboard table body
        })
        
    }
    // const getScores = () => {
    // fetch('http://localhost:3000/scores') // Fetch for all scores. The response is an array of objects that is sorted in decreasing order
    // .then(res => res.json())
    // .then(scores => {
    createScoreboardTable(); // Clears scoreboard div if it has any children nodes, creates & appends the table
    // // Iterates through all the objects in the scores array and appends each one to the table body
    // for (const score of scores) {
    // let scoreIndex = scores.indexOf(score) + 1 // Index of score in score array for global ranking (these are already sorted in the back-end)
    Object.keys(reqDict).forEach(week => {
        appendReqs(week, reqDict[week]); // Creates and appends each row to the table body
 
    })
    
    

}


