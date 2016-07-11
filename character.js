"use strict";

const EventEmitter = require('events');
const RollInput = require('maria-dice');
const SerializeHelper = require('maria-serialize');

class Character extends EventEmitter {
	constructor(data) {
		super();

		Object.defineProperty(
			this,
			'_events',
			{
				enumerable: false
			}
		);

		Object.defineProperty(
			this,
			'_eventsCount',
			{
				enumerable: false
			}
		);

		Object.defineProperty(
			this,
			'_maxListeners',
			{
				enumerable: false
			}
		);

		Object.defineProperty(
			this,
			'toString',
			{
				enumerable: false,
				value: SerializeHelper.serialize.bind(null, this)
			}
		);

		Object.defineProperty(
			this,
			'name',
			{
				configurable: false,
				enumerable: true,
				value: data.name,
				writable: true
			}
		);
		delete data.name;

		Object.defineProperty(
			this,
			'actions',
			{
				configurable: false,
				enumerable: true,
				value: data.actions ? data.actions : [],
				writable: false
			}
		);
		delete data.actions;

		Object.defineProperty(
			this,
			'items',
			{
				configurable: false,
				enumerable: true,
				value: data.items ? data.items : [],
				writable: false
			}
		);
		delete data.items;

		Object.defineProperty(
			this,
			'features',
			{
				confiruable: false,
				enumerable: true,
				value: data.features ? data.features : [],
				writable: false
			}
		);
		delete data.features;
	}

	attack() {
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i];
			if (item.damage) {
				var attackRoll = new RollInput({});
				var attackRoll = "1d20 + 10";
				var damageRoll = "1d6 + 5";


			}
		}
	}
}

module.exports = Character;