// JavaScript Document
function cargando()
{
	$("#contenedor").html("<br><br><br><center><img src='img/load2.gif' width='50%'></center>");
}
function loadMain()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/main.php");
}
function validarEmail(email)
{
	var exp = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if(exp.test(email.trim()))return true;
	else return false;
}
function loadInicio()
{
	$("body").load("http://sacygrestaurantes.com/mobile/inicio.php");
}
function loadRecuperacion()
{
	$("body").load("http://sacygrestaurantes.com/mobile/recuperacion.php");
}
function loadRegistro()
{
	$("body").load("http://sacygrestaurantes.com/mobile/registro.php");
}
function recuperarContrasena()
{
	var email=$("#txt_email_recuperacion").prop("value");
	if(validarEmail(email))
	{
		$.post("http://sacygrestaurantes.com/control/recuperacion.php",{email:email},function(data){
			alert(data);
		});
	}else
	{
		
		alert("Debe ingresar un Email valido!!!");
	}

}
function validaCliente()
{
	var usuario =$("#txt_usuario_login").prop("value");
	var contrasena =$("#txt_contrasena_login").prop("value");
	$.post("http://sacygrestaurantes.com/control/valida_cliente.php",
		{
			usuario:usuario,
			contrasena:contrasena
		}
		,function(data){
			if(data >= 1)
			{
				window.localStorage.setItem("id_usuario",data);
				location.reload(true);
			}else{
				alert("Los datos son incorrectos o tal vez has olvidado activar tu cuenta!!!","error");
			}
		});
}
function cerrarSesion()
{
	window.localStorage.clear();
	loadInicio();
}
function loadConfig()
{
	cargando();
	$("#contenedor").html('<center><a href="#" onclick="cerrarSesion();" class="opciones">CerrarSesion</a></center>');
}
function loadSucursales()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/sucursales.php");
}
function loadContacto()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/contacto.php");
}
function loadQuienes()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/quienes.php");
}
function loadDomicilio()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/domicilio.php");
}
function loadReservacion()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/reservacion.php");
}