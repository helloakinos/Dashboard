from dotenv import load_dotenv
import pymongo
import os

load_dotenv()

DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")

client = pymongo.MongoClient(f"mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@lima-dashboard-xcellera.hjh2k.mongodb.net/dashboarddb?retryWrites=true&w=majority")
database = client["dashboarddb"]
collection_users = database["users"]
collection_farm = database["farm_data"]