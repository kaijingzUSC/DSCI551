import sys
import json
import requests
import yaml

words = sys.argv[1]
word = words.split()

url = 'https://inf551-176fd.firebaseio.com/restaurants.json'
url_index = 'https://inf551-176fd.firebaseio.com/index.json'

response = requests.get(url_index)

num_set = set()
# for item in response.json():
# 	for w in word:
# 		if item.has_key(w):
# 			for i in item[w]:
# 			num_set.add(d)
dic = yaml.load(response.json(), Loader=yaml.FullLoader)
for key in dic.keys():
	for w in word:
		if w == key:
			for d in dic[key]:
				num_set.add(d)

response2 = requests.get(url)

res = {}
for item in response2.json():
	if item['serial_number'] in num_set:
		res[item['serial_number']] = {}
		res[item['serial_number']]['facility_name'] = item['facility_name']
		res[item['serial_number']]['score'] = item['score']

print(json.dumps(res, indent=4, sort_keys=True))

