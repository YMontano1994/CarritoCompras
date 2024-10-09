using EjemploCarrito.ConexionesSql;
using EjemploCarrito.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EjemploCarrito.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly IDataProtector _protector;

        public LoginController(IDataProtectionProvider protectorProvider)
        {
            _protector = protectorProvider.CreateProtector("PersonalProfile.Protector");
        }

        public IActionResult registrarse()
        {
            return View("Registro", "Login");
        }

        public IActionResult Ingresar(string data)
        {
            return View("_Layout", "Login");
        }


        public async Task<string> RegistrarUsuario(string NameCliente, string CorreoCliente, string PasswordCliente, string CedulaCliente)
        {
            //string ss = _protector.Protect(PasswordCliente);
            //PasswordCliente = ss;
            string Respuesta = ComandoSql.Registrar(NameCliente, CorreoCliente, PasswordCliente, CedulaCliente);
            return Respuesta;
        }


        public async Task<string> LoginUsuario(string Usuario, string Password)
        {
            //string ss = _protector.Protect(Password);
            //Password = ss;
            string Respuesta = ComandoSql.ConsultarUsuario(Usuario, Password);
            return Respuesta;
        }

        public List<EntidadUsuarioModel> traerinformacionUsuario()
        {
            List<EntidadUsuarioModel> Respuesta = ComandoSql.traerinformacionUsuario();
            return Respuesta;
        }

        public string EliminarEntidadUsuario(string Identificador)
        {
            string result = ComandoSql.EliminarEntidadUsuario(Identificador);
            return result;
        }

        public List<EntidadUsuarioModel> ActualizarUsuario(string Identificador)
        {
            List<EntidadUsuarioModel> result = ComandoSql.ActualizarUsuario(Identificador);
            return result;
        }


        public string ActualizarEUsuario(string NameCliente, string CorreoCliente, string PasswordCliente, string CedulaCliente)
        {
            //string ss = _protector.Protect(PasswordCliente);
            //PasswordCliente = ss;
            string result = ComandoSql.ActualizarEUsuario(NameCliente, CorreoCliente, PasswordCliente, CedulaCliente);
            return result;
        }
    }
}
