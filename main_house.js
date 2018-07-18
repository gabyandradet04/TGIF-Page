$(function(){
fetch("https://api.propublica.org/congress/v1/113/house/members.json",
              { method: 'GET',
               headers: new Headers
               ({"X-API-Key": "vDPoI8396Ld8Yc8mPNjw2JkSTwU2Muj4dBI2c83A"} ),
  }).then(function(response){
    return response.json();  
  }).then (function(json){
    app.houser = json.results[0].members;
    
    //tabla();
    filtros();
    }).catch(function(){
    console.log("error");
  })
  
});


var app = new Vue({
  el: '#app',
  data: {
   houser: [],
  }
});
            
    
function tabla(){
var lent= data.results[0].members;
var htmlList = lent.map(function(lent){
  return  "<tbody id=\'table-rows\'><tr>" +"<td>"+"<a href=\'"+ lent.url+"\'>"+lent.first_name +" "+ (lent.middle_name||"") +" "+ lent.last_name+"</a>"+"</td>" +"<td class=\'method\'>"+lent.party+"</td>" +"<td class=\'type\'>"+lent.state+"</td>" +"<td>"+lent.seniority+"</td>" +"<td>"+lent.votes_with_party_pct+" %</td>"+"</tr></tbody>"
}).join("");

  var titulo = "<thead><tr> <th> Full Name </th><th>Party</th><th>State</th><th>Seniority</th><th>Percentage</tr></thead>";

  document.getElementById("house-data").innerHTML = titulo+htmlList;
};

function filtros(){

    function updateUI() {
        var checkedBoxes = Array.from(document.querySelectorAll("input[name=party]:checked")).map(ele => ele.value);
        var stateVal = $("#states").val();
        var stateArr = stateVal ? [ stateVal ] : [];
        
      
        $("#table-rows tr").each(function () {
          var partyVal = $(this).find(".method").text(); 
          var stateVal = $(this).find(".type").text();
          var Selected = isIncluded(stateVal, stateArr ,partyVal , checkedBoxes);
          $(this).toggle(Selected);
        });
      }
      function isIncluded(x,lst,p,c) {
        
        return c.indexOf(p)!= -1 && lst.length== 0 || c.indexOf(p)!= -1 && lst.indexOf(x)!= -1 ;
      }

       
     $("#states").on("change", updateUI);
      $("input[name=party]").change(updateUI);

  };