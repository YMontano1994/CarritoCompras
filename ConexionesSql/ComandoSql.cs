using EjemploCarrito.Models;
using System.Collections.Generic;
using System.Data;
using System;
using System.Data.SqlClient;

namespace EjemploCarrito.ConexionesSql
{
    public class ComandoSql
    {
        public static string ConsultarUsuario(string Usuario, string PasswordU)
        {
            string identificador = "";

            try
            {
                using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
                {
                    string sql = "SELECT Cedula from CLIENTES where Correo =" + "'" + Usuario + "'" + " and Contraseña=" + "'" + PasswordU + "'";

                    using (SqlCommand oConexion1 = new SqlCommand(sql, oConexion))
                    {
                        oConexion.Open();
                        using (SqlDataReader reader = oConexion1.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                identificador = reader.GetString(0);
                                //    reader.GetString(1));
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string result = ex.Message;
            }

            return identificador;
        }

        public static string Registrar(string NameCliente, string CorreoCliente, string PasswordCliente, string CedulaCliente)
        {
            string result = "";
            int idEntidadUsuario = 0;
            try
            {
                idEntidadUsuario = ConsultarIdentificador(CedulaCliente);

                if (idEntidadUsuario == 0)
                {
                    using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
                    {
                        SqlCommand cmd = new SqlCommand("InsertarUsuario", oConexion);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Nombre", NameCliente);
                        cmd.Parameters.AddWithValue("@Cedula", CedulaCliente);
                        cmd.Parameters.AddWithValue("@Correo", CorreoCliente);
                        cmd.Parameters.AddWithValue("@Contraseña", PasswordCliente);
                        try
                        {
                            oConexion.Open();
                            cmd.ExecuteNonQuery();
                            result = "Ok";
                        }
                        catch (Exception ex)
                        {
                            result = "Error";
                        }
                    }
                }
                else
                {
                    result = "Error";
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
            }

            return result;
        }

        public static int ConsultarIdentificador(string Identificador)

        {
            int idEntidadUsuario = 0;
            try
            {
                using (SqlConnection oConexion2 = new SqlConnection(Sql.rutaConexion))
                {
                    string sql = "SELECT IdCliente from CLIENTES where Cedula =" + "'" + Identificador;

                    using (SqlCommand oConexion3 = new SqlCommand(sql, oConexion2))
                    {
                        oConexion2.Open();
                        using (SqlDataReader reader = oConexion3.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                idEntidadUsuario = reader.GetInt32(0);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
            }
            return idEntidadUsuario;
        }


        public static List<EntidadUsuarioModel> traerinformacionUsuario()
        {
            List<EntidadUsuarioModel> EntidadPersonas = new List<EntidadUsuarioModel>();

            try
            {

                using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
                {
                    string sql = "select Nombre,Cedula,Correo,Contraseña from CLIENTES";

                    using (SqlCommand oConexion1 = new SqlCommand(sql, oConexion))
                    {
                        oConexion.Open();
                        using (SqlDataReader reader = oConexion1.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                EntidadUsuarioModel DataEntidad = new EntidadUsuarioModel();
                                DataEntidad.Nombre = reader.GetString(0);
                                DataEntidad.Cedula = reader.GetString(1);
                                DataEntidad.Correo = reader.GetString(2);
                                DataEntidad.Contraseña = reader.GetString(3);
                                EntidadPersonas.Add(DataEntidad);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
            }
            return EntidadPersonas;
        }

        public static string EliminarEntidadUsuario(string Identificador)
        {
            string result = "";

            try
            {
                using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
                {
                    SqlCommand cmd = new SqlCommand("DeleteUsuario", oConexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Cedula", Identificador);
                    try
                    {
                        oConexion.Open();
                        cmd.ExecuteNonQuery();
                        result = "Ok";
                    }
                    catch (Exception ex)
                    {
                        result = "Error";
                    }
                }
            }
            catch (Exception ex)
            {
                result = ex.Message;

            }
            return result;
        }

        public static List<EntidadUsuarioModel> ActualizarUsuario(string Identificador)
        {
            List<EntidadUsuarioModel> EntidadPersonas = new List<EntidadUsuarioModel>();
            using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
            {
                string sql = "select Nombre,Cedula,Correo,Contraseña from CLIENTES where Cedula = " + "'" + Identificador + "'";

                using (SqlCommand oConexion1 = new SqlCommand(sql, oConexion))
                {
                    oConexion.Open();
                    using (SqlDataReader reader = oConexion1.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            EntidadUsuarioModel DataEntidad = new EntidadUsuarioModel();
                            DataEntidad.Nombre = reader.GetString(0);
                            DataEntidad.Cedula = reader.GetString(1);
                            DataEntidad.Correo = reader.GetString(2);
                            DataEntidad.Contraseña = reader.GetString(3);
                            EntidadPersonas.Add(DataEntidad);
                        }
                    }
                }
            }
            return EntidadPersonas;
        }

        public static string ActualizarEUsuario(string NameCliente, string CorreoCliente, string PasswordCliente, string CedulaCliente)
        {
            string result = "";
            try
            {

                using (SqlConnection oConexion = new SqlConnection(Sql.rutaConexion))
                {
                    SqlCommand cmd = new SqlCommand("ActualizarUsuario", oConexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Nombre", NameCliente);
                    cmd.Parameters.AddWithValue("@Cedula", CedulaCliente);
                    cmd.Parameters.AddWithValue("@Correo", CorreoCliente);
                    cmd.Parameters.AddWithValue("@Contraseña", PasswordCliente);
                    try
                    {
                        oConexion.Open();
                        cmd.ExecuteNonQuery();
                        result = "Ok";
                    }
                    catch (Exception ex)
                    {
                        result = "Error";
                    }
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;

            }
            return result;
        }
    }
}
