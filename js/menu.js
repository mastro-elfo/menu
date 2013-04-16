// app info
var app_info = {
	version: '0.0.8a',
	authors: {
		0: {
			name: 'Francesco Michienzi',
			email: 'francesco.209@gmail.com'
		}
	}
};

// options
var options = {};

// dish type
var dish_type = {
	4: {
		name: 'Antipasti'
	},
	1: {
		name: 'Primi'
	},
	2: {
		name: 'Secondi'
	},
	3: {
		name: 'Contorni'
	},
	7: {
		name: 'Pizze'
	},
	6: {
		name: 'Dolci'
	},
	5: {
		name: 'Bevande'
	}
}

dish_suggestion = [
	'Antipasto toscano',
	'Antipasto di formaggi',
	'Antipasto misto',
	'Acqua',
	'Birra',
	'Caprese',
	'Ciliegini mozzarella e basilico',
	'Hamburger',
	'Hamburger di seitan',
	'Insalata',
	'Insalatona',
	'Patate',
	'Patate arrosto',
	'Patate grigliate',
	'Patate lesse',
	'Pasta ai funghi',
	'Pasta al pesto',
	'Pasta al ragù',
	'Pasta all\'amatriciana',
	'Pasta all\'arrabbiata',
	'Pasta alla boscaiola',
	'Pizza',
	'Pizza margherita',
	'Schiacciata',
	'Seitan',
	'Seitan arrosto',
	'Tofu',
	'Tofu alla piastra',
	'Tofu arrosto',
	'Torta del nonno',
	'Torta della nonna',
	'Tiramisù',
	'Vino',
	'Vino bianco',
	'Vino rosso'
];

