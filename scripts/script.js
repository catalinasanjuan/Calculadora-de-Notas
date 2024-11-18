document.addEventListener("DOMContentLoaded", function() {
    class Alumno {
        constructor(nombre, puntajes) {
            this.nombre = nombre;
            this.puntajes = puntajes;
        }

        calcularPuntajeTotal() {
            return this.puntajes.reduce((acc, curr) => acc + curr, 0);
        }

        calcularNota() {
            const puntajeTotal = this.calcularPuntajeTotal();
            const notaMin = 1.0;
            const notaMax = 7.0;
            const puntajeMax = 36;
            const nota = notaMin + (puntajeTotal * (notaMax - notaMin) / puntajeMax);
            return nota.toFixed(1); // Redondear a un decimal
        }

        calcularEstado() {
            const nota = parseFloat(this.calcularNota());
            return nota >= 4.0 ? "Aprobado ✔️" : "Reprobado ❌";
        }
    }

    function validarPuntajes(puntajes) {
        for (let i = 0; i < puntajes.length; i++) {
            if (puntajes[i] < 0 || puntajes[i] > 3 || isNaN(puntajes[i])) {
                return false;
            }
        }
        return true;
    }

    function agregarAlumno() {
        const nombre = document.getElementById('nombre').value;
        const puntajes = [];
        for (let i = 1; i <= 12; i++) {
            puntajes.push(parseInt(document.getElementById(`pregunta${i}`).value));
        }

        if (!validarPuntajes(puntajes)) {
            alert("Todos los puntajes deben ser números entre 0 y 3.");
            return;
        }

        const alumno = new Alumno(nombre, puntajes);
        const puntajeTotal = alumno.calcularPuntajeTotal();
        const nota = alumno.calcularNota();
        const estado = alumno.calcularEstado();

        const tabla = document.getElementById('tablaNotas').getElementsByTagName('tbody')[0];
        const fila = tabla.insertRow();

        const celdaNombre = fila.insertCell(0);
        const celdaPuntajes = fila.insertCell(1);
        const celdaPuntajeTotal = fila.insertCell(2);
        const celdaNota = fila.insertCell(3);
        const celdaEstado = fila.insertCell(4);

        celdaNombre.textContent = alumno.nombre;
        celdaPuntajes.textContent = alumno.puntajes.join(', ');
        celdaPuntajeTotal.textContent = puntajeTotal;
        celdaNota.textContent = nota;
        celdaEstado.textContent = estado;

        document.getElementById('notaForm').reset();
    }

    window.agregarAlumno = agregarAlumno;
});

