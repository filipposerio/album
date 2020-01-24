/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as mdlAlbum    from './mdlAlbum.js';
import * as pippo from './Chart.js';
/*pgdb = require('./datiPgDb.js');*/
import * as laterale    from './laterale.js';

import * as comuni from './comuni.js';
import * as utility from './utility.js';

/*
Body module
*/
let objMancanti = {};
let strMancanti = "";
let userID;
let usrConnesso ={}
let objPaziente = {};
let objFigurina ={};

let coloretrovata = "green"
let coloremanca = "orange"
// Module variables
const figcompleto = []
const figtrovate = []
const figmancanti = []
let objAlbum ={}
const mainHTMLowner = `
<div class="container-fluid">
  <div id="headerpaziente" class="d-print-none">
    <div class="row" >
      <div class="col" id="info_paziente"></div>
    </div>
  </div>
  <h3 id="infoalbum" align="center"></h3>
  <div id="grafico" class="grafico-sub" align="center"> </div> 
  <div id="dtlPazienti" class="read-sub">  Questa è la sezione read sub</div>
</div>

`;

const mainHTML = `
<div class="container-fluid">


  <div id="cercapaziente" >
    <form id="search">
      <div class="form-group">
        <label for="name">Nominativo da cercare</label>
        <input type="text" class="form-control" id="name"  placeholder="digita per cercare il nominativo (min 1 carattere).." minlength="1" required>
        </div>
        <button type="submit" class="btn-sm btn-link">Cerca nominativo</button>
      </div>
    </form>
  </div>

  <div id="headerpaziente" class="d-print-none">
    <div class="row" >
      <div class="col" id="info_paziente"></div>

    </div>
  </div>
  <h1 id="infoalbum" align="center"></h1>


    <div id="dtlPazienti" class="read-sub col-80" >  Questa è la sezione read sub</div><span>
    
 
  

</div>

`;



/*
 Event handlers
*/

document.addEventListener( 'pulisciDisegno', ( event ) => {
  initModule(container, usrConnesso, objPaziente)
});

document.addEventListener( 'searchAnagraficaAlbum', ( event ) => {
  if (event.data != undefined) {
    console.log("Album - event searchAnagraficaAlbum:  creo lista da elenco" + event.data)

      listAnagrafica( event.data );
  }
  else {
    console.log("Album - event searchAnagraficaAlbum:  event.data undefined!!!!!!")

    message.show("Album - event searchAnagraficaAlbum: Nessun utente presente.")
    listAnagrafica([])
  }
});

