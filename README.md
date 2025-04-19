# hbnf-syntax-highlighter README

Basic support for a hybrid Backus-naur form grammar language.

It uses a special notation combining the visual clarity of standard bnf, with the powerful advantages of ebnf in a special manner.

## Features

Syntax Highlight in .hbnf files as well inside markdown codeblocks declared as hbnf as:
``` hbnf
```

## SYNTAX
Symbol|Alternative|Meaning
---|---|---
`<>`| | non-terminal element
`::=`| | definition rule (replace by)
`;`| | end of rule
`,`| | concatenation symbol
`/**/`| | multiline comment
`""`| `''`| terminal element
`\|`| | logic or operator
`*`| `{}`| repetition zero or more
`+`| `[]`| repetition once or more
`?`| | once or none
`()`| | grouper
`#[]`| | syntactic sugar for ranges of elements
`E` | `NULL` | symbol for representing empty set (epsilon in BNF format)

### 1.0.0

Basic support for syntax highlight of hbnf language

