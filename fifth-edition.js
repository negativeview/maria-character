"use strict";

const D20Character = require('./d20.js');

class FifthEditionCharacter extends D20Character {
	constructor(data) {
		super(data);

		Object.defineProperty(
			this,
			'proficiencyBonus',
			{
				enumerable: true,
				configurable: false,
				set: (newValue) => {
					return false;
				},
				get: () => {
					if (!(this.classes) || this.classes.length == 0) return 0;
					return 2 + Math.floor((this.classes.length - 1) / 4);
				}
			}
		);

		Object.defineProperty(
			this,
			'ac',
			{
				enumerable: true,
				configurable: false,
				get: () => {
					var baseAC = 10 + this.abilityScores['dex'].modifier;

					for (var i = 0; i < this.features.length; i++) {
						if (this.features[i].baseAC) {
							baseAC = this.features[i].baseAC(this, baseAC);
						}
					}
					for (var i = 0; i < this.items.length; i++) {
						if (this.items[i].enabled && this.items[i].baseAC) {
							baseAC = this.items[i].baseAC(this, baseAC);
						}
					}

					return baseAC;
				}
			}
		);

		var skills = [
			{
				name: 'Acrobatics',
				abilityScore: 'dex'
			},
			{
				name: 'Arcana',
				abilityScore: 'int'
			},
			{
				name: 'Animal Handling',
				abilityScore: 'wis'
			},
			{
				name: 'Athletics',
				abilityScore: 'str'
			},
			{
				name: 'Deception',
				abilityScore: 'cha'
			},
			{
				name: 'History',
				abilityScore: 'int'
			},
			{
				name: 'Insight',
				abilityScore: 'wis'
			},
			{
				name: 'Intimidation',
				abilityScore: 'str'
			},
			{
				name: 'Investigation',
				abilityScore: 'int'
			},
			{
				name: 'Medicine',
				abilityScore: 'int'
			},
			{
				name: 'Nature',
				abilityScore: 'int'
			},
			{
				name: 'Perception',
				abilityScore: 'wis'
			},
			{
				name: 'Performance',
				abilityScore: 'cha'
			},
			{
				name: 'Persuasion',
				abilityScore: 'cha'
			},
			{
				name: 'Religion',
				abilityScore: 'int'
			},
			{
				name: 'Sleight of Hand',
				abilityScore: 'dex'
			},
			{
				name: 'Stealth',
				abilityScore: 'dex'
			},
			{
				name: 'Survival',
				abilityScore: 'int'
			}
		];

		Object.defineProperty(
			this,
			'skills',
			{
				enumerable: true,
				configurable: false,
				value: {},
				writable: false
			}
		);

		Object.defineProperty(
			this,
			'proficiencies',
			{
				enumerable: true,
				configurable: true,
				value: data.proficiencies ? data.proficiencies : [],
				writable: true
			}
		);
		delete data.proficiencies;

		skills.forEach(
			(item, index, arr) => {
				var skill = item;
				Object.defineProperty(
					this.skills,
					skill.name,
					{
						enumerable: true,
						configurable: false,
						get: () => {
							var modifierName = skill.abilityScore + 'Mod';
							if (modifierName in this.abilityScores) {
								var base = this.abilityScores[modifierName];
								if (this.proficiencies.indexOf(skill.name) !== -1) {
									base += this.proficiencyBonus;
								}
								return base;
							} else {
								this.emit('error', new Error('No such modifier: ' + modifierName));
							}
						},
						set: (newValue) => {
							return false;
						}
					}
				);
			}
		);
	}
}

module.exports = FifthEditionCharacter;