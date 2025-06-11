import pandas as pd
import json
import requests
from process_data import split
from tqdm import tqdm

def load_manifest():
    '''
    loads in the data manifest
    '''
    PATH = "site/app/data/data_manifest.json"
    
    with open(PATH, 'r') as f:
        manifest = json.load(f)

    return manifest

def save_manifest(manifest):
    '''
    saves the given manifest to file
    '''
    PATH = "site/app/data/data_manifest.json"
    
    with open(PATH, 'w') as f:
        json.dump(manifest, f, indent=4)

def get_indicator_list(col = None):
    '''
    generates the list of indicator ids contained in the manifest
    '''
    manifest = load_manifest()
    
    dfs = []
    for i in range(len(manifest)):
        dfs.append(pd.DataFrame(manifest[i]['indicators']))
    
    df = pd.concat(dfs)
    
    return df if col is None else df[col]

def get_indicator_df(id):
    '''
    uses the given indicator id to pull the indicator from the API and converts it into a dataframe
    '''
    base_url = "https://ghoapi.azureedge.net/api/"
    url = base_url+id
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Unable to fetch {id}: Error code {response.status_code}")
        return
    
    return pd.DataFrame(data['value'])

def find_indicator_indices(manifest, indicator):
    '''
    locates the location of the given indicator in the data manifest
    '''
    for i in range(len(manifest)):
        for j in range(len(manifest[i]['indicators'])):
            if manifest[i]['indicators'][j]['id'] == indicator:
                return (i, j)     
    return ()

def update_manifest_date(df, indicator):
    '''
    finds the most recent year in the indicator and updates the manifest's most recent year value for the respective indicator
    '''
    manifest = load_manifest()

    idc = find_indicator_indices(manifest, indicator)
    if len(idc) == 2:
        i = idc[0]
        j = idc[1]
    else:
        print(f"Could not locate indicator {indicator} in manifest")
        return

    new_date = int(max(df['TimeDimensionValue']))

    if manifest[i]['indicators'][j]['end'] != new_date:
        manifest[i]['indicators'][j]['end'] = new_date
    
    save_manifest(manifest)

def main():
    indicator_ids = get_indicator_list('id').to_list()

    for indicator in tqdm(indicator_ids, desc="Indicators loaded"):
        df = get_indicator_df(indicator)
        update_manifest_date(df, indicator)
        split(cli=False, df=df, indicator_name=indicator)
        
if __name__ == '__main__':
    main()