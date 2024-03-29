Locale.define('it-IT', 'App-Menu', {
	// html
	'html-title': 'Menu',
	
	// Dish type
	'Antipasti': 'Antipasti',
	'Primi': 'Primi',
	'Secondi': 'Secondi',
	'Contorni': 'Contorni',
	'Pizze': 'Pizze',
	'Dolci': 'Dolci',
	'Bevande': 'Bevande',
	
	// dish suggestion
	'dish_suggestion': ['Antipasto toscano', 'Antipasto di formaggi', 'Antipasto misto', 'Acqua', 'Birra', 'Caprese', 'Ciliegini mozzarella e basilico', 'Hamburger', 'Hamburger di seitan', 'Insalata', 'Insalatona', 'Patate', 'Patate arrosto', 'Patate grigliate', 'Patate lesse', 'Pasta ai funghi', 'Pasta al pesto', 'Pasta al ragù', 'Pasta all\'amatriciana', 'Pasta all\'arrabbiata', 'Pasta alla boscaiola', 'Pizza', 'Pizza margherita', 'Pizza marinara', 'Schiacciata', 'Seitan', 'Seitan arrosto', 'Tofu', 'Tofu alla piastra', 'Tofu arrosto', 'Torta del nonno', 'Torta della nonna', 'Tiramisù', 'Vino', 'Vino bianco', 'Vino rosso'],
	
	// Navigator
	'Monitor': 'Monitor',
	'Configura': 'Configura',
	'Aiuto': 'Aiuto',
	'Monitor-title': 'Mostra in monitor',
	'Configura-title': 'Configura il programma',
	'Aiuto-title': 'Ottieni aiuto',
	
	// Config page
	// +todays menu
	'Menu del giorno': 'Menu del giorno',
	'confirm-delete-todays-menu': 'Sei sicuro di voler eliminare il menu del giorno? La modifica è permanente.',
	
	// +dishes
	'Piatti': 'Piatti',
	'newdishname-placeholder': 'Scrivi il nome del piatto',
	'dish-icon-alt': 'Icona',
	'alert-dish-exists': 'Il piatto "\%s" esiste già. Operazione annullata.',
	'confirm-delete-dish': 'Vuoi davvero eliminare il piatto "%s"? La modifica è permanente.',
	'confirm-delete-all-dish': 'Vuoi davvero eliminare tutti i piatti salvati? La modifica è permanente e comporta la perdita anche del menu.',
	
	// +advertising
	'Pubblicità': 'Pubblicità',
	'no-advertising-image': 'Nessuna immagine configurata',
	
	// +general options
	'Opzioni generali': 'Opzioni generali',
	'config-import-export': 'Importa/Esporta configurazione',
	'Esporta configurazione': 'Esporta configurazione',
	'Importa configurazione': 'Importa configurazione',
	'Aggiungi configurazione': 'Aggiungi configurazione',
	'confirm-import-config': 'Vuoi davvero importare questa configurazione? La nuova configurazione sovrascrive quella attuale.',
	'confirm-add-config': 'Vuoi davvero importare questa configurazione? Verranno modificate solo le proprietà incluse nell\\\'input.',
	'alert-empty-config': 'Configurazione vuota.',
	'config-style': 'Configura stile',
	'config-style-style': 'Configura struttura',
	'config-style-color': 'Configura colore',
	'config-lang': 'Configura lingua',
	'config-lang-select': 'Seleziona lingua',
	'Importa configurazione da file': 'Importa da file',
	'Aggiungi configurazione da file': 'Aggiungi da file',
	'alert-empty-filename': 'File non specificato',
	
	// Help page
	// +general info
	'general-info-title': 'Informazioni generali',
	'general-info-authors': 'Autori',
	'general-info-sendemail': 'Invia un\'email',
	'general-info-version': 'Versione',
	'general-info-date': 'Data',
	'general-info-test': 'Test',
	
	// +online info
	'online-info-title': 'Informazioni online',
	
	// +faq
	'faq-title': 'F.A.Q',
	'faq-q1': 'Come si crea il menu?',
	'faq-a1': 'Prima bisogna creare la lista dei piatti inserendo il nome e il tipo. Poi si aggiungono i piatti al menu del giorno.',
	'faq-q2': 'Un piatto è finito o sta per finire.',
	'faq-a2': 'Direttamente dalla schermata di monitor, quando si clicca su un piatto questo cambia colore e/o stile a seconda del foglio di stile caricato. Il primo click indica che il piatto è qasi finito, il secondo che il piatto è terminato. Con un altro click si riporta il piatto alla condizione iniziale.',
	'faq-q3': 'Dove caricare le immagini?',
	'faq-a3': 'Per motivi di sicurezza le immagini devono trovarsi all\'interno della cartella "custom/img/".',
	'faq-q4': 'Dove caricare i fogli di stile?',
	'faq-a4': 'I fogli di stile devono essere caricati nella cartella "custom/css/". Un set di fogli di stile predefiniti si trova nella cartella "dist/css/".',
	
	// +bug
	'bug-title': 'Bug noti e sviluppi futuri',
	'bug-1': 'Test approfonditi per assicurare piena compatibilità anche con Chrome, Safari e Opera. Al momento la piena compatibilità è stata testata su "Firefox 20".',
	'bug-3': 'Fornire un set di icone e piatti predefiniti.',
	'bug-5': 'Tipologia di piatto configurabile.',
	'bug-7': 'Scrivere il manuale di utilizzo.',
	'bug-8': 'Compatibilità con Internet Explorer.',
	'bug-9': 'Con Chrome non è possibile caricare la configurazione direttamente da file',
	
	// +updates
	'updates-title': 'Updates',
	'updates-0_0': '0.0.x',
	'updates-0_1': '0.1.x',
	'updates-0_0-value': 'Inizio sviluppo.',
	'updates-0_1-value': '<ul><li>Supporto multilingua.</li><li>Fogli di stile configurabili.</li><li>Lettura configurazione da file.</li></ul>'
});

