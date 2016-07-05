"use strict";

const BaseCharacter = require('./character.js');

class D20Character extends BaseCharacter {
	constructor(data) {
		super(data);

		Object.defineProperty(
			this,
			'maxHP',
			{
				configurable: false,
				enumerable: true,
				value: data.maxHP ? data.maxHP : data.currentHP ? data.currentHP : 0,
				writable: true
			}
		);
		delete data.maxHP;

		Object.defineProperty(
			this,
			'currentHP',
			{
				configurable: false,
				enumerable: true,
				value: data.currentHP ? data.currentHP : 0,
				writable: true
			}
		);
		delete data.currentHP;

		Object.defineProperty(
			this,
			'abilityScores',
			{
				configurable: false,
				enumerable: true,
				value: {},
				writable: false
			}
		);

		var scores = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

		scores.forEach(
			(item, index, arr) => {
				var score = item;

				Object.defineProperty(
					this.abilityScores,
					score,
					{
						configurable: false,
						enumerable: true,
						value: data[score] ? data[score] : 0,
						writable: true
					}
				);

				Object.defineProperty(
					this.abilityScores,
					score + 'Mod',
					{
						configurable: false,
						enumerable: true,
						get: () => {
							return Math.floor((this.abilityScores[score] - 10) / 2);
						},
						set: (newValue) => {
							return false;
						}
					}
				);
			}
		);
		delete data.str;
		delete data.dex;
		delete data.con;
		delete data.int;
		delete data.wis;
		delete data.cha;

		Object.defineProperty(
			this,
			'effectiveLevel',
			{
				configurable: false,
				enumerable: false,
				value: (className) => {
					var count = 0;
					for (var i = 0; i < this.classes.length; i++) {
						if (this.classes[i] == className) count++;
					}
					return count;
				},
				writable: false
			}
		);

		Object.defineProperty(
			this,
			'classes',
			{
				configurable: false,
				enumerable: true,
				value: data.classes ? data.classes : [],
				writable: false
			}
		);
		delete data.classes;
	}
}

module.exports = D20Character;