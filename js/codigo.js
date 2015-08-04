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
function loadVerReservacion()
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/ver_reservacion.php");
}

function reservarMesa()
{
	var fecha =$("#txt_fecha_reservacion").prop("value");
	var hora =$("#txt_hora_reservacion").prop("value");
	var id_sucursal =$("#txt_sucursal_reservacion").prop("value");
	var numero_personas =$("#txt_personas_reservacion").prop("value");
	var detalles =$("#txt_detalles_reservacion").prop("value");
	if(fecha.length<=0 || hora.length<=0)
	{
		alert("No se estableció Fecha u Hora");
	}else{
	$.post("http://sacygrestaurantes.com/mobile/get_fecha.php",{},
		function(data){ 
		
		var fechaActual=data.split('-');
		var fecha2=fecha.split('-')+hora.split(':'); 
		
		//Validando fecha y hora
		if(fecha2<fechaActual){alert("La fecha/hora ingresada es inválida por favor verifícala");}
		else{
				var id_cliente=window.localStorage.getItem('id_usuario');
				cargando();
				$.post("http://sacygrestaurantes.com/mobile/insert_reservacion.php",
				{
					id_cliente:id_cliente,
					id_sucursal:id_sucursal,
					fecha:fecha,
					hora:hora,
					numero_personas:numero_personas,
					detalles:detalles
				},
				function(data)
				{
					alert(data);
								loadVerReservacion();
				});
			}
	
	});
}
}
