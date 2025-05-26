import pandas as pd
import json
import sys
import os

def rename_sexes(label):
    '''
    Intended to be applied to a dataframe column denoting sex of the data
    Renames the values to a more human-readable format
    Skips if the initial value is not one of: 'SEX_BTSX', 'SEX_MLE', 'SEX_FMLE'
    '''
    if label.upper() == 'SEX_BTSX':
        return 'Both'
    elif label.upper() == 'SEX_MLE':
        return 'Male'
    elif label.upper() == 'SEX_FMLE':
        return 'Female'
    else:
        return
    
def split_on_sex(df, which_col):
    '''
    Takes an existing dataframe and the name of the column containing the sex of the data
    Splits the df into separate dataframes for each sex and returns them individually
    '''
    df_both = df[df[which_col] == 'Both']
    df_male = df[df[which_col] == 'Male']
    df_female = df[df[which_col] == 'Female']

    return df_both, df_male, df_female

def split_on_year(df, indicator, out_dir, sex_col=None):
    '''
    Takes an existing dataframe and outputs a new csv file for each year in the data
    '''
    # first sorts the years low to high for organizational purpose
    years = sorted(list(df['YEAR'].unique()))
    if sex_col is not None:
        # extracts the sex of the data
        sex = df[sex_col].unique()[0]
        sex = sex.lower()

        # creates the directory inside the given output directory for the indicator and sex if they don't already exist
        if not (os.path.exists(os.path.join(out_dir, indicator))):
            os.mkdir(os.path.join(out_dir, indicator))
        if not (os.path.exists(os.path.join(out_dir, indicator, sex))):
            os.mkdir(os.path.join(out_dir, indicator, sex))

        # creates the csv for each year
        for year in years:
            out_df = df[df['YEAR'] == year]
            out_df.to_csv(os.path.join(out_dir, indicator, sex, f"{indicator}_{year}_{sex}")+".csv", index=False)
    else:
        # creates the directory inside the given output directory for the indicator if it doesn't already exist
        if not (os.path.exists(os.path.join(out_dir, indicator))):
            os.mkdir(os.path.join(out_dir, indicator))

        # creates the csv for each year
        for year in years:
            out_df = df[df['YEAR'] == year]
            out_df.to_csv(os.path.join(out_dir, indicator, f"{indicator}_{year}")+".csv", index=False)

def split(cli = False, df = None, indicator_name=None):
    
    if cli:
        # use CLI arguments if entered correctly, otherwise prompts for input
        if len(sys.argv) >= 3:
            in_file = sys.argv[1]
            out_dir = sys.argv[2]
        else:
            in_file = input("Enter path to indicator (including filename w/ extension): ")
            out_dir = input("Enter path to directory to save files to: ")

        # ensures existence of given directories, throws error if not and specifies which one is the issue
        if not (os.path.exists(in_file) and os.path.exists(out_dir)):
            in_doesnt_exist = not os.path.exists(in_file)
            out_doesnt_exist = not os.path.exists(out_dir)
            
            if in_doesnt_exist and out_doesnt_exist:
                raise Exception(f"ERROR: Neither {in_file} or {out_dir} are valid paths")
            elif in_doesnt_exist:
                raise Exception(f"ERROR: {in_file} is not a valid path")
            else:
                raise Exception(f"ERROR: {out_dir} is not a valid path")

        # checks if a json file exists containing the descriptions of the indicators -- CLI or user input
        if len(sys.argv) == 4:
            key_path = sys.argv[3]
        else:
            key_path = input("(OPTIONAL) Enter path to indicator key .json (leave empty if not available): ")

        # if given path to json file doesn't exist, empties out the invalid input to avoid future error
        if not os.path.exists(key_path):
            print("WARNING: Entered path to indicator key does not exist -- cannot display indicator description")
            key_path = ""

        # extracts the filename and name of the indicator
        filename = os.path.basename(in_file)
        indicator_name = os.path.splitext(filename)[0]

        # loads in the indicator key if it exists
        if key_path != "":
            with open(key_path, 'r') as f:
                indicator_lookup = json.load(f)

        # displays the name of the indicator being processed and its description if valid key given
        print(f"Processing files for {indicator_name}", end="")
        if key_path != "":
            print(':')
            print(indicator_lookup[indicator_name])
        else:
            print()

        df = pd.read_parquet(in_file)
    else:
        out_dir = "data"
        
    if not cli and df is None:
        return

    # columns we'll never need by default
    drop_columns=[
    'IndicatorCode',
    'TimeDimType',
    'DataSourceDim',
    'DataSourceDimType',
    'Comments',
    'Date',
    'TimeDimensionValue',
    'TimeDimensionBegin',
    'TimeDimensionEnd'
    ]

    # drops initial unnecessary columns and renames TimeDim to YEAR for better readability
    df = df.drop(columns=drop_columns)
    df = df.rename({'TimeDim': 'YEAR'}, axis=1)

    # determines if a column for sex exists and saves which column it is
    contains_sex_dim = False
    sex_col = None
    for col in ['Dim1Type', 'Dim2Type', 'Dim3Type']:
        if (df[col] == 'SEX').all():
            contains_sex_dim = True
            sex_col = col.replace('Type', '')

    # drops anymore columns that contain only null values
    drop_columns = []
    for key in df.keys():
        if df[key].isna().all():
            drop_columns.append(key)
    df = df.drop(columns=drop_columns)

    # outputs the csvs separated by year and sex if applicable
    if contains_sex_dim:
        df[sex_col] = df[sex_col].apply(rename_sexes)
        df_b, df_m, df_f = split_on_sex(df, sex_col)
        split_on_year(df_b, indicator_name, out_dir, sex_col)
        split_on_year(df_m, indicator_name, out_dir, sex_col)
        split_on_year(df_f, indicator_name, out_dir, sex_col)
    else:
        split_on_year(df, indicator_name, out_dir)
    
if __name__ == "__main__":
    split(cli=True)