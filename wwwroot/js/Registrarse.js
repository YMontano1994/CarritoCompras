var IdentificadorEliminarUsu = "";

$(document).ready(function () {
    CargarEntidadUsuario();

    $('.modal').modal({
        backdrop: 'static',
        keyboard: false
    })

});


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

    var alertPlaceholder = document.getElementById('AlertRegistrar')
    document.getElementById("AlertRegistrar").innerHTML = "";
    alertPlaceholder.append(wrapper)
}


async function RegistrarUsuario() {

    var Aviso = document.getElementById('AlertRegistrar');
    Aviso.style.display = 'none';

    if ($("#NameCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Nombre</strong>', 'danger');
        return;
    }
    if ($("#CorreoCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Correo</strong>', 'danger');
        return;
    }
    if ($("#PasswordCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>PASSWORD</strong>', 'danger');
        return;
    }
    if ($("#CedulaCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Cedula</strong>', 'danger');
        return;
    }

    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "") + `/RegistrarUsuario?NameCliente=` + $("#NameCliente").val() + `&CorreoCliente=` + $("#CorreoCliente").val() + `&CedulaCliente=` + $("#CedulaCliente").val() + `&PasswordCliente=` + $("#PasswordCliente").val();
    var res = await fetch(url, {
        method: "GET"
    })
        .then(res => res.text())
        .then(async function (data) {

            if (data == "Ok") {
                alert("El usuario se registro con exito");
                //let url = window.location.href.split('?')[0];
                //url = url.replace("/registrarse", "/Index");
                //window.location.href = url;
                $("#NameCliente")[0].value = "";
                $("#CedulaCliente")[0].value = "";
                $("#CorreoCliente")[0].value = "";
                $("#PasswordCliente")[0].value = "";

                await CargarEntidadUsuario();

            }
            else {
                alert("Error al insertar el usuario/ o esta insertando un usuario con un identificador ya existente");
                return;
            }
        })
        .catch(error => {
            console.log(error)
        });

}

function RegresarUsu() {
    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "/index");
    window.location.href = url;
}

async function CargarEntidadUsuario() {

    $("#TablaInformacionUsuario").empty();

    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "") + `/traerinformacionUsuario`;
    fetch(url, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {

            var obj = data;

            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const td = document.createElement('td');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td6 = document.createElement('td');
            const Button = document.createElement('button');
            const Button1 = document.createElement('button');

            const input = document.createElement('input');
            var lista = "";

            const Eliminar = document.createElement('div')
            Eliminar.innerHTML = [
                '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16"  style="position: relative;left: -40px;top: -21px;">',
                '   <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64"></path>',
                '</svg>'
            ].join('')

            const Actualizar = document.createElement('div')
            Actualizar.innerHTML = [
                ' <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-highlighter" viewBox="0 0 16 16"  style="position: relative;left: -40px;top: -21px;">',
                '   		<path fill-rule="evenodd" d="M11.096.644a2 2 0 0 1 2.791.036l1.433 1.433a2 2 0 0 1 .035 2.791l-.413.435-8.07 8.995a.5.5 0 0 1-.372.166h-3a.5.5 0 0 1-.234-.058l-.412.412A.5.5 0 0 1 2.5 15h-2a.5.5 0 0 1-.354-.854l1.412-1.412A.5.5 0 0 1 1.5 12.5v-3a.5.5 0 0 1 .166-.372l8.995-8.07zm-.115 1.47L2.727 9.52l3.753 3.753 7.406-8.254zm3.585 2.17.064-.068a1 1 0 0 0-.017-1.396L13.18 1.387a1 1 0 0 0-1.396-.018l-.068.065zM5.293 13.5 2.5 10.707v1.586L3.707 13.5z"></path>',
                '</svg>'
            ].join('')

            if (data.length > 0) {
                for (var a = 0; a < data.length; a++) {
                    td.innerHTML = data[a].nombre;
                    td.style.fontSize = 23;
                    td1.innerHTML = data[a].cedula;
                    td1.style.fontSize = 23;
                    td2.innerHTML = data[a].correo;
                    td2.style.fontSize = 23;
                    //td3.innerHTML = data[a].contraseña;
                    //td3.style.fontSize = 23;
                    Button.setAttribute("data-identificadorUsuario", data[a].cedula);
                    Button.setAttribute("id", "EliminarEUP");
                    Button.style.width = 141;
                    Button.style.height = 55;
                    Button.setAttribute("onclick", "EliminarEntidadUsuario(this)");
                    Button.innerHTML = "<strong><FONT SIZE=4 style='position: relative;left: 13px;top: 11px;'>Eliminar</font></strong>";
                    Button.className = "btn btn-outline-danger btn-sm m-1 button5";

                    Button1.setAttribute("data-identificadorUsuario", data[a].cedula);
                    Button1.setAttribute("onclick", "ActualizarEntidadUsuario(this)");
                    Button1.style.width = 141;
                    Button1.style.height = 55;
                    Button1.innerHTML = "<strong><FONT SIZE=4 style='position: relative;left: 20px;top: 11px;'>Actualizar</font></strong>";
                    Button1.className = "btn btn-outline-primary btn-sm m-1 button5";
                    Button.append(Eliminar);
                    Button1.append(Actualizar);

                    tr.append(td);
                    tr.append(td1);
                    tr.append(td2);
                    /*tr.append(td3);*/
                    td4.append(Button);
                    td6.append(Button1);

                    tr.append(td4);
                    tr.append(td6);

                    lista = lista + tr.outerHTML;

                }

                var div2 = document.getElementById('LabelEntidadUsuario');
                div2.style.display = '';
                var div2 = document.getElementById('LabelUsuario');
                div2.style.display = 'none';
                var div2 = document.getElementById('tablaInsertUsuario');
                div2.style.display = '';
                $("#TablaInformacionUsuario").append(lista);
            }
            else {
                var div1 = document.getElementById('tablaInsertUsuario');
                div1.style.display = 'none';
                var div2 = document.getElementById('LabelEntidadUsuario');
                div2.style.display = 'none';
                var div3 = document.getElementById('LabelUsuario');
                div3.style.display = '';
            }

        })
        .catch(error => {
            console.log(error)
        });
}


function EliminarEntidadUsuario(data) {
    IdentificadorEliminarUsu = data.getAttribute("data-identificadorUsuario");
    $("#ModalEliminarUsu").modal("show");
    $("#TextoEntidadUsu")[0].innerHTML = "Esta seguro de eliminar el usuario con el identificador: " + IdentificadorEliminarUsu;
}
function EliminarEPModalUsu() {

    //var Identificador = data.getAttribute("data-identificadorUsuario");
    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "") + `/EliminarEntidadUsuario?Identificador=` + IdentificadorEliminarUsu;

    fetch(url, {
        method: "GET"
    })
        .then(res => res.text())
        .then(async function (data) {
            if (data == "Ok") {
                debugger
                await CargarEntidadUsuario();
                alert("Se elimino el usuario correctamente");
                $("#ModalEliminarUsu").modal("hide");

            }

        })
        .catch(error => {
            console.log(error)
        });

}


