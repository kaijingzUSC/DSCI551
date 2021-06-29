import sys
from pyspark import SparkContext
from operator import add

def f_map(x):
	lines = x.split(',')
	if int(lines[2])<=5 and ('bud' in lines[1].lower()):
		return (lines[0], 1)
	if int(lines[2])>5 and ('bud' in lines[1].lower()):
		return (lines[0], -1)
	return (lines[0], 0)

def main(argv,argv2):
	sc = SparkContext(appName="inf551")
	counts = sc.textFile(argv).map(f_map) \
	.reduceByKey(add) \

	output = counts.collect()

	txt = open(argv2, 'w')
	for i in range(len(output)):
		v = output[i]
		if i != len(output) - 1:
			txt.write(v[0] + '\t' + str(v[1]) + '\n')
		else:
			txt.write(v[0] + '\t' + str(v[1]))
	txt.close()

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2])


