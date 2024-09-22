import pandas as pd
import matplotlib.pyplot as plt

def visualize_age_distribution(file_path):
    # Read CSV file
    df = pd.read_csv(file_path)

    # Create a bar chart for age distribution
    plt.figure(figsize=(10, 6))
    df['age'].value_counts().sort_index().plot(kind='bar')  # Replace 'age' with your column name
    plt.title('Age Distribution')
    plt.xlabel('Age')
    plt.ylabel('Frequency')
    plt.xticks(rotation=0)
    plt.grid(axis='y')

    # Show plot
    plt.savefig('age_distribution.png')
    plt.show()

if __name__ == "__main__":
    visualize_age_distribution('cleaned_data.csv')  # Use cleaned data
