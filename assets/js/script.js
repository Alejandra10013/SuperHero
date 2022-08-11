$(() => {
    function callData(superHero) {
        $.ajax({
            type: "GET",
            url: "https://www.superheroapi.com/api.php/10222886118495107/" + superHero,
            success: function (data) {

                let stats = []
                for (key in data.powerstats) {
                    stats.push({ y: data.powerstats[key], label: key })
                }

                let superHero = {
                    nombre: data.name,
                    imagen: data.image.url,
                    nombreCompleto: data.biography["full-name"],
                    natal: data.biography["place-of-birth"],
                    alter: data.biography["alter-egos"],
                    aparicion: data.biography["first-appearance"],
                    conexiones: data.connections["group-affiliation"],
                    ocupacion: data.work.occupation,
                    ojos: data.appearance["eye-color"],
                    pelo: data.appearance["hair-color"],

                    estadisticas: stats,
                }
                console.log(superHero);
                mostrarHero(superHero);
                mostrarGrafico(superHero);

            },
            error: function (error) {
                console.log(error)
            },
            async: true

        })
    }
    let formulario = $("form");

    formulario.submit(function (event) {
        event.preventDefault();

        let superHero = $("#hero").val();
        let regex = /[0-9]|\./;

        if (!regex.test(superHero)) {
            alert("Enter a valid ID");
        } else {
            callData(superHero);
        }

    })

    function mostrarHero(superHero) {
        $("#datos_hero").find("img").attr("src", superHero.imagen);
        $("#datos_hero").find(".card-title").html(superHero.nombre);


        $("#datos_hero").find(".nombreCompleto").html(`Full name: ${superHero.nombreCompleto}`);
        $("#datos_hero").find(".natal").html(`Place of birth: ${superHero.natal}`);
        $("#datos_hero").find(".ojos").html(`Eye color: ${superHero.ojos}`);
        $("#datos_hero").find(".pelo").html(`Hair color: ${superHero.pelo}`);
        $("#datos_hero").find(".alter").html(`Alter-egos: ${superHero.alter}`);
        $("#datos_hero").find(".ocupacion").html(`Ocupation: ${superHero.ocupacion}`);
        $("#datos_hero").find(".aparicion").html(`First appereance: ${superHero.aparicion}`);
        $("#datos_hero").find(".conexiones").html(`Connections: ${superHero.conexiones}`);


        $("#section-hero").show();
        //hide o toggle son otras opciones de display.
    }

    function mostrarGrafico(superHero) {
        var chart = new CanvasJS.Chart("hero-stats", {
            theme: "dark2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "SuperHero stats"
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: superHero.estadisticas
            }]
        });
        chart.render();
    }
})