const vscode = require('vscode');

function findDefinition(document, nonTerminal) {
    const text = document.getText();
    const pattern = new RegExp(`${escapeRegExp(nonTerminal)}\\s*::=\\s*([^;]+);`);
    const match = text.match(pattern);
    return match ? match[1].trim() : null;
}

function findDefinitionPosition(document, nonTerminal) {
    const pattern = new RegExp(`${escapeRegExp(nonTerminal)}\\s*::=`);
    
    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        if (pattern.test(line.text)) {
            return new vscode.Location(document.uri, line.range);
        }
    }
    return null;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { 
    findDefinition,
    findDefinitionPosition
};