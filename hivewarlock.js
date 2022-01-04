/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark or the Import button in the "Extra Features" Javascript Window.
	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*	-INFORMATION-
	Subject:	Subclass and Spells
	Effect:		This script adds a subclass for the Warlock, the "Vampire Lord" Patron
			This is taken from the DMs Guild website (https://www.dmsguild.com/product/251979/The-Vampire-Lord-Warlock-Patron)
			This subclass is made by Matthew Cumbo
	Code by:	Matthew Cumbo
	Date:		2021-12-16 (sheet v13.0.4)
			Please support the creator of this content (Matthew Cumbo) and download their materials 
			from the DMs Guild website: https://www.dmsguild.com/browse.php?author=Matthew%20Cumbo
*/

var iFileName = "PeanutJaygee - Hive Warlock Patron.js";
RequiredSheetVersion("13.0.8");

// Define the source
SourceList.HVWP={
	name : "PeanutJaygee: Hive (Warlock Patron)",
	abbreviation : "PJHIVE",
	group : "r/unearthedarcana",
	url : "https://www.reddit.com/r/UnearthedArcana/comments/85tgjp/otherworldly_patron_the_hive_revel_in_the_chaos/",
	date : "2022/01/04"
};

// Warlock Subclass
AddSubClass("warlock", "the hive", {
	regExpSearch : /^(?=.*hive)(?=.*warlock).*$/i,
	subname : "The Hive",
	source : ["PJHIVE", 1],
	spellcastingExtra : ["detect poison and disease", "ray of sickness", "blindness/deafness", "web", "plant growth", "stinking cloud", "dominate beast", "Evard's black tentacles", "contagion", "insect plague"],
	features : {
		"subclassfeature1" : {
			name : "Skittering Scourge",
            source : ["PJHIVE", 1],
			minlevel : 1,
			description : "\n   " + "I know the infestation cantrip." + 
            "\n   " + "In addition, when a creature fails its saving throw against this spell, I can choose the direction they move in instead of rolling a die." + 
            "\n   " + "I can also choose diagonal movements.",
            spellcastingBonus : {
				name : "Bonus Cantrip",
				spells : ["infestation"],
				selection : ["infestation"],
			},
		},
        "subclassfeature1.1" : {
			name : "Children of the Swarm",
            source : ["PJHIVE", 1],
			minlevel : 1,
			description : "\n   " + "When I slay a creature, I can cause a ravenous cloud of insects to erupt from its body as a reaction. " + 
            "\n   " + "Any hostile creature that begins their turn or moves within 5 feet of the target corpse suffers magical piercing damage equal to my Charisma modifier + half my warlock level (minimum of 1)." + 
            "\n   " + "The swarm will disperse after 1 minute, or if the target corpse is destroyed, revived, raised as an undead creature or if I use this feature again on another slain creature. This feature can't be used on any creature that is not made of organic matter, such as constructs and elementals."
		},
		"subclassfeature6" : {
			name : "Relentless Instinct",
			source : ["PJHIVE", 1],
			minlevel : 6,
			description : "\n   " + "My speed increases by 10 feet while I am not wearing medium or heavy armour." + 
            "\n   " + "In addition, I can use my reaction to become immune to the grappled, restrained, stunned or paralyzed conditions, or become unaffected by difficult terrain, until the start of my next turn, when I would be subjected to one of these effects." + 
            "\n   " + "Once I use my reaction in this way, I can't do so again until I finish a short or long rest.",
			action : [["reaction", " (activate)"]],
			recovery : "short rest",
			usages : 1
		},
		"subclassfeature10" : {
			name : "Queen's Chosen",
			source : ["PJHIVE", 1],
			minlevel : 10,
			description : desc([
                "I have advantage on saving throws against poison, and I have resistance against poison damage." + 
                "\n   " + "In addition, I can send a surge of insects forth at a creature within 10 feet of me as a bonus action, dealing magical piercing damage equal to my Charisma modifier (minimum of 1). This affected creature can't make opportunity attacks until the end of my turn." + 
                "\n   " + "I can use this distracting swarm twice, and regain these uses when I finish a short or long rest.",
            ]),
			action : [["bonus action", " (activate)"]],
			recovery : "short rest",
			usages : 2
		},
		"subclassfeature14" : {
			name : "One of Many",
			source : ["PJHIVE", 1],
			minlevel : 14,
			description : "\n   " + "I can discorporate into a swarm as a bonus action. I can spend up to 1 minute in this form however the time spent does not need to be contiguous. I regain all expended time in this form when I finish a long rest. This effect is similar to the gaseous form spell except it does not require concentration or any components, my flight speed is 60 feet, and you can freely discard this form without using an action." +
            "\n   " + "I can also choose to unleash a second massive swarm as an action when I discard this form. Every hostile creature within 15 feet of me must make a Constitution saving throw against my warlock spell save DC. On a failed saving throw a creature suffers 4d10 magical piercing damage and takes half damage on a success." +
            "\n   " + "This area is considered difficult terrain and heavily obscured only for hostile creatures until the end of my next turn. Once I use this surging swarm, I can't do so again until I have finished a long rest.",
			action : [["bonus action", " (activate)"]],
			recovery : "long rest",
			usages : 1
		}
	}
});

// Add Warlock Invocation
AddWarlockInvocation("Bloated Servants (prereqs: the Hive patron, 7th level)", {
	name : "Bloated Servants",
	description : "\n   " + "I can cast the giant insect spell once using a warlock spell slot. I can't do so again until I finish a long rest.",
	source : ["PJHIVE", 3],
	submenu : "[warlock level  7+]",
	prereqeval : function(v) { return classes.known.warlock.subclass == 'warlock-the hive' && classes.known.warlock.level >= 7; },
	spellcastingBonus : {
        name : "Bloated Servants",
        spells : ["giant insect"],
        selection : ["giant insect"],
        firstCol : 'oncelr'
    },
});

AddWarlockInvocation("Crawling Chorus (prereq: the Hive patron)", {
	name : "Crawling Chorus",
	description : "\n   " + "I can add my Charisma modifier to the damage dealt when I cast infestation and its range is doubled. In addition, I can move a creature up to 10 feet when they fail their saving throw against this spell.",
	source : ["PJHIVE", 3],
	prereqeval : function(v) { return classes.known.warlock.subclass == 'warlock-the hive' && classes.known.warlock.level >= 7; },
});

AddWarlockInvocation("Million Whispers (prereqs: the Hive patron, Pact of the Tome, 9th level)", {
	name : "Million Whispers",
	description : "\n   " + "I can perform a 10 minute ritual while holding my Book of Shadows to commune with all insects within 3 miles. This effect is similar to the commune with nature spell, however a group of insects will also lead I along the shortest path to one location of my choice, and I gain advantage on Wisdom (Perception) and Wisdom (Survival) checks while I remain within 30 feet of this guiding insect swarm.",
	source : ["PJHIVE", 3],
	prereqeval : function(v) { return classes.known.warlock.subclass == 'warlock-the hive' && classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome'; },
});

AddWarlockInvocation("Queen's Sting (prereqs: the Hive patron, Pact of the Blade)", {
	name : "Queen's Sting",
	description : "\n   " + "My pact weapon develops a sickly sheen of venom along its surface. When I score a critical hit with my pact weapon the target creature suffers an additional 1d8 poison damage and is poisoned until the end of my next turn." +
    "\n   " + "I can also forgo an attack to force my pact weapon into the ground, causing a massive stinger to burst forth in a 5 foot space within 60 feet. Any creature within 5 feet of this stinger must make a Constitution saving throw against my warlock spell save DC as it emits a sickening miasma of venom. A creature takes 4d6 in poison damage and is poisoned until the end of my next turn on a failed save, or takes half as much damage on a successful one.",
	source : ["PJHIVE", 3],
	prereqeval : function(v) { return classes.known.warlock.subclass == 'warlock-the hive' && classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the blade'; },
	recovery : "long rest",
	usages : 1
});

AddWarlockInvocation("Tarsal Grip (prereqs: the Hive patron, 5th level)", {
	name : "Tarsal Grip",
	description : "\n   " + "I an naturally adept at climbing. I have proficiency in the Athletics skill and a climb speed equal to my movement speed.",
	source : ["PJHIVE", 3],
	prereqeval : function(v) { return classes.known.warlock.subclass == 'warlock-the hive' && classes.known.warlock.level >= 5;},
    speed : { climb : { spd : "walk", enc : "walk" } }
});

CreatureList["hive warrior"] = {

    name: "Hive Warrior",
    nameAlt: ["Hive Warrior"],
    source: ["PJHIVE", 3],
    size: 5,
    type: "Beast",
    companion: "pact_of_the_chain",
    companionApply: "pact_of_the_chain",
    alignment : "Unaligned",
    ac: 14,
    hp: 13,
    hd: [3, 4],
    speed : "10 ft, burrow 5 ft, fly 60 ft",
    proficiencyBonus : 2,
    challengeRating : "1",
    scores : [9, 18, 15, 5, 16, 5],
    senses : "Darkvision 60 ft, tremorsense 10 ft",
    attacksAction: 1,
    attacks : [{
		name : "Bite",
		ability : 2,
		damage : [1, 4, "piercing"],
		range : "Melee (5 ft)",
		description : "A single bite attack as an Attack action."
	}],
    skills : {
		"Perception" : 5,
		"Stealth" : 6,
        "Survival" : 5
	},
    languages : "one language known by its master",
    features : [{
		name : "Fickle Flight",
		description : "If the hive warrior moves 30 feet or more on its turn, ranged attacks against it are made with disadvantage until the beginning of its next turn.",
	},
    {
		name : "Menace",
		description : "The hive warrior can use a bonus action to force a Large or smaller creature within 5 feet to succeed a DC 11 Wisdom saving throw or become frightened by it until the end of their next turn. On a successful save the creature is immune to this effect for 24 hours. This save is made with disadvantage if the hive warrior has attacked the creature on the same turn.",
	},
    {
		name : "Putrifying Saliva",
		description : "The hive warrior can spend 10 minutes to rapidly accelerate the decomposition of the corpse of a Large or smaller creature, leaving nothing behind. This does not work with constructs or elementals.",
	},
    {
		name : "Skirmisher Instinct",
		description : "The hive warrior can take the Disengage action as a bonus action.",
	}]
};