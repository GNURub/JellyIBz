var port = process.env.PORT || 8080;
var io = require('socket.io').listen(port);
var green = "img/greenFlag.png"
, jelly = "img/jelly.png"
, red ="img/yellowRedFlag.png";
var beaches; 
function defaultBeachs(){
	beaches={
	0:{name : "Ses Figueretes", latitud : 38.902990018656126, longitud: 1.4216995239257812, descriptin: null, photos : null, icon : green},
	1:{name : "Platja d'en Bossa", latitud : 38.885053, longitud : 1.407709, descriptin: null, photos : null, icon : green},
	2:{name : "Es Cavallet", latitud : 38.83796939284866, longitud :1.4038467407226562, descriptin: null, photos : null, icon : green},
	3:{name : "Ses Salines", latitud : 38.84024244214068,longitud :1.3923454284667969, descriptin: null, photos : null, icon : green},
	4:{name : "Sa Caleta", latitud : 38.86617680355024,longitud : 1.318359375, descriptin: null, photos : null, icon : green},
	5:{name : "Cala Jondal", latitud : 38.867379714496565,longitud : 1.3150978088378906, descriptin: null, photos : null, icon : green},
	6:{name : "Es Bol Nou", latitud : 38.867847507701114,longitud : 1.3109779357910156, descriptin: null, photos : null, icon : green},
	7:{name : "Es Xarco", latitud : 38.862367451275695,longitud : 1.30462646484375, descriptin: null, photos : null, icon : green},
	8:{name : "Es Cubells", latitud : 38.8683152978274,longitud : 1.2591361999511719, descriptin: null, photos : null, icon : green},
	9:{name : "Cala D'Hort", latitud : 38.89023115500578,longitud : 1.2234306335449219, descriptin: null, photos : null, icon : green},
	10:{name : "Cala Carbó", latitud : 38.89437302694244, longitud : 1.2178516387939453, descriptin: null, photos : null, icon : green},
	11:{name : "Cala Vadella", latitud : 38.91360952318701,longitud :1.2236881256103516, descriptin: null, photos : null, icon : green},
	12:{name : "Cala Molí", latitud : 38.929753, longitud : 1.232935, descriptin: null, photos : null, icon : green},
	13:{name : "Cala Tarida", latitud : 38.940585268033,longitud : 1.2351036071777344, descriptin: null, photos : null, icon : green},
	14:{name : "Cala Xarraca", latitud : 39.098236,longitud : 1.498238, descriptin: null, photos : null, icon : green},
	15:{name : "Cala Codolar", latitud : 38.949597153452835,longitud : 1.2268638610839844, descriptin: null, photos : null, icon : green},
	16:{name : "Cala Bassa", latitud : 38.968017887160684,longitud : 1.2404251098632812 , descriptin: null, photos : null, icon : green},
	17:{name : "Port des Torrent", latitud : 38.966749946659675, longitud :1.2679767608642578, descriptin: null, photos : null, icon : green},
	18:{name : "Es Pouet", latitud : 38.97028677667571,longitud :1.3033390045166016, descriptin: null, photos : null, icon : green},
	19:{name : "S'Arenal", latitud : 1.3033390045166016,longitud : 1.3074588775634766, descriptin: null, photos : null, icon : green},
	20:{name : "Caló des Moro", latitud : 38.992237864985896,longitud : 1.2892627716064453, descriptin: null, photos : null, icon : green},
	21:{name : "Cala Gració", latitud : 38.991971023322954,longitud : 1.2897777557373047, descriptin: 1.2958717346191406, photos : null, icon : green},
	22:{name : "Sa Galera", latitud : 39.00251050399369,longitud :1.2906360626220703, descriptin: null, photos : null, icon : green},
	23:{name : "Cala Salada", latitud : 39.00951372097653,longitud : 1.298532485961914, descriptin: null, photos : null, icon : green},
	24:{name : "Es Pas de s'Illa des Bosc", latitud : 39.08523752252324,longitud : 1.4373207092285156, descriptin: null, photos : null, icon : green},
	25:{name : "Port de Sant Miquel", latitud : 39.080973550948194,longitud : 1.4400672912597656, descriptin: null, photos : null, icon : green},
	26:{name : "Cala Benirrás", latitud : 39.08790237387826,longitud : 1.4445304870605469, descriptin: null, photos : null, icon : green},
	27:{name : "Cala Portinatx", latitud : 39.11008335334396,longitud : 1.5123367309570312, descriptin: null, photos : null, icon : green},
	28:{name : "Cala d'en Serra", latitud : 39.107286136899255,longitud : 1.5373992919921875, descriptin: null, photos : null, icon : green},
	29:{name : "Cala Sant Vicent", latitud : 39.07517680129286,longitud : 1.5925884246826172, descriptin: null, photos : null, icon : green},
	30:{name : "Aguas Blancas", latitud : 39.06264886527909,longitud : 1.5883827209472656, descriptin: null, photos : null, icon : green},
	32:{name : "Es Figueral", latitud : 39.05225165582583,longitud : 1.5947341918945312, descriptin: null, photos : null, icon : green},
	33:{name : "Es Pou des Lleó", latitud : 39.03465289074216,longitud :1.6089820861816406, descriptin: null, photos : null, icon : green},
	34:{name : "Cala Boix", latitud : 39.02905236430158,longitud : 1.6080379486083984, descriptin: null, photos : null, icon : green},
	35:{name : "Cala Mastella", latitud : 39.02411819950234,longitud : 1.5958499908447266, descriptin: null, photos : null, icon : green},
	36:{name : "Cala Llenya", latitud : 39.015249172674714, longitud :1.5852069854736328, descriptin: null, photos : null, icon : green},
	37:{name : "Cala Nova", latitud : 39.00837991383762,longitud : 1.5823745727539062, descriptin: null, photos : null, icon : green},
	38:{name : "Platja d'es Canar", latitud : 39.002035, longitud : 1.578232, descriptin: null, photos : null, icon : green},
	39:{name : "Cala Martina", latitud : 38.989102411906565,longitud : 1.5791130065917969, descriptin: null, photos : null, icon : green},
	40:{name : "S'Argamassa", latitud : 38.99030324013564,longitud : 1.5758514404296875, descriptin: null, photos : null, icon : green},
	41:{name : "Cala Pada", latitud : 38.993238512261584,longitud : 1.561431884765625, descriptin: null, photos : null, icon : green},
	42:{name : "Es Niu Blau", latitud : 38.9921044442802,longitud : 1.5521621704101562, descriptin: null, photos : null, icon : green},
	43:{name : "Platja de Santa Eulària des Riu", latitud : 38.98256421192973,longitud : 1.534738540649414, descriptin: null, photos : null, icon : green},
	44:{name : "Cala Llonga", latitud : 38.952667608284266,longitud : 1.5210914611816406, descriptin: null, photos : null, icon : green},
	45:{name : "S'Estanyol", latitud : 38.92509550020356,longitud : 1.4871025085449219, descriptin: null, photos : null, icon : green},
	46:{name : "Talamanca", latitud : 38.9163476283396,longitud : 1.454916000366211, descriptin: null, photos : null, icon : green},
	47:{name : "Cala Conta", latitud : 38.962229,longitud : 1.219758, descriptin: null, photos : null, icon : green}
	}
	return beaches;
};
defaultBeachs();
io.sockets.on('connection', function (socket) {
	socket.emit("beaches", beaches);
	socket.on("changeBeach", function (id) {
		switch(beaches[id].icon) {
			case green:
				beaches[id].icon = jelly;
				break;
			case jelly:
				beaches[id].icon = red;
				break;
			case red:
				beaches[id].icon = green;
				break;
		}
		io.sockets.emit("beaches", beaches);
		return beaches;
	});
	setInterval(defaultBeachs, 86400000);
});