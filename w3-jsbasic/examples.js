/**
 * ========================================
 * 100 EJERCICIOS DE JAVASCRIPT FUNDAMENTALS
 * ========================================
 * Archivo: ejercicios-javascript.js
 * Autor: Profesor de JavaScript
 * Descripción: 100 ejercicios organizados como funciones
 * Uso: node ejercicios-javascript.js
 */

console.log("🚀 INICIANDO 100 EJERCICIOS DE JAVASCRIPT");
console.log("=========================================\n");

// ========================================
// 🎯 VARIABLES Y TIPOS DE DATOS (1-15)
// ========================================

function ejercicio1() {
    console.log("--- Ejercicio 1: Variable con let ---");
    let miNombre = "Juan Pérez";
    console.log(miNombre);
}

function ejercicio2() {
    console.log("--- Ejercicio 2: Constante PI ---");
    const PI = 3.14159;
    console.log("El valor de PI es:", PI);
}

function ejercicio3() {
    console.log("--- Ejercicio 3: Tres variables personales ---");
    let edad = 22;
    let altura = 1.75;
    let peso = 70;
    console.log(`Edad: ${edad}, Altura: ${altura}m, Peso: ${peso}kg`);
}

function ejercicio4() {
    console.log("--- Ejercicio 4: Variable sin valor ---");
    let sinValor;
    console.log("Valor:", sinValor);
    console.log("Tipo:", typeof sinValor);
}

function ejercicio5() {
    console.log("--- Ejercicio 5: Variable null ---");
    let vacio = null;
    console.log("Valor:", vacio);
    console.log("Tipo:", typeof vacio);
}

function ejercicio6() {
    console.log("--- Ejercicio 6: Variable boolean ---");
    let esEstudiante = true;
    console.log("¿Es estudiante?", esEstudiante);
    console.log("Tipo:", typeof esEstudiante);
}

function ejercicio7() {
    console.log("--- Ejercicio 7: Precio y descuento ---");
    let precio = 99.99;
    let descuento = 15;
    console.log(`Precio: $${precio}`);
    console.log(`Descuento: ${descuento}%`);
}

function ejercicio8() {
    console.log("--- Ejercicio 8: Variable string ---");
    let mensaje = "Aprendiendo JavaScript";
    console.log(mensaje);
    console.log("Longitud del mensaje:", mensaje.length);
}

function ejercicio9() {
    console.log("--- Ejercicio 9: Tres tipos diferentes ---");
    let numero = 42;
    let texto = "Hola mundo";
    let verdadero = true;
    console.log("Número:", numero, "- Tipo:", typeof numero);
    console.log("Texto:", texto, "- Tipo:", typeof texto);
    console.log("Boolean:", verdadero, "- Tipo:", typeof verdadero);
}

function ejercicio10() {
    console.log("--- Ejercicio 10: Cambiar valor de variable ---");
    let ciudad = "Quito";
    console.log("Ciudad inicial:", ciudad);
    ciudad = "Guayaquil";
    console.log("Ciudad actualizada:", ciudad);
    ciudad = "Manta";
    console.log("Ciudad final:", ciudad);
}

function ejercicio11() {
    console.log("--- Ejercicio 11: Constante máximo usuarios ---");
    const MAXIMO_USUARIOS = 100;
    console.log("Máximo de usuarios permitidos:", MAXIMO_USUARIOS);
}

function ejercicio12() {
    console.log("--- Ejercicio 12: Teléfono como string ---");
    let telefono = "0987654321";
    console.log("Teléfono:", telefono);
    console.log("Tipo:", typeof telefono);
}

function ejercicio13() {
    console.log("--- Ejercicio 13: Cambiar boolean ---");
    let activo = true;
    console.log("Estado inicial:", activo);
    activo = false;
    console.log("Estado final:", activo);
}

function ejercicio14() {
    console.log("--- Ejercicio 14: Nombre completo ---");
    let nombre = "María";
    let apellido = "González";
    let edad = 20;
    console.log(`Nombre completo: ${nombre} ${apellido}`);
    console.log(`Edad: ${edad} años`);
}

function ejercicio15() {
    console.log("--- Ejercicio 15: Variable sin valor inicial ---");
    let resultado;
    console.log("Resultado inicial:", resultado);
    resultado = 42;
    console.log("Resultado final:", resultado);
}

// ========================================
// ➕ OPERADORES ARITMÉTICOS (16-25)
// ========================================

function ejercicio16() {
    console.log("--- Ejercicio 16: Suma básica ---");
    let suma = 25 + 30;
    console.log("25 + 30 =", suma);
}

function ejercicio17() {
    console.log("--- Ejercicio 17: Área de rectángulo ---");
    let base = 5;
    let altura = 8;
    let area = base * altura;
    console.log(`Área del rectángulo: ${base} × ${altura} = ${area}`);
}

function ejercicio18() {
    console.log("--- Ejercicio 18: Operador módulo ---");
    let dividendo = 17;
    let divisor = 3;
    let resto = dividendo % divisor;
    console.log(`${dividendo} % ${divisor} = ${resto}`);
}

function ejercicio19() {
    console.log("--- Ejercicio 19: Potencia ---");
    let base = 2;
    let exponente = 8;
    let potencia = base ** exponente;
    console.log(`${base}^${exponente} = ${potencia}`);
}

function ejercicio20() {
    console.log("--- Ejercicio 20: Promedio de notas ---");
    let nota1 = 8;
    let nota2 = 9;
    let nota3 = 7;
    let promedio = (nota1 + nota2 + nota3) / 3;
    console.log(`Notas: ${nota1}, ${nota2}, ${nota3}`);
    console.log(`Promedio: ${promedio.toFixed(2)}`);
}

function ejercicio21() {
    console.log("--- Ejercicio 21: Convertir minutos ---");
    let totalMinutos = 120;
    let horas = Math.floor(totalMinutos / 60);
    let minutos = totalMinutos % 60;
    console.log(`${totalMinutos} minutos = ${horas} horas y ${minutos} minutos`);
}

