from pathlib import Path
import json


# script to delete entries in the database


with open('world.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

delete =   []

for feature in data['features']:
    for i in delete :
        if i in feature['properties']:
            del feature['properties'][i]


with open('world.geojson', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

for i in delete :
    print("The key " + i + " was succesfully deleted")
