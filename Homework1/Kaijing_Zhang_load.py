import sys
import csv
import json
import requests
import re
import string
import yaml

csvFilePath = sys.argv[1]
csvFile = open(csvFilePath, 'r')
url = 'https://inf551-176fd.firebaseio.com/restaurants.json'
url_index = 'https://inf551-176fd.firebaseio.com/index.json'

data_dic = {}
index = {}
num = 0

csvReader = csv.DictReader(csvFile)
for rows in csvReader:
	dataset = {}
	dataset['serial_number'] = rows['serial_number']
	dataset['facility_name'] = rows['facility_name']
	dataset['score'] = int(rows['score'])
	data_dic[num] = dataset
	num += 1

	# my_str = re.split("["+string.punctuation+" ]", rows['facility_name'])
	my_str = re.compile(r'\b[a-zA-Z]+\b', re.I).findall(rows['facility_name'])
	for word in my_str:
		word = word.lower()
		if word not in index.keys():
			index[word] = []
			index[word].append(rows['serial_number'])
		else:
			index[word].append(rows['serial_number'])

# for key in index.keys():
# 	temp = {}
# 	temp[key] = index[key]
# 	response = requests.patch(url_index, json.dumps(temp))

response = requests.put(url_index, json.dumps(str(index)))
response = requests.put(url, json.dumps(data_dic))

response = requests.get(url_index)
dic = yaml.load(response.json(), Loader=yaml.FullLoader)
print(json.dumps(dic, indent=1))


