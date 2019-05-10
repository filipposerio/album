/*
Import Section
*/
import * as dm      from './dm.js';
import * as message from './message.js';
//import * as model    from './model.js';
import * as utility   from './utility.js';


/*
Body module
*/
let userID;
let objPaziente;
let objAccettazione ={}
let objRicetta = {}
// Module variables


const html = `
<div id="head"></div>
</br>
<div id="paz"></div>
<div id="fig"></div>
<div id="manca"></div>
`;


// function module
const ricetteAccettazione = () => {

  const event = new CustomEvent('selezioneAccettazione', {bubbles: true, cancelable: true})
  let objAccettazione ={}
  objAccettazione.idAccettazione =1;
  event.data=  objAccettazione
  document.dispatchEvent( event )
 
  //alert("chiamo la ricette accettazione")
  //accettazione.fnricetteAccettazione(1); 
  };

  const AccettazioniPaziente = () => {
    const event = new CustomEvent('selezionePazienteAcc', {bubbles: true, cancelable: true})
    event.data=  objPaziente
    document.dispatchEvent( event )
    };



// event 
document.addEventListener( 'aggiornaAlbum', ( event ) => {
  event.preventDefault;
  objPaziente = event.data;
  console.log('scattata la selezionePazienteLat')
  //document.getElementById('laterale').innerHTML =  html;
  //document.getElementById('head').innerHTML = `Riepilogo`;
  document.getElementById('paz').innerHTML = `  
    <button class="btn btn-link btn-sm"  id="elencoaccettazioni1" ><h6>Paziente aa: ${event.data.cognome}</h6></button>
    </br>
    </br>
    <div id="acc"></div>
  `; 
  const btn_acc1 = document.getElementById('elencoaccettazioni1')
  //alert(btn_acc1.id)
  btn_acc1.addEventListener('click',AccettazioniPaziente,false);
});
document.addEventListener( 'selezioneAccettazioneLat', ( event ) => {
  event.preventDefault;
  objAccettazione = event.data;
  console.log('scattata la selezioneAccettazioneLat')
  //document.getElementById('all').innerHTML =  ``;
  document.getElementById('acc').innerHTML =  
  `<button id="btn_acc_lat" class="btn btn-link btn-sm"><h6>Accettazione N.  ${event.data.idAccettazione} </h6> </button>
  </br>
  </br>
  <div id="ric"></div>
  <div id="esm"></div>
  <div id="rpl"><button>Concludi accettazione</button></div>  
  `;
  const btn_acc = document.getElementById('btn_acc_lat')
  btn_acc.addEventListener('click',ricetteAccettazione,false);

});
document.addEventListener( 'selezioneRicettaLat', ( event ) => {
  event.preventDefault;
  objRicetta = event.data;
    document.getElementById('ric').innerHTML =  `<button id="acccselezionata" class="btn btn-link btn-sm"><h6>Ricetta N.  ${event.data.nricetta} </h6> </button> `;
});




// Export module initModule
const initModule = ( usrConnesso ) => {
 console.log("initmodule laterale ")
 document.getElementById('laterale').innerHTML = html;

 document.getElementById('paz').innerHTML = 'Utente connesso: ' + usrConnesso;

 
};

// Export module initModule
const figurineMancanti = (trovate,mancanti, elenco ) => {
  console.log("initmodule laterale ")
  document.getElementById('fig').innerHTML = '<p>numero mancanti: ' + mancanti+'</p><p> numero trovate:' + trovate+ '</p>';
  console.log("laterale: ")
  console.log(elenco[1])
  const html = `
  <p><b> Elenco figurina mancanti</b></p>
    <p>
       ${elenco.map(row => `
          ${row.numero}
          `
          ).join('')}
     </p>
     `
  document.getElementById('manca').innerHTML = html;
  
 };
 
 const listafigurineMancanti = (elenco) => {
  console.log("initmodule laterale ")
  document.getElementById('manca').innerHTML = '<p>' + elenco+'</p>';
 
  
 };
export { initModule, figurineMancanti };
