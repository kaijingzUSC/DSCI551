import sys
import string
from lxml import etree

def main(argv1, argv2, argv3, result):
	btree = etree.parse(argv1)
	itree = etree.parse(argv2)
	index = itree.xpath('//index/keyword')
	books = btree.xpath('//catalog/book')
	res = etree.Element("results")
	dic = {}
	dic2 = {}
	lis = set()
	for i in argv3.split():
		lis.add(i.lower())
	for word in index:
		if word.attrib["content"] in lis:
			for w in word:
				if w.attrib['id'] not in dic.keys():
					dic[w.attrib['id']] = set()
					dic2[w.attrib['id']] = set()
				dic[w.attrib['id']].add(word.attrib["content"])
				dic2[w.attrib['id']].add(w.attrib["location"])

	for key in dic.keys():
		if dic[key] == lis:
			for book in books:
				if book.attrib['id'] == key:
					res_book = etree.SubElement(res, book.tag)
					res_book.attrib["id"] = book.attrib['id']
					for b in book: 
						if b.tag in dic2[key]:
							etree.SubElement(res_book, b.tag).text = b.text

	doc = etree.ElementTree(res)
	doc.write(open(str(result), 'wb'), pretty_print=True)

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
