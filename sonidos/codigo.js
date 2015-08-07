$(document).ready(init);
function soloNumeros() {
 if ((event.keyCode < 48) || (event.keyCode > 57)) 
  event.returnValue = false;
}
function init()
{
	$("#pestanas").tabs();

	//LOAD AJAX
	$("#tabla_sucursal").html("<center><img src='../img/load.gif' width='200'></center>");
	$("#tabla_mesa").html("<center><img src='../img/load.gif' width='200'></center>");
	$("#tabla_empleado").html("<center><img src='../img/load.gif' width='200'></center>");
	$("#tabla_alimento").html("<center><img src='../img/load.gif' width='200'></center>");
	$("#tabla_categoria").html("<center><img src='../img/load.gif' width='200'></center>");
	//Cargando tablas
	$("#tabla_sucursal").load("tabla/tabla_sucursal.php");
	$("#tabla_mesa").load("tabla/tabla_mesa.php");
	$("#tabla_empleado").load("tabla/tabla_empleado.php");
	$("#tabla_alimento").load("tabla/tabla_alimento.php");
	$("#tabla_categoria").load("tabla/tabla_categoria.php");
}

//SUCURSAL
function nuevaSucursal()
{
$("#modal_nueva_sucursal").modal();
}
function insertSucursal()
{
var sucursal =$("#txt_nombre_sucursal_nueva").prop("value");
var telefono =$("#txt_telefono_sucursal_nueva").prop("value");
var mapa =$("#txt_mapa_sucursal_nueva").prop("value");
var calle_numero =$("#txt_calle_numero_sucursal_nueva").prop("value");
var colonia =$("#txt_colonia_sucursal_nueva").prop("value");
var delegacion =$("#txt_delegacion_sucursal_nueva").prop("value");
var cp =$("#txt_cp_sucursal_nueva").prop("value");
$.post("control/insert_sucursal.php",
		{
			sucursal:sucursal,
			telefono:telefono,
			mapa:mapa,
			calle_numero:calle_numero,
			colonia:colonia,
			delegacion:delegacion,
			cp:cp
			
		},
		function(data){
			//alert(data);
			$("#modal_nueva_sucursal").modal("hide");
			$("#tabla_sucursal").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_sucursal").load("tabla/tabla_sucursal.php");
		});
}
function deleteSucursal(id_sucursal)
{
	if(confirm("¿Seguro que deseas eliminar esta sucursal?"))
	{
		$.post("control/delete_sucursal.php",
			{
				id_sucursal:id_sucursal
			},
			function(data){
				//alert(data);
				$("#tabla_sucursal").html("<center><img src='../img/load.gif' width='200'></center>");
				$("#tabla_sucursal").load("tabla/tabla_sucursal.php");
			});
	}	
}
function showUpdateSucursal(id_sucursal)
{	//mandamos llamar a get_sucursal para q llene todo apartir del id
	$.post("modal/get_sucursal.php",{id_sucursal:id_sucursal},function(data){
		//ya q les puso valores llenamos el contenedor del body del modal
		$("#contenedor_update_sucursal").html(data);
		//ya podemos mostrar el modal
		$("#modal_update_sucursal").modal();
	});

	
}
function updateSucursal()
{
var id_sucursal =$("#txt_id_sucursal_update").text();	
var sucursal =$("#txt_nombre_sucursal_update").prop("value");
var telefono =$("#txt_telefono_sucursal_update").prop("value");
var calle_numero =$("#txt_calle_numero_sucursal_update").prop("value");
var colonia =$("#txt_colonia_sucursal_update").prop("value");
var delegacion =$("#txt_delegacion_sucursal_update").prop("value");
var cp =$("#txt_cp_sucursal_update").prop("value");
$.post("control/update_sucursal.php",
		{
			id_sucursal:id_sucursal,
			sucursal:sucursal,
			telefono:telefono,
			calle_numero:calle_numero,
			colonia:colonia,
			delegacion:delegacion,
			cp:cp
			
		},
		function(data){
			//alert(data);
			$("#modal_update_sucursal").modal("hide");
			$("#tabla_sucursal").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_sucursal").load("tabla/tabla_sucursal.php");
		});
}
//MESA
function showNuevaMesa()
{
$("#modal_nueva_mesa").modal();
}

