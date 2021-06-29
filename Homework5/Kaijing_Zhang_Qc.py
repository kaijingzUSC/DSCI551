import sys
from pyspark import SparkContext
from operator import add

def f_map(x):
	line = x.split(',')
	return(line[0], 1)

def main(argv,argv2,argv3):
	sc = SparkContext(appName="inf551")
	freq = sc.textFile(argv)
	likes = sc.textFile(argv2)

	lines1 = freq.map(f_map) \
	.reduceByKey(add)
	lines2 = likes.map(f_map)\
	.reduceByKey(add)

	output1 = lines1.collect()
	output2 = lines2.collect()

	rdd1= sc.parallelize([a[0] for a in output1]).distinct()
	rdd2 = sc.parallelize([a[0] for a in output2]).distinct()
	output = rdd1.subtract(rdd2).collect()

	txt = open(argv3, 'w')
	txt.write('Drinker'+'\n')
	for i in range(len(output)):
		v = output[i]
		if i != len(output) - 1:
			txt.write(v+'\n')
		else:
			txt.write(v)
	txt.close()

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2], sys.argv[3])


