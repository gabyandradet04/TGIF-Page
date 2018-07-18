
$(function (){
 if(document.getElementById("senate_loyal")){
  var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
 }else {
  var url ="https://api.propublica.org/congress/v1/113/house/members.json"
 }
    fetch(url,
              { method: 'GET',
               headers: new Headers
               ({"X-API-Key": "vDPoI8396Ld8Yc8mPNjw2JkSTwU2Muj4dBI2c83A"} ),
  }).then(function(response){
    return response.json();  
  }).then (function(json){
     most_loyal(json.results[0].members);
      least_loyal(json.results[0].members);
      glance(json.results[0].members);
    }).catch(function(){
    console.log("error");
  })
  
});


/*********************Json**************/
var statistics = { 
    "glance":{
        "num_R":0, 
        "pct_R":0, 
        "num_D":0, 
        "pct_D":0, 
        "num_I":0, 
        "pct_I":0,
        "num_T":0, 
        "pct_T":0,
    },
    "l_loyal":[ ],
    "M_loyal":[ ]
}

/************************Porcentaje Glance*********************/
function glance(data){
var lent= data;
var republic = lent.filter(lent =>  lent.party=="R");
var totalRep=republic.length;// total republicanos

var demo = lent.filter(lent =>  lent.party=="D");
var totalDem=demo.length;// total democratas

var ind = lent.filter(lent =>  lent.party=="I");
var totalInd=ind.length; //total independientes
  
    
var totales= totalInd+totalDem+totalRep;
              

var porcDem= Math.round(totalDem*100/totales);
var porcRep= Math.round(totalRep*100/totales);
var porcInd= Math.round(totalInd*100/totales);


var totalPct=porcDem+porcRep+porcInd;

/*********************Json Glance****************************/
      statistics.glance.num_R=totalRep;
      statistics.glance.num_D=totalDem;
      statistics.glance.num_I=totalInd;
      statistics.glance.num_T=totales;
      statistics.glance.pct_R=porcRep;
      statistics.glance.pct_I=porcInd;
      statistics.glance.pct_D=porcDem;
      statistics.glance.pct_T=totalPct;

};
/*************************** Porcentajes***********************/

/**********************************10%*****************************/
function least_loyal(data){
  var lent= data;
var porcentaje=Math.round((lent.length*10)/100);
//ordeno en forma ascendente en base a votes_with_party_pct
var m2=lent.sort(function(a,b){
    if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return 1;
  }
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return -1;
  }
  return 0;
});

//obtengo los 11 valores que equivale al 10% 
var min_l_loyal = m2[0].votes_with_party_pct;
var max_l_loyal = m2[porcentaje].votes_with_party_pct;

//visualizo mi array ordenado
var miembros = m2.map(function(lent){
return "{\'votesPct\':"+lent.votes_with_party_pct+"},"}).join(" ");

//me filtra todos los datos de los miembros que tengan el 
var party_pct= lent.filter(lent =>  lent.votes_with_party_pct>= min_l_loyal && lent.votes_with_party_pct<= max_l_loyal);


//Hace los objetos para agregar al json  array l_loyal  
var json_least_loyal=party_pct.map(function(obj){
var obj1={"first_name":obj.first_name,"middle_name":obj.middle_name, "last_name": obj.last_name, "url": obj.url, "num_party_votes":obj.total_votes, "party_pct_votes":obj.votes_with_party_pct };
return statistics.l_loyal.push(obj1);
});

};
 /*****************************************Most Loyal ********************************************/
function most_loyal(data){
  var lent= data;
  var porcentaje=Math.round((lent.length*10)/100);
//ordena aray en forma descendente en la base votos votes_with_party_pct
 var m3=lent.sort(function(a,b){
    if (b.votes_with_party_pct > a.votes_with_party_pct) {
    return 1;
  }
  if (b.votes_with_party_pct < a.votes_with_party_pct) {
    return -1;
  }
  return 0;
});

//muestra array ordenado
 var miembros3 = m3.map(function(lent){
   return "{\'votesPct\':"+lent.votes_with_party_pct+"},"}).join(" ");

//obtengo los 11 valores que equivale al 10% 
var max_M_loyal = m3[0].votes_with_party_pct;
var  min_M_loyal= m3[porcentaje].votes_with_party_pct;

// me filtra todos los datos de los miembros que tengan el 
var party_max= lent.filter(lent =>  lent.votes_with_party_pct>= min_M_loyal && lent.votes_with_party_pct<= max_M_loyal);

//Hace los objetos para agregar al json  array M_loyal  
var json_most_loyal=party_max.map(function(obj){
    var obj1={"first_name":obj.first_name,"middle_name":obj.middle_name, "last_name": obj.last_name, "url": obj.url, "num_party_votes":obj.total_votes, "party_pct_votes":obj.votes_with_party_pct };
    return statistics.M_loyal.push(obj1);
});
};

//VUE
var app = new Vue({
  el: '#app',
  data: {
   stat: statistics,
      }
});


