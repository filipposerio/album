/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
import * as mdlPixel    from './mdlPixelart.js';
import * as pippo from './Chart.js';
/*pgdb = require('./datiPgDb.js');*/
//import * as laterale    from './laterale.js';
import * as comuni from './comuni.js';
import * as utility from './utility.js';

/*
Body module
*/
let userID;
let usrConnesso ={}
let objPaziente = {};
let objFigurina ={};
let coloretrovata = "green"
let coloremanca = "orange"
// Module variables
const figcompleto = []
const figtrovate = []

const mainHTMLowner = `
<div class="container-fluid">
  <div id="headerpaziente" class="d-print-none">
    <div class="row" >
      <div class="col" id="info_paziente"></div>
    </div>
  </div>
  <h2 id="infoalbum" align="center"></h2>
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
  <div id="dtlPazienti" class="read-sub">  Questa è la sezione read sub</div>
  
  

</div>

`;


/*
 Event handlers
*/
document.addEventListener( 'searchAnagraficaDisegno', ( event ) => {
  if (event.data != undefined) {
    console.log("Album - event searchAnagraficaDisegno:  creo lista da elenco" + event.data)

      listAnagrafica( event.data );
  }
  else {
    console.log("Album - event searchAnagraficaDisegno:  event.data undefined!!!!!!")

    message.show("Album - event searchAnagraficaDisegno: Nessun utente presente.")
    listAnagrafica([])
  }
});

document.addEventListener( 'searchDisegnoUtente', ( event ) => {
  console.log("Album - event searchDisegnoUtente: passo dalla eventlistener searchCognome....pazienti " + event.data)
  if (event.data.length) {
    console.log("Album - event searchDisegnoUtente:  creo lista da elenco" + event.data)
    console.log(event.data)
    console.log(event.data.length)
    albumCompleto();
    
    //figurineTrovate(event.data);
    mergeAlbum(figcompleto,event.data);
    console.log(localStorage.idanagrafica)
    console.log(event.data[0])
    console.log(albumCompleto)
    if (event.data[0].idanagrafica == localStorage.idanagrafica){
      listFigurine(figcompleto,true)
      
      //grafico(event.data.length,553-event.data.length);
    }
    else
    {
      albumCompleto();
      mergeAlbum(figcompleto,event.data);
      listFigurine(figcompleto,false)
      grafico(event.data.length,553-event.data.length);
    }

    

      //listFigurine( event.data );
  }
  else {
    console.log("Album - event searchDisegnoUtente:  event.data undefined!!!!!!")

    message.show("Album - event searchDisegnoUtente: Nessuna figurina presente.")
    albumCompleto();
    mergeAlbum(figcompleto,event.data);
    listFigurine(figcompleto,false)
  }
});

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
          mdlPixel.searchDisegnoUtente(objPaziente.idanagrafica)
    });
    }
  
 
  //window.scrollTo(0,document.body.scrollHeight);
};

  const listFigurine= ( rows, pAbilita ) => {
  
    console.log("Figurine - function list: costruisco lista pazienti ")
    console.log( rows )
    console.log( rows[0])
    //console.log( rows[0].cognome)
  
  
    const html = `
    <style>
      #grid  {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto;
        grid-gap: 1px;
        background-color: #2196F3;
        padding: 10px;
      }
      #grid > div {
        background-color: rgba(255, 255, 115, 0.8);
        text-align: center;
        padding: 10px 0;
        font-size: 10px;
      }
     </style>
      <p>
      <div class="container-fluid">
          <div id="buttons">
            <input type="color" id="color" value="Color">
          </div> 
          <button id="puliscidisegno">Pulisci il disegno</button>

          <div id="grid" disabled=${pAbilita}>
          ${rows.map(row => `
            <div id="${row.numero}" class="cardfigurine" style="background-color:${row.colore}">${row.numero}   </div>
            `
            ).join('')}
            </div>
        </div>
        `
      document.getElementById('infoalbum').innerHTML="DI " + objPaziente.nome
      
      document.querySelector('.read-sub').innerHTML = html;
      let colorInput = document.getElementById("color");
      document.getElementById('puliscidisegno').addEventListener('click',( event ) => {
        if (objFigurina.idanagrafica == usrConnesso.idanagrafica){
          mdlPixel.pulisciDisegno(usrConnesso.idanagrafica)
        }
        else {
          message.show("non puoi modificare album di altri")
        } 
     
      });

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
                //console.log(rows[h])
                if (rows[h].numero == row.id) {
                  
                  objFigurina = rows[h]
                }
                
      
              }
              console.log("verifica obj Paziente 0 :")
              console.log(objFigurina)  
              let colorInput = document.getElementById("color");
              objFigurina.idanagrafica = objPaziente.idanagrafica
              if (objFigurina.idanagrafica == usrConnesso.idanagrafica){
                if (event.target.style.backgroundColor == coloretrovata){
                  event.target.style.backgroundColor = "orange"
                  //document.getElementById(objFigurina.numero).style.backgroundColor  = "orange"
                  mdlPixel.eliminaPixel(objFigurina)

                }
                else {
                  
                  event.target.style.backgroundColor = colorInput.value
                  objFigurina.colore=colorInput.value
                  mdlPixel.aggiungiPixel(objFigurina)

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
  const albumCompleto = (  ) => {
    
    for (let i=0; i< 1400; i++)
    {
      figcompleto[i] = {"idfigurina":i,"numero":i+1, "trovata":coloremanca, "colore":"#ffffff"}
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
          figcompleto[i].colore = figtrovate[k].colore
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
  mdlPixel.searchAnagraficaDisegno( event.target.name.value );
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
      label: "Totale figurine album 553 ",
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
const initModule = ( container, pUsrConnesso, pOwner) => {
  console.log("initmodule album")
  
  //vOwner = pOwner
  usrConnesso = pUsrConnesso
  objPaziente = usrConnesso
  if (pOwner == false) {
    container.innerHTML = mainHTML;
    const form = document.forms.search;
    form.addEventListener ('submit', search, false);
    document.getElementById('grafico').innerHTML=""
    document.getElementById('infoalbum').innerHTML=""
    document.querySelector('.read-sub').innerHTML = "";
  }
  else
  {
    container.innerHTML = mainHTMLowner;
    albumCompleto();
    mdlPixel.searchDisegnoUtente(pUsrConnesso.idanagrafica)
  }
  

  
  
};


export { initModule};