function insertMesa()
{
var numero_mesa =$("#txt_numero_mesa_nueva").prop("value");
var capacidad =$("#txt_capacidad_mesa_nueva").prop("value");
var sucursal_mesa =$("#txt_sucursal_mesa").prop("value");
$.post("control/insert_mesa.php",
		{
			numero_mesa:numero_mesa,
			capacidad:capacidad,
			sucursal_mesa:sucursal_mesa
		},
		function(data){
			alert(data);
			$("#modal_nueva_mesa").modal("hide");
		});
}
function showUpdateMesa(id)
{
	$.post("modal/get_mesa.php",{id:id},function(data){
		$("#contenedor_update_mesa").html(data);
		$("#modal_actualizar_mesa").modal();
	});
}
function updateMesa(id)
{
	var id_mesa=$("#id_update_mesa").prop("value");
	var id_sucursal=$("#txt_sucursal_mesa_update").prop("value");
	var id_disponibilidad=$("#txt_disponibilidad_mesa_update").prop("value");
	var numero_mesa=$("#txt_numero_mesa_update").prop("value");
	var capacidad=$("#txt_capacidad_mesa_update").prop("value");
	if(numero_mesa.length<=0 || capacidad <=0)
	{
		swal("Atencion!!!","Todos los campos son obligatorios","error");
	}else
	{
		$.post("control/update_mesa.php",{
			id_mesa:id_mesa,
			id_sucursal:id_sucursal,
			id_disponibilidad:id_disponibilidad,
			numero_mesa:numero_mesa,
			capacidad:capacidad
		},function(data){
			swal("Genial!!!","Registro actualizado","success");
			$("#modal_actualizar_mesa").modal("hide");
			$("#tabla_mesa").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_mesa").load("tabla/tabla_mesa.php");
		});
	}
}
function deleteMesa(id_mesa)
{
	if(confirm("¿Seguro que deseas eliminar esta mesa?"))
	{
		$.post("control/delete_mesa.php",
			{
				id_mesa:id_mesa
			},
			function(data){
				alert(data);
				$("#tabla_mesa").html("<center><img src='../img/load.gif' width='200'></center>");
				$("#tabla_mesa").load("tabla/tabla_mesa.php");
			});
	}	
}
//EMPLEADO
function showInsertEmpleado()
{
$("#modal_nuevo_empleado").modal();
}
function insertEmpleado()
{
	var usuario=$("#txt_usuario_empleado_nuevo").prop("value");
	var contrasena=$("#txt_contrasena_empleado_nuevo").prop("value");
	var recontrasena=$("#txt_recontrasena_empleado_nuevo").prop("value");
	var id_rol=$("#txt_rol_empleado_nuevo").prop("value");

	var hora_entrada=$("#txt_hora1_empleado_nuevo").prop("value");
	var hora_salida=$("#txt_hora2_empleado_nuevo").prop("value");
	var sueldo=$("#txt_sueldo_empleado_nuevo").prop("value");

	var id_sucursal=$("#txt_sucursal_empleado_nuevo").prop("value");
	var nombre=$("#txt_nombre_empleado_nuevo").prop("value");
	var ap_paterno=$("#txt_apaterno_empleado_nuevo").prop("value");
	var ap_materno=$("#txt_amaterno_empleado_nuevo").prop("value");
	var fecha_nacimiento=$("#txt_fecha_empleado_nuevo").prop("value");
	var telefono=$("#txt_telefono_empleado_nuevo").prop("value");
	var email=$("#txt_email_empleado_nuevo").prop("value");
	var calle_numero=$("#txt_calle_numero_empleado_nuevo").prop("value");
	var colonia=$("#txt_colonia_empleado_nuevo").prop("value");
	var municipio=$("#txt_municipio_empleado_nuevo").prop("value");
	var cp=$("#txt_cp_empleado_nuevo").prop("value");
	var exp = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if(usuario.length<=0||contrasena.length<=0||recontrasena.length<=0||hora_entrada.length<=0||hora_salida.length<=0||sueldo.length<=0
		||nombre.length<=0||ap_materno.length<=0||ap_paterno.length<=0||fecha_nacimiento.length<=0||telefono.length<=0
		||email.length<=0||calle_numero.length<=0||colonia.length<=0||municipio.length<=0||cp.length<=0)
	{
		swal("Atencion!!!","Todos los campos son obligatorios","error");
	}else
	{
		if(!exp.test(email.trim()))
		{
			swal("Debes ingresar un email valido");
		}else
		{
			if(contrasena!=recontrasena)
			{
				swal("Las contrasenas no coinciden!!!");
			}else
			{
				$.post("control/insert_empleado.php",{
					usuario:usuario,contrasena:contrasena,id_rol:id_rol,
					hora_entrada:hora_entrada,hora_salida:hora_salida,
					sueldo:sueldo,id_sucursal:id_sucursal,nombre:nombre,
					ap_paterno:ap_paterno,ap_materno:ap_materno,
					fecha_nacimiento:fecha_nacimiento,telefono:telefono,
					email:email,calle_numero:calle_numero,
					colonia:colonia,municipio:municipio,cp:cp
				},function(data){
					swal("Genial!!!",data,"success");
					$("#modal_nuevo_empleado").modal("hide");
					$("#tabla_empleado").html("<center><img src='../img/load.gif' width='200'></center>");
					$("#tabla_empleado").load("tabla/tabla_empleado.php");
				});
			}
		}
	}
}
function showUpdateEmpleado(id)
{
	$.post("modal/get_empleado.php",{id:id},function(data){
		$("#contenedor_update_empleado").html(data);
		$("#modal_update_empleado").modal();
	});
}
function updateEmpleado()
{
	var id_empleado=$("#txt_id_empleado_update").prop("value");
	var id_rol=$("#txt_rol_empleado_update").prop("value");

	var hora_entrada=$("#txt_hora1_empleado_update").prop("value");
	var hora_salida=$("#txt_hora2_empleado_update").prop("value");
	var sueldo=$("#txt_sueldo_empleado_update").prop("value");

	var id_sucursal=$("#txt_sucursal_empleado_update").prop("value");
	var nombre=$("#txt_nombre_empleado_update").prop("value");
	var ap_paterno=$("#txt_apaterno_empleado_update").prop("value");
	var ap_materno=$("#txt_amaterno_empleado_update").prop("value");
	var fecha_nacimiento=$("#txt_fecha_empleado_update").prop("value");
	var telefono=$("#txt_telefono_empleado_update").prop("value");
	var email=$("#txt_email_empleado_update").prop("value");
	var calle_numero=$("#txt_calle_numero_empleado_update").prop("value");
	var colonia=$("#txt_colonia_empleado_update").prop("value");
	var municipio=$("#txt_municipio_empleado_update").prop("value");
	var cp=$("#txt_cp_empleado_update").prop("value");
	var exp = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	if(hora_entrada.length<=0||hora_salida.length<=0||sueldo.length<=0
		||nombre.length<=0||ap_materno.length<=0||ap_paterno.length<=0||fecha_nacimiento.length<=0||telefono.length<=0
		||email.length<=0||calle_numero.length<=0||colonia.length<=0||municipio.length<=0||cp.length<=0)
	{
		swal("Atencion!!!","Todos los campos son obligatorios","error");
	}else
	{
		if(!exp.test(email.trim()))
		{
			swal("Debes ingresar un email valido");
		}else
			{
				$.post("control/update_empleado.php",{
					id_rol:id_rol,
					hora_entrada:hora_entrada,hora_salida:hora_salida,
					sueldo:sueldo,id_sucursal:id_sucursal,nombre:nombre,
					ap_paterno:ap_paterno,ap_materno:ap_materno,
					fecha_nacimiento:fecha_nacimiento,telefono:telefono,
					email:email,calle_numero:calle_numero,
					colonia:colonia,municipio:municipio,cp:cp
				},function(data){
					swal("Genial!!!",data,"success");
					$("#modal_update_empleado").modal("hide");
					$("#tabla_empleado").html("<center><img src='../img/load.gif' width='200'></center>");
					$("#tabla_empleado").load("tabla/tabla_empleado.php");
				});
			}
	}
}
function deleteEmpleado(id_empleado)
{
	if(confirm("¿Seguro que deseas eliminar este registro?"))
	{
		$.post("control/delete_empleado.php",
			{
				id_empleado:id_empleado
			},
			function(data){
				alert(data);
				$("#tabla_empleado").html("<center><img src='../img/load.gif' width='200'></center>");
				$("#tabla_empleado").load("tabla/tabla_empleado.php");
			});
	}	
}
//CATEGORIA (tipo_alimento)
function nuevaCategoria()
{
	$("#modal_nueva_categoria").modal();
}
function insertCategoria()
{
	var categoria=$("#txt_nueva_categoria").prop("value");

	if(categoria.length<=0)
	{
		swal("Atencion!!!","Debes llenar todos los campos","error");
	}else
	{
		$.post("control/insert_categoria.php",{categoria:categoria},function(data){
			swal("Genial!!!",data,"success");
			$("#modal_nueva_categoria").modal("hide");
			$("#tabla_categoria").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_categoria").load("tabla/tabla_categoria.php");
		});
	}
}
function deleteCategoria(id)
{
	swal(
		{title: '¿Realmente desea eliminar este registro?',
		text: 'Este cambio ya no se podra deshacer en el futuro!!!',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor:'#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText:'Eliminar', 
		closeOnConfirm: false }, 
		function() { 
			$.post("control/delete_categoria.php",{id:id},function(data){
			swal( 'Eliminado','El registro ha sido eliminado!!!', 'success');
			$("#tabla_categoria").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_categoria").load("tabla/tabla_categoria.php");
			});
			
		});
}
//ALIMNETO
function nuevoAlimento()
{
	$("#modal_nuevo_alimento").modal();
}
function insertAlimento()
{
	var tipo_alimento=$("#txt_alimento_tipo").prop("value");
	var alimento=$("#txt_nombre_alimento_nuevo").prop("value");
	var descripcion=$("#txt_descripcion_alimento_nuevo").prop("value");
	var precio=$("#txt_precio_alimento_nuevo").prop("value");
	if(alimento.length<=0 || descripcion.length<=0 || precio.length<=0)
	{
		swal("Atencion!!!","Todos los campos son obligatorios","error");
	}else
	{
		$.post("control/insert_alimento.php",
			{
				tipo_alimento:tipo_alimento,
				alimento:alimento,
				descripcion:descripcion,
				precio:precio
			},function(data){
			swal("Genial!!!",data,"success");
			$("#modal_nuevo_alimento").modal("hide");
			$("#tabla_alimento").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_alimento").load("tabla/tabla_alimento.php");

			});
	}
}
function showUpdateAlimento(id)
{
	$.post("modal/get_alimento.php",{id:id},function(data){
		$("#contenedor_update_alimento").html(data);
		$("#modal_actualizar_alimento").modal();
	});
}
function updateAlimento(id)
{
	var id_alimento=$("#txt_id_update_alimento").prop("value");
	var tipo_alimento=$("#txt_alimento_tipo_update").prop("value");
	var alimento=$("#txt_nombre_alimento_update").prop("value");
	var descripcion=$("#txt_descripcion_alimento_update").prop("value");
	var precio=$("#txt_precio_alimento_update").prop("value");
	if(alimento.length<=0 || descripcion.length<=0 || precio.length<=0)
	{
		swal("Atencion!!!","Todos los campos son obligatorios","error");
	}else
	{
		$.post("control/update_alimento.php",
			{
				id_alimento:id_alimento,
				tipo_alimento:tipo_alimento,
				alimento:alimento,
				descripcion:descripcion,
				precio:precio
			},function(data){
			swal("Genial!!!","Registro actualizado","success");
			$("#modal_actualizar_alimento").modal("hide");
			$("#tabla_alimento").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_alimento").load("tabla/tabla_alimento.php");

			});
	}


}
function deleteAlimento(id)
{
	swal(
		{title: '¿Realmente desea eliminar este registro?',
		text: 'Este cambio ya no se podra deshacer en el futuro!!!',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor:'#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText:'Eliminar', 
		closeOnConfirm: false }, 
		function() { 
			$.post("control/delete_alimento.php",{id:id},function(data){
			swal( 'Eliminado','El registro ha sido eliminado!!!', 'success');
			$("#tabla_alimento").html("<center><img src='../img/load.gif' width='200'></center>");
			$("#tabla_alimento").load("tabla/tabla_alimento.php");
			});
			
		});
}
function enviarNotificacion()
{
	var texto = $("#txt_mensaje_push").prop("value")
	if(texto.length<=0)
	{
		swal("Hey","El campo esta vacio.","error");
	}else
	{
		$.post("http://sacygrestaurantes.com/push/notificar.php",{msj:texto},function(data){});
		$("#txt_mensaje_push").prop("value","");
		swal("Ok","La notificacion ha sido enviada a los dispositivos móviles.","success");
	}
	
}
