from datetime import date
from pydantic import BaseModel
from typing import Optional
from multiprocessing import array


class User(BaseModel):
    name: str
    email_address: str
    password: str

class Cycle_Variables(BaseModel):
    area: str
    dieback: str
    lighing_date: date
    Observation_or_comment: str


class AddParticipants(BaseModel):
    username: str
    group_id: str


class GetAllTeamParticipants(BaseModel):
    group_id: str


class CreateTeam(BaseModel):
    group_name: str


class Flower_data(BaseModel):
    stem_length: str

class FarmData(BaseModel):
    Block: str
    Farm_number: int
    Access_right: array
    Crop_type: str
    Variety: str
    PredictedYield_old: int
    PredictedYield_new: int
    StemDensityMetre_old: int
    StemDensityMetre_new: int
    PredictedHarvestDate_old: str
    PredictedHarvestDate_new: str
    GrowthStage: int