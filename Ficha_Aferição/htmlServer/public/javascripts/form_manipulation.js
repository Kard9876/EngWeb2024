$(document).ready(() => {
    let animais = 0;
    let figuras_publicas = 0;
    let destinos_favoritos = 0;

    // Add More Files button click event
    $('#addDesporto').click(() => {
        event.preventDefault()

        let desportos = $('#desportos').children().length + 1;

        $('#desportos').append(`<input class="w3-input w3-round w3-border w3-margin" type="text" name="desporto${desportos}" id="desporto${desportos}"/>`);
    });

    $('#removeDesporto').click(() => {
        event.preventDefault()

        let desportos = $('#desportos').children().length;

        if (desportos == 0) return;

        $(`#desporto${desportos}`).remove()
    });

    $('#addAnimal').click(() => {
        event.preventDefault()

        let animais = $('#animais').children().length + 1;

        $('#animais').append(`<input class="w3-input w3-round w3-border w3-margin" type="text" name="animal${animais}" id="animal${animais}"/>`);
    });

    $('#removeAnimal').click(() => {
        event.preventDefault()

        let animais = $('#animais').children().length;

        if (animais == 0) return;

        $(`#animal${animais}`).remove()
    });

    $('#addFiguraPublica').click(() => {
        event.preventDefault()

        let figuras_publicas = $('#figuras_publicas').children().length + 1;

        $('#figuras_publicas').append(`<input class="w3-input w3-round w3-border w3-margin" type="text" name="figura_publica${figuras_publicas}" id="figura_publica${figuras_publicas}"/>`);
    });

    $('#removeFiguraPublica').click(() => {
        event.preventDefault()

        let figuras_publicas = $('#figuras_publicas').children().length;

        if (figuras_publicas == 0) return;

        $(`#figura_publica${figuras_publicas}`).remove()
    });

    $('#addDestinoFavorito').click(() => {
        event.preventDefault()

        let destinos_favoritos = $('#destinos_favoritos').children().length + 1;

        $('#destinos_favoritos').append(`<input class="w3-input w3-round w3-border w3-margin" type="text" name="destino_favorito${destinos_favoritos}" id="destino_favorito${destinos_favoritos}"/>`);
    });

    $('#removeDestinoFavorito').click(() => {
        event.preventDefault()

        let destinos_favoritos = $('#destinos_favoritos').children().length;

        if (destinos_favoritos == 0) return;

        $(`#destino_favorito${destinos_favoritos}`).remove()
    });
});