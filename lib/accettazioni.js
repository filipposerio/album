var
conf = require('./config.js'),
//mdb = require('./datiMariaDb.js');
//mssqldb = require('./datiMSSQL.js');
pgdb = require('./datiPgDb.js');

module.exports = {
 totaleRicetteAccettazione: function ( accettazione_map, socket )  {
    const qry = "select sum(tricetta) TRICETTE,sum(tassistito) TASSITITO from ricette where idaccettazione = " + accettazione_map.idAccettazione
    pgdb.read(qry,function (err,result) {
      if (err) {
        socket.emit("totaleRicetteAccettazione", "")
      }
      else {
        if (result != undefined) {
          console.log(result.length)
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("totaleRicetteAccettazione", result)
            }
            else {
              socket.emit("totaleRicetteAccettazione","")
            }
          }
          else {
           socket.emit("totaleRicetteAccettazione", result)
          }
        }
        else {
          socket.emit("totaleRicetteAccettazione","")
        }
      }
    });
  },
  
  totalePrivatoAccettazione: function (accettazione_map, socket) {
    const lconfig = conf.fnDatabase();
    const qry = "select sum(tesame) TPRIVATO from esamiPaziente where idaccettazione =  '" + accettazione_map.idAccettazione + "' and idPrescrizione is null order by idaccettazione"
    pgdb.read(qry,function (err,result) {
      if (err) {
        socket.emit("totalePrivatoAccettazione", "")
      }
      else {
        if (result != undefined) {
          console.log(result.length)
          if (result.hasOwnProperty('rowsAffected')) {
            if (result.rowsAffected > 0) {
              socket.emit("totalePrivatoAccettazione", result)
            }
            else {
              socket.emit("totalePrivatoAccettazione","")
            }
          }
          else {
           socket.emit("totalePrivatoAccettazione", result)
          }
        }
        else {
          socket.emit("totalePrivatoAccettazione","")
        }
      }
    });

  },


  riepilogoContabileAccettazione: function (accettazione_map, socket) {
    const lconfig = conf.fnDatabase();
    const qry = "update accettazioni set TOTALELORDO="+accettazione_map.totaleLordo+", TOTALENETTO=0 where idaccettazione="+accettazione_map.idAccettazione
    console.log(qry)

    pgdb.write(qry,function (err,result) {
      if (err) {
        socket.emit("riepilogoContabileAccettazione", "KO")
      }
      else {
        if (result != undefined) {
           socket.emit("riepilogoContabileAccettazione", "OK")
        }
        else {
          socket.emit("riepilogoContabileAccettazione","KO")
        }
      }
    });
  },

 searchAccettazioniPazienteOld: function (user_map, socket) {
  const lconfig = conf.fnDatabase();
    const qry = "select * from Accettazioni where idanagrafica =  '" + user_map + "' order by idaccettazione"
    pgdb.read(qry,function (err,result) {
      if (err) {
        socket.emit("searchAccettazioniPaziente", "")
      }
      else {
        socket.emit("searchAccettazioniPaziente", result)
      }
    });
  },
  
  createAccettazione: function (user_map, socket)  {

                const lconfig = conf.fnDatabase();
                const qry = "insert into accettazioni (dataAccettazione, idanagrafica, idErogatore) values ('" + user_map.dataAccettazione+"','"+ user_map.idanagrafica+"','"+ user_map.idErogatore+"')"

                pgdb.write(qry,function (err,result) {
                  if (err) {
                    socket.emit("createaccettazione", "KO")
                  }
                  else {
                    if (result.rowsAffected > 0) {
                       socket.emit("createaccettazione", "OK")
                    }
                    else {
                      socket.emit("createaccettazione","KO")
                    }
                  }
                });
    },

    searchEsamiPrivato: function (user_map, socket)  {
      const lconfig = conf.fnDatabase();
        const qry = "select *,IFNULL(c.NRICETTA,'SENZA RICETTA') NRICETTA from  prestazionilab b, EsamiPaziente a left join ricette c on c.idricetta=a.idprescrizione where  a.idprestazione = b.idprestazione and  a.idaccettazione =  '" + user_map + "'  and a.idprescrizione is null order by nricetta;"
        pgdb.read(qry,function (err,result) {
          if (err) {
            socket.emit("searchEsamiPrivato", "")
          }
          else {
            console.log('ok ritorno read searchEsamiPrivato')
            //console.log(re
            if (result != undefined) {
              if (result.hasOwnProperty('rowsAffected')) {
                if (result.rowsAffected > 0) {
                  socket.emit("searchEsamiPrivato", result)
                }
                else {
                  socket.emit("searchEsamiPrivato","")
                }
              }
              else {
               socket.emit("searchEsamiPrivato", result)
              }
            }
            else {
              socket.emit("searchEsamiPrivato","")
            }
          }
        });
      },

    searchEsamiPazienteOld: function  (user_map, socket) {
      const lconfig = conf.fnDatabase();
        const qry = "select * from  prestazionilab b, EsamiPaziente a left join ricette c on c.idricetta=a.idprescrizione where  a.idprestazione = b.idprestazione and  a.idaccettazione =  '" + user_map + "' order by nricetta;"
        pgdb.read(qry,function (err,result) {
          if (err) {
            socket.emit("searchEsamiPaziente", "")
          }
          else {
            socket.emit("searchEsamiPaziente", result)
          }
        });
      },
      
     insertEsamiPazienteMulti: function (user_map, socket,msg)  {

        const lconfig = conf.fnDatabase();
        let qry = "insert into esamipaziente (idaccettazione,idprescrizione,idpaziente, idprestazione,tesame,ordine) values ";
        let qryp2  =""
        for (let j=0; j<user_map.length; j++) {
          qryp2 = qryp2 + "('"+user_map[j].idAccettazione+"',"+ (user_map[j].idRicetta === '' ? null : "'"+user_map[j].idRicetta+"'") +",'"+ user_map[j].idPaziente+"','"+ user_map[j].idPrestazione+"','"+ user_map[j].tEsame+"','1')"
          if (j != user_map.length -1) {
            qryp2 = qryp2+','
          }

        }
        qry = qry+qryp2;
        pgdb.write(qry,function (err,result) {
          if (err) {
            socket.emit(msg, "KO")
          }
          else {
            if (result.rowsAffected > 0) {
               socket.emit(msg, "OK")
            }
            else {
              socket.emit(msg,"KO")
            }
          }
        });
      },

      insertEsamiPaziente:function  (user_map, socket,msg) {

                    const lconfig = conf.fnDatabase();
                    const qry = "insert into esamipaziente (idaccettazione,idprescrizione,idpaziente, idprestazione,tesame,ordine) values ('" + user_map.idAccettazione+"',"+ (user_map.idRicetta === '' ? null : "'"+user_map.idRicetta+"'") +",'"+ user_map.idPaziente+"','"+ user_map.idPrestazione+"','"+ user_map.tEsame+"','1')"
                    pgdb.write(qry,function (err,result) {
                      if (err) {              
                        socket.emit(msg, "KO")
                      }
                      else {
                        if (result.rowsAffected > 0) {
                           socket.emit(msg, "OK")
                        }
                        else {
                          socket.emit(msg,"KO")
                        }
                      }
                    });
        },

         eliminaEsameAccettazione: function (esame_map, socket)  {
          const lconfig = conf.fnDatabase();
         const qry = "delete from EsamiPaziente where idEsamePaziente ='" + esame_map.idEsamePaziente+"'"
          pgdb.write(qry,function (err,result) {
            if (err) {
              socket.emit("eliminaEsameAccettazione", "KO")
            }
            else {

              if (result.affectedRows > 0) {
                 socket.emit("eliminaEsameAccettazione", "OK")
              }
              else {
                socket.emit("eliminaEsameAccettazione","KO")
              }
            }
          });
        }
  };


  
  
  const searchAccettazioniPaziente = (user_map, socket) => {    
    const qry = "select * from Accettazioni where idanagrafica =  '" + user_map + "' order by idaccettazione"
    pgdb.read(qry,function (err,result) {
      if (err) {
        socket.emit("searchAccettazioniPaziente", "")
      }
      else {
        socket.emit("searchAccettazioniPaziente", result)
      }
    });
  }

  module.exports = {searchAccettazioniPaziente}