const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");
let infoTable = document.querySelector("#infoTable");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("Form submitted");

    const input = csvFile.files[0];
    const reader = new FileReader();    
    
    const totalAmount = document.getElementById("totalAmount").value;

    reader.onload = function (e) {
        const text = e.target.result.toString();
        //var convertedText = text.replace("\"", "AA");
        //document.write(convertedText);
        //document.write(text);
        const data = csvToArray(text);
        //document.write(Object.values(data).length); => size
        //document.write(Object.values(data[0])); => get lines
        var i;                                    // for loop
        var counter = Object.values(data).length;     // number of elements in array
        var membersArray = ["sample"];                // the array you want to fill
        var hitsArray = [0]; 
        var totalHits = 0;

        for (i = 0; i < counter; i += 1) {      
            
            membersArray[i] = Object.values(data[i]).toString().replaceAll('\"','').split(';')[0];
            hitsArray[i] = parseInt(Object.values(data[i]).toString().replaceAll('\"','').split(';')[2]);
            totalHits += hitsArray[i] << 0;
            /* 
            // alternative:
            myArray.push([]);
            // one-liner
            for (index = 0; index < counter; index += 1) myArray.push([]);
            */            
            //document.write("( Current Hit : " + totalHits + " ) Member : " + membersArray[index].replaceAll('\"','') + "< Hits : " + hitsArray[index] + " >");
        
        }

        let thead = infoTable.createTHead();
        let row = thead.insertRow();
        row.className = "table-head";
        let thMember = row.insertCell();
        thMember.className = "member-col";
        let headMember = document.createElement("div");
        headMember.className = "item-center";
        headMember.innerHTML = "Members";
        thMember.appendChild(headMember);

        let thHits = row.insertCell();
        let headHits = document.createElement("div");
        headHits.className = "item-right";
        headHits.innerHTML = "Hits";
        thHits.appendChild(headHits);
        
        let thPercent = row.insertCell();
        let headPercent = document.createElement("div");        
        headPercent.className = "item-right";
        headPercent.innerHTML = "Percent";
        thPercent.appendChild(headPercent);
        
        let thShare = row.insertCell();
        let headShare = document.createElement("div");        
        headShare.className = "item-right";
        headShare.innerHTML = "Share";
        thShare.appendChild(headShare);
        

        let tbody = infoTable.createTBody();
        let infoRow = tbody.insertRow();

        for (i = 0; i < counter; i += 1) {

          infoRow = infoTable.insertRow();

          let cellMember = infoRow.insertCell();
          let textMember = document.createElement('div');
          textMember.className = "member-list";
          textMember.innerHTML = membersArray[i].replaceAll('\"','');
          cellMember.appendChild(textMember);

          let cellHit = infoRow.insertCell();
          let textHit = document.createElement('div');
          textHit.className = "item-right";
          textHit.innerHTML  = hitsArray[i];
          cellHit.appendChild(textHit);

          let cellPercent = infoRow.insertCell();
          let textPercent  = document.createElement('div');
          textPercent.className = "item-right";
          textPercent.innerHTML = ((hitsArray[i] / totalHits)*100).toFixed(2).toString() + " %";
          cellPercent.appendChild(textPercent);

          let cellShare = infoRow.insertCell();
          let textShare  = document.createElement('div');
          textShare.className = "item-right";
          textShare.innerHTML = "$ " + parseInt(((hitsArray[i] / totalHits) * totalAmount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          cellShare.appendChild(textShare);
          // if( i != counter - 1){
          //   document.write( membersArray[i].replaceAll('\"','') + "< Hits : " + hitsArray[i] + " >");
          // }
          // else{
          //   document.write( membersArray[i].replaceAll('\"','') + "< Hits : " + hitsArray[i] + " > ( Total Hits : " + totalHits + " ) totalamount : " + totalAmount );
          // }
        }

      
    };

    reader.readAsText(input);

});

function csvToArray(str, delimiter = "\n") {
    // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  //const faction = str.slice(0, str.indexOf("\n")).split(delimiter);
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

$(".submit-btn").click(function () {
  $('.submit-form').toggleClass('submit-hide');
  $('.refresh-form').toggleClass('refresh-show')
});
