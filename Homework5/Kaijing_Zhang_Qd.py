import sys
from pyspark import SparkContext
from operator import add

def f_map(x):
	line = x.split(',')
	return (line[0],line[1])

def main(argv,argv2,argv3,argv4):
	sc = SparkContext(appName="inf551")

	likes = sc.textFile(argv)
	freq = sc.textFile(argv2)
	sells = sc.textFile(argv3)

	lines_f = freq.map(f_map)
	lines_l = likes.map(f_map)
	rddfl = lines_f.join(lines_l)
	outputs = sells.map(f_map).collect()

	output = rddfl.collect()

	txt = open(argv4, 'w')
	txt.write('Drinker'+'\t'+'Beer'+'\n')
	l = []
	for i in range(len(output)):
		v = output[i]
		if (v[1] in outputs and (v[0],v[1][1]) not in l) and (i != len(output) - 1):
			txt.write(v[0]+'\t'+v[1][1]+'\n')
			l.append((v[0],v[1][1]))
		elif (v[1] in outputs and (v[0],v[1][1]) not in l):
			txt.write(v[0]+'\t'+v[1][1])
			l.append((v[0],v[1][1]))
	txt.close()

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])


