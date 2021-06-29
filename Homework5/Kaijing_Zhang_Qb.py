import sys
from pyspark import SparkContext
from operator import add

def f_map(x):
	line = x.split(',')
	return(line[0], (line[2], 1))

def f_reduce(x,y):
	return (str(int(x[0])+int(y[0])),x[1]+y[1])

def main(argv,argv2):
	sc = SparkContext(appName="inf551")
	counts = sc.textFile(argv).map(f_map) \
	.reduceByKey(f_reduce) \

	output = counts.collect()

	txt = open(argv2, 'w')
	for i in range(len(output)):
		v = output[i]
		if i != len(output) - 1:
			txt.write(v[0] + '\t' + str(float(v[1][0])/v[1][1]) + '\n')
		else:
			txt.write(v[0] + '\t' + str(float(v[1][0])/v[1][1]))
	txt.close()

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2])


