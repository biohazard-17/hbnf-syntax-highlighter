const vscode = require('vscode');

function register(context) { 

    context.subscriptions.push( vscode.languages.registerDocumentFormattingEditProvider('hbnf', { provideDocumentFormattingEdits(document) { return formatDocument(document); } }));
}

function formatDocument(document) {
    const edits = [];
    const text = document.getText();
    
    // formatting rules
    const formattedText = formatHbnf(text);
    // replace full document text
    const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
    );
    edits.push(vscode.TextEdit.replace(fullRange, formattedText));
    return edits;
}

function formatHbnf(source) {
    let formatted = source;
    const config = vscode.workspace.getConfiguration('hbnf.format');
    // 1. normalized spaces around operators

    formatted = formatted.replace(/ *::= */g, ' ::= ');
    formatted = formatted.replace(/\s*, */g, ' , ');
    formatted = formatted.replace(/\s*\| */g, ' | ');
    formatted = formatted.replace(/\s*\; */g, ' ;');

    return formatted;
}

module.exports = { register }; 