function ActualizarEntidadUsuario(data) {
    var Identificador = data.getAttribute("data-identificadorUsuario");

    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "") + `/ActualizarUsuario?Identificador=` + Identificador;

    fetch(url, {
        method: "GET"
    })
        .then(res => res.json())
        .then(async function (data) {

            //$('#EliminarEUP').prop('disabled', true);

            $("#NameCliente")[0].value = data[0].nombre;
            $("#CedulaCliente")[0].value = data[0].cedula;
            $("#CorreoCliente")[0].value = data[0].correo;
            $("#PasswordCliente")[0].value = data[0].contraseña;

            var div1 = document.getElementById('botonesprincipal');
            div1.style.display = 'none';
            var div2 = document.getElementById('botonesSecundarios');
            div2.style.display = '';
        })
        .catch(error => {
            console.log(error)
        });

}



function CancelarActualizacion() {

    $('#EliminarEUP').prop('disabled', false);

    $("#NameCliente")[0].value = "";
    $("#CedulaCliente")[0].value = "";
    $("#CorreoCliente")[0].value = "";
    $("#PasswordCliente")[0].value = "";

    var div1 = document.getElementById('botonesprincipal');
    div1.style.display = '';
    var div2 = document.getElementById('botonesSecundarios');
    div2.style.display = 'none';
}


async function ActualizarEUsuario() {

    if ($("#NameCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Nombre</strong>', 'danger');
        return;
    }
    if ($("#CorreoCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Correo</strong>', 'danger');
        return;
    }
    if ($("#PasswordCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>PASSWORD</strong>', 'danger');
        return;
    }
    if ($("#CedulaCliente").val() == "") {
        var Usuario = document.getElementById('AlertRegistrar');
        Usuario.style.display = '';
        appendAlert('Debe ingresar un <strong>Cedula</strong>', 'danger');
        return;
    }

    debugger
    let url = window.location.href.split('?')[0];
    url = url.replace("/registrarse", "") + `/ActualizarEUsuario?NameCliente=` + $("#NameCliente").val() + `&CorreoCliente=` + $("#CorreoCliente").val() + `&CedulaCliente=` + $("#CedulaCliente").val() + `&PasswordCliente=` + $("#PasswordCliente").val();

    fetch(url, {
        method: "GET"
    })
        .then(res => res.text())
        .then(async function (data) {
            if (data == "Ok") {
                debugger
                await CargarEntidadUsuario();
                alert("Se actualizo el usuario correctamente");

                $("#NameCliente")[0].value = "";
                $("#CedulaCliente")[0].value = "";
                $("#CorreoCliente")[0].value = "";
                $("#PasswordCliente")[0].value = "";
                $('#EliminarEUP').prop('disabled', false);

                var div1 = document.getElementById('botonesprincipal');
                div1.style.display = '';
                var div2 = document.getElementById('botonesSecundarios');
                div2.style.display = 'none';

            }

        })
        .catch(error => {
            console.log(error)
        });
}