function ejercicio22() {
    console.log("--- Ejercicio 22: Perímetro de círculo ---");
    const PI = 3.14159;
    let radio = 6;
    let perimetro = 2 * PI * radio;
    console.log(`Perímetro del círculo (radio=${radio}): ${perimetro.toFixed(2)}`);
}

function ejercicio23() {
    console.log("--- Ejercicio 23: Operaciones básicas ---");
    let num1 = 15;
    let num2 = 4;
    console.log(`Números: ${num1} y ${num2}`);
    console.log(`Suma: ${num1 + num2}`);
    console.log(`Resta: ${num1 - num2}`);
    console.log(`Multiplicación: ${num1 * num2}`);
    console.log(`División: ${num1 / num2}`);
}

function ejercicio24() {
    console.log("--- Ejercicio 24: Días en semanas ---");
    let semanas = 5;
    let diasPorSemana = 7;
    let totalDias = semanas * diasPorSemana;
    console.log(`${semanas} semanas = ${totalDias} días`);
}

function ejercicio25() {
    console.log("--- Ejercicio 25: Número par ---");
    let numero = 14;
    let esPar = numero % 2 === 0;
    console.log(`¿El número ${numero} es par? ${esPar}`);
}

// ========================================
// ⚖️ OPERADORES DE COMPARACIÓN (26-35)
// ========================================

function ejercicio26() {
    console.log("--- Ejercicio 26: Comparación mayor ---");
    let resultado = 10 > 5;
    console.log("¿10 es mayor que 5?", resultado);
}

function ejercicio27() {
    console.log("--- Ejercicio 27: Igualdad == vs === ---");
    let comparacion1 = "5" == 5;
    let comparacion2 = "5" === 5;
    console.log('"5" == 5:', comparacion1);
    console.log('"5" === 5:', comparacion2);
}

function ejercicio28() {
    console.log("--- Ejercicio 28: Mayor de edad ---");
    let edad = 22;
    let esMayorDeEdad = edad >= 18;
    console.log(`¿Edad ${edad} es mayor o igual a 18? ${esMayorDeEdad}`);
}

function ejercicio29() {
    console.log("--- Ejercicio 29: Strings iguales ---");
    let palabra1 = "JavaScript";
    let palabra2 = "javascript";
    let sonIguales = palabra1 === palabra2;
    console.log(`¿"${palabra1}" === "${palabra2}"? ${sonIguales}`);
}

function ejercicio30() {
    console.log("--- Ejercicio 30: Precio menor ---");
    let precio = 85;
    let esBarato = precio < 100;
    console.log(`¿Precio $${precio} es menor a $100? ${esBarato}`);
}

function ejercicio31() {
    console.log("--- Ejercicio 31: No es cero ---");
    let numero = 5;
    let noEsCero = numero !== 0;
    console.log(`¿El número ${numero} NO es cero? ${noEsCero}`);
}

function ejercicio32() {
    console.log("--- Ejercicio 32: Longitud de nombre ---");
    let nombre = "Alexandra";
    let longitudMayor = nombre.length > 5;
    console.log(`¿La longitud de "${nombre}" (${nombre.length}) es mayor a 5? ${longitudMayor}`);
}

function ejercicio33() {
    console.log("--- Ejercicio 33: Número en rango ---");
    let numero = 7;
    let estaEnRango = numero >= 1 && numero <= 10;
    console.log(`¿El número ${numero} está entre 1 y 10? ${estaEnRango}`);
}

function ejercicio34() {
    console.log("--- Ejercicio 34: Mismo tipo ---");
    let var1 = 42;
    let var2 = "42";
    let mismoTipo = typeof var1 === typeof var2;
    console.log(`¿${var1} (${typeof var1}) y "${var2}" (${typeof var2}) tienen el mismo tipo? ${mismoTipo}`);
}

function ejercicio35() {
    console.log("--- Ejercicio 35: Diferente de null ---");
    let variable = "Hola";
    let noEsNull = variable !== null;
    console.log(`¿La variable "${variable}" es diferente de null? ${noEsNull}`);
}

// ========================================
// 🧠 OPERADORES LÓGICOS (36-45)
// ========================================

function ejercicio36() {
    console.log("--- Ejercicio 36: Mayor de edad Y estudiante ---");
    let edad = 20;
    let esEstudiante = true;
    let puedeEstudiar = edad >= 18 && esEstudiante;
    console.log(`¿Edad ${edad} Y es estudiante ${esEstudiante}? ${puedeEstudiar}`);
}

function ejercicio37() {
    console.log("--- Ejercicio 37: Fin de semana O feriado ---");
    let esFinDeSemana = true;
    let esFeriado = false;
    let puedeDescansar = esFinDeSemana || esFeriado;
    console.log(`¿Es fin de semana ${esFinDeSemana} O feriado ${esFeriado}? ${puedeDescansar}`);
}

function ejercicio38() {
    console.log("--- Ejercicio 38: NO es de noche ---");
    let esDeDia = true;
    let noEsDeNoche = !false;
    console.log(`¿NO es de noche? ${noEsDeNoche}`);
}

function ejercicio39() {
    console.log("--- Ejercicio 39: Edad Y altura ---");
    let edad = 25;
    let altura = 1.75;
    let cumpleRequisitos = edad >= 18 && altura > 1.60;
    console.log(`¿Edad ${edad} >= 18 Y altura ${altura} > 1.60? ${cumpleRequisitos}`);
}

function ejercicio40() {
    console.log("--- Ejercicio 40: Descuento estudiante O adulto mayor ---");
    let esEstudiante = true;
    let esAdultoMayor = false;
    let tieneDescuento = esEstudiante || esAdultoMayor;
    console.log(`¿Tiene descuento (estudiante ${esEstudiante} O adulto mayor ${esAdultoMayor})? ${tieneDescuento}`);
}

