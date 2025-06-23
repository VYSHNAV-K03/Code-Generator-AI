def swap_string(string):
    # Split the string into a list of words
    words = string.split(' ')
    
    # Initialize a list to hold the swapped words
    new_words = []
    
    # Iterate over each word in the string
    for word in words:
        # If the word is empty, add it as-is to the new list
        if len(word) == 0:
            new_words.append(word)
        # If the word is not empty, create a new word with the letters swapped and added to the new list
        else:
            new_word = word[-1:] + word[0].upper() + word[1:-1]
            new_words.append(new_word)
    
    # Join the new words together to form a string and return the result
    return ' '.join(new_words)

# Test the function with the MALAYALAM string
original_string = "MALAYALAM"
swapped_string = swap_string(original_string)
print("Original String:", original_string)
print("Swapped String:", swapped_string)