document.addEventListener( 'searchFigurineAlbum', ( event ) => {
  document.querySelector('.container-centrale').innerHTML = mainHTMLowner;
  console.log("Album - event searchFigurineAlbum: passo dalla eventlistener searchCognome....pazienti " + event.data)
  if (event.data.length) {
    console.log("Album - event searchFigurineAlbum:  creo lista da elenco" + event.data)
    //console.log(event.data)
    console.log(event.data.length)
    albumCompleto();
   
    
    //figurineTrovate(event.data);
    mergeAlbum(figcompleto,event.data);
    albumMancanti();
    console.log(localStorage.idanagrafica)
    console.log(event.data[0])
    if (event.data[0].idanagrafica == localStorage.idanagrafica){
      listFigurine(figcompleto,true)
      
      grafico(event.data.length,objAlbum.numerofigurine-event.data.length);
    }
    else
    {
      albumCompleto();
      mergeAlbum(figcompleto,event.data);
      listFigurine(figcompleto,false)
      grafico(event.data.length,objAlbum.numerofigurine-event.data.length);
    }
    objAlbum.trovate = event.data.length
    objAlbum.mancanti = objAlbum.numerofigurine-event.data.length
    //alert('TROVATE: ' + objAlbum.trovate)
    //alert('MANCANTI: ' + objAlbum.mancanti)
    laterale.figurineMancanti(objAlbum.trovate,objAlbum.mancanti,figmancanti);
    //listFigurine( event.data );
  }
  else {
    console.log("Album - event searchFigurineAlbum:  event.data undefined!!!!!!")
    message.show("Album - event searchFigurineAlbum: Nessuna figurina presente.")
    mergeAlbum(figcompleto,[]);
    albumMancanti();
    albumCompleto();
    mergeAlbum(figcompleto,event.data);
    listFigurine(figcompleto,false)
    grafico(0,objAlbum.numerofigurine-0);
    objAlbum.trovate = event.data.length
    objAlbum.mancanti = objAlbum.numerofigurine-event.data.length
    laterale.figurineMancanti(objAlbum.trovate,objAlbum.mancanti,figmancanti);
  }
  
});
const EliminaFigurinaDalistFigurineMancanti = (objFigurina) =>{
  console.log("devo eliminare la figurina: " + objFigurina.numero)
  console.log("elenco mancanti: " + figmancanti.length)
  console.log( figmancanti[1])
 
  for (let i=0; i< figmancanti.length-1; i++)  {
    console.log(i +" "+figmancanti[i].numero)
    if (figmancanti[i].numero == objFigurina.numero){
      console.log("elimino figurina alla posizione " + i)
      figmancanti.splice(i,1)
    }
  }
  console.log("ristampo elenco mancanti: " )
  for (let i=0; i< figmancanti.length-1; i++)  {
    console.log(figmancanti[i].numero)
  }
}
  const AggiungiFigurinaAlistFigurineMancanti = (objFigurina) =>{
    console.log("devo aggiungere la figurina: " + objFigurina.numero)
    console.log("elenco mancanti: " + figmancanti.length)
    console.log( figmancanti[1])
    for (let i=0; i< figmancanti.length-1; i++)  {
      console.log(i +" "+figmancanti[i].numero + "  " + objFigurina.numero)
      if (Number(figmancanti[i].numero) > Number(objFigurina.numero)){
        console.log("AGGIUNGO figurina n. " +  objFigurina.numero +" alla posizione " + i + "(prima della figurina numero " + figmancanti[i].numero+")")
        //figmancanti.push(objFigurina)
        figmancanti.splice(i,0,objFigurina)
        break;
      }
      console.log(i +" "+figmancanti[i].numero + "  " + objFigurina.numero)
      console.log("numero mancanti: " + figmancanti.length)
    }
    console.log("ristampo elenco mancanti: " )
      for (let i=0; i< figmancanti.length-1; i++)  {
        console.log(figmancanti[i].numero)
    }
    
 
}