function ejercicio41() {
    console.log("--- Ejercicio 41: NO está en rango ---");
    let numero = 25;
    let noEstaEnRango = !(numero >= 10 && numero <= 20);
    console.log(`¿El número ${numero} NO está entre 10 y 20? ${noEstaEnRango}`);
}

function ejercicio42() {
    console.log("--- Ejercicio 42: Clima soleado Y temperatura ---");
    let climaSoleado = true;
    let temperatura = 28;
    let esBuenDia = climaSoleado && temperatura > 25;
    console.log(`¿Clima soleado ${climaSoleado} Y temperatura ${temperatura} > 25? ${esBuenDia}`);
}

function ejercicio43() {
    console.log("--- Ejercicio 43: Combinación AND y OR ---");
    let tieneTrabajo = true;
    let tieneCarro = false;
    let viveEnCiudad = true;
    let puedeViajar = tieneTrabajo && (tieneCarro || viveEnCiudad);
    console.log(`¿Puede viajar? ${puedeViajar}`);
}

function ejercicio44() {
    console.log("--- Ejercicio 44: Contraseña no vacía ---");
    let contraseña = "miPassword123";
    let noEstaVacia = contraseña !== "";
    console.log(`¿La contraseña NO está vacía? ${noEstaVacia}`);
}

function ejercicio45() {
    console.log("--- Ejercicio 45: Horario laboral ---");
    let esLaborable = true;
    let hora = 14;
    let esHorarioLaboral = esLaborable && hora >= 8 && hora <= 17;
    console.log(`¿Es horario laboral (día laborable ${esLaborable} y hora ${hora})? ${esHorarioLaboral}`);
}

// ========================================
// 🤔 CONDICIONALES IF/ELSE (46-60)
// ========================================

function ejercicio46() {
    console.log("--- Ejercicio 46: Positivo, negativo o cero ---");
    let numero = -5;
    if (numero > 0) {
        console.log(`${numero} es positivo`);
    } else if (numero < 0) {
        console.log(`${numero} es negativo`);
    } else {
        console.log(`${numero} es cero`);
    }
}

function ejercicio47() {
    console.log("--- Ejercicio 47: Sistema de calificaciones ---");
    let nota = 85;
    if (nota >= 90) {
        console.log(`Nota ${nota}: A - Excelente`);
    } else if (nota >= 80) {
        console.log(`Nota ${nota}: B - Muy bien`);
    } else if (nota >= 70) {
        console.log(`Nota ${nota}: C - Bien`);
    } else {
        console.log(`Nota ${nota}: F - Reprobado`);
    }
}

function ejercicio48() {
    console.log("--- Ejercicio 48: Puede votar ---");
    let edad = 17;
    if (edad >= 18) {
        console.log(`Con ${edad} años SÍ puede votar`);
    } else {
        console.log(`Con ${edad} años NO puede votar`);
    }
}

function ejercicio49() {
    console.log("--- Ejercicio 49: Año bisiesto ---");
    let año = 2024;
    if ((año % 4 === 0 && año % 100 !== 0) || año % 400 === 0) {
        console.log(`${año} ES un año bisiesto`);
    } else {
        console.log(`${año} NO es un año bisiesto`);
    }
}

function ejercicio50() {
    console.log("--- Ejercicio 50: Clasificar temperatura ---");
    let temperatura = 22;
    if (temperatura < 15) {
        console.log(`${temperatura}°C - Hace frío`);
    } else if (temperatura <= 25) {
        console.log(`${temperatura}°C - Temperatura templada`);
    } else {
        console.log(`${temperatura}°C - Hace calor`);
    }
}

function ejercicio51() {
    console.log("--- Ejercicio 51: Triángulo válido ---");
    let lado1 = 3;
    let lado2 = 4;
    let lado3 = 5;
    if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
        console.log(`Triángulo con lados ${lado1}, ${lado2}, ${lado3} ES válido`);
    } else {
        console.log(`Triángulo con lados ${lado1}, ${lado2}, ${lado3} NO es válido`);
    }
}

function ejercicio52() {
    console.log("--- Ejercicio 52: Descuento por monto ---");
    let montoCompra = 150;
    let descuento;
    if (montoCompra >= 200) {
        descuento = 20;
    } else if (montoCompra >= 100) {
        descuento = 10;
    } else if (montoCompra >= 50) {
        descuento = 5;
    } else {
        descuento = 0;
    }
    console.log(`Compra: $${montoCompra} - Descuento: ${descuento}%`);
}

function ejercicio53() {
    console.log("--- Ejercicio 53: Contraseña segura ---");
    let contraseña = "miPassword";
    if (contraseña.length >= 8) {
        console.log("Contraseña segura ✓");
    } else {
        console.log("Contraseña insegura - mínimo 8 caracteres");
    }
}

function ejercicio54() {
    console.log("--- Ejercicio 54: Clasificar por edad ---");
    let edad = 16;
    if (edad < 13) {
        console.log(`${edad} años - Niño`);
    } else if (edad < 18) {
        console.log(`${edad} años - Adolescente`);
    } else if (edad < 65) {
        console.log(`${edad} años - Adulto`);
    } else {
        console.log(`${edad} años - Adulto mayor`);
    }
}

function ejercicio55() {
    console.log("--- Ejercicio 55: Costo de envío ---");
    let peso = 2.5;
    let costoEnvio;
    if (peso <= 1) {
        costoEnvio = 5;
    } else if (peso <= 3) {
        costoEnvio = 8;
    } else if (peso <= 5) {
        costoEnvio = 12;
    } else {
        costoEnvio = 15;
    }
    console.log(`Peso: ${peso}kg - Costo envío: $${costoEnvio}`);
}

function ejercicio56() {
    console.log("--- Ejercicio 56: Beca estudiantil ---");
    let promedio = 8.8;
    if (promedio >= 8.5) {
        console.log(`Promedio ${promedio} - ¡Felicitaciones! Tienes beca`);
    } else {
        console.log(`Promedio ${promedio} - No califica para beca`);
    }
}

