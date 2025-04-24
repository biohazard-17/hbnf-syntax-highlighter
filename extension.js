const vscode = require('vscode');

function activate(context) {
    // Registrar el formateador
    let formatter = vscode.languages.registerDocumentFormattingEditProvider('hbnf', {
        provideDocumentFormattingEdits(document){
            return formatDocument(document)
        }
    });
    let right_click = vscode.commands.registerCommand('hbnf.showDefinition', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        
        const document = editor.document;
        const position = editor.selection.active;
        const wordRange = document.getWordRangeAtPosition(position, /<[^>]+>/);
        
        if (!wordRange) {
            vscode.window.showWarningMessage('No se encontró un no-terminal seleccionado');
            return;
        }

        const nonTerminal = document.getText(wordRange);
        const definition = findDefinition(document, nonTerminal);
        
        if (definition) {
            // Opción 1: Mostrar notificación
            vscode.window.showInformationMessage(`Definición de ${nonTerminal}: ${definition}`);
            
            // Opción 2: Imprimir en consola (para depuración)
            console.log(`Definición encontrada: ${nonTerminal} ::= ${definition}`);
        } else {
            vscode.window.showWarningMessage(`No se encontró definición para ${nonTerminal}`);
        }
    });
    let ctrl_click = vscode.languages.registerDefinitionProvider('hbnf', {
        provideDefinition(document, position) {
            const wordRange = document.getWordRangeAtPosition(position, /<[^>]+>/);
            if (!wordRange) return null;
            
            const nonTerminal = document.getText(wordRange);
            const definitionPos = findDefinitionPosition(document, nonTerminal);
            
            return definitionPos ? new vscode.Location(document.uri, definitionPos) : null;
        }
    });
    context.subscriptions.push(formatter);
    context.subscriptions.push(right_click);
    context.subscriptions.push(ctrl_click);

}
function findDefinitionPosition(document, nonTerminal) {
    const text = document.getText();
    const pattern = new RegExp(`${escapeRegExp(nonTerminal)}\\s*::=`);
    
    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        if (pattern.test(line.text)) {
            return line.range;
        }
    }
    return null;
}

function findDefinition(document, nonTerminal) {
    const text = document.getText();
    const pattern = new RegExp(`${escapeRegExp(nonTerminal)}\\s*::=\\s*([^;]+);`);
    const match = text.match(pattern);
    
    return match ? match[1].trim() : null;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
//==============MOVED TO MODULE FORMATTER===========
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
    formatted = formatted.replace(/\s*::=\s*/g, ' ::= ');
    // Troublesome formatting option
    // formatted = text.replace(/\s*::=(\s*)(?=[^\s\r\n;])/g, ' ::= ');

    formatted = formatted.replace(/\s*\|\s*/g, ' | ');
    formatted = formatted.replace(/\s*\;\s*/g, ' ;\n');

    // 2. Indentation after ::=
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
/* 
Lázaro
+53 5 6584630
Rubén
+53 5 6618212
Raikol
+53 5 5713886

 */