const vscode = require('vscode');
const { findDefinition, findDefinitionPosition } = require('../parser/parser');

function register(context) {
    // 1. Comando para click derecho
    const showDefinitionCmd = vscode.commands.registerCommand(
        'hbnf.showDefinition', 
        showDefinition
    );
    
    // 2. Proveedor para Ctrl+Click
    const definitionProvider = vscode.languages.registerDefinitionProvider(
        'hbnf', 
        { provideDefinition }
    );
    
    context.subscriptions.push(showDefinitionCmd, definitionProvider);
    return showDefinitionCmd;
}

async function showDefinition() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const position = editor.selection.active;
    const wordRange = document.getWordRangeAtPosition(position, /<[^>]+>/);
    
    if (!wordRange) {
        vscode.window.showWarningMessage('You haven\'t selected any non-terminal element');
        return;
    }

    const nonTerminal = document.getText(wordRange);
    const definition = findDefinition(document, nonTerminal);
    
    if (definition) {
        vscode.window.showInformationMessage(
            `Definición de ${nonTerminal}: ${definition}`
        );
    }
}

function provideDefinition(document, position) {
    const wordRange = document.getWordRangeAtPosition(position, /<[^>]+>/);
    if (!wordRange) return null;
    
    const nonTerminal = document.getText(wordRange);
    return findDefinitionPosition(document, nonTerminal);
}

module.exports = { register };