function ejercicio57() {
    console.log("--- Ejercicio 57: Impuesto por salario ---");
    let salario = 1500;
    let impuesto;
    if (salario <= 1000) {
        impuesto = 0;
    } else if (salario <= 2000) {
        impuesto = salario * 0.1;
    } else {
        impuesto = salario * 0.15;
    }
    console.log(`Salario: $${salario} - Impuesto: $${impuesto}`);
}

function ejercicio58() {
    console.log("--- Ejercicio 58: Hora de almorzar ---");
    let hora = 13;
    if (hora >= 12 && hora <= 14) {
        console.log(`${hora}:00 - ¡Es hora de almorzar!`);
    } else {
        console.log(`${hora}:00 - No es hora de almorzar`);
    }
}

function ejercicio59() {
    console.log("--- Ejercicio 59: Stock suficiente ---");
    let stock = 5;
    let cantidadSolicitada = 3;
    if (stock >= cantidadSolicitada) {
        console.log(`Stock suficiente: ${stock} disponibles, ${cantidadSolicitada} solicitados`);
    } else {
        console.log(`Stock insuficiente: solo ${stock} disponibles, ${cantidadSolicitada} solicitados`);
    }
}

function ejercicio60() {
    console.log("--- Ejercicio 60: Clasificar IMC ---");
    let peso = 70;
    let altura = 1.75;
    let imc = peso / (altura * altura);
    console.log(`IMC: ${imc.toFixed(1)}`);
    if (imc < 18.5) {
        console.log("Bajo peso");
    } else if (imc < 25) {
        console.log("Peso normal");
    } else if (imc < 30) {
        console.log("Sobrepeso");
    } else {
        console.log("Obesidad");
    }
}

// ========================================
// 🔀 SWITCH (61-70)
// ========================================

function ejercicio61() {
    console.log("--- Ejercicio 61: Nombre del mes ---");
    let mes = 7;
    switch (mes) {
        case 1: console.log("Enero"); break;
        case 2: console.log("Febrero"); break;
        case 3: console.log("Marzo"); break;
        case 4: console.log("Abril"); break;
        case 5: console.log("Mayo"); break;
        case 6: console.log("Junio"); break;
        case 7: console.log("Julio"); break;
        case 8: console.log("Agosto"); break;
        case 9: console.log("Septiembre"); break;
        case 10: console.log("Octubre"); break;
        case 11: console.log("Noviembre"); break;
        case 12: console.log("Diciembre"); break;
        default: console.log("Mes inválido");
    }
}

function ejercicio62() {
    console.log("--- Ejercicio 62: Calificación a letra ---");
    let calificacion = 85;
    let letra;
    switch (true) {
        case calificacion >= 90:
            letra = "A";
            break;
        case calificacion >= 80:
            letra = "B";
            break;
        case calificacion >= 70:
            letra = "C";
            break;
        case calificacion >= 60:
            letra = "D";
            break;
        default:
            letra = "F";
    }
    console.log(`Calificación ${calificacion} = ${letra}`);
}

function ejercicio63() {
    console.log("--- Ejercicio 63: Día de la semana ---");
    let dia = 3;
    switch (dia) {
        case 1: console.log("Lunes"); break;
        case 2: console.log("Martes"); break;
        case 3: console.log("Miércoles"); break;
        case 4: console.log("Jueves"); break;
        case 5: console.log("Viernes"); break;
        case 6: console.log("Sábado"); break;
        case 7: console.log("Domingo"); break;
        default: console.log("Día inválido");
    }
}

function ejercicio64() {
    console.log("--- Ejercicio 64: Precio por tipo ---");
    let tipoProducto = "premium";
    let precio;
    switch (tipoProducto) {
        case "basico":
            precio = 10;
            break;
        case "estandar":
            precio = 20;
            break;
        case "premium":
            precio = 35;
            break;
        case "deluxe":
            precio = 50;
            break;
        default:
            precio = 0;
            console.log("Tipo de producto no válido");
    }
    console.log(`Producto ${tipoProducto}: $${precio}`);
}

function ejercicio65() {
    console.log("--- Ejercicio 65: Tallas a números ---");
    let talla = "M";
    let numero;
    switch (talla) {
        case "XS":
            numero = 1;
            break;
        case "S":
            numero = 2;
            break;
        case "M":
            numero = 3;
            break;
        case "L":
            numero = 4;
            break;
        case "XL":
            numero = 5;
            break;
        default:
            numero = 0;
            console.log("Talla no válida");
    }
    console.log(`Talla ${talla} = ${numero}`);
}

function ejercicio66() {
    console.log("--- Ejercicio 66: Estado de pedido ---");
    let estadoPedido = "enviado";
    switch (estadoPedido) {
        case "pendiente":
            console.log("Su pedido está siendo procesado");
            break;
        case "confirmado":
            console.log("Su pedido ha sido confirmado");
            break;
        case "enviado":
            console.log("Su pedido está en camino");
            break;
        case "entregado":
            console.log("Su pedido ha sido entregado");
            break;
        case "cancelado":
            console.log("Su pedido ha sido cancelado");
            break;
        default:
            console.log("Estado de pedido desconocido");
    }
}

function ejercicio67() {
    console.log("--- Ejercicio 67: Descuento por categoría ---");
    let categoria = "gold";
    let descuento;
    switch (categoria) {
        case "bronze":
            descuento = 5;
            break;
        case "silver":
            descuento = 10;
            break;
        case "gold":
            descuento = 15;
            break;
        case "platinum":
            descuento = 20;
            break;
        default:
            descuento = 0;
    }
    console.log(`Cliente ${categoria}: ${descuento}% de descuento`);
}

