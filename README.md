# hbnf-syntax-highlighter README

Basic support for a hybrid Backus-naur form grammar language.

It uses a special notation combining the visual clarity of standard bnf, with the powerful advantages of ebnf in a special manner.

## Table of Content
1. [`CHANGELOG`](#CHANGELOG)
2. [`List of features`](#Features)
    - [`Syntactical elements`](#syntax)
3. [`License Specifications`](#-license)
    - [`Commercial Use`](#commercial-use)
    - [`Derivative Work`](#Derivative-Work)
4. [`Disclaimer`](#-license)

## **CHANGELOG**
To see full list of changes, please refer to: [CHANGELOG](CHANGELOG.md)

## **Features**

Syntax Highlight in .hbnf files as well inside markdown codeblocks declared as hbnf as:  
\``` hbnf  
\```
### **EXAMPLE**
**The following code block represents the hbnf grammar using its own definition**

``` hbnf
<hbnf> ::= { <element> } ;
<element> ::= <spacer> | <comment> | <rule>
<comment> ::= "/*" , { <character> | <spacer> } !"*/" , "*/"
/*a rule consist of a -left hand side-, followed by the derivation symbol, 
followed by te -right hand side- then followed by any amount of spacer characters ending with the rule end token; 
in between, any amount of spacers can be placed*/
<rule> ::= <left-hand-side> , { <spacer> } , <derivation> , { <spacer> } , <right-hand-side> , { <spacer> } , <rule-end> ;
<left-hand-side> ::= "<" , <identifier> , ">" ;
<right-hand-side> ::= <concatenation> ;
<concatenation> ::= <expression> , { "," , <expression> } ;
<expression> ::= 
    { <spacer> } , 
    (<alternation> 
    | <grouping> 
    | <repetitive> 
    | <terminal> 
    | <non-terminal> 
    | <range> 
    | <exclusion> 
    | <empty>) , 
    { <spacer> }
    ;
<alternation> ::= <expression>, { <spacer> } , "|" , { <spacer> } , <expression> ;
<grouping> ::= "(" { <spacer> } , <expression> , { <spacer> } , ")" ;
<repetitive> ::= 
    "{" { <spacer> } , <expression> , { <spacer> } , "}"
    | "[" { <spacer> } , <expression> , { <spacer> } , "]" 
    | <expression> , "?"
    | <expression> , "*"
    | <expression> , "+"
    ;
<non-terminal> ::= "<" , <identifier>, ">" ;
<range> ::= "#[" , <character> , "-" , <character> , "]" ;
/*no multi-line available for exclusion expression*/
<exclusion> ::= <expression> , " !" , <expression> ;
<derivation> ::= "::=" ;
<rule-end> ::= ";" ;
<empty> ::= "E" | "NULL" ;
<identifier> ::= <letter> , { <character> } ;
<terminal> ::= 
    '"' { <character> } , '"' 
    | "'" { <character> } , "'" 
    ;
<character> ::= <letter> | <digit> | <special-character> ;
<letter> ::= #['a' - 'z'] | #['A' - 'Z'] ;
<digit> ::= #['0' - '9'] ;
<special-character> ::= 
    "["   | "]"  | "{"  | "}"  | "(" | ")" 
    | "<" | ">"  | "'"  | '"'  | "=" | "|" 
    | "." | ","  | ";"  | "-"  | "+" | "*" 
    | "?" | "\n" | "\t" | "\r" | " " | "_" 
    | "!"
    ;
/*white space, line feed, horizontal tabulation, carriage return, form feed, backspace*/
<spacer> ::= " " | "\n" | "\t" | "\r" | "\f" | "\b" ;
```

### **SYNTAX**
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
`!` | | Negation symbol, useful for restricting terminals and non terminals contained in non terminals referenced by a rule in the grammar
---
## **📜 License**

This project uses the [MIT License](LICENSE) with special requirements for attribution:  
**U MUST** Acknowledge the original work as detailed in: [ATTRIBUTION.md](ATTRIBUTION.md).

### **Commercial use:**
This product is allowed for commercial use.

### **Derivative Work**
You are allowed to change an distribute your own modifications or projects / products derived from this work, with your own license and requirements.

You are not obligated to share your modifications with the original owner of the product.

For full detail see: [LICENSE.md](LICENSE.md) | [ATTRIBUTION.md](ATTRIBUTION.md)

---
## **⚠️ Disclaimer ⚠️**
By modifying this code, you agree that:  

1. You are solely responsible for your changes.
2. You must maintain attribution to the original work.
3. The author declines all responsibility for problems arising from improper use of the product.