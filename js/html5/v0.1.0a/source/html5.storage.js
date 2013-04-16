/*
---
description: html5.storage

license: MIT-style

authors:
- Francesco Michienzi <francesco.209@gmail.com>

requires:
- core/1.2.*: [Class, Cookie, JSON, Options]
- html5.js

provides: [HTML5.storage]

...
*/

HTML5.storage = new Class({
	Implements: Options,
	options: {
		storageName: 'data',
		storageType: 'session',
	},
	initialize: function (options) {
		this.setOptions(options);
		this._data = {};
	},
	set: function (name, value, storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		// typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		(typeof(this._data[storageType][storageName]) === 'undefined' || this._data[storageType][storageName] === null) ? this._data[storageType][storageName] = {} : 0;
		
		this._data[storageType][storageName][name] = value;
		this._writeData(storageType, storageName, this._data[storageType][storageName]);
		
		return this;
	},
	get: function (name, storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		// typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		(typeof(this._data[storageType][storageName]) === 'undefined' || this._data[storageType][storageName] === null)? this._data[storageType][storageName] = {} : 0;
		
		return this._data[storageType][storageName][name];
	},
	load: function (storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		
		this._data[storageType][storageName] = this._readData(storageType, storageName);
		
		return this;
	},
	remove: function (name, storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		
		delete this._data[storageType][storageName][name];
		this._writeData(storageType, storageName, this._data[storageType][storageName]);
		
		return this;
	},
	clear: function (storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		
		this._data[storageType][storageName] = {};
		this._writeData(storageType, storageName, this._data[storageType][storageName]);
		
		return this;
	},
	each: function(callback, storageName, storageType) {
		typeof(storageName) === 'undefined'? storageName = this.options.storageName : 0;
		typeof(storageType) === 'undefined'? storageType = this.options.storageType : 0;
		
		typeof(this._data[storageType]) === 'undefined'? this._data[storageType] = {} : 0;
		typeof(this._data[storageType][storageName]) === 'undefined'? this._data[storageType][storageName] = {} : 0;
		
		for (var i in this._data[storageType][storageName]) {
			callback(this._data[storageType][storageName][i], i);
		}
		
		return this;
	},
	_readData: function(storageType, storageName) {
		var encoded = '';
		if(typeof(Storage) !== 'undefined') {
			// Uses Storage
			if (storageType == 'local') {
				encoded = localStorage[storageName];
			}
			else {
				encoded = sessionStorage[storageName];
			}
		}
		else {
			// Uses Cookie
			encoded = Cookie.read(storageName);
		}
		return JSON.decode(encoded);
	},
	_writeData: function (storageType, storageName, value) {
		var encoded = JSON.encode(value);
		if(typeof(Storage) !== 'undefined') {
			// Uses Storage
			if (storageType == 'local') {
				localStorage[storageName] = encoded;
			}
			else {
				sessionStorage[storageName] = encoded;
			}
		}
		else {
			// Uses Cookies
			if (storageType == 'local') {
				localStorage[storageName] = encoded;
				Cookie.write(storageName, encoded, {duration: 3650});
			}
			else {
				sessionStorage[storageName] = encoded;
				Cookie.write(storageName, encoded, {duration: false});
			}
		}
	}
});