function ejercicio68() {
    console.log("--- Ejercicio 68: Colores a hexadecimal ---");
    let color = "azul";
    let codigoHex;
    switch (color) {
        case "rojo":
            codigoHex = "#FF0000";
            break;
        case "verde":
            codigoHex = "#00FF00";
            break;
        case "azul":
            codigoHex = "#0000FF";
            break;
        case "amarillo":
            codigoHex = "#FFFF00";
            break;
        case "negro":
            codigoHex = "#000000";
            break;
        case "blanco":
            codigoHex = "#FFFFFF";
            break;
        default:
            codigoHex = "Color no encontrado";
    }
    console.log(`${color}: ${codigoHex}`);
}

function ejercicio69() {
    console.log("--- Ejercicio 69: Horarios por día ---");
    let dia = "lunes";
    switch (dia) {
        case "lunes":
        case "martes":
        case "miercoles":
        case "jueves":
        case "viernes":
            console.log(`${dia}: 8:00 AM - 5:00 PM`);
            break;
        case "sabado":
            console.log(`${dia}: 9:00 AM - 2:00 PM`);
            break;
        case "domingo":
            console.log(`${dia}: Cerrado`);
            break;
        default:
            console.log("Día no válido");
    }
}

function ejercicio70() {
    console.log("--- Ejercicio 70: Comisiones por vendedor ---");
    let tipoVendedor = "senior";
    let ventaBase = 1000;
    let comision;
    switch (tipoVendedor) {
        case "junior":
            comision = ventaBase * 0.05;
            break;
        case "regular":
            comision = ventaBase * 0.08;
            break;
        case "senior":
            comision = ventaBase * 0.12;
            break;
        case "manager":
            comision = ventaBase * 0.15;
            break;
        default:
            comision = 0;
    }
    console.log(`Vendedor ${tipoVendedor}: Comisión ${comision} sobre venta de ${ventaBase}`);
}

// ========================================
// 🔄 CICLOS FOR (71-80)
// ========================================

function ejercicio71() {
    console.log("--- Ejercicio 71: Números del 1 al 10 ---");
    console.log("Números del 1 al 10:");
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }
}

function ejercicio72() {
    console.log("--- Ejercicio 72: Números pares ---");
    console.log("Números pares del 2 al 20:");
    for (let i = 2; i <= 20; i += 2) {
        console.log(i);
    }
}

function ejercicio73() {
    console.log("--- Ejercicio 73: Tabla del 5 ---");
    console.log("Tabla del 5:");
    for (let i = 1; i <= 10; i++) {
        console.log(`5 × ${i} = ${5 * i}`);
    }
}

function ejercicio74() {
    console.log("--- Ejercicio 74: Suma del 1 al 100 ---");
    let suma = 0;
    for (let i = 1; i <= 100; i++) {
        suma += i;
    }
    console.log(`La suma de números del 1 al 100 es: ${suma}`);
}

function ejercicio75() {
    console.log("--- Ejercicio 75: Números descendentes ---");
    console.log("Números del 10 al 1:");
    for (let i = 10; i >= 1; i--) {
        console.log(i);
    }
}

function ejercicio76() {
    console.log("--- Ejercicio 76: Factorial ---");
    let numero = 5;
    let factorial = 1;
    for (let i = 1; i <= numero; i++) {
        factorial *= i;
    }
    console.log(`${numero}! = ${factorial}`);
}

function ejercicio77() {
    console.log("--- Ejercicio 77: Números impares ---");
    console.log("Números impares del 1 al 15:");
    for (let i = 1; i <= 15; i += 2) {
        console.log(i);
    }
}

function ejercicio78() {
    console.log("--- Ejercicio 78: Contar letra ---");
    let palabra = "javascript";
    let letra = "a";
    let contador = 0;
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            contador++;
        }
    }
    console.log(`La letra "${letra}" aparece ${contador} veces en "${palabra}"`);
}

function ejercicio79() {
    console.log("--- Ejercicio 79: Fibonacci ---");
    let n = 10;
    let a = 0, b = 1;
    console.log("Secuencia de Fibonacci:");
    console.log(a);
    console.log(b);
    for (let i = 2; i < n; i++) {
        let siguiente = a + b;
        console.log(siguiente);
        a = b;
        b = siguiente;
    }
}

function ejercicio80() {
    console.log("--- Ejercicio 80: Triángulo de asteriscos ---");
    console.log("Triángulo de asteriscos:");
    for (let i = 1; i <= 5; i++) {
        let linea = "";
        for (let j = 1; j <= i; j++) {
            linea += "*";
        }
        console.log(linea);
    }
}

// ========================================
// ⏳ CICLOS WHILE (81-85)
// ========================================

function ejercicio81() {
    console.log("--- Ejercicio 81: Cuenta regresiva ---");
    console.log("Cuenta regresiva:");
    let contador = 10;
    while (contador >= 0) {
        console.log(contador);
        contador--;
    }
    console.log("¡Despegue!");
}

function ejercicio82() {
    console.log("--- Ejercicio 82: Suma hasta 50 ---");
    let suma = 0;
    let numero = 1;
    while (suma <= 50) {
        suma += numero;
        console.log(`Sumando ${numero}, total: ${suma}`);
        numero++;
    }
    console.log(`Suma final: ${suma}`);
}

function ejercicio83() {
    console.log("--- Ejercicio 83: Números hasta 0 ---");
    let entradas = [5, 10, 15, 0];
    let index = 0;
    let numero;
    console.log("Ingresando números (0 para salir):");
    while (true) {
        numero = entradas[index];
        console.log(`Número ingresado: ${numero}`);
        if (numero === 0) {
            console.log("Programa terminado");
            break;
        }
        index++;
    }
}

function ejercicio84() {
    console.log("--- Ejercicio 84: Número aleatorio mayor a 0.8 ---");
    let numero;
    let intentos = 0;
    console.log("Generando números aleatorios:");
    while (true) {
        numero = Math.random();
        intentos++;
        console.log(`Intento ${intentos}: ${numero.toFixed(3)}`);
        if (numero > 0.8) {
            console.log(`¡Encontrado en ${intentos} intentos!`);
            break;
        }
        if (intentos > 10) break; // Evitar bucle infinito en demo
    }
}

