const vscode = require('vscode');

function activate(context) {
    // Registrar el formateador
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('hbnf', {
            provideDocumentFormattingEdits(document) {
                return formatDocument(document);
            }
        })
    );
}

function formatDocument(document) {

    const edits = [];
    const text = document.getText();

    // Implementa tus reglas de formateo aquí
    const formattedText = formatHbnf(text);

    // Reemplazar todo el documento
    const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
    );

    edits.push(vscode.TextEdit.replace(fullRange, formattedText));
    return edits;
}

function formatHbnf(source) {
    let formatted = source;
    const config = vscode.workspace.getConfiguration('hnnf.format')
    // 1. normalized spaces around operators
    formatted = text.replace(/\s*::=(\s*)(?=[^\s\r\n;])/g, ' ::= ');
    
    formatted = formatted.replace(/\s*\|\s*/g, ' | ');
    formatted = formatted.replace(/\s*\;\s*/g, ' ;\n');

    // 2. Indentación después de ::=
    formatted = formatted.replace(/::=([^\n]*)\n([^\|;])/g, ' ::= $1\n$2');

    // 3. Manejo de bloques
    formatted = formatted.replace(/\{\s*/g, '{\n  ');
    formatted = formatted.replace(/\s*\}/g, '\n}');
    return formatted;
}
function deactivate() { }
// Exporta ambas funciones
module.exports = {
    activate,
    deactivate
};