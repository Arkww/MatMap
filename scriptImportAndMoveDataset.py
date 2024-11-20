# script to import datasets from kaggle

import kagglehub
import shutil
import os
import pandas as pd

path = kagglehub.dataset_download("")
target_path = os.getcwd()
shutil.move(path, target_path)


# Credit to these datasets on kaggle :
# https://www.kaggle.com/datasets/themrityunjaypathak/covid-cases-and-deaths-worldwide
# https://www.kaggle.com/datasets/nelgiriyewithana/countries-of-the-world-2023
# https://www.kaggle.com/datasets/mylesoneill/world-university-rankings
# https://www.kaggle.com/datasets/START-UMD/gtd
# https://www.kaggle.com/datasets/unsdsn/world-happiness
# https://www.kaggle.com/datasets/abhijitdahatonde/worldwide-average-iq-levels
# https://www.kaggle.com/datasets/zusmani/petrolgas-prices-worldwide