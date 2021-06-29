import sys
import string
from lxml import etree

def main(argv1, argv2):
	tree = etree.parse(argv1)
	books = tree.xpath('//catalog/book')
	index = etree.Element("index")
	for book in books:
		for child in book:
			if child.tag == "author" or child.tag == "title" or \
			child.tag == "genre" or child.tag == "description":
				for item in child.text.split():
					trans= str.maketrans({key: None for key in string.punctuation})
					words = item.translate(trans)
					for word in words.split():
						if index.text == 0:
							keyword = etree.SubElement(index, "keyword")
							keyword.attrib["content"] = word.lower()
							id_ = etree.SubElement(keyword, "id")
							id_.attrib["id"] = book.attrib["id"]
							id_.attrib["location"] = child.tag
						else:
							boolt = False
							for i in index:
								if i.attrib["content"] == word.lower():
									id_ = etree.SubElement(i, "id")
									id_.attrib["id"] = book.attrib["id"]
									id_.attrib["location"] = child.tag
									bootl = True
							if boolt == False:
								keyword = etree.SubElement(index, "keyword")
								keyword.attrib["content"] = word.lower()
								id_ = etree.SubElement(keyword, "id")
								id_.attrib["id"] = book.attrib["id"]
								id_.attrib["location"] = child.tag


						
	doc = etree.ElementTree(index)
	doc.write(open(str(argv2), 'wb'), pretty_print=True)

if __name__ == '__main__':
	if len(sys.argv) <= 1:
		sys.exit()
	main(sys.argv[1], sys.argv[2])
