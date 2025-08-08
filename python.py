import pandas as pd

# Create a sample Excel template with proper student data structure
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
    'Course': [
        'Computer Science',
        'Mathematics',
        'Physics',
        'Chemistry', 
        'Biology',
        'English Literature',
        'History',
        'Economics',
        'Psychology',
        'Engineering'
    ],
    'Marks': [98, 95, 92, 90, 88, 86, 84, 82, 80, 78]
}

# Create DataFrame
df = pd.DataFrame(data)

# Save to Excel file
df.to_excel('student_leaderboard_template.xlsx', index=False, sheet_name='Students')

print("Excel template created successfully!")
print("\nTemplate structure:")
print(df.head())
print(f"\nTotal students in template: {len(df)}")