const listAnagrafica = ( rows ) => {
  
  console.log("Pazienti - function list: costruisco lista pazienti ")
  console.log( rows )
  console.log( rows[0])
  //console.log( rows[0].cognome)
  const html = `
  <style>
    #grid { 
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 1vw;
      }
    #grid > div {
      font-size: 3vw;
      padding: .5em;
      background: lightgray;
      text-align: center;
    }
   </style>
    <p>
    <div class="container-fluid">
        <div id="grid">
        ${rows.map(row => `
          <div id="${row.idanagrafica}" class="cardpazienti" >${row.cognome} ${row.nome }</div>
          `
          ).join('')}
          </div>
      </div>
      `

    document.querySelector('.read-sub').innerHTML = html;
    console.log("selezione righe tabella")
    //const table = document.getElementById( "userList" );
    //alert(table)
    //console.log(table);
        
    const tableRows =document.getElementsByClassName( "cardpazienti" );
    console.log("seleziono le card per aggiungere event selezione")
    console.log(tableRows)
        //for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
        for (let row of tableRows) {
        row.addEventListener('click', ( event ) => {
        console.log(event);
        //alert("selezionato paziente: " + row.id )
         console.log("verifica obj Paziente ************** :")
         for (let h=0; h<rows.length; h++){
           console.log(row.id+"("+row.id.length+") "+rows[h].idanagrafica+"("+rows[h].idanagrafica.toString().length+")");
           if (rows[h].idanagrafica == row.id) {
             console.log("TROVATO");
             objPaziente = rows[h]
           }

         }
         console.log("verifica obj Paziente 0 :")
         console.log(objPaziente)          

          //document.querySelector( '.container-destro' ).innerHTML = 'Paziente:' + objPaziente.cognome;
          //const event1 = new CustomEvent('selezioneAlbumUtente', {bubbles: true, cancelable: true})
          //event1.data=  objPaziente
          //document.dispatchEvent( event1)
          mdlAlbum.searchAlbumUtente(objPaziente.idanagrafica)
    });
    }
  
 
  //window.scrollTo(0,document.body.scrollHeight);
};

  const listFigurine= ( rows, pAbilita ) => {
  
    console.log("Figurine - function list: costruisco lista figurine ")
    console.log( rows )
    console.log( rows[0])
    //console.log( rows[0].cognome)
  
  
    const html = `
    <style>
      #grid { 
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        grid-gap: 1vw;
        }
      #grid > div {
        font-size: 2vw;
        padding: .2em;
        background: lightgray;
        text-align: center;
      }
     </style>
      <p>
      <div class="container-fluid">

          <div id="grid" disabled=${pAbilita}>
          ${rows.map(row => `
            <div id="${row.numero}" class="cardfigurine" style="background-color:${row.trovata}">${row.numero}   </div>
            `
            ).join('')}
            </div>
        </div>
        `
      document.getElementById('infoalbum').innerHTML= objAlbum.descrizione
      
      document.querySelector('.read-sub').innerHTML = html;

      console.log("selezione righe tabella")
      //const table = document.getElementById( "userList" );
      //alert(table)
      //console.log(table);
          
      const tableRows =document.getElementsByClassName( "cardfigurine" );
      console.log("seleziono le card per aggiungere event selezione")
      //console.log(tableRows)
          //for (let mmm = 0, row; row = table.rows[mmm]; mmm++) {
          for (let row of tableRows) {
          row.addEventListener('click', ( event ) => {
          event.preventDefault();
          event.stopPropagation();
          
              
              
              console.log(event.target);
              console.log(row.id)
              //alert("selezionato paziente: " + row.id )
              
              console.log("verifica obj Figurine ************** :")
              for (let h=0; h<rows.length; h++){
                //console.log(row.id+"("+row.id.length+") "+rows[h].idanagrafica+"("+rows[h].idanagrafica.toString().length+")");
                //console.log(h)
                console.log('Costruisco album. cerco la figurina:' + rows[h])
                if (rows[h].numero == row.id) {
                  
                  objFigurina = rows[h]
                }
                
      
              }
              console.log("verifica obj Paziente 0 :")
              console.log(objFigurina)  
              objFigurina.idanagrafica = objPaziente.idanagrafica
              objFigurina.idalbumutente=objAlbum.idalbumutente
              if (objFigurina.idanagrafica == usrConnesso.idanagrafica){
                if (event.target.style.backgroundColor == coloretrovata){
                  event.target.style.backgroundColor = "orange"
                  //document.getElementById(objFigurina.numero).style.backgroundColor  = "orange"
                  mdlAlbum.eliminaFigurina(objFigurina)
                  objAlbum.trovate -= 1
                  objAlbum.mancanti += 1
                  AggiungiFigurinaAlistFigurineMancanti(objFigurina)
                  
                  laterale.figurineMancanti(objAlbum.trovate,objAlbum.mancanti,figmancanti);
                  
                  grafico(objAlbum.trovate,objAlbum.mancanti);
                }
                else {
                  event.target.style.backgroundColor = coloretrovata
                  mdlAlbum.aggiungiFigurina(objFigurina)
                  objAlbum.trovate += 1
                  objAlbum.mancanti -= 1
                  EliminaFigurinaDalistFigurineMancanti(objFigurina)
                  laterale.figurineMancanti(objAlbum.trovate,objAlbum.mancanti,figmancanti);
                  
                 
                  grafico(objAlbum.trovate,objAlbum.mancanti);


                }
              }
              else {
                message.show("non puoi modificare album di altri")
              }
      });
      }
    
   
    //window.scrollTo(0,document.body.scrollHeight);
  };
  const figurineTrovate = (  ) => {
    let j;
    
    for (let i=0; i< 50; i++)
    {
      j=Math.floor(Math.random() * 600) + 1;
      figtrovate[i] = {"idfigurina":0,"numero":j, "trovata":coloretrovata}
      
    }

  };
  const albumMancanti = (  ) => {
    let j=0;
    figmancanti.length = 0;

    for (let i=0; i< objAlbum.numerofigurine; i++)
    {      
      if (figcompleto[i].trovata == coloremanca) {
        figmancanti[j] = figcompleto[i]
        j +=1;
      }
    }
    console.log("figmancanti+++++++++++++++++++++++++++++++++++++++++++++++++++++")

    console.log(figmancanti)


  };
  const albumCompleto = (  ) => {
    figcompleto.length=0;
    for (let i=0; i< objAlbum.numerofigurine; i++)
    {
      figcompleto[i] = {"idfigurina":i,"numero":i+1, "trovata":coloremanca}
    }

  };

  const mergeAlbum = (figcompleto,figtrovate) => {
    
    console.log("merge")
    for (let i=0; i< figcompleto.length; i++)
    { 
      //console.log(figcompleto[i].numero + " ----- " + figcompleto[i].trovata)
      for (let k=0; k<figtrovate.length; k++){
        if (figcompleto[i].numero == figtrovate[k].numero) {
          figcompleto[i].idfigurina = figtrovate[k].idfigurina
          figcompleto[i].trovata = coloretrovata
        }
      }
      
    }
  }

  const search = ( event ) => {
  console.log('search anagrafica' +  event.target.name.value );
  event.preventDefault();
  const info_paziente  = document.getElementById( "info_paziente" );
  info_paziente.innerHTML = '';
  console.log("chiamo la searchPazienti......: filtro: " +  event.target.name.value);
  document.querySelector( '.read-sub' ).innerHTML = "Waiting..."
  mdlAlbum.searchAnagraficaAlbum( event.target.name.value );
};