function ejercicio85() {
    console.log("--- Ejercicio 85: Años para ahorrar ---");
    let ahorroAnual = 1200;
    let objetivo = 10000;
    let ahorroTotal = 0;
    let años = 0;
    console.log(`Ahorrando ${ahorroAnual} por año para llegar a ${objetivo}:`);
    while (ahorroTotal < objetivo) {
        años++;
        ahorroTotal += ahorroAnual;
        console.log(`Año ${años}: ${ahorroTotal} ahorrados`);
    }
    console.log(`¡Objetivo alcanzado en ${años} años!`);
}

// ========================================
// 🔧 FUNCIONES (86-95)
// ========================================

function ejercicio86() {
    console.log("--- Ejercicio 86: Área de círculo ---");
    function calcularAreaCirculo(radio) {
        const PI = 3.14159;
        return PI * radio * radio;
    }
    let radio = 5;
    let area = calcularAreaCirculo(radio);
    console.log(`Área del círculo (radio=${radio}): ${area.toFixed(2)}`);
}

function ejercicio87() {
    console.log("--- Ejercicio 87: Número primo ---");
    function esPrimo(numero) {
        if (numero <= 1) return false;
        if (numero <= 3) return true;
        if (numero % 2 === 0 || numero % 3 === 0) return false;
        for (let i = 5; i * i <= numero; i += 6) {
            if (numero % i === 0 || numero % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }
    let numero = 17;
    console.log(`¿${numero} es primo? ${esPrimo(numero)}`);
}

function ejercicio88() {
    console.log("--- Ejercicio 88: Celsius a Fahrenheit ---");
    function celsiusAFahrenheit(celsius) {
        return (celsius * 9/5) + 32;
    }
    let celsius = 25;
    let fahrenheit = celsiusAFahrenheit(celsius);
    console.log(`${celsius}°C = ${fahrenheit}°F`);
}

function ejercicio89() {
    console.log("--- Ejercicio 89: Mayor de tres números ---");
    function encontrarMayor(a, b, c) {
        if (a >= b && a >= c) return a;
        if (b >= a && b >= c) return b;
        return c;
    }
    let num1 = 15, num2 = 23, num3 = 18;
    let mayor = encontrarMayor(num1, num2, num3);
    console.log(`El mayor entre ${num1}, ${num2} y ${num3} es: ${mayor}`);
}

function ejercicio90() {
    console.log("--- Ejercicio 90: Calcular IVA ---");
    function calcularIVA(precio, porcentajeIVA = 12) {
        return precio * (porcentajeIVA / 100);
    }
    let precio = 100;
    let iva = calcularIVA(precio);
    let precioFinal = precio + iva;
    console.log(`Precio: ${precio}`);
    console.log(`IVA (12%): ${iva}`);
    console.log(`Precio final: ${precioFinal}`);
}

function ejercicio91() {
    console.log("--- Ejercicio 91: Validar email ---");
    function validarEmail(email) {
        return email.includes("@") && email.includes(".");
    }
    let email1 = "usuario@correo.com";
    let email2 = "usuarioincorrecto";
    console.log(`¿"${email1}" es válido? ${validarEmail(email1)}`);
    console.log(`¿"${email2}" es válido? ${validarEmail(email2)}`);
}

function ejercicio92() {
    console.log("--- Ejercicio 92: Capitalizar primera letra ---");
    function capitalizarPrimera(palabra) {
        if (palabra.length === 0) return palabra;
        return palabra[0].toUpperCase() + palabra.slice(1).toLowerCase();
    }
    let palabra = "javascript";
    let capitalizada = capitalizarPrimera(palabra);
    console.log(`"${palabra}" capitalizada: "${capitalizada}"`);
}

function ejercicio93() {
    console.log("--- Ejercicio 93: Calcular edad ---");
    function calcularEdad(añoNacimiento) {
        const añoActual = 2024;
        return añoActual - añoNacimiento;
    }
    let añoNacimiento = 1995;
    let edad = calcularEdad(añoNacimiento);
    console.log(`Si naciste en ${añoNacimiento}, tienes ${edad} años`);
}

function ejercicio94() {
    console.log("--- Ejercicio 94: Generar contraseña ---");
    function generarPassword(longitud = 8) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let password = "";
        for (let i = 0; i < longitud; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            password += caracteres[indiceAleatorio];
        }
        return password;
    }
    let password = generarPassword(10);
    console.log(`Contraseña generada: ${password}`);
}

function ejercicio95() {
    console.log("--- Ejercicio 95: Convertir horas ---");
    function convertirHoras(horas) {
        let minutos = horas * 60;
        let segundos = horas * 3600;
        return {
            horas: horas,
            minutos: minutos,
            segundos: segundos
        };
    }
    let horas = 2.5;
    let conversion = convertirHoras(horas);
    console.log(`${conversion.horas} horas = ${conversion.minutos} minutos = ${conversion.segundos} segundos`);
}

// ========================================
// 📚 ARRAYS Y OBJETOS (96-100)
// ========================================

function ejercicio96() {
    console.log("--- Ejercicio 96: Comidas favoritas ---");
    let comidasFavoritas = ["Pizza", "Sushi", "Pasta", "Hamburguesa", "Tacos"];
    console.log("Mis comidas favoritas:");
    for (let i = 0; i < comidasFavoritas.length; i++) {
        console.log(`${i + 1}. ${comidasFavoritas[i]}`);
    }
}

function ejercicio97() {
    console.log("--- Ejercicio 97: Objeto estudiante ---");
    let estudiante = {
        nombre: "Ana García",
        edad: 20,
        carrera: "Ingeniería en Software",
        promedio: 8.7
    };
    console.log("Información del estudiante:");
    console.log(`Nombre: ${estudiante.nombre}`);
    console.log(`Edad: ${estudiante.edad} años`);
    console.log(`Carrera: ${estudiante.carrera}`);
    console.log(`Promedio: ${estudiante.promedio}`);
}

function ejercicio98() {
    console.log("--- Ejercicio 98: Mayor y menor en array ---");
    let numeros = [15, 3, 8, 22, 1, 19, 7];
    let mayor = numeros[0];
    let menor = numeros[0];
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > mayor) {
            mayor = numeros[i];
        }
        if (numeros[i] < menor) {
            menor = numeros[i];
        }
    }
    console.log(`Array: [${numeros.join(", ")}]`);
    console.log(`Mayor: ${mayor}`);
    console.log(`Menor: ${menor}`);
}

