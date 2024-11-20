# use this script if you want to count how many time a country is present in the dataset that you imported


import json
import pandas as pd
import numpy as np


df = pd.read_csv("")
# if you have an encoding error you can try adding "encoding='ISO-8859-1'"


geojson_file = "world.geojson"
with open(geojson_file, "r") as f:
    geojson_data = json.load(f)



country_column = ""  

country_counts = df[country_column].value_counts()

for feature in geojson_data["features"]:
    country_name = feature["properties"]["name"]

    
    country_count = country_counts.get(country_name, 0)
    feature["properties"][""] = country_count # name of the new column


# When you add a new data entry, don't forget to also add it in the listButtons list of the map.js file



# Function to convert all values to JSON-compatible types
def convert_to_serializable(obj):
    if isinstance(obj, np.integer):
        return int(obj)  
    elif isinstance(obj, np.floating):
        return float(obj) 
    elif isinstance(obj, np.ndarray):
        return obj.tolist() 
    else:
        return obj  

output_file = "world.geojson"
with open(output_file, "w") as f:
    json.dump(geojson_data, f, indent=2, default=convert_to_serializable)

print(f"Updated GeoJSON saved to {output_file}")


