#Librería hecha para servidores web back-end para python.
#render_template: para cargar páginas web html.
#request, para tomar requests hechas por el cliente.
#jsonify: convertir objetos de  python a json
from flask import Flask, render_template, request, jsonify
#Modulo sqlite3
import sqlite3

#Instancia de Flask en una variable.
app = Flask(__name__)

#RUTAS PRINCIPALES HTML
#ruta principal, osea el index.
@app.route('/')
#Se define una funión que retorna un archivo html.
def index():
    return render_template('index.html')

#ruta de preguntas.
@app.route('/preguntas')
#Se define una funión que retorna un archivo html.
def preguntas():
    return render_template('pregunta.html')

#ruta de respuestas
@app.route('/respuestas')
#Se define una funión que retorna un archivo html.
def respuestas():
    return render_template('respuesta.html')


#API RUTAS.

#Ruta de obtencion de respuestas
@app.route('/api/respuesta', methods=['POST'])
def obtenerRespuesta():
    #Variable que guarda la solicitud JSON.
    pregunta = request.json['pregunta']
    #Respuesta es igual a lo que retorne la funcion.
    respuesta = buscadorRespuestas(pregunta)
    #Retorna la respuesta
    return jsonify({'respuesta': respuesta})

def buscadorRespuestas(entrada):
    with sqlite3.connect('ponceGPT.sqlite3') as conexion:
        accion = f"SELECT respuestas.respuesta FROM preguntas, respuestas WHERE pregunta = '{entrada}' AND preguntas.id = respuestas.id;"
        resultSet = conexion.execute(accion)
        registros = resultSet.fetchall()
        #Si hay registros, retornalos si no, imprime no entendí.
        if registros:
            return registros[0][0]
        else:
            return "Lo siento, no sé cómo responder a eso, favor de insertar primero una pregunta y después una respuesta y tratar de nuevo." 
        

#INSERTAR PREGUNTAS
@app.route("/api/insertarPregunta", methods=['POST'])
def insertarPregunta():
    try:
        #La pregunta es igual a la solicitud JSON hecha en front.
        pregunta = request.json['pregunta']
        with sqlite3.connect('ponceGPT.sqlite3') as conexion:
            accion = 'INSERT INTO preguntas (id, pregunta) VALUES (NULL, ?)'
            conexion.execute(accion, (pregunta,))
            conexion.commit()
            #Si todo sale bien que lo imprima
        return jsonify({'mensaje': 'Pregunta insertada correctamente'})
    #Si no que muestre el error
    except Exception as e:
        return jsonify({'error': str(e)})


#INSERTAR RESPUESTAS.
@app.route("/api/insertarRespuesta", methods=['POST'])
def insertarRespuesta():
    try:
        #Toma el texto del lado del cliente que se envia como JSON.
        respuesta = request.json['respuesta']  
        with sqlite3.connect('ponceGPT.sqlite3') as conexion:
            accion = 'INSERT INTO respuestas (id, respuesta) VALUES (NULL, ?)'
            conexion.execute(accion, (respuesta,))
            conexion.commit()
        return jsonify({'mensaje': 'Respuesta insertada correctamente'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
    
#Ahora si exporta el modulo al front
if __name__ == '__main__':
    app.run(debug=True)