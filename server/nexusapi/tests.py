# Create your tests here.
from sqlite3 import connect

from django.utils.text import slugify

db = connect('nexus/db.sqlite3')

product_names = db.execute("SELECT name FROM nexusapi_category").fetchall()

for name in product_names:
    db.execute("UPDATE nexusapi_category SET slug = ? WHERE name = ?", [slugify(name[0]), name[0]])

db.commit()