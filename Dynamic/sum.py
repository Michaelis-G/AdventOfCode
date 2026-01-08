"""
given an array of integer
[3, 5, 2, 7]
integer can only be used once
is there a sum of the integer to get a specific result
like 12
5+7
"""

def sum(numbers, goal, num = 0):
    if num == goal:
        return True
    
    
    for n in numbers:
        sum(numbers, goal, num+n)

    return False

numbers = [3, 5, 2, 7]
goal = 12
print(sum(numbers, goal))