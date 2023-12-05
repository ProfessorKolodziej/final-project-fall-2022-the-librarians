// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

// Create a token at https://airtable.com/create/tokens
// with the read scope.
// Generate your own API key - do not use mine.

const API_KEY = 'patRdGCKj2RUuzQN7.36ebb41b1b6e258dbd24becf253674daa9a3b9ccfbc0b2afd6ea64e001c4f3ce';

// The values below need to be customized for your table.
// Learn how to find these at https://support.airtable.com/docs/finding-airtable-ids#finding-base-url-ids

const baseId = 'appbESuLWfPuYXQGX';
const tableId = 'tbldbOmlvXf1jKUm0';

// Look for any items with the "Fiction" tag in Genres field.
const lookForGenreNF = `SEARCH("Nonfiction",Genres)`;
const lookForGenre = `SEARCH("Fiction",Genres)`;

// Look for any items with "Harper" text in Author field.
const lookForAuthor = `SEARCH("Harper",Author)`;

// Look for items that match one of genre OR author field text.
const requireSome = `OR(${lookForGenre}, ${lookForAuthor})`;

// Look for items that match BOTH genre and author field text.
const requireAll = `AND(${lookForGenre}, ${lookForAuthor})`;

// Choose the filterByFormula you want - lookForGenre, lookForAuthor, requireSome, or requireAll.
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${encodeURI(lookForGenre)}`;

async function getAirtableData() {
  const dataContainer = document.querySelector('#data');
  const response = await fetch(apiUrl, {
    headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${API_KEY}`
    },
  })
    .then(response => response.json())
    .then((data) => {
      // Check the console for the full object
      console.log(data);
      data.records.map((book) => {
        const bookHTML = `
        <li class="list">
          <img class="librarybookimages" src=${book.fields['Cover Image'][0]['url']} />
          <section class="card">
            <h2>${book.fields.Name}</h2>
            <p>${book.fields.Author}</p>
            <p>${book.fields.Description}</p>
          </section>
        </li>
        `
        dataContainer.insertAdjacentHTML('beforeend', bookHTML);
      });
    })
    .catch(error => console.error('Error:', error));
}

// Get the button
const button = document.querySelector('#getdata');


  if (button !== null){
    button.addEventListener('click', getAirtableData);
    getAirtableData();
  }

//ID goes in pound sign//
const resultsbutton = document.querySelector('#fictionresultsbutton');
resultsbutton.addEventListener('click', getAirtableData);

const secondresultsbutton = document.querySelector('#nfresultsbutton');

if (secondresultsbutton !== null){
  secondresultsbutton.addEventListener('click', getAirtableData);
}

const checkboxes = document.querySelector('#fictionboxes');

let checked = [];

if (checkboxes !== null) {
  checkboxes.addEventListener("click", function(event)) {  
    console.log(event.target);
    if ( event.target.tagName === "INPUT") {
        checked.push(event.target.id)
        alert(checked);
      if (checkboxes == null){
        
      }
        }
    } 
  }
    if (event.target.tagName === "INPUT") {
      checked.push(event.target.id);
      alert(checked);
    };
  


