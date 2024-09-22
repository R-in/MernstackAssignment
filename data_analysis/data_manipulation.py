import pandas as pd

def filter_age_over_30(df):
    # Return top 5 rows where age > 30
    filtered_df = df[df['age'] > 30]  # Replace 'age' with your column name
    return filtered_df.head(5)

if __name__ == "__main__":
    df = pd.read_csv('cleaned_data.csv')  # Use cleaned data
    print(filter_age_over_30(df))
