# Create updated Excel template with new structure
import pandas as pd

# Create a new Excel template with the updated data structure
data = {
    'Name': [
        'Alice Johnson',
        'David Martinez', 
        'Emma Thompson',
        'Michael Chen',
        'Sarah Williams',
        'James Rodriguez',
        'Sophia Kumar',
        'Robert Brown',
        'Lisa Anderson',
        'Christopher Lee'
    ],
    'Subject': [
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology', 
        'English',
        'History',
        'Computer Science',
        'Economics',
        'Psychology',
        'Geography'
    ],
    'Obtained Marks': [95, 92, 89, 86, 84, 82, 80, 78, 76, 74],
    'Total Marks': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    'Percentage': [95.0, 92.0, 89.0, 86.0, 84.0, 82.0, 80.0, 78.0, 76.0, 74.0]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to Excel file
df.to_excel('final_student_leaderboard_template.xlsx', index=False, sheet_name='Students')

print("Final Excel template created successfully!")
print("\nTemplate structure:")
print(df.head())