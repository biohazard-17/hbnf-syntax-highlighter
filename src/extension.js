const vscode = require('vscode');
const definition = require('./core/definition');
const formatter = require('./core/formatter');

function activate(context) {
    // Registrar features modularmente
    const features = [
        definition.register(context),
        formatter.register(context)
    ];
    
    context.subscriptions.push(...features);
}

function deactivate() {}

module.exports = { activate, deactivate };