# use this script to put a csv into the database, choosing which column and which value


import json
import pandas as pd



df = pd.read_csv("1/world-data-2023.csv")
# if you have an encoding error you can try adding "encoding='ISO-8859-1'"


geojson_file = "world.geojson"
with open(geojson_file, "r") as f:
    geojson_data = json.load(f)


country_column = "Country"  

for feature in geojson_data["features"]:
     country_name = feature["properties"]["name"]

     matching_row = df[df[country_column] == country_name]

     if not matching_row.empty: 
         feature["properties"]["Country agricultural land"] = matching_row.iloc[0]["Agricultural Land( %)"]

# When you add a new data entry, don't forget to also add it in the listButtons list of the map.js file

output_file = "world.geojson"
with open(output_file, "w") as f:
    json.dump(geojson_data, f, indent=2)

print(f"Updated GeoJSON saved to {output_file}")
