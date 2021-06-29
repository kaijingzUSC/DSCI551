import sys
import mysql.connector

def main(argv):
	f = open(argv, "w")
	cnx = mysql.connector.connect(user='inf551', password='inf551', host='127.0.0.1', database='inf551')
	cursor = cnx.cursor()
	query = ("SELECT DISTINCT i.facility_name FROM inspections i WHERE i.facility_id NOT IN (SELECT v.facility_id FROM violations v) ORDER BY i.facility_name ASC")
	cursor.execute(query) 

	for name in cursor:
		f.write(name[0])
		f.write('\n')
	f.close()

	cursor.close() 
	cnx.close()

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1])