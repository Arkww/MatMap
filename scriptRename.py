import json

# script to rename entries in the database


with open('test.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)


old_property_name = "pop_est"  
new_property_name = "Population estimated"  


for feature in data['features']:
    if old_property_name in feature['properties']:
        feature['properties'][new_property_name] = feature['properties'].pop(old_property_name)


with open('world.geojson', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"La propriété '{old_property_name}' a été renommée en '{new_property_name}' avec succès.")
