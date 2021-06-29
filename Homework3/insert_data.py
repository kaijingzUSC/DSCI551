import mysql.connector
cnx = mysql.connector.connect(user='inf551', password='inf551', host='127.0.0.1',
database='inf551')
cursor = cnx.cursor()
add_beer = ("INSERT INTO Beers " "(name, manf) "
"VALUES (%s, %s)")
data_beer = ("Test name", "Test manf") 
cursor.execute(add_beer, data_beer) cnx.commit()
cursor.close() cnx.close()