function ejercicio99() {
    console.log("--- Ejercicio 99: Objeto auto ---");
    let auto = {
        marca: "Toyota",
        modelo: "Corolla",
        año: 2022,
        color: "Blanco"
    };
    function mostrarDescripcion(vehiculo) {
        return `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.año} color ${vehiculo.color}`;
    }
    console.log("Descripción del auto:");
    console.log(mostrarDescripcion(auto));
}

function ejercicio100() {
    console.log("--- Ejercicio 100: Array de productos ---");
    let productos = [
        { nombre: "Laptop", precio: 800 },
        { nombre: "Mouse", precio: 25 },
        { nombre: "Teclado", precio: 50 },
        { nombre: "Monitor", precio: 200 }
    ];
    let total = 0;
    console.log("Lista de productos:");
    for (let i = 0; i < productos.length; i++) {
        console.log(`${productos[i].nombre}: ${productos[i].precio}`);
        total += productos[i].precio;
    }
    console.log(`\nTotal: ${total}`);
}

// ========================================
// 🎯 EJERCICIOS INTEGRADOS (BONUS)
// ========================================

function ejercicioBonus1() {
    console.log("=== EJERCICIO BONUS 1: CALCULADORA ===");
    function calculadora(num1, num2, operacion) {
        switch (operacion) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                return num2 !== 0 ? num1 / num2 : "Error: División por cero";
            default:
                return "Operación no válida";
        }
    }
    console.log(`10 + 5 = ${calculadora(10, 5, "+")}`);
    console.log(`10 - 5 = ${calculadora(10, 5, "-")}`);
    console.log(`10 * 5 = ${calculadora(10, 5, "*")}`);
    console.log(`10 / 5 = ${calculadora(10, 5, "/")}`);
    console.log(`10 / 0 = ${calculadora(10, 0, "/")}`);
}

function ejercicioBonus2() {
    console.log("=== EJERCICIO BONUS 2: SISTEMA DE NOTAS ===");
    let notas = [8.5, 7.2, 9.1, 6.8, 8.9];
    let suma = 0;
    let mayor = notas[0];
    let menor = notas[0];
    
    console.log("Notas ingresadas:");
    for (let i = 0; i < notas.length; i++) {
        console.log(`Nota ${i + 1}: ${notas[i]}`);
        suma += notas[i];
        if (notas[i] > mayor) mayor = notas[i];
        if (notas[i] < menor) menor = notas[i];
    }
    
    let promedio = suma / notas.length;
    let aprobado = promedio >= 7;
    
    console.log(`\nPromedio: ${promedio.toFixed(2)}`);
    console.log(`Estado: ${aprobado ? "APROBADO" : "REPROBADO"}`);
    console.log(`Nota más alta: ${mayor}`);
    console.log(`Nota más baja: ${menor}`);
}

function ejercicioBonus3() {
    console.log("=== EJERCICIO BONUS 3: JUEGO ADIVINANZA ===");
    let numeroSecreto = Math.floor(Math.random() * 10) + 1;
    let intentos = 0;
    let adivinado = false;
    let intentosUsuario = [5, 8, 7];
    
    console.log("Adivina el número entre 1 y 10");
    for (let intento of intentosUsuario) {
        intentos++;
        console.log(`\nIntento ${intentos}: ${intento}`);
        if (intento === numeroSecreto) {
            console.log(`¡Felicitaciones! Adivinaste en ${intentos} intentos`);
            adivinado = true;
            break;
        } else if (intento < numeroSecreto) {
            console.log("El número es mayor");
        } else {
            console.log("El número es menor");
        }
    }
    if (!adivinado) {
        console.log(`\nEl número era: ${numeroSecreto}`);
    }
}

function ejercicioBonus4() {
    console.log("=== EJERCICIO BONUS 4: LISTA DE TAREAS ===");
    let listaTareas = {
        tareas: [],
        
        agregar: function(descripcion) {
            this.tareas.push({
                id: this.tareas.length + 1,
                descripcion: descripcion,
                completada: false
            });
            console.log(`Tarea agregada: "${descripcion}"`);
        },
        
        completar: function(id) {
            let tarea = this.tareas.find(t => t.id === id);
            if (tarea) {
                tarea.completada = true;
                console.log(`Tarea ${id} marcada como completada`);
            } else {
                console.log("Tarea no encontrada");
            }
        },
        
        contarPendientes: function() {
            return this.tareas.filter(t => !t.completada).length;
        },
        
        mostrarTodas: function() {
            console.log("\nLista de tareas:");
            if (this.tareas.length === 0) {
                console.log("No hay tareas");
                return;
            }
            this.tareas.forEach(tarea => {
                let estado = tarea.completada ? "✓" : "○";
                console.log(`${estado} ${tarea.id}. ${tarea.descripcion}`);
            });
            console.log(`\nTareas pendientes: ${this.contarPendientes()}`);
        }
    };
    
    listaTareas.agregar("Estudiar JavaScript");
    listaTareas.agregar("Hacer ejercicios");
    listaTareas.agregar("Revisar código");
    listaTareas.completar(1);
    listaTareas.mostrarTodas();
}

