var
conf = require('./config.js'),

pgdb = require('./datiPgDb.js');
module.exports = {
  searchFigurineAlbum: function  (user_map, socket,msg) {
    console.log("scattata la elenco pazienti lato server");
    console.log(user_map)
    //const qry = "select * from figurine  where idanagrafica= '" + user_map +"' order by numero"
    const qry = "select * from figurine  where idalbumutente= '" + user_map +"' order by numero"
    console.log(qry)
    pgdb.read(qry,function (err,result) {
      if (err) {
        console.log("searchFigurineAlbum: errore: " + err)
        socket.emit(msg, "")
      }
      else {
        console.log('ok ritorno read')
        console.log(result)
          if (result.rowCount > 0) {
              console.log("searchFigurineAlbum: trovate figurine. Le passo al client ")
              socket.emit(msg, result.rows)
            }
            else {
              console.log("searchFigurineAlbum: non trovate figurine. Passo al client elenco vuoto")
              socket.emit(msg,"")
            }
        }
    });

  },
  searchAlbumUtente: function  (user_map, socket,msg) {
    console.log("scattata la elecno album per utente lato server");
    console.log(user_map)
    const qry = "select * from albumutente a, album b  where a.idanagrafica= '" + user_map +"' and b.idalbum=a.idalbum order by b.descrizione"
    console.log(qry)
    pgdb.read(qry,function (err,result) {
      if (err) {
        console.log("searchPerUtente: errore: " + err)
        socket.emit(msg, "")
      }
      else {
        console.log('ok ritorno read')
        console.log(result)
          if (result.rowCount > 0) {
              console.log("searchPerUtente: trovate figurine. Le passo al client ")
              socket.emit(msg, result.rows)
            }
            else {
              console.log("searchPerUtente: non trovate figurine. Passo al client elenco vuoto")
              socket.emit(msg,"")
            }
        }
    });

  },
  searchPerUtente: function  (user_map, socket,msg) {
    console.log("scattata la elecno pazienti lato server");
    console.log(user_map)
    const qry = "select * from figurine where idanagrafica= '" + user_map +"' order by numero"
    console.log(qry)
    pgdb.read(qry,function (err,result) {
      if (err) {
        console.log("searchPerUtente: errore: " + err)
        socket.emit(msg, "")
      }
      else {
        console.log('ok ritorno read')
        console.log(result)
          if (result.rowCount > 0) {
              console.log("searchPerUtente: trovate figurine. Le passo al client ")
              socket.emit(msg, result.rows)
            }
            else {
              console.log("searchPerUtente: non trovate figurine. Passo al client elenco vuoto")
              socket.emit(msg,"")
            }
        }
    });

  },
aggiungiFigurina: function  (user_map, socket) {
console.log(user_map)
//const param = JSON.parse(user_map);
//console.log(param)

const qry = "insert into figurine  (idanagrafica,idalbumutente,numero) values ('" + user_map.idanagrafica+"','"+user_map.idalbumutente+"','"+ user_map.numero+"')";
console.log(qry)
pgdb.write(qry,function (err,result) {
  if (err) {
    console.log(err)
    socket.emit("aggiornaAlbum", "KO")
  }
  else {
    
    console.log(result)
    if (result.hasOwnProperty('rowCount')) {
        if (result.rowCount > 0) {
          console.log('ko ritorno insert')
         socket.emit("aggiornaAlbum", "OK")
       }
    }
    else {
      console.log('ok ritorno insert')
      socket.emit("aggiornaAlbum","KO")
    }
  }
});
},
eliminaFigurina: function  (user_map, socket) {
console.log(user_map)
//const param = JSON.parse(user_map);
//console.log(param)

const qry = "delete from figurine  where idalbumutente ='" + user_map.idalbumutente+"' and numero = '"+ user_map.numero+"'";
console.log(qry)
pgdb.write(qry,function (err,result) {
  if (err) {
    console.log(err)
    console.log('ko ritorno delete')
    socket.emit("aggiornaAlbum", "KO")
  }
  else {
    console.log('ok ritorno delete')
    //console.log(result)
    if (result.hasOwnProperty('rowCount')) {
        if (result.rowCount > 0) {
         socket.emit("aggiornaAlbum", "OK")
       }
    }
    else {
      socket.emit("aggiornaAlbum","KO")
    }
  }
});
}
}
