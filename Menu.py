
class Menu():
    def __init__(self):
        self.gptMenu()

    def gptMenu(self):
        while True:

            op = int(input("\nPonceGPT Menu\n1. Insertar pregunta\n2. Insertar respuestas\n3. PonceGPT\n4. Salir\nElige tu opcion: \n"))

            match op:
                case 1: self.Insertar("Ingresa tu pregunta: ","INSERT INTO preguntas VALUES(?,?)","ponceGPT.sqlite3","Tu pregunta ha sido insertada correctamente!")

                case 2: self.Insertar("Ingresa tu respuesta: ","INSERT INTO respuestas VALUES(?,?)","ponceGPT.sqlite3","Tu respuesta ha sido insertada correctamente!")

                case 3: self.Gpt()
                case 4: print("Adios")
                case _: print("Se ha producido un error")
            if(op<=0 or op>=4):
                break
    

