
import * as album from './album.js';
import * as login from './login.js';
import * as message from './message.js';
import * as carrello from './laterale.js';
import * as pixelart from './pixelart.js';

// Module variables
let objUser ={}
const main_html = `

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="navbar-nav"></div>
  </nav>

  
<div class="row">
  <div class="col-80">
  <div align="center" class="display-5 d-print-none" id="sottotitolo"><h1>ALBUM AMICI CUCCIOLOTTI 2019</h1></div>
    <div id="centrale" class="container  container-centrale ">
    </div>
  </div>
  <div class="col-20">
    <div id="laterale" class="container container-destro">
    </div>
  </div>
</div>


          
<div class="shell-modal"></div>
<div class="test"></div>

`;


const navbar_html = `
<ul >
<li class="menuitem" id="home"><a href="#">Home</a></li>
<li class="menuitem"  id="anagrafica"><a href="#anagrafica" id="anagrafica" >Amici</a></li>
<li class="menuitem"  id="albumamici"><a href="#albumamici" id="albumamici" >Album dei tuoi amici</a></li>
<li class="menuitem" id="albumtuo" ><a href="#albumtuo" id="albumtuo" >Il tuo Album</a></li>
<li class="menuitem" id="pixelart" ><a href="#pixelart" id="pixelart" >Il tuo Disegno</a></li>
<li class="menuitem" id="logout" style="float:right"><a id="logout" class="active" href="#lgout">Logout</a></li>
</ul> 
`;


const onClickMenuitem = ( id ) => {
    console.log("SCATTATO ONCLICKMENUITEM")
    switch (id) {
      case "anagrafica": {
        localStorage.contesto = "anagrafica"
        document.getElementById('sottotitolo').innerHTML="Anagrafica"
        pazienti.initModule( document.querySelector('.container-centrale') );
        break;
      }
      case "albumamici": {
        console.log("chiamo la pazienti initmodule")
        localStorage.contesto = "accettazioni"
        //document.getElementById('sottotitolo').innerHTML="ALBUM CUCCIOLOTTI 2019"
        album.initModule( document.querySelector('.container-centrale'),objUser,false);
        break;
      }
      case "albumtuo": {
        console.log("chiamo la pazienti initmodule")
        localStorage.contesto = "accettazioni"
        //document.getElementById('sottotitolo').innerHTML="ALBUM CUCCIOLOTTI 2019"
        album.initModule( document.querySelector('.container-centrale'),objUser,true);
        break;
      }
      case "pixelart": {
        console.log("chiamo la pazienti initmodule")
        localStorage.contesto = "accettazioni"
        //document.getElementById('sottotitolo').innerHTML="ALBUM CUCCIOLOTTI 2019"
        pixelart.initModule( document.querySelector('.container-centrale'),objUser,true);
        break;
      }      
      case "message": {
          console.log("scattato bottone clik message")
        message.show( 'Benvenuti in GlacWeb 2.0');
        break;
      }
      case "logout": {
        console.log("passo dalla logout");
        localStorage.clear();
        login.initModule( document.getElementById('spa'), false );
        break;
      }
    }
};
// Export module initModule
const initModule = ( container, pUsrConnesso ) => {
  console.log("Init module shell.js")
  objUser = pUsrConnesso;
  container.innerHTML = main_html;
  document.querySelector('.navbar-nav').innerHTML = navbar_html;
  localStorage.idanagrafica = "1";
  const li = document.getElementsByClassName( 'menuitem' );
  for (let _li of li) {
        _li.addEventListener(
          "click", ( event ) => {
          console.log("aggiunto onClickmenuitem per ")
          //alert("aggiunto  onClickmenuitem per " + event.currentTarget.id)
          onClickMenuitem( event.currentTarget.id );
          }
      );
  }
  carrello.initModule(objUser.username);
  album.initModule( document.querySelector('.container-centrale'),objUser,true);

}  


export { initModule };
