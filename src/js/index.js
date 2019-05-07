import { initModule } from './login.js';
  console.log("passo dalla index.js e chiami la initmiodule di shell.js")
  document.addEventListener('DOMContentLoaded', () => {
    console.log("addeventlistener index.js")
    localStorage.clear();
    initModule( document.getElementById('spa'), false );

  }, false);
