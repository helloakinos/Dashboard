import logging
import json
from bson.json_util import dumps
from db_config import collection_farm

from http.server import HTTPServer, BaseHTTPRequestHandler

import pandas as pd
import pymongo
from fastapi import FastAPI, HTTPException, Depends, Request, APIRouter, status

from auth.authmodels import AuthUserInfo
from auth.auth import get_current_user

dataRouter = APIRouter(
    prefix="/data",
    tags=["visualization"]
)


@dataRouter.get("/mydata/")
def get_farm_data(current_user: AuthUserInfo = Depends(get_current_user)):
    email = current_user["username"]
    farmdata = collection_farm.find({"Access_right":email})
    if farmdata:
        list_cur = list(farmdata)
        json_data = dumps(list_cur, indent =0)
        finaldata = json.loads(json_data)
        Block=[]
        Farm_number=[]
        Crop_type=[]
        Variety=[]
        PredictedYield_old=[]
        PredictedYield_new=[]
        StemDensityMetre_old=[]
        StemDensityMetre_new=[]
        PredictedHarvestDate_old=[]
        PredictedHarvestDate_new=[]
        GrowthStage=[]
        for i in range(len(finaldata)):
            Block.append(finaldata[i]["Block"])
            Farm_number.append(finaldata[i]["Farm_number"])
            Crop_type.append(finaldata[i]["Crop_type"])
            Variety.append(finaldata[i]["Variety"])
            PredictedYield_old.append(finaldata[i]["PredictedYield_old"])
            PredictedYield_new.append(finaldata[i]["PredictedYield_new"])
            StemDensityMetre_old.append(finaldata[i]["StemDensityMetre_old"])
            StemDensityMetre_new.append(finaldata[i]["StemDensityMetre_new"])
            PredictedHarvestDate_old.append(finaldata[i]["PredictedHarvestDate_old"])
            PredictedHarvestDate_new.append(finaldata[i]["PredictedHarvestDate_new"])
            GrowthStage.append(finaldata[i]["GrowthStage"])
        return {"All_Data": finaldata, "Block": Block, "Farm_number": Farm_number, "Crop_type": Crop_type, "Variety": Variety, "PredictedYield_old": PredictedYield_old, "PredictedYield_new": PredictedYield_new, "StemDensityMetre_old": StemDensityMetre_old, "StemDensityMetre_new": StemDensityMetre_new, "PredictedHarvestDate_old": PredictedHarvestDate_old, "PredictedHarvestDate_new": PredictedHarvestDate_new, "GrowthStage": GrowthStage, "name": current_user["name"]}
    else:
        return logging.warning('Failed to grab data from mongodb')

