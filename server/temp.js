def print_student_info(name, roll_number, mark):
    """
    Prints information about a student.

    Args:
        name (str): Student's name.
        roll_number (int): Student's roll number.
        mark (float): Student's mark.

    Returns:
        None; prints formatted output.
    """
    # Remove unnecessary comment
    print(f"Name: {name}, Roll Number: {roll_number}, Mark: {mark}")

# Testing the function
student_info = {"name": "John Doe", "roll_number": 101, "mark": 85.5}
print_student_info(**student_info)
