

let SERVER_URL = 'http://127.0.0.1:5000/';
let sort_decending = false; // if truw will sort in ascending order
//let data = "{{ data }}";
//let data = '{{dbdata}}'//[{name: "Wings", cost :30 , time : 70} ] ;
let  cost_dict = {"High" : 2, "Medium":1, "Low":0};
data = JSON.parse(data);
data = data.recipes;






let searchQuery = text;
const APP_ID = '10a11e73';
const APP_key = '0bb2267f6d318266de72f6b604eb58bc';
// console.log(container)

window.onload = () => {
    searchQuery = text;
    fetchAPI();
};



async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  const searchBodyDiv = document.getElementById('search-results-body');
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  searchBodyDiv.innerHTML = generatedHTML;
}




/*

window.onload = () => {
    loadTableData(data);
};


function loadTableData(tdata)
{
    const tablebody = document.getElementById('search-table');
    let htmldata= '';
    for (let row_data of  tdata){
        htmldata += `<tr><td  style="cursor:pointer" > <a  style="text-decoration:none" href= '${SERVER_URL}${row_data.page_link}'>${row_data.name}</a></td><td>${row_data.rating}</td><td>${row_data.cost}</td><td>${row_data.time}</td></tr>`;
        
    }
        
    console.log(htmldata);
    tablebody.innerHTML = htmldata;

}


function SortColumn(columnName)
{
    const dataType = typeof data[0][columnName];
    sort_decending = !sort_decending;
     console.log(dataType);
    switch(dataType)
    {
        case 'number':
            sortNumber(sort_decending, columnName) ;
            break;
        case 'string':
            sortString(sort_decending, columnName);
            break;
              
    }   
    loadTableData(data);
    console.log(data);
}
function SortColumnCost( columnName)
{
    
    sort_decending = !sort_decending;
    
    data = data.sort((p1, p2) => {
        return sort_decending? cost_dict[p1[columnName]]- cost_dict[p2[columnName]] : cost_dict[p2[columnName]]-cost_dict[p1[columnName]]
    });
    loadTableData(data);
    console.log(data);
}
function sortString(sort, columnName)
{
    data = data.sort((p1, p2) => {
        return sort?   p1[columnName].localeCompare(p2[columnName]) : p2[columnName].localeCompare(p1[columnName])
    });
}
function sortNumber(sort, columnName)
{
    data = data.sort((p1, p2) => {
        return sort? p1[columnName]- p2[columnName] : p2[columnName]-p1[columnName]
    });
}
*/