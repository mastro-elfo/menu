Locale.use('it-IT');
// Locale.use('en-US');

// app info
var app_info = {
	version: '0.1.2b',
	date: Locale.get('Date.months_abbr')[4 -1]+' 2013',
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
		name: Locale.get('App-Menu.Antipasti')
	},
	1: {
		name: Locale.get('App-Menu.Primi')
	},
	2: {
		name: Locale.get('App-Menu.Secondi')
	},
	3: {
		name: Locale.get('App-Menu.Contorni')
	},
	7: {
		name: Locale.get('App-Menu.Pizze')
	},
	6: {
		name: Locale.get('App-Menu.Dolci')
	},
	5: {
		name: Locale.get('App-Menu.Bevande')
	}
}

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
	
	options['style'] = new HTML5.storage({
		storageName: 'style',
		storageType: 'local'
	}).load();
	
	if (options['main'].get('language')) {
		Locale.use(options['main'].get('language'));
	}
	
	// carico gli elementi dell'head html
	$$('title')[0].set('html', Locale.get('App-Menu.html-title'));
	
	(function(){
		var style = options['style'].get('style');
		if (style && style != '') {
			new Element('link', {
				'rel': 'stylesheet',
				'href': 'custom/css/'+style
			}).inject($$('head')[0]);
		}
	})();
	
	(function(){
		var style = options['style'].get('color');
		if (style && style != '') {
			new Element('link', {
				'rel': 'stylesheet',
				'href': 'custom/css/'+style
			}).inject($$('head')[0]);
		}
	})();
	
	// carico il navigatore
	var o = '';
	o += '<ul>';
		o += '<li>';
			o += '<a href="#screen-monitor" title="'+Locale.get('App-Menu.Monitor-title')+'" onclick="showScreen(\'screen-monitor\');"><span>'+Locale.get('App-Menu.Monitor')+'</span></a>';
		o += '</li>';
		o += '<li>';
			o += '<a href="#screen-config" title="'+Locale.get('App-Menu.Configura-title')+'" onclick="showScreen(\'screen-config\');"><span>'+Locale.get('App-Menu.Configura')+'</span></a>';
		o += '</li>';
		o += '<li>';
			o += '<a href="#screen-help" title="'+Locale.get('App-Menu.Aiuto-title')+'" onclick="showScreen(\'screen-help\');"><span>'+Locale.get('App-Menu.Aiuto')+'</span></a>';
		o += '</li>';
	o += '</ul>';
	$('navigator').set('html', o);
	
	// carico le schermate
	var o = '<ul id="monitor-mainmenu">';
	var ol = {};
	options['today'].each(function(item, i){
		if(typeof(options['dishes'].get(item.name)) === 'undefined') {
			return;
		}
		
		typeof(ol[options['dishes'].get(item.name).type]) === 'undefined' ? (ol[options['dishes'].get(item.name).type] = '') : 0;
		var dish = options['dishes'].get(item.name);
		ol[dish.type] += '<li class="'+(item.status<2?(item.status==1?'monitor-dishfew':'monitor-dishend'):'')+'" onclick="setDishStatus(&quot;'+i+'&quot;, this);">'+dish.name+' '+(dish.cost?Number(dish.cost).formatCurrency():'')+' '+(dish.img?'<img src="custom/img/'+dish.img+'" alt="'+dish.img+'" class="monitor-thumbnail"/>':'')+'</li>';
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
			o += '<h1>'+Locale.get('App-Menu.Menu del giorno')+'</h1>';
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
				o += '<tr><td></td><td></td><td><div class="config-button" onclick="if(confirm(\''+Locale.get('App-Menu.confirm-delete-todays-menu')+'\')){options[\'today\'].clear();location.reload()}">del all</div></td></tr>';
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
			o += '<h1>'+Locale.get('App-Menu.Piatti')+'</h1>';
			o += '<table>';
				o += '<tr>';
					o += '<td><input id="config-newdishname" placeholder="'+Locale.get('App-Menu.newdishname-placeholder')+'" list="dishlist"/></td> <td>'+getDishTypeSelectString('', 'config-newdishtype')+'</td> <td><input class="config-dishcost" id="config-newdishcost" placeholder="'+Locale.get('Number.currency.prefix')+'"/></td> <td><input type="file" class="config-dishimg" id="config-newdishimg" onchange="$(\'config-newdishthumb\').set(\'src\', \'custom/img/\'+event.target.value)"/><img src="" alt="'+Locale.get('App-Menu.dish-icon-alt')+'" id="config-newdishthumb" class="config-dishthumb" onclick="$(\'config-newdishimg\').click()"/></td> <td colspan="2"><div class="config-button" onclick="setDish();location.reload()">set</div></td>'
				o += '<tr>';
				options['dishes'].each(function(item, key) {
					o += '<tr>';
						o += '<td><input id="config-dishname-'+key+'" value="'+item.name+'"/></td> <td>'+getDishTypeSelectString(item.type, 'config-dishtype-'+key)+'</td> <td><input class="config-dishcost" id="config-dishcost-'+key+'" placeholder="'+Locale.get('Number.currency.prefix')+'" value="'+(typeof(item.cost)!=='undefined'?item.cost:'')+'"/></td> <td><input type="file" class="config-dishimg" id="config-dishimg-'+key+'" onchange="$(\'config-dishthumb-'+key+'\').setAttribute(\'src\', \'custom/img/\'+event.target.value)"/> <img src="'+(typeof(item.img)!=='undefined'?'custom/img/'+item.img:'')+'" alt="'+Locale.get('App-Menu.dish-icon-alt')+'&nbsp;&nbsp;&nbsp;" id="config-dishthumb-'+key+'" class="config-dishthumb" onclick="$(\'config-dishimg-'+key+'\').click()"/> <div class="config-button config-button-delete" onclick="$(\'config-dishimg-'+key+'\').value=\'\';$(\'config-dishthumb-'+key+'\').set(\'src\', \'\');">X</div></td> <td><div class="config-button" onclick="setDish(\''+key+'\');location.reload()">set</div></td> <td><div class="config-button" onclick="if(confirm(Locale.get(\'App-Menu.confirm-delete-dish\').replace(/%s/, \''+(item.name.replace('\'', '\\\''))+'\'))){deleteDish(\''+key+'\');location.reload()}">del</div></td>'
					o += '</tr>';
				});
				o += '<tr>';
					o += '<td colspan="4"></td> <td colspan="2"><div class="config-button" onclick="if(confirm(Locale.get(\'App-Menu.confirm-delete-all-dish\'))){options[\'dishes\'].clear();options[\'today\'].clear();location.reload()}">del all</div></td>'
				o += '<tr>';
			o += '</table>';
		o += '</li>';
		o += '<li>';
			o += '<h1>'+Locale.get('App-Menu.Pubblicità')+'</h1>';
			o += '<table id="config-advertisingtable">';
				var advertising = options['advertising'].get('config-advertisinginput-1');
				typeof(advertising) === 'undefined'? advertising = {name: ''} : 0;
				o += '<tr>';
					o += '<td>1</td>';
					o += '<td><input type="file" placeholder="Scegli un file" id="config-advertisinginput-1" value="./custom/img/'+advertising.name+'"/></td>';
					o += '<td><div class="config-button" onclick="if(setAdvertisingFile(\'config-advertisinginput-1\')){location.reload()}">set</div></td>';
					o += '<td><div class="config-button" onclick="$(\'config-advertisinginput-1\').value=\'\';setAdvertisingFile(\'config-advertisinginput-1\', false);location.reload()">del</div></td>';
					o += '<td><img src="custom/img/'+advertising.name+'" alt="'+Locale.get('App-Menu.no-advertising-image')+'"/></td>';
				o += '</tr>';
			o += '</table>';
		o += '</li>';
		o += '<li>';
			o += '<h1>'+Locale.get('App-Menu.Opzioni generali')+'</h1>';
			o += '<h2>'+Locale.get('App-Menu.config-import-export')+'</h2>';
			o += '<table>';
				o += '<tr>';
					o += '<td>'+Locale.get('App-Menu.Esporta configurazione')+'</td>';
					o += '<td><textarea id="config-expconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="exportConfig()">exp</div></td>';
				o += '</tr>';
				o += '<tr>';
					o += '<td>'+Locale.get('App-Menu.Importa configurazione')+'</td>';
					o += '<td><textarea id="config-impconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="if(confirm(\''+Locale.get('App-Menu.confirm-import-config')+'\')){importConfig();location.reload()}">imp</div></td>';
				o += '</tr>';
				o += '<tr>';
					o += '<td>'+Locale.get('App-Menu.Aggiungi configurazione')+'</td>';
					o += '<td><textarea id="config-merconfig"></textarea></td>';
					o += '<td><div class="config-button" onclick="if(confirm(\''+Locale.get('App-Menu.confirm-add-config')+'\')){mergeConfig();location.reload()}">add</div></td>';
				o += '</tr>';
			o += '</table>';
			o += '<h2>'+Locale.get('App-Menu.config-style')+'</h2>';
			o += '<table>';
				o += '<tr>';
					o += '<td>'+Locale.get('App-Menu.config-style-style')+'</td>';
					o += '<td><input id="config-style-style-file" type="file" onchange="editStyle(\'edit\', \'style\', this.value);location.reload();"/><input value="'+options['style'].get('style')+'" onclick="$(\'config-style-style-file\').click();" readonly="readonly"/></td>';
					o += '<td><div class="config-button" onclick="editStyle(\'delete\', \'style\');location.reload();">del</div></td>';
				o += '</tr>';
				o += '<tr>';
					o += '<td>'+Locale.get('App-Menu.config-style-color')+'</td>';
					o += '<td><input id="config-style-color-file" type="file" onchange="editStyle(\'edit\', \'color\', this.value);location.reload();"/><input value="'+options['style'].get('color')+'" onclick="$(\'config-style-color-file\').click();" readonly="readonly"/></td>';
					o += '<td><div class="config-button" onclick="editStyle(\'delete\', \'color\');location.reload();">del</div></td>';
				o += '</tr>';
			o += '</table>';
			o += '<h2>'+Locale.get('App-Menu.config-lang')+'</h2>';
			o += '<table>';
				o += '<tr>';
				o += '<td>'+Locale.get('App-Menu.config-lang-select')+'</td>';
				o += '<td>';
					o += '<select onchange="editLanguage(this.value);location.reload();">';
						for (var i in Languages) {
							o += '<option value="'+i+'"'+(i==options['main'].get('language')?' selected="selected"':'')+'>'+Languages[i]+'</option>';
						}
					o += '</select>';
				o += '</td>';
				o += '</tr>';
			o += '</table>';
		o += '</li>';
	o += '</ul>';
	$('screen-config').set('html', o);
	
	var o = '';
	o += '<ul id="config-mainmenu">';
		o += '<li>';
			o += '<h1>'+Locale.get('App-Menu.general-info-title')+'</h1>';
			o += '<ul>';
				o += '<li>Authors:<ul>';
				for (var i in app_info.authors) {
					 o += '<li>'+app_info.authors[i].name+(app_info.authors[i].email?' <a href="mailto:'+app_info.authors[i].email+'?subject=Application menu JS" title="'+Locale.get('App-Menu.general-info-sendemail')+'">&lt;'+app_info.authors[i].email+'&gt;</a>':'')+'</li>';
				}
				o += '</ul></li>';
				o += '<li>'+Locale.get('App-Menu.general-info-version')+': '+app_info.version+'</li>';
				o += '<li>'+Locale.get('App-Menu.general-info-date')+': '+app_info.date+'</li>';
				o += '<li>'+Locale.get('App-Menu.general-info-test')+': "Firefox 20.0", "Chrome 25"</li>';
			o += '</ul>';
		o += '</li>';
		o += '<li>';
			o += '<h1>'+Locale.get('App-Menu.online-info-title')+'</h1>'
			o += '<iframe src="http://mastroelfo.altervista.org/custom/user/html/menu-online-info.php?version='+app_info.version+'" id="config-onlineinfo">Il computer è offline o non riesce a contattare il server.</iframe>'
		o += '</li>';
		o += '<li>';
			o += '<h1>F.A.Q.</h1>';
			o += '<ul>';
				o += '<li><span class="help-faqquestion">'+Locale.get('App-Menu.faq-q1')+'</span> <span class="help-manualanswer">'+Locale.get('App-Menu.faq-a1')+'</span></li>';
				o += '<li><span class="help-faqquestion">'+Locale.get('App-Menu.faq-q2')+'</span> <span class="help-manualanswer">'+Locale.get('App-Menu.faq-a2')+'</span></li>';
				o += '<li><span class="help-faqquestion">'+Locale.get('App-Menu.faq-q3')+'</span> <span class="help-manualanswer">'+Locale.get('App-Menu.faq-a3')+'</span></li>';
				o += '<li><span class="help-faqquestion">'+Locale.get('App-Menu.faq-q4')+'</span> <span class="help-manualanswer">'+Locale.get('App-Menu.faq-a4')+'</span></li>';
			o += '</ul>';
		o += '</li>';
		o += '<li>';
			o += '<h1>'+Locale.get('App-Menu.bug-title')+'</h1>';
			o += '<ul>';
				o += '<li>'+Locale.get('App-Menu.bug-1')+'</li>';
				o += '<li>'+Locale.get('App-Menu.bug-2')+'</li>';
				o += '<li>'+Locale.get('App-Menu.bug-3')+'</li>';
				o += '<li>'+Locale.get('App-Menu.bug-5')+'</li>';
				o += '<li>'+Locale.get('App-Menu.bug-7')+'</li>';
				o += '<li>'+Locale.get('App-Menu.bug-8')+'</li>';
			o += '</ul>';
		o += '</li>';
		o += '<li><h1>'+Locale.get('App-Menu.updates-title')+'</h1>';
			o += '<ul>';
				o += '<li>'+Locale.get('App-Menu.updates-0_1')+': '+Locale.get('App-Menu.updates-0_1-value')+'</li>';
				o += '<li>'+Locale.get('App-Menu.updates-0_0')+': '+Locale.get('App-Menu.updates-0_0-value')+'</li>';
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
	var dish_suggestion = Locale.get('App-Menu.dish_suggestion');
	for (var i = 0; i<dish_suggestion.length; i++) {
		o += '<option value="'+dish_suggestion[i]+'"/>';
	}
	new Element('datalist', {id: 'dishlist'}).set('html', o).inject(document.body);
	
});

