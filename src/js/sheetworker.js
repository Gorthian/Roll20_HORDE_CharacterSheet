function attributsprobe(attribut) {
    console.log("Starte Attributsprobe");
    getAttrs([attribut,attribut+"_bonus"], function(values) {
        let schwierigkeit = parseInt(values[attribut]||0);
        let bonus = parseInt(values[attribut+"_bonus"]||0);
        startRoll("&{template:attributsprobe} {{attribut="+getTranslationByKey(attribut)+"}} {{wurf=[[1d20]]}} {{schwierigkeit=[["+schwierigkeit+"]]}} {{bonus=[["+bonus+"]]}} {{beschreibung=[[0]]}}", (results) => {
            const wurf = results.results.wurf.result
            const schwierigkeit = results.results.schwierigkeit.result;
            const bonus = results.results.bonus.result;
            let ergebnis = schwierigkeit+bonus-wurf;
            let beschreibung = "";

            if (ergebnis < -10) {beschreibung = getTranslationByKey("info-katastrophaler_fehlschlag");} else
            if (ergebnis < -5 && ergebnis > -11) {beschreibung = getTranslationByKey("info-unangenehmer_fehlschlag");} else
            if (ergebnis < 0 && ergebnis > -6) {beschreibung = getTranslationByKey("info-einfacher_fehlschlag");} else
            if (ergebnis == 0) {beschreibung = getTranslationByKey("info-erfolg");} else
            if (ergebnis > 0 && ergebnis < 6) {beschreibung = getTranslationByKey("info-einfacher_erfolg");} else
            if (ergebnis > 5 && ergebnis < 11) {beschreibung = getTranslationByKey("info-besonderer_erfolg");} else
            if (ergebnis > 10) {beschreibung = getTranslationByKey("info-exzellenter_erfolg");}
            console.log(beschreibung);

            finishRoll(
                results.rollId,
                {
                    wurf: wurf,
                    schwierigkeit: schwierigkeit,
                    bonus: bonus,
                    beschreibung: beschreibung
                }
            )
        });
    });
}

on("clicked:probe-intelligenz", function() {
    attributsprobe("intelligenz");    
});

on("clicked:probe-mut", function() {
    attributsprobe("mut");    
});

on("clicked:probe-koerperkraft", function() {
    attributsprobe("koerperkraft");    
});

on("clicked:probe-geschick", function() {
    attributsprobe("geschick");    
});

on("clicked:probe-charisma", function() {
    attributsprobe("charisma");    
});