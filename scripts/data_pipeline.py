import pandas as pd
import json
import requests
from process_data import split
from tqdm import tqdm

def get_indicator_list(col = None):
    PATH = "site/app/data/data_manifest.json"
    
    with open(PATH) as f:
        manifest = json.load(f)
    
    dfs = []
    for i in range(len(manifest)):
        dfs.append(pd.DataFrame(manifest[i]['indicators']))
    
    df = pd.concat(dfs)
    
    return df if col is None else df[col]

def get_indicator_df(id):
    base_url = "https://ghoapi.azureedge.net/api/"
    url = base_url+id
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Unable to fetch {id}: Error code {response.status_code}")
        return
    
    return pd.DataFrame(data['value'])

def main():
    indicator_ids = get_indicator_list('id').to_list()

    for indicator in tqdm(indicator_ids, desc="Indicators loaded"):
        df = get_indicator_df(indicator)
        split(cli=False, df=df, indicator_name=indicator)
        
if __name__ == '__main__':
    main()