function editLanguage(language) {
	options['main'].set('language', language);
}

function editStyle(action, style, value) {
	switch (action) {
		case 'edit':
			options['style'].set(style, value.replace('C:\\fakepath\\',''));
			break;
		case 'delete':
			options['style'].set(style, '');
			break;
	}
}

function mergeConfig() {
	var config  = JSON.decode($('config-merconfig').value.replace('<html><body>', '').replace('</body></html>', ''));
	for (var i in config) {
		for (var j in config[i]) {
			options[i].set(j, config[i][j]);
		}
	}
}
function importConfig() {
	if (!$('config-impconfig').value) {
		alert(Locale.get('App-Menu.alert-empty-config'));
		return;
	}
	var config  = JSON.decode($('config-impconfig').value.replace('<html><body>', '').replace('</body></html>', ''));
	for (var i in config) {
		options[i].clear();
		for (var j in config[i]) {
			options[i].set(j, config[i][j]);
		}
	}
}

function exportConfig() {
	var o = '<html><body>{';
	for (var i in options) {
		o += '\''+i+'\':{';
		options[i].each(function(item, key) {
			o += '\''+key+'\':'+JSON.encode(item)+',';
		});
		o += '},';
	}
	o += '}</body></html>';
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
			// alert('Il piatto "'+$('config-newdishname').value+'" esiste già. Operazione annullata.');
			alert(Locale.get('App-Menu.alert-dish-exists').replace(/%s/, $('config-newdishname').value));
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
