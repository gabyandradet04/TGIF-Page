$(function(){
  if(document.getElementById("senate_att")){
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
     glance(json.results[0].members);
     least_attend(json.results[0].members);
     most_attend(json.results[0].members);
    }).catch(function(){
    console.log("error");
  })
});
/**************************Json**********************************/  
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
    "l_eng":[ ],
    "M_eng":[ ]
};
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
   //console.log(porcInd,porcRep,porcDem)
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
      //console.log(statistics);
/*************************** Porcentajes***********************/

/**********************************10%*****************************/
function least_attend(data){
  var lent= data;
var porcentaje=Math.round((lent.length*10)/100);

//Ordenar ascendentemente por perc
var m4=lent.sort(function (a, b) {
    return (a.missed_votes_pct - b.missed_votes_pct)
});
 //visualizo mi array ordenada
var miembros = m4.map(function(lent){
   return "{\'Missed_Votes\':"+lent.missed_votes_pct+"},"}).join(" ");



//obtengo los 11 valores que equivale al 10% 
var min_l_att = m4[0].missed_votes_pct;
var max_l_att = m4[porcentaje].missed_votes_pct;

// me filtra todos los datos de los miembros que tengan el 
var missed_pct= lent.filter(len =>  len.missed_votes_pct>= min_l_att && len.missed_votes_pct<= max_l_att);



//Hace los objetos para agregar al json  array l_eng  
 var json_least_eng=missed_pct.map(function(obj){
  var obj1={"first_name":obj.first_name, "middle_name":obj.middle_name, "last_name":obj.last_name, "url":obj.url,"num_missed_votes": obj.missed_votes, "missed_pct_votes":obj.missed_votes_pct};
return statistics.l_eng.push(obj1);
});

};
 /*************************************************************************************/
function most_attend(data){
var lent= data;
var porcentaje=Math.round((lent.length*10)/100);

//ordena aray en forma descendente en la base votos votes_with_party_pct
var m5=lent.sort(function (a, b) {
    return (b.missed_votes_pct - a.missed_votes_pct)
});

//muestra array ordenado
 var miembros5 = m5.map(function(lent){
   return "{\'Missed_Votes\':"+lent.missed_votes_pct+"},"}).join(" ");


//obtengo los 11 valores que equivale al 10% 
var max_M_att = m5[0].missed_votes_pct;
var min_M_att= m5[porcentaje].missed_votes_pct;

/****************************************************************/

// me filtra todos los datos de los miembros que tengan el 
var att_max= lent.filter(lent =>  lent.missed_votes_pct>= min_M_att && lent.missed_votes_pct<= max_M_att);

//Hace los objetos para agregar al json  array M_eng  
var json_most_eng=att_max.map(function(obj){
var obj1={"first_name":obj.first_name, "middle_name":obj.middle_name, "last_name":obj.last_name,"url":obj.url, "num_missed_votes":obj.missed_votes, "missed_pct_votes":obj.missed_votes_pct};
return statistics.M_eng.push(obj1);
});

};

//VUE
var app = new Vue({
  el: '#app',
  data: {
   stat: statistics,
      }
  });
