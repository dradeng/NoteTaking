
const fs = require('fs');
const _ = require('lodash');
const notes = require('./notes');
const yargs = require('yargs');

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
}
const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
}
const argv = yargs
	.command('add', 'Add a new note', {
			title: titleOptions,
			body: bodyOptions
	})
	.command('list', 'list all notes')
	.command('read', 'read a note', {
		title: {
			title: titleOptions
		}
	})
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.help()
	.argv;

var command = argv._[0];


if (command == 'add') {
	var note = notes.addNote(argv.title, argv.body);

	if (note) {
		console.log('note created');
	} else {
		console.log('onope');
	}
} else if (command == 'list') {
	notes.getAll();
} else if (command == 'read') {
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('note found');

	} else {
		console.log('note not found')
	}

} else if(command == 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note removed' : 'No Node';
	console.log(message)
} else {
	console.log('command not found');
}


