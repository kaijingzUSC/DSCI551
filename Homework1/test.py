import re

str = 'sadjfadks dsjakfkads !#@$%^& dkja213 931'
str = re.compile(r'\b[a-zA-Z]+\b',re.I).findall(str)
print(str)