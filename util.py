import pickle
import json
import numpy as np
import os

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    global __data_columns
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __locations

    current_dir = os.path.dirname(os.path.abspath(__file__))
    columns_file_path = os.path.join(current_dir, 'columns.json')
    model_file_path = os.path.join(current_dir, 'banglore_home_prices_model.pickle')

    print(f"Columns file path: {columns_file_path}")
    print(f"Model file path: {model_file_path}")

    # Load columns.json
    try:
        with open(columns_file_path, "r") as f:
            __data_columns = json.load(f)['data_columns']
            __locations = __data_columns[3:]  # first 3 columns are sqft, bath, bhk
        print("Columns loaded successfully")
    except Exception as e:
        print(f"Error loading columns.json: {e}")

    # Load model
    global __model
    if __model is None:
        try:
            with open(model_file_path, 'rb') as f:
                __model = pickle.load(f)
            print("Model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {e}")

    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
    print(get_estimated_price('1st Phase JP Nagar', 1000, 2, 2))
    print(get_estimated_price('Kalhalli', 1000, 2, 2))
    print(get_estimated_price('Ejipura', 1000, 2, 2))