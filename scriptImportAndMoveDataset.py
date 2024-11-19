# script to import datasets from kaggle

import kagglehub
import shutil
import os
import pandas as pd

path = kagglehub.dataset_download("nelgiriyewithana/countries-of-the-world-2023")
target_path = os.getcwd()
shutil.move(path, target_path)