function ejercicioBonus5() {
    console.log("=== EJERCICIO BONUS 5: CONVERSOR UNIVERSAL ===");
    let conversor = {
        temperatura: {
            celsiusAFahrenheit: function(celsius) {
                return (celsius * 9/5) + 32;
            },
            fahrenheitACelsius: function(fahrenheit) {
                return (fahrenheit - 32) * 5/9;
            }
        },
        
        distancia: {
            kmAMillas: function(km) {
                return km * 0.621371;
            },
            millasAKm: function(millas) {
                return millas * 1.60934;
            }
        },
        
        peso: {
            kgALibras: function(kg) {
                return kg * 2.20462;
            },
            librasAKg: function(libras) {
                return libras * 0.453592;
            }
        }
    };
    
    console.log("\nTemperatura:");
    console.log(`25°C = ${conversor.temperatura.celsiusAFahrenheit(25).toFixed(1)}°F`);
    console.log(`77°F = ${conversor.temperatura.fahrenheitACelsius(77).toFixed(1)}°C`);
    
    console.log("\nDistancia:");
    console.log(`100 km = ${conversor.distancia.kmAMillas(100).toFixed(2)} millas`);
    console.log(`50 millas = ${conversor.distancia.millasAKm(50).toFixed(2)} km`);
    
    console.log("\nPeso:");
    console.log(`70 kg = ${conversor.peso.kgALibras(70).toFixed(2)} libras`);
    console.log(`150 libras = ${conversor.peso.librasAKg(150).toFixed(2)} kg`);
}

// ========================================
// 🚀 EJECUTAR TODOS LOS EJERCICIOS
// ========================================

function ejecutarTodos() {
    console.log("🎯 EJECUTANDO TODOS LOS EJERCICIOS");
    console.log("==================================\n");
    
    // Variables y tipos (1-15)
    console.log("📦 VARIABLES Y TIPOS DE DATOS");
    console.log("==============================");
    for (let i = 1; i <= 15; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Operadores aritméticos (16-25)
    console.log("➕ OPERADORES ARITMÉTICOS");
    console.log("=========================");
    for (let i = 16; i <= 25; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Operadores de comparación (26-35)
    console.log("⚖️ OPERADORES DE COMPARACIÓN");
    console.log("============================");
    for (let i = 26; i <= 35; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Operadores lógicos (36-45)
    console.log("🧠 OPERADORES LÓGICOS");
    console.log("=====================");
    for (let i = 36; i <= 45; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Condicionales (46-60)
    console.log("🤔 CONDICIONALES IF/ELSE");
    console.log("========================");
    for (let i = 46; i <= 60; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Switch (61-70)
    console.log("🔀 CONDICIONALES SWITCH");
    console.log("=======================");
    for (let i = 61; i <= 70; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Ciclos for (71-80)
    console.log("🔄 CICLOS FOR");
    console.log("=============");
    for (let i = 71; i <= 80; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Ciclos while (81-85)
    console.log("⏳ CICLOS WHILE");
    console.log("===============");
    for (let i = 81; i <= 85; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Funciones (86-95)
    console.log("🔧 FUNCIONES");
    console.log("============");
    for (let i = 86; i <= 95; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Arrays y objetos (96-100)
    console.log("📚 ARRAYS Y OBJETOS");
    console.log("===================");
    for (let i = 96; i <= 100; i++) {
        eval(`ejercicio${i}()`);
        console.log("");
    }
    
    // Ejercicios bonus
    console.log("🎯 EJERCICIOS INTEGRADOS (BONUS)");
    console.log("=================================");
    ejercicioBonus1();
    console.log("");
    ejercicioBonus2();
    console.log("");
    ejercicioBonus3();
    console.log("");
    ejercicioBonus4();
    console.log("");
    ejercicioBonus5();
    
    console.log("\n🎉 ¡TODOS LOS EJERCICIOS COMPLETADOS!");
    console.log("====================================");
}

// ========================================
// 🎮 FUNCIONES DE UTILIDAD
// ========================================

function ejecutarEjercicio(numero) {
    if (numero >= 1 && numero <= 100) {
        eval(`ejercicio${numero}()`);
    } else {
        console.log("❌ Número de ejercicio inválido. Use números del 1 al 100.");
    }
}

function ejecutarRango(inicio, fin) {
    if (inicio >= 1 && fin <= 100 && inicio <= fin) {
        for (let i = inicio; i <= fin; i++) {
            eval(`ejercicio${i}()`);
            console.log("");
        }
    } else {
        console.log("❌ Rango inválido. Use números del 1 al 100.");
    }
}

function ejecutarPorTema(tema) {
    const temas = {
        'variables': [1, 15],
        'aritmeticos': [16, 25],
        'comparacion': [26, 35],
        'logicos': [36, 45],
        'condicionales': [46, 60],
        'switch': [61, 70],
        'for': [71, 80],
        'while': [81, 85],
        'funciones': [86, 95],
        'arrays': [96, 100]
    };
    
    if (temas[tema]) {
        const [inicio, fin] = temas[tema];
        console.log(`🎯 EJECUTANDO TEMA: ${tema.toUpperCase()}`);
        console.log("=".repeat(30));
        ejecutarRango(inicio, fin);
    } else {
        console.log("❌ Tema no válido. Temas disponibles:");
        console.log(Object.keys(temas).join(", "));
    }
}

// ========================================
// 📚 EJEMPLOS DE USO
// ========================================

console.log("📚 EJEMPLOS DE USO:");
console.log("===================");
console.log("ejecutarEjercicio(1);           // Ejecuta ejercicio 1");
console.log("ejecutarRango(1, 10);           // Ejecuta ejercicios 1-10");
console.log("ejecutarPorTema('variables');   // Ejecuta tema completo");
console.log("ejecutarTodos();                // Ejecuta todos los ejercicios");
console.log("");

// ========================================
// 🚀 EJECUCIÓN AUTOMÁTICA (OPCIONAL)
// ========================================

// Descomenta la siguiente línea para ejecutar todos los ejercicios automáticamente
// ejecutarTodos();

// O ejecuta ejercicios específicos:
// ejecutarPorTema('variables');
// ejecutarEjercicio(1);