window.addEvent('domready', function() {
	// open wait load window
	
	// load general options
	options['main'] = new HTML5.storage({
		storageName: 'main',
		storageType: 'local',
	}).load();
	
	// load dishes
	options['dishes'] = new HTML5.storage({
		storageName: 'dishes',
		storageType: 'local',
	}).load();
	
	// load menu
	options['menus'] = new HTML5.storage({
		storageName: 'menus',
		storageType: 'local',
	}).load();
	
	options['today'] = new HTML5.storage({
		storageName: 'today',
		storageType: 'local'
	}).load();
	
	options['advertising'] = new HTML5.storage({
		storageName: 'advertising',
		storageType: 'local'
	}).load();
	
	// carico le schermate
	var o = '<ul id="monitor-mainmenu">';
	var ol = {};
	options['today'].each(function(item, i){
		if(typeof(options['dishes'].get(item.name)) === 'undefined') {
			return;
		}
		
		typeof(ol[options['dishes'].get(item.name).type]) === 'undefined' ? (ol[options['dishes'].get(item.name).type] = '') : 0;
		var dish = options['dishes'].get(item.name);
		ol[dish.type] += '<li class="'+(item.status<2?(item.status==1?'monitor-dishfew':'monitor-dishend'):'')+'" onclick="setDishStatus(&quot;'+i+'&quot;, this);">'+dish.name+' '+(dish.cost?dish.cost+'&euro;':'')+' '+(dish.img?'<img src="custom/img/'+dish.img+'" alt="'+dish.img+'" class="monitor-thumbnail"/>':'')+'</li>';
	});
	for (var i in dish_type) {
		if (typeof(ol[i])!=='undefined') {
			o += '<li><h1>'+dish_type[i].name+'</h1><ul>';
				o += ol[i];
			o += '</ul></li>';
		}
	}
	o += '</ul>'
	
	o += '<div class="clearBoth"/>';
	
	var ol = '';
	options['advertising'].each(function(item){
		if(item.name) {
			ol += '<li><img src="custom/img/'+item.name+'" alt="File custom/img/'+item.name+' non trovato"/></li>';
		}
	});
	if (ol && ol != '') {
		o += '<ul id="monitor-advertising">';
			o += ol;
		o += '</ul>';
	}
	
	$('screen-monitor').set('html', o);
	
	var o = '';
	o += '<ul id="config-mainmenu">';
		o += '<li id="config-todaysmenu">';
			o += '<h1>Menù del giorno</h1>';
			o += '<table>';
				var ol = {};
				options['today'].each(function(item, i){
					if(typeof(options['dishes'].get(item.name)) === 'undefined') {
						// alert(item.name)
						return;
					}
					typeof(ol[options['dishes'].get(item.name).type]) === 'undefined' ? (ol[options['dishes'].get(item.name).type] = '') : 0;
					ol[options['dishes'].get(item.name).type] += '<tr onclick="options[\'today\'].remove(&quot;'+i+'&quot;);location.reload()">';
						ol[options['dishes'].get(item.name).type] += '<td>'+options['dishes'].get(item.name).name+'</td> <td>'+dish_type[options['dishes'].get(item.name).type].name+'</td>';
					ol[options['dishes'].get(item.name).type] += '</tr>';
				});
				for (var i in dish_type) {
					if (typeof(ol[i])!=='undefined') {
						o += ol[i];
					}
				}
				o += '<tr><td></td><td></td><td><div class="config-button" onclick="if(confirm(\'Sei sicuro di voler eliminare il menù del giorno? La modifica è permanente.\')){options[\'today\'].clear();location.reload()}">del all</div></td></tr>';
			o += '</table>';
			o += '<table>';
				options['dishes'].each(function(item, i) {
					if (!options['today'].get(i)) {
						o += '<tr onclick="options[\'today\'].set(\''+i+'\', {name: \''+i+'\',status: 2});location.reload()">';
							o += '<td>'+item.name+'</td> <td>'+dish_type[item.type].name+'</td>';
						o += '</tr>';
					}
				});
			o += '</table>';
			o += '<div class="clearBoth"/>'
		o += '</li>';
		o += '<li>';
			o += '<h1>Piatti</h1>';
			o += '<table>';
				o += '<tr>';
					o += '<td><input id="config-newdishname" placeholder="Scrivi il nome del piatto" list="dishlist"/></td> <td>'+getDishTypeSelectString('', 'config-newdishtype')+'</td> <td><input class="config-dishcost" id="config-newdishcost" placeholder="&euro;"/></td> <td><input type="file" class="config-dishimg" id="config-newdishimg" onchange="$(\'config-newdishthumb\').set(\'src\', \'custom/img/\'+event.target.value)"/><img src="" alt="icon" id="config-newdishthumb" class="config-dishthumb" onclick="$(\'config-newdishimg\').click()"/></td> <td colspan="2"><div class="config-button" onclick="setDish();location.reload()">set</div></td>'
				o += '<tr>';
				options['dishes'].each(function(item, key) {
					o += '<tr>';
						o += '<td><input id="config-dishname-'+key+'" value="'+item.name+'"/></td> <td>'+getDishTypeSelectString(item.type, 'config-dishtype-'+key)+'</td> <td><input class="config-dishcost" id="config-dishcost-'+key+'" placeholder="&euro;" value="'+(typeof(item.cost)!=='undefined'?item.cost:'')+'"/></td> <td><input type="file" class="config-dishimg" id="config-dishimg-'+key+'" onchange="$(\'config-dishthumb-'+key+'\').setAttribute(\'src\', \'custom/img/\'+event.target.value)"/> <img src="'+(typeof(item.img)!=='undefined'?'custom/img/'+item.img:'')+'" alt="icon&nbsp;&nbsp;&nbsp;" id="config-dishthumb-'+key+'" class="config-dishthumb" onclick="$(\'config-dishimg-'+key+'\').click()"/> <div class="config-button config-button-delete" onclick="$(\'config-dishimg-'+key+'\').value=\'\';$(\'config-dishthumb-'+key+'\').set(\'src\', \'\');">X</div></td> <td><div class="config-button" onclick="setDish(\''+key+'\');location.reload()">set</div></td> <td><div class="config-button" onclick="if(confirm(\'Vuoi davvero eliminare il piatto &quot;'+(item.name.replace('\'', '\\\''))+'&quot;? La modifica è permanente.\')){deleteDish(\''+key+'\');location.reload()}">del</div></td>'
					o += '</tr>';
				});
				o += '<tr>';
					o += '<td colspan="4"></td> <td colspan="2"><div class="config-button" onclick="if(confirm(\'Vuoi davvero eliminare tutti i piatti salvati? La modifica è permanente e comporta la perdita anche del menù.\')){options[\'dishes\'].clear();options[\'today\'].clear();location.reload()}">del all</div></td>'
				o += '<tr>';
			o += '</table>';
		o += '</li>';
		o += '<li>';
			o += '<h1>Pubblicità</h1>';
			o += '<table id="config-advertisingtable">';
				var advertising = options['advertising'].get('config-advertisinginput-1');
				typeof(advertising) === 'undefined'? advertising = {name: ''} : 0;
				o += '<tr>';
					o += '<td>1</td>';
					o += '<td><input type="file" placeholder="Scegli un file" id="config-advertisinginput-1" value="./custom/img/'+advertising.name+'"/></td>';
					o += '<td><div class="config-button" onclick="if(setAdvertisingFile(\'config-advertisinginput-1\')){location.reload()}">set</div></td>';
					o += '<td><div class="config-button" onclick="$(\'config-advertisinginput-1\').value=\'\';setAdvertisingFile(\'config-advertisinginput-1\', false);location.reload()">del</div></td>';
					o += '<td><img src="custom/img/'+advertising.name+'" alt="Nessuna immagine configurata"/></td>';
				o += '</tr>';
			o += '</table>';
		o += '</li>';
		o += '<li>';
			o += '<h1>Opzioni generali</h1>';
			o += '<table>';
				o += '<tr>';
					o += '<td>Esporta configurazione</td>';
					o += '<td><textarea id="config-expconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="exportConfig()">exp</div></td>';
				o += '</tr>';
				o += '<tr>';
					o += '<td>Importa configurazione</td>';
					o += '<td><textarea id="config-impconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="if(confirm(\'Vuoi davvero importare questa configurazione? La nuova configurazione sovrascrive quella attuale.\')){importConfig();location.reload()}">imp</div></td>';
				o += '</tr>';
				o += '<tr>';
					o += '<td>Aggiungi configurazione</td>';
					o += '<td><textarea id="config-merconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="if(confirm(\'Vuoi davvero importare questa configurazione? Verranno modificate solo le proprietà incluse nell\\\'input.\')){mergeConfig();location.reload()}">add</div></td>';
				o += '</tr>';
			o += '</table>';
		o += '</li>';
	o += '</ul>';
	$('screen-config').set('html', o);
	
	var o = '';
	o += '<ul id="config-mainmenu">';
		o += '<li>';
			o += '<h1>Informazioni generali</h1>';
			o += '<ul>';
				o += '<li>Authors:<ul>';
				for (var i in app_info.authors) {
					 o += '<li>'+app_info.authors[i].name+(app_info.authors[i].email?' <a href="mailto:'+app_info.authors[i].email+'?subject=Application menu JS" title="Invia un\'email">&lt;'+app_info.authors[i].email+'&gt;</a>':'')+'</li>';
				}
				o += '</ul></li>';
				o += '<li>Version: '+app_info.version+'</li>';
				o += '<li>Date: apr 2013</li>';
				o += '<li>Test: "Firefox 20.0"</li>';
			o += '</ul>';
		o += '</li>';
		o += '<li>';
			o += '<h1>Informazioni online</h1>'
			o += '<iframe src="http://mastroelfo.altervista.org/custom/user/html/menu-online-info.php?version='+app_info.version+'" id="config-onlineinfo">Il computer è offline o non riesce a contattare il server.</iframe>'
		o += '</li>';
		o += '<li>';
			o += '<h1>F.A.Q.</h1>';
			o += '<ul>';
				o += '<li><span class="help-faqquestion">Come si crea il menu?</span> <span class="help-manualanswer">Prima bisogna creare la lista dei piatti inserendo il nome e il tipo. Poi si aggiungono i piatti al menu del giorno.</span></li>';
				o += '<li><span class="help-faqquestion">Un piatto è finito o sta per finire.</span> <span class="help-manualanswer">Direttamente dalla schermata di monitor, quando si clicca su un piatto questo cambia colore e/o stile a seconda del foglio di stile caricato. Il primo click indica che il piatto è qasi finito, il secondo che il piatto è terminato. Con un altro click si riporta il piatto alla condizione iniziale.</span></li>';
				o += '<li><span class="help-faqquestion">Dove caricare le immagini?</span> <span class="help-manualanswer">Per motivi di sicurezza le immagini devono trovarsi all\'interno della cartella "custom/img/".</span></li>';
			o += '</ul>';
		o += '</li>';
		o += '<li>';
			o += '<h1>Bug noti e sviluppi futuri</h1>';
			o += '<ul>';
				o += '<li>Test approfonditi per assicurare piena compatibilità anche con Chrome, Safari e Opera. Al momento la piena compatibilità è stata testata su Firefox 20.0. Chrome, Safari e Opera presentano alcune incompatibilità. Internet Explorer non funziona.</li>';
				o += '<li>Lettura fine di configurazione da file invece che con input.</li>';
				o += '<li>Fornire un set di icone e piatti predefiniti.</li>';
				o += '<li>Possibilità di scelta del foglio di stile custom.</li>';
				o += '<li>Tipologia di piatto configurabile</li>';
				o += '<li>Supporto multilingua.</li>';
				o += '<li>Scrivere il manuale di utilizzo.</li>';
				o += '<li>Compatibilità con Internet Explorer.</li>';
			o += '</ul>';
		o += '</li>';
		o += '<li><h1>Updates</h1>';
			o += '<ul>';
				o += '<li>0.0.*: inizio sviluppo.</li>';
			o += '</ul>';
		o += '</li>';
	o += '</ul>';
	$('screen-help').set('html', o);
	
	var start_screen = location.href.match(/#(.+)/);
	if (!start_screen || !start_screen[1] || !showScreen(start_screen[1])) {
			showScreen('screen-monitor');
	}
	
	// altre inizializzazioni
	var o = '';
	for (var i = 0; i<dish_suggestion.length; i++) {
		o += '<option value="'+dish_suggestion[i]+'"/>';
	}
	new Element('datalist', {id: 'dishlist'}).set('html', o).inject(document.body);
	
});

function mergeConfig() {
	var config  = JSON.decode($('config-merconfig').value);
	for (var i in config) {
		for (var j in config[i]) {
			options[i].set(j, config[i][j]);
		}
	}
}
function importConfig() {
	if (!$('config-impconfig').value) {
		alert('Configurazione vuota.');
		return;
	}
	var config  = JSON.decode($('config-impconfig').value);
	for (var i in config) {
		options[i].clear();
		for (var j in config[i]) {
			options[i].set(j, config[i][j]);
		}
	}
}

function exportConfig() {
	var o = '{';
	for (var i in options) {
		o += '\''+i+'\':{';
		options[i].each(function(item, key) {
			o += '\''+key+'\':'+JSON.encode(item)+',';
		});
		o += '},';
	}
	o += '}';
	$('config-expconfig').value = o;
}

function setAdvertisingFile(id, safe) {
	typeof(safe) === 'undefined'? safe = true : 0;
	if (safe && !$(id).value) {
		return false;
	}
	else {
		options['advertising'].set(id, {name: $(id).value.replace('C:\\fakepath\\','')});
		return true;
	}
}

function setDish(id) {
	if (typeof(id) === 'undefined') {
		// this is a new dish
		if (options['dishes'].get($('config-newdishname').value.replace('\'', '-').replace(' ', '-'))) {
			// the dish already exists
			alert('Il piatto "'+$('config-newdishname').value+'" esiste già. Operazione annullata.');
			return;
		}
		options['dishes'].set($('config-newdishname').value.replace('\'', '-').replace(' ', '-'), {
			name: $('config-newdishname').value,
			type: $('config-newdishtype').value,
			cost: $('config-newdishcost').value,
			img:  $('config-newdishimg').value
		});
	}
	else {
		// edit an existing dish
		options['dishes'].set(id.replace('\'', '-').replace(' ', '-'), {
			name: $('config-dishname-'+id).value,
			type: $('config-dishtype-'+id).value,
			cost: $('config-dishcost-'+id).value,
			img:  ($('config-dishimg-'+id).value==''? ($('config-dishthumb-'+id).get('src')?$('config-dishthumb-'+id).get('src').replace('custom/img/', '') : '') : $('config-dishimg-'+id).value)
		});
	}
}
/*
function setDish(value, type, cost, id) {
	id = typeof(id) === 'undefined' ? value : id;
	options['dishes'].set(id, {name: value, type: type, cost: cost});
}
*/

function deleteDish(id) {
	options['dishes'].remove(id);
	options['today'].remove(id);
}

function getDishTypeSelectString(type, id) {
	type = typeof(type) === 'undefined' ? '' : type;
	id = typeof(id) === 'undefined' ? 'config-newdishtype' : id;
	var o = '';
	o += '<select id="'+id+'">';
		for (var i in dish_type) {
			if (i == type) {
				o += '<option value="'+i+'" selected="selected">'+dish_type[i].name+'</option>';
			}
			else {
				o += '<option value="'+i+'">'+dish_type[i].name+'</option>';
			}
		}
	o += '</select>';
	return o;
}

function setDishStatus(id, elem) {
	var dish = options['today'].get(id);
	if (elem.hasClass('monitor-dishfew')) {
		elem.removeClass('monitor-dishfew');
		elem.addClass('monitor-dishend');
		dish.status = 0;
	}
	else if (elem.hasClass('monitor-dishend')) {
		elem.removeClass('monitor-dishend');
		dish.status = 2;
	}
	else {
		elem.addClass('monitor-dishfew');
		dish.status = 1;
	}
	options['today'].set(id, dish);
}

function showScreen(screen) {
	var screen_element = $(screen);
	if (screen_element) {
		Array.each($$('.screen-visible'), function(item){
			item.removeClass('screen-visible');
		});
		screen_element.addClass('screen-visible');
		return true;
	}
	else {
		return false;
	}
}
