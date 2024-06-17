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

    $('form').submit(function (event) {
        event.preventDefault()

        var ans = {
            _id: '',
            nome: '',
            idade: 0,
            sexo: '',
            morada: {
                cidade: '',
                distrito: ''
            },
            descricao: '',
            profissao: '',
            partido_politico: {
                party_abbr: '',
                party_name: ''
            },
            religiao: '',
            desportos: [],
            animais: [],
            figura_publica_pt: [],
            marca_carro: '',
            destinos_favoritos: [],
            atributos: {
                fumador: false,
                gosta_cinema: false,
                gosta_viajar: false,
                acorda_cedo: false,
                gosta_ler: false,
                gosta_musica: false,
                gosta_comer: false,
                gosta_animais_estimacao: false,
                gosta_dancar: false,
                comida_favorita: ''
            }
        }

        var stop = false;

        $(this).find('input').each(function () {
            let name = $(this).attr('name');

            let val = $(this).is(':checkbox') ? $(this).is(":checked") : $(this).val();

            if (name != 'descricao' && val === '') {
                stop = true;
            }
            
            if (name == 'fumador' || name == 'gosta_viajar' || name == 'acorda_cedo' || name == 'gosta_ler' || name == 'gosta_musica' || name == 'gosta_comer' || name == 'gosta_animais_estimacao' || name == 'gosta_dancar' || name == 'comida_favorita') {
                ans.atributos[name] = val;
            } else if (name == 'party_abbr' || name == 'party_name') {
                ans.partido_politico[name] = val;
            } else if (name == 'cidade' || name == 'distrito') {
                ans.morada[name] = val;
            } else if (/desporto.*/.test(name)) {
                ans.desportos.push(val)
            } else if (/animal.*/.test(name)) {
                ans.animais.push(val)
            } else if (/figura_publica.*/.test(name)) {
                ans.figura_publica_pt.push(val)
            } else if (/destino_favorito.*/.test(name)) {
                ans.destinos_favoritos.push(val)
            } else {
                ans[name] = val;
            }
        })
        
        if (stop) {
            alert('Empty fields');
            return
        }

        console.log(ans)

        $.ajax({
            url: window.location,
            method: 'POST',
            data: JSON.stringify(ans),
            headers: {
                'Content-Type': 'application/json',
            },
            success: function (response) {
                window.location = `/${ans._id}`
            },
            error: function (error) {
                alert(`Erro: ${error}`)
            },
        })
    })
});