

let SERVER_URL = 'http://127.0.0.1:5000/';
let sort_decending = false; // if truw will sort in ascending order
//let data = "{{ data }}";
//let data = '{{dbdata}}'//[{name: "Wings", cost :30 , time : 70} ] ;
let  cost_dict = {"High" : 2, "Medium":1, "Low":0};
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
