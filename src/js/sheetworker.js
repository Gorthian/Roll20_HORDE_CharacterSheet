on("clicked:probe-intelligenz", function() {
    console.log("Probe auf Intelligenz");
    startRoll("&{template:attributsprobe} {{attribut=Intelligenz}} {{roll=[[1d20]]}}", (results) => {
        const total = results.results.roll.result
        const computed = total;

        finishRoll(
            results.rollId,
            {
                roll: computed,
            }
        )}
    );
});