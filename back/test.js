const match = await bcrypt.compare('test', '$2b$10$V3Y746.Fxkke60o0oQ7MK.B90r9VJsp5yGzdxlBL364/QgJdKObbG');
console.log(match);

if (match) {
    // les mots de passes sont identiques
} else {
    // les mots de passes sont différents
}