/*
Import Section
*/
import { socket } from './socket.js'
/*
Body module
*/

const sio = socket('/')
sio.on( 'aggiornaAlbum', ( result ) => {
  console.log("mdlAlbum - event aggiornAlbum: ritorno : n.elementi: " + result.length)
  console.log(result)
  const event = new CustomEvent('aggiornaAlbum', {bubbles: true, cancelable: true})
  document.dispatchEvent(event)


})

sio.on( 'searchFigurineAlbum', ( result ) => {
  console.log("mdlAlbum - event searchFigurineAlbum: ritorno : n.elementi: " + result.length)
  console.log(result)
  const event = new CustomEvent('searchFigurineAlbum', {bubbles: true, cancelable: true})
   if (result.length > 0) {
     event.data = result
   }
   else {
    console.log("mdlAlbum - event searchFigurineAlbum: ramo senza recordset....")
     event.data = [];
   }

  document.dispatchEvent( event )


})
sio.on( 'searchAlbumUtente', ( result ) => {
  console.log("mdlAlbum - event searchAlbumUtente: ritorno : n.elementi: " + result.length)
  console.log(result)
  const event = new CustomEvent('searchAlbumUtente', {bubbles: true, cancelable: true})
   if (result.length > 0) {
     event.data = result
   }
   else {
    console.log("mdlAlbum - event searchAlbumUtente: ramo senza recordset....")
     event.data = [];
   }

  document.dispatchEvent( event )


})

sio.on( 'searchAnagraficaAlbum', ( result ) => {
    console.log("mdlAlbum - event searchAnagraficaAlbum: ritorno : n.elementi: " + result.length)
    console.log(result)
    const event = new CustomEvent('searchAnagraficaAlbum', {bubbles: true, cancelable: true})
     if (result.length > 0) {
       event.data = result
     }
     else {
      console.log("mdlAlbum - event searchAnagraficaAlbum: ramo senza recordset....")
       event.data = [];
     }

    document.dispatchEvent( event )


})

const searchAnagraficaAlbum = ( queryString ) => {

  console.log('invio al server la richiesta :searchAnagraficaAlbum ' + queryString)

   sio.emit( 'searchAnagraficaAlbum', queryString )
}

const searchFigurineAlbum = ( queryString ) => {

  console.log('invio al server la richiesta :searchFigurineAlbum ' + queryString)

   sio.emit( 'searchFigurineAlbum', queryString )
}
const searchAlbumUtente = ( queryString ) => {

  console.log('invio al server la richiesta :searchAlbumUtente ' + queryString)

   sio.emit( 'searchAlbumUtente', queryString )
}
const aggiungiFigurina = ( queryString ) => {

  console.log('invio al server la richiesta :aggiungiFigurina ' + queryString)

   sio.emit( 'aggiungiFigurina', queryString )
}
const eliminaFigurina = ( queryString ) => {

  console.log('invio al server la richiesta :eliminaFigurina ' + queryString)

   sio.emit( 'eliminaFigurina', queryString )
}

export {
  searchAnagraficaAlbum,
  searchAlbumUtente,
  aggiungiFigurina,
  eliminaFigurina,
  searchFigurineAlbum

}
