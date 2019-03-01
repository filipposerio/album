/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')
sio.on( 'aggiornaDisegno', ( result ) => {
  console.log("mdlAlbum - event aggiornAlbum: ritorno : n.elementi: " + result.length)
  console.log(result)
  const event = new CustomEvent('aggiornaAlbum', {bubbles: true, cancelable: true})
  document.dispatchEvent(event)


})

sio.on( 'searchDisegnoUtente', ( result ) => {
  console.log("mdlAlbum - event searchAlbumUtente: ritorno : n.elementi: " + result.length)
  console.log(result)
  const event = new CustomEvent('searchDisegnoUtente', {bubbles: true, cancelable: true})
   if (result.length > 0) {
     event.data = result
   }
   else {
    console.log("mdlAlbum - event searchAlbumUtente: ramo senza recordset....")
     event.data = [];
   }

  document.dispatchEvent( event )


})

sio.on( 'searchAnagraficaDisegno', ( result ) => {
    console.log("mdlAlbum - event searchAnagraficaAlbum: ritorno : n.elementi: " + result.length)
    console.log(result)
    const event = new CustomEvent('searchAnagraficaDisegno', {bubbles: true, cancelable: true})
     if (result.length > 0) {
       event.data = result
     }
     else {
      console.log("mdlAlbum - event searchAnagraficaDisegno: ramo senza recordset....")
       event.data = [];
     }

    document.dispatchEvent( event )


})

const searchAnagraficaDisegno = ( queryString ) => {

  console.log('invio al server la richiesta :searchAnagraficadisegno ' + queryString)

   sio.emit( 'searchAnagraficaDisegno', queryString )
}

const searchDisegnoUtente = ( queryString ) => {

  console.log('invio al server la richiesta :searchDisegnoUtente ' + queryString)

   sio.emit( 'searchDisegnoUtente', queryString )
}
const aggiungiPixel = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiFigurina ' + queryString)
  console.log( queryString)

   sio.emit( 'aggiungiPixel', queryString )
}
const eliminaPixel = ( queryString ) => {

  console.log('invio al server la richiesta :eliminaFigurina ' + queryString)

   sio.emit( 'eliminaPixel', queryString )
}
const pulisciDisegno = ( queryString ) => {

  console.log('invio al server la richiesta :pulisciDisegno ' + queryString)

   sio.emit( 'pulisciDisegno', queryString )
}

export {
  searchAnagraficaDisegno,
  searchDisegnoUtente,
  aggiungiPixel,
  eliminaPixel,
  pulisciDisegno,

}