const serializeArray = ( fields ) => {
  const object = {};
  for( let field of fields ){
    object[ field.name ] = field.value;
  }
  return object;
};


const grafico = (ftrovate,fmancanti) => {
  
  document.getElementById('grafico').innerHTML = ""
  document.getElementById('grafico').innerHTML = '<canvas id="chart_0" style="height:200px; width:200px;  "></canvas>';
  var data = {
    labels: ["Trovate  ", "Mancanti"],
    datasets: [{
      label: "Totale figurine album " +objAlbum.numerofigurine,
      backgroundColor: [coloretrovata, coloremanca],
      borderColor: [coloretrovata, coloremanca],
      borderWidth: 2,
      hoverBackgroundColor: [coloretrovata, coloremanca],
      hoverBorderColor:[coloretrovata, coloremanca],
      data: [ftrovate,fmancanti],
    }]
  };
  
  var option = {
    responsive: false,
    
  };
 
  Chart.Doughnut('chart_0', {
    options: option,
    data: data
  });

  
}
// Export module initModule
const initModule = ( container, pUsrConnesso, pOwner, pAlbum) => {
  console.log("initmodule album")  
  //vOwner = pOwner
  usrConnesso = pUsrConnesso
  objPaziente = usrConnesso
  objAlbum = pAlbum
  if (pOwner == false) {
    container.innerHTML = mainHTML;
    const form = document.forms.search;
    form.addEventListener ('submit', search, false);
    document.getElementById('grafico').innerHTML="";
    document.getElementById('infoalbum').innerHTML="";
    document.querySelector('.read-sub').innerHTML = "";
  }
  else
  {
    container.innerHTML = mainHTMLowner;
    albumCompleto();
    mdlAlbum.searchFigurineAlbum(pAlbum.idalbumutente)
  }
 
  
  
};


export { initModule};
