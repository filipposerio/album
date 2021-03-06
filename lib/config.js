var vconfigMSSQL = {
	user: "sa",
	password: "sa",
	server: "UTENTE1-PC", // You can use 'localhost\\instance' to connect to named instance
	database: "dbconsorzio",
	options: {
			//encrypt: true // Use this if you're on Windows Azure
	}
}

var vconfigMARIADB  = {
	host: 'localhost',
	database: 'glac',
	user:'root',
	password:'12345678',
	multipleStatements: true,
	dateStrings: true
	}
var vSeparatoreCampi = "|";

var vconfigGlobale = {
	host: 'localhost',
	database: 'mysql',
	user:'root',
	password:'12345678'
	}

/*
var vconfigGlobale = {
	user: "sa",
	password: "sa",
	server: "UTENTE1-PC", // You can use 'localhost\\instance' to connect to named instance
	database: "dbconsorzio",

	options: {encrypt: false,instanceName: "SQLEXPRESS"
			//encrypt: true // Use this if you're on Windows Azure
	}
}
*/

/*var vconfigGlobale = {
	user: "sa",
	password: "12345678$",
	server: "PAW10PCEDFS", // You can use 'localhost\\instance' to connect to named instance
	database: "sailstest",

	options: {encrypt: false,instanceName: "SQLEXPRESS"
			//encrypt: true // Use this if you're on Windows Azure
	}
}
*/



var  c_esami = [
	{"idSQL":"3625","idMek":"WBC"},
	{"idSQL":"3617","idMek":"RBC"},
	{"idSQL":"3622","idMek":"MCHC"},
	{"idSQL":"3619","idMek":"HCT"},
	{"idSQL":"3620","idMek":"MCV"},
	{"idSQL":"3621","idMek":"MCH"},
	{"idSQL":"3640","idMek":"PCT"},
	{"idSQL":"3618","idMek":"HGB"},
	{"idSQL":"3624","idMek":"RDW-CV"},
	{"idSQL":"3623","idMek":"RDW-SD"},
	{"idSQL":"3637","idMek":"MPV"},
	{"idSQL":"3639","idMek":"PDW"},
	{"idSQL":"3636","idMek":"PLT"},
	{"idSQL":"3638","idMek":"P-LCR"},
	{"idSQL":"3624","idMek":"RDW-CV"},
	{"idSQL":"DIFF","idMek":"HIST_WBC"},
	{"idSQL":"A01","idMek":"HIST_RBC"},
	{"idSQL":"A02","idMek":"HIST_PLT"},
	{"idSQL":"3626","idMek":"NE%"},
	{"idSQL":"3627","idMek":"LY%"},
	{"idSQL":"3628","idMek":"MO%"},
	{"idSQL":"3629","idMek":"EO%"},
	{"idSQL":"3630","idMek":"BA%"},
	{"idSQL":"3631","idMek":"NE"},
	{"idSQL":"3632","idMek":"LY"},
	{"idSQL":"3633","idMek":"MO"},
	{"idSQL":"3634","idMek":"EO"},
	{"idSQL":"3635","idMek":"BA"},
	{"idSQL":"9910","idMek":"SCATT_L1"},
	{"idSQL":"9911","idMek":"SCATT_L2"},
    {"idSQL":"9912","idMek":"SCATT_L3"}];



var c_barcode_db = [{"idBarcode":"001", dbname:"sailstest"},{"idBarcode":"002", dbname:"sailstest"},{"idBarcode":"003", dbname:"sailstest"}];


module.exports = {
  fnesami: function() {
        return c_esami;
    },
  fnBarcodeDb: function(){
        return c_barcode_db;
	},
	fnDatabase: function()  {
		return vconfigGlobale;
	},
	fnDatabaseMSSQL: function()  {
		return vconfigMSSQL;
	},
	fnDatabaseMARIADB: function()  {
		return vconfigMARIADB;
	},

	fnSeparatoreCampi: function() {
		return vSeparatoreCampi;
	}



};
