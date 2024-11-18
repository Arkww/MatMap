import kagglehub
import shutil
import os
import json
import pandas as pd


# Download latest version
path = kagglehub.dataset_download("unsdsn/world-happiness")
target_path = os.getcwd()

print("Path to dataset files:", path)
shutil.move(path, target_path)


df = pd.read_csv("2/2019.csv")
print(df.head())


geojson_file = "world.geojson"
with open(geojson_file, "r") as f:
    geojson_data = json.load(f)


country_column = "Country or region"  

for feature in geojson_data["features"]:
    country_name = feature["properties"]["name"]

    matching_row = df[df[country_column] == country_name]

    if not matching_row.empty:
        feature["properties"]["GDP per capita"] = matching_row.iloc[0]["GDP per capita"]

# Save the updated GeoJSON
output_file = "world.geojson"
with open(output_file, "w") as f:
    json.dump(geojson_data, f, indent=2)

print(f"Updated GeoJSON saved to {output_file}")