Locale.define('it-IT', 'Number').inherit('EU');

Locale.define('en-US', 'App-Menu', {
	// html
	'html-title': 'Menu',
	
	// Dish type
	'Antipasti': 'Appetizer',
	'Primi': 'Main dishes',
	'Secondi': 'Second dishes',
	// 'Contorni': 'Contorni',
	// 'Pizze': 'Pizze',
	'Dolci': 'Cakes',
	'Bevande': 'Drinks',
	
	// dish suggestion
	'dish_suggestion': [],
	
	// Navigator
	'Monitor': 'Monitor',
	'Configura': 'Configure',
	'Aiuto': 'Help',
	'Monitor-title': 'Show in monitor',
	'Configura-title': 'Configure the program',
	'Aiuto-title': 'Get help',
	
	// Config page
	// +todays menu
	'Menu del giorno': 'Today\'s menu',
	'confirm-delete-todays-menu': 'Do you really want to delete today\'s menu? The change is permanent.',
	
	// +dishes
	'Piatti': 'Dishes',
	'newdishname-placeholder': 'Write the dish name',
	'dish-icon-alt': 'Icon',
	'alert-dish-exists': 'The dish "\%s" already exists. Operation canceled.',
	'confirm-delete-dish': 'Do you really want to delete the dish "%s"? The change is permanent.',
	'confirm-delete-all-dish': 'Do you really want to delete all the dishes? The change is permanent and you will also loose the menu.',
	
	// +advertising
	'Pubblicità': 'Advertising',
	'no-advertising-image': 'No image configured',
	
	// +general options
	'Opzioni generali': 'General options',
	'config-import-export': 'Import/Export configuration',
	'Esporta configurazione': 'Export configuration',
	'Importa configurazione': 'Import configuration',
	'Aggiungi configurazione': 'Add configuration',
	'confirm-import-config': 'Do you really want to import this configuration? The new configuration will overwrite the old one.',
	'confirm-add-config': 'Do you really want to add this configuration? Only the input properties will be set.',
	'alert-empty-config': 'Empty configuration.',
	'config-style': 'Configure style',
	'config-style-style': 'Configure structore',
	'config-style-color': 'Configure color',
	'config-lang': 'Configure language',
	'config-lang-select': 'Select language',
	'Importa configurazione da file': 'Import from file',
	'Aggiungi configurazione da file': 'Add from file',
	'alert-empty-filename': 'File not specified',
	
	// Help page
	// +general info
	'general-info-title': 'General information',
	'general-info-authors': 'Authors',
	'general-info-sendemail': 'Send an email',
	'general-info-version': 'Version',
	'general-info-date': 'Date',
	'general-info-test': 'Test',
	
	// +online info
	'online-info-title': 'Online information',
	
	// +faq
	'faq-title': 'F.A.Q',
	'faq-q1': 'How do I create the menu?',
	'faq-a1': 'First you need to insert the dishes with name and type. Then you add the dishes to the menu.',
	'faq-q2': 'A dish is finished or is near to finish.',
	'faq-a2': 'In the monitor screen, when you click on a dish it changes its style regarding the choosen stylesheet. The first click means the dish is near to end. The second click means the dish ended. The third click restore the dish status.',
	'faq-q3': 'Where do I copy the images?',
	'faq-a3': 'For security reasons the images must be copied into the directory "custom/img/".',
	'faq-q4': 'Where do I save my custom stylesheets?',
	'faq-a4': 'Stylesheets must be saved into the directory "custom/css/". A default set of stylesheets is inside the directory "dist/css/".',
	
	// +bug
	'bug-title': 'Known bug and future developments',
	'bug-1': 'Full test.',
	'bug-3': 'Default set of dishes and icons.',
	'bug-5': 'Editable dish kind.',
	'bug-7': 'Write user manual.',
	'bug-8': 'Compatibility with IE.',
	'bug-9': 'Con Chrome non è possibile caricare la configurazione direttamente da file',
	
	// +updates
	'updates-title': 'Updates',
	'updates-0_0-value': 'Start development.',
	'updates-0_1-value': '<ul><li>Multi-language support.</li><li>Configurable stylesheet.</li><li>Read configuration from file.</li></ul>'
}).inherit('it-IT', 'App-Menu');

var Languages = {
	'it-IT': 'Italiano',
	'en-US': 'English (United States)'
};