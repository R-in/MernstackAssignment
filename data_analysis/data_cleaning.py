import pandas as pd

def clean_data(file_path):
    # Read CSV file
    df = pd.read_csv(file_path)

    # Drop rows with missing values
    cleaned_df = df.dropna()

    # Output the cleaned data
    cleaned_df.to_csv('cleaned_data.csv', index=False)
    print("Cleaned data saved to 'cleaned_data.csv'.")

if __name__ == "__main__":
    clean_data('my_data.csv')  # Replace with your CSV file name
