

let SERVER_URL = 'http://127.0.0.1:5000/';
let sort_decending = false; // if truw will sort in ascending order
//let data = "{{ data }}";
//let data = '{{dbdata}}'//[{name: "Wings", cost :30 , time : 70} ] ;
data = JSON.parse(data);
data = data.recipes;
window.onload = () => {
    loadTableData(data);
};


function loadTableData(tdata)
{
    const tablebody = document.getElementById('search-table');
    let htmldata= '';
    for (let row_data of  tdata){
        htmldata += `<tr><td  style="cursor:pointer"> <a  href= '${SERVER_URL}${row_data.page_link}'>${row_data.name}</a></td><td>${row_data.cost}</td><td>${row_data.time}</td></tr>`;
        
    }
        
    console.log(htmldata);
    tablebody.innerHTML = htmldata;

}

