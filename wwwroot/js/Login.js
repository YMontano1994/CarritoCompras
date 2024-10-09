function Registrarse() {
    debugger

    let url = window.location.href.split('?')[0]
    url = url.replace("/index", "") + `/registrarse`;
    window.location.href = url;

}

const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert" style="height: 77px;">`,
        '   <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:" style="width: 57px;position: relative;top: -59px;">',
        '   <use xlink:href="#exclamation-triangle-fill"></use>',
        '   </svg>',
        `   <div style=" position: relative;top: -139px;left: 79px;">${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    document.getElementById("liveAlertPlaceholder").innerHTML = "";
    alertPlaceholder.append(wrapper)
}

async function ingresar() {

    var Aviso = document.getElementById('liveAlertPlaceholder');
    Aviso.style.display = 'none';

    if ($("#UsuarioLogin").val() == "") {
        var Usuario = document.getElementById('liveAlertPlaceholder');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>USUARIO</strong>', 'danger');
        return;
    }

    if ($("#PasswordLogin").val() == "") {
        var Pass = document.getElementById('liveAlertPlaceholder');
        Pass.style.display = '';
        appendAlert('Debe ingresar el <strong>PASSWORD</strong>', 'danger');
        return;
    }

    let url = window.location.href.split('?')[0]
    url = url.replace("/index", "") + `/LoginUsuario?Usuario=` + $("#UsuarioLogin").val() + `&Password=` + $("#PasswordLogin").val();
    var res = await fetch(url, {
        method: "GET"
    })

    debugger

    var data = await res.text();

    if (data != "") {
        let url = window.location.href.split('?')[0]
        //url = url.replace("Login/index", "EntidadPersonas") + `/Index?Usuario=` + data;
        url = url.replace("/index", "") + `/Ingresar?Usuario=` + data;

    }
    else {
        var Usuario = document.getElementById('liveAlertPlaceholder');
        Usuario.style.display = '';
        appendAlert('El <strong>usuario/clave</strong> son incorrecto <strong>o</strong> <br />  el usuario no esta <strong>registrado</strong>', 'danger');
        return;
    }

}