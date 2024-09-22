import pandas as pd
import numpy as np

def calculate_statistics(file_path):
    # Read CSV file
    df = pd.read_csv(file_path)

    # Calculate mean, median, and standard deviation for the 'age' column
    mean_age = np.mean(df['age'])  # Replace 'age' with your column name
    median_age = np.median(df['age'])
    std_dev_age = np.std(df['age'])

    print(f"Mean Age: {mean_age}")
    print(f"Median Age: {median_age}")
    print(f"Standard Deviation of Age: {std_dev_age}")

if __name__ == "__main__":
    calculate_statistics('cleaned_data.csv')  # Use cleaned data
