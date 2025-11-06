#!/bin/bash
# Script to mark Day 8 tasks as complete in README.md

sed -i 's/^- \[ \] Implement full-text search$/- [x] Implement full-text search/' README.md
sed -i 's/^- \[ \] Create advanced filter logic (price range, duration, difficulty)$/- [x] Create advanced filter logic (price range, duration, difficulty)/' README.md
sed -i 's/^- \[ \] Add sorting options (popularity, price, date)$/- [x] Add sorting options (popularity, price, date)/' README.md
sed -i 's/^- \[ \] Optimize database queries$/- [x] Optimize database queries/' README.md
sed -i 's/^- \[ \] Add search analytics tracking$/- [x] Add search analytics tracking/' README.md

echo "Day 8 tasks marked as complete!"
