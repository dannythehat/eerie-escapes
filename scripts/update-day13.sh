#!/bin/bash
# Script to update Day 13 tasks in README.md

# This script updates the Day 13 section to mark all tasks as complete

echo "Updating Day 13 tasks in README.md..."

# Use sed to replace the Day 13 section
sed -i 's/\*\*Day 13 (5h)\*\* - Holiday Listing Page/\*\*Day 13 (5h)\*\* - Holiday Listing Page/' README.md
sed -i 's/- \[ \] Create holiday grid\/list view/- [x] Create holiday grid\/list view/' README.md
sed -i 's/- \[ \] Build filter sidebar/- [x] Build filter sidebar/' README.md  
sed -i 's/- \[ \] Implement search functionality/- [x] Implement search functionality/' README.md
sed -i 's/- \[ \] Add pagination/- [x] Add pagination/' README.md
sed -i 's/- \[ \] Create holiday card component/- [x] Create holiday card component/' README.md

echo "Day 13 tasks updated successfully!"
