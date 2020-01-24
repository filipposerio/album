import * as mdlAlbum    from './mdlAlbum.js';
import * as album from './album.js';
let usrConnesso ={}
let objPaziente = {};


const mainHTMLowner = `
<div class="container-fluid">
  <div id="headerpaziente" class="d-print-none">
    <div class="row" >
      <div class="col" id="info_paziente"></div>
    </div>
  </div>
  <h2 id="infoalbum" align="center" class="read-sub">Elenco degli album che possiedi</h2>
</div>

`;



// eventi da gestire
document.addEventListener( 'searchAlbumUtente', ( event ) => {
    if (event.data != undefined) {
      console.log("Album - event searchAlbumUtente:  creo lista da elenco" + event.data)
  
        listAlbum( event.data );
    }
    else {
      console.log("Album - event searchAnagraficaAlbum:  event.data undefined!!!!!!")
  
      message.show("Album - event searchAnagraficaAlbum: Nessun utente presente.")
      listAlbum([])
    }
  });


  //funzioni locali
const listAlbum = ( rows ) => {
  
    console.log("ALbumUtente - function list: costruisco lista album ")
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
            <div id="${row.idalbumutente}" class="cardpazienti" descrizione="${row.descrizione} " numerofigurine="${row.numerofigurine}">${row.descrizione}  </div>
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
          for (let rowT of tableRows) {
                rowT.addEventListener('click', ( event ) => {
                event.preventDefault();
                event.stopPropagation();
                alert("selezionato album: " + rowT.id )
                console.log("selezionato album: " + rowT.id )
                //mdlAlbum.searchFigurineAlbum(objPaziente.idanagrafica)
                //mdlAlbum.searchFigurineAlbum(row.id)
                let objAlbum ={};
                objAlbum.idalbumutente= rowT.id
                objAlbum.descrizione= rowT.getAttribute("descrizione")
                objAlbum.numerofigurine = rowT.getAttribute("numerofigurine")
                console.log(objAlbum)
                album.initModule( document.querySelector('.container-centrale'),usrConnesso,true,objAlbum);

                });
          //window.scrollTo(0,document.body.scrollHeight);
        }
  };
  

// Export module initModule
const initModule = ( container, pUsrConnesso) => {
    console.log("initmodule album")  
    //vOwner = pOwner
    usrConnesso = pUsrConnesso
    objPaziente = usrConnesso
    container.innerHTML = mainHTMLowner;
//      albumCompleto();
      mdlAlbum.searchAlbumUtente(pUsrConnesso.idanagrafica)
  };
  
  
  export { initModule};