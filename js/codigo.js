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
	var id_cliente=window.localStorage.getItem('id_usuario');
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/ver_reservacion.php?id_cliente="+id_cliente);
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
				if(confirm("Ten en cuenta que las reservaciones tienen una tolerancia de 10 minutos.\nDe no llegar, la reservación se calcelara automaticamente."))
				{
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
			}
	
	});
}
}

function eliminarReservacion(id)
{
	if(confirm("¿Realmente desea eliminar la reservación?"))
	{
		cargando();
		$.post("http://sacygrestaurantes.com/mobile/delete_reservacion.php",{id:id},function(data){
			alert(data);
			loadVerReservacion();
		});
	}
}
function loadEditarReservacion(id)
{
	cargando();
	$("#contenedor").load("http://sacygrestaurantes.com/mobile/editar_reservacion.php?id="+id);
}
function actualizarReservacion()
{
	var id_reservacion=$("#txt_id_reservacion").prop("value");
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
				$.post("http://sacygrestaurantes.com/mobile/update_reservacion.php",
				{
					id_reservacion:id_reservacion,
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

function loadMenu()
{
	$("#contenedor_pedido").load("http://sacygrestaurantes.com/mobile/menu.php");
}
function detalleAlimento(id)
{
	$.post("http://sacygrestaurantes.com/mobile/get_detalle.php",{id:id},function(data){ alert(data); });
}

var arreglo = new Array();
var cantidad=0;
var total=0;
function agregarAlimento(id)
{
	cantidad = $("#txt_cant_"+id).prop("value");
	if(confirm("¿Agregar "+cantidad+" pieza(s) de esta opción?"))
	{
		arreglo.push([cantidad,id]);
		var precio=$("#precio"+id).text();
		var subtotal=(precio * cantidad);
		total+=subtotal;
	}
}

function loadPedido()
{
	
	$("#contenedor_pedido").html("");

	
	if(arreglo.length>0)
	{
		$("#contenedor_pedido").append("<center><label><span class='icon-location'></span>Tú ubicación</label></center>");
		$("#contenedor_pedido").append("<center><input type='text' class='input' placeholder='Click para detectar tu ubicación' id='txt_ubicacion_pedido' onclick='detectarUbicacion();' readonly></center><br>");
		$("#contenedor_pedido").append("<center><label><span class='icon-star-full'></span>Selecciona la sucursal de tu preferencia</label></center>");
		$.post("http://sacygrestaurantes.com/mobile/get_sucursal.php",{},function(data){
			$("#contenedor_pedido").append("<center><select type='text' class='input' >"+data+"</select></center><br>");
			$("#contenedor_pedido").append("<center><button class='input' id='' onclick=''><span class='icon-checkmark'></span>Confirmar pedido $"+total+"</button></center><br>");
		for (var i=0 ; i < arreglo.length; i++) {
			
		var producto=arreglo[i];
		$.post("http://sacygrestaurantes.com/mobile/get_producto.php",
		{
			cantidad:producto[0],
			producto:producto[1],
			contador:i
		},function(data){
			$("#contenedor_pedido").append(data);
			
		});
		};
		});
		
		
		
	}else{
		$("#contenedor_pedido").append("<center><h3>Aún no has agregado nada</h3></center>");
	}
	//alert(total);
}
function eliminarElemento(indice,precio)
{
	if(confirm("¿Eliminar este producto?"))
	{
		total-=precio;
		if(indice<=0){
			arreglo.splice(0,1);
			loadPedido();
		}else{
			arreglo.splice(indice,indice);
			loadPedido();
		}
		
	}
}
var latitud="";
var longitud="";
function detectarUbicacion()
{
	geolocalizame();
	if(latitud.length<=0 || longitud.length<=0)
	{

	}else{
		$("#txt_ubicacion_pedido").prop("value","Tu ubicacion ha sido encontrada!!!");
	}
	
}
function pedirPosicion(pos) {
   var centro = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
   
  latutud=pos.coords.latitude;
  longitud=pos.coords.longitude;
}
 
function geolocalizame(){
navigator.geolocation.getCurrentPosition(pedirPosicion);
 }