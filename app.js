// ═══════════════════════════════════════════════════════════
// CAMPUSNAV — app.js  (Complete Edition)
// ═══════════════════════════════════════════════════════════

// ── Data ───────────────────────────────────────────────────
const LOCATIONS = [
  { id: "main_gate",   name: "Main Gate",       sub: "Entrance",    icon: "🚪", floor: "ground" },
  { id: "admin_block", name: "Admin Block",      sub: "Block A",     icon: "🏛️", floor: "ground" },
  { id: "library",     name: "Library",          sub: "Floor 1–3",   icon: "📚", floor: "ground" },
  { id: "canteen",     name: "Canteen",          sub: "Food Court",  icon: "🍽️", floor: "ground" },
  { id: "cs_dept",     name: "CS Department",    sub: "Block B",     icon: "💻", floor: "ground" },
  { id: "sports",      name: "Sports Complex",   sub: "Ground",      icon: "⚽", floor: "ground" },
  { id: "auditorium",  name: "Auditorium",       sub: "Hall 1",      icon: "🎭", floor: "ground" },
  { id: "lab_1",       name: "Computer Lab",     sub: "Room 101",    icon: "🖥️", floor: "first"  },
  { id: "staff_room",  name: "Staff Room",       sub: "Room 110",    icon: "👨‍🏫", floor: "first"  },
  { id: "seminar",     name: "Seminar Hall",     sub: "Room 201",    icon: "🎓", floor: "second" },
  { id: "principal",   name: "Principal Office", sub: "Room 202",    icon: "🏢", floor: "second" },
];

const ROUTES = {
  // ── FROM MAIN GATE ──────────────────────────────────────
  "main_gate→admin_block": {
    time: "3 min", distance: "150m",
    steps: [
      { icon: "🚶", text: "Enter through Main Gate and walk straight along the main pathway." },
      { icon: "↗️", text: "Turn right at the first junction after 50 meters." },
      { icon: "🏛️", text: "Admin Block is the large blue building on your left. Entrance at front." },
    ],
    tips: "💡 Admin Block offices open at 9:00 AM. Carry your ID card."
  },
  "main_gate→library": {
    time: "5 min", distance: "280m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and take the main pathway heading straight." },
      { icon: "➡️", text: "Continue walking past the Admin Block on your right." },
      { icon: "📚", text: "The Library is the tall building at the far end. Go up the front steps." },
    ],
    tips: "💡 Library hours: 8 AM – 8 PM. Bring your student card for entry."
  },
  "main_gate→canteen": {
    time: "4 min", distance: "200m",
    steps: [
      { icon: "🚶", text: "Enter through Main Gate." },
      { icon: "↙️", text: "Turn left at the main junction." },
      { icon: "🍽️", text: "Walk 60 meters — Canteen is the building with the yellow signboard." },
    ],
    tips: "💡 Canteen open 7:30 AM – 7 PM on weekdays. Peak hours 12–1 PM."
  },
  "main_gate→cs_dept": {
    time: "6 min", distance: "350m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and walk along the main path." },
      { icon: "↙️", text: "Take the left fork at the central junction." },
      { icon: "⬇️", text: "Walk straight for about 80 meters past the Canteen." },
      { icon: "💻", text: "CS Department (Block B) is the red building ahead." },
    ],
    tips: "💡 Labs open Mon–Sat, 9 AM – 5 PM. Login required for PC access."
  },
  "main_gate→sports": {
    time: "7 min", distance: "420m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and walk straight on the main road." },
      { icon: "➡️", text: "At the far end of campus, turn right past the Library." },
      { icon: "⚽", text: "Sports Complex is the open green area. Enter via the side gate." },
    ],
    tips: "💡 Sports facility open 6 AM – 8 PM. Booking required for courts."
  },
  "main_gate→auditorium": {
    time: "5 min", distance: "260m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and head straight along the central path." },
      { icon: "↙️", text: "Turn left at the second junction (past Canteen)." },
      { icon: "🎭", text: "The Auditorium is at the southern end of campus." },
    ],
    tips: "💡 Check the notice board near Admin Block for upcoming events."
  },
  "main_gate→lab_1": {
    time: "5 min", distance: "230m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and walk along the main pathway." },
      { icon: "↗️", text: "Turn right at the first junction toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Take the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Log in with your student credentials. Lab closes at 5 PM."
  },
  "main_gate→staff_room": {
    time: "6 min", distance: "260m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and walk to the first junction." },
      { icon: "↗️", text: "Turn right toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and go to the 1st floor staircase." },
      { icon: "⬆️", text: "Climb to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on your left." },
    ],
    tips: "💡 Staff Room is accessible during office hours only (9 AM – 5 PM)."
  },
  "main_gate→seminar": {
    time: "7 min", distance: "310m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and walk straight to the first junction." },
      { icon: "↗️", text: "Turn right toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and head to the main staircase." },
      { icon: "⬆️", text: "Go up to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall seats 200 students. Booking required for events."
  },
  "main_gate→principal": {
    time: "8 min", distance: "340m",
    steps: [
      { icon: "🚶", text: "Enter Main Gate and proceed along the main pathway." },
      { icon: "↗️", text: "Turn right at the first junction toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and find the main staircase." },
      { icon: "⬆️", text: "Go up to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments preferred. Check with reception on the ground floor first."
  },

  // ── FROM ADMIN BLOCK ────────────────────────────────────
  "admin_block→library": {
    time: "4 min", distance: "180m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block from the front entrance and turn left." },
      { icon: "➡️", text: "Walk along the main pathway heading east." },
      { icon: "📚", text: "Library is the tall building at the far end — take the front steps." },
    ],
    tips: "💡 Library hours: 8 AM – 8 PM. Bring your student card."
  },
  "admin_block→canteen": {
    time: "3 min", distance: "140m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "↙️", text: "Turn left and walk down the side path." },
      { icon: "🍽️", text: "The Canteen is directly below on the left side." },
    ],
    tips: "💡 Peak hours 12–1 PM. Go a little early to avoid queues."
  },
  "admin_block→cs_dept": {
    time: "5 min", distance: "240m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block from the front and turn left toward the main path." },
      { icon: "↙️", text: "Take the left fork at the central junction past Canteen." },
      { icon: "⬇️", text: "Walk straight for 80 meters." },
      { icon: "💻", text: "CS Department (Block B) is ahead on your right." },
    ],
    tips: "💡 Labs require student ID login. Open Mon–Sat, 9 AM – 5 PM."
  },
  "admin_block→sports": {
    time: "6 min", distance: "310m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block and turn left onto the main pathway." },
      { icon: "➡️", text: "Walk east past the Library." },
      { icon: "➡️", text: "Turn right at the far end of campus." },
      { icon: "⚽", text: "Sports Complex is the open green area. Enter via the side gate." },
    ],
    tips: "💡 Sports facility open 6 AM – 8 PM. Booking required for courts."
  },
  "admin_block→auditorium": {
    time: "4 min", distance: "190m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block from the main entrance." },
      { icon: "↙️", text: "Turn left and walk toward the southern end of campus." },
      { icon: "🎭", text: "The Auditorium is the large hall at the southern end of the main path." },
    ],
    tips: "💡 Reach 10 mins early for event seating."
  },
  "admin_block→lab_1": {
    time: "3 min", distance: "120m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block from the side door." },
      { icon: "⬆️", text: "Go up the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Log in with your student credentials. Lab closes at 5 PM."
  },
  "admin_block→staff_room": {
    time: "2 min", distance: "60m",
    steps: [
      { icon: "🏛️", text: "Stay inside Admin Block and locate the 1st floor staircase." },
      { icon: "⬆️", text: "Climb to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on your left." },
    ],
    tips: "💡 Staff Room is accessible during office hours only (9 AM – 5 PM)."
  },
  "admin_block→seminar": {
    time: "5 min", distance: "180m",
    steps: [
      { icon: "🏛️", text: "Exit Admin Block and head to the main staircase." },
      { icon: "⬆️", text: "Go up to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall seats 200 students. Booking required for events."
  },
  "admin_block→principal": {
    time: "4 min", distance: "130m",
    steps: [
      { icon: "🏛️", text: "Remain inside Admin Block and find the main staircase." },
      { icon: "⬆️", text: "Climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right from the staircase." },
    ],
    tips: "💡 Appointments recommended. Check with ground-floor reception first."
  },

  // ── FROM LIBRARY ────────────────────────────────────────
  "library→canteen": {
    time: "4 min", distance: "210m",
    steps: [
      { icon: "📚", text: "Exit the Library from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk north along the left-side path for about 90 meters." },
      { icon: "➡️", text: "Turn right at the junction — the Canteen is ahead on the left." },
    ],
    tips: "💡 Library has water dispensers for refills."
  },
  "library→cs_dept": {
    time: "4 min", distance: "220m",
    steps: [
      { icon: "📚", text: "Exit the Library from the main entrance and turn left." },
      { icon: "⬇️", text: "Walk back along the main path toward the central junction." },
      { icon: "↙️", text: "Take the left fork and walk 80 meters." },
      { icon: "💻", text: "CS Department (Block B) is on your right." },
    ],
    tips: "💡 Return your books at the Library before heading to the lab!"
  },
  "library→sports": {
    time: "3 min", distance: "160m",
    steps: [
      { icon: "📚", text: "Exit the Library from the rear exit." },
      { icon: "➡️", text: "Turn right and walk along the eastern boundary path." },
      { icon: "⚽", text: "Sports Complex is immediately ahead — enter via the side gate." },
    ],
    tips: "💡 Sports booking available at the reception inside the complex."
  },
  "library→auditorium": {
    time: "6 min", distance: "320m",
    steps: [
      { icon: "📚", text: "Exit the Library from the main entrance and turn left." },
      { icon: "⬇️", text: "Walk along the main path toward the central junction." },
      { icon: "↙️", text: "Turn left at the second junction past Canteen." },
      { icon: "🎭", text: "The Auditorium is the large hall at the southern end." },
    ],
    tips: "💡 Check the notice board near Admin Block for upcoming events."
  },
  "library→admin_block": {
    time: "4 min", distance: "180m",
    steps: [
      { icon: "📚", text: "Exit Library from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk west along the main pathway." },
      { icon: "🏛️", text: "Admin Block is the blue building on your right after 150 meters." },
    ],
    tips: "💡 Admin offices close at 5 PM on weekdays."
  },
  "library→lab_1": {
    time: "7 min", distance: "360m",
    steps: [
      { icon: "📚", text: "Exit Library and turn right along the main pathway." },
      { icon: "⬆️", text: "Walk west toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Take the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Lab closes at 5 PM. Student credentials required."
  },
  "library→staff_room": {
    time: "8 min", distance: "390m",
    steps: [
      { icon: "📚", text: "Exit Library from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk west to Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and go to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — end of the corridor on the left." },
    ],
    tips: "💡 Staff Room accessible 9 AM – 5 PM only."
  },
  "library→seminar": {
    time: "10 min", distance: "430m",
    steps: [
      { icon: "📚", text: "Exit Library from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk west toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall seats 200 students. Booking required."
  },
  "library→principal": {
    time: "11 min", distance: "460m",
    steps: [
      { icon: "📚", text: "Exit Library from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk west toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments preferred. Check with reception first."
  },

  // ── FROM CANTEEN ────────────────────────────────────────
  "canteen→library": {
    time: "4 min", distance: "210m",
    steps: [
      { icon: "🍽️", text: "Exit the Canteen from the main door and turn right." },
      { icon: "⬆️", text: "Walk north along the left-side path for about 90 meters." },
      { icon: "➡️", text: "Turn right at the junction — the Library is the tall building ahead." },
    ],
    tips: "💡 Library has water dispensers for refills."
  },
  "canteen→cs_dept": {
    time: "3 min", distance: "150m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and turn left onto the side path." },
      { icon: "⬇️", text: "Walk south for 80 meters." },
      { icon: "💻", text: "CS Department (Block B) is on your right." },
    ],
    tips: "💡 Labs close at 5 PM. Carry your student ID."
  },
  "canteen→sports": {
    time: "5 min", distance: "280m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen from the main door and turn right." },
      { icon: "➡️", text: "Walk east along the northern path for 120 meters." },
      { icon: "➡️", text: "Turn right at the far junction." },
      { icon: "⚽", text: "Sports Complex is the open area ahead — enter via the side gate." },
    ],
    tips: "💡 Sports booking available at the complex reception."
  },
  "canteen→auditorium": {
    time: "3 min", distance: "160m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and turn left toward the southern path." },
      { icon: "⬇️", text: "Walk south along the path for 100 meters." },
      { icon: "🎭", text: "The Auditorium is the large hall at the southern end of campus." },
    ],
    tips: "💡 Reach 10 mins early for event seating."
  },
  "canteen→admin_block": {
    time: "3 min", distance: "140m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen from the main door and turn right." },
      { icon: "⬆️", text: "Walk north along the path for 90 meters." },
      { icon: "🏛️", text: "Admin Block is the blue building on your left." },
    ],
    tips: "💡 Admin offices open 9 AM – 5 PM."
  },
  "canteen→lab_1": {
    time: "6 min", distance: "270m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and turn right toward Admin Block." },
      { icon: "⬆️", text: "Walk north to Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Take the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Student credentials required. Lab closes at 5 PM."
  },
  "canteen→staff_room": {
    time: "7 min", distance: "300m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and head north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on the left." },
    ],
    tips: "💡 Staff Room accessible during office hours only."
  },
  "canteen→seminar": {
    time: "8 min", distance: "330m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and head north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Booking required for Seminar Hall. Capacity: 200 seats."
  },
  "canteen→principal": {
    time: "9 min", distance: "360m",
    steps: [
      { icon: "🍽️", text: "Exit Canteen and head north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments preferred. Check with reception first."
  },

  // ── FROM CS DEPARTMENT ──────────────────────────────────
  "cs_dept→auditorium": {
    time: "5 min", distance: "270m",
    steps: [
      { icon: "💻", text: "Exit CS Department from the ground floor entrance." },
      { icon: "⬇️", text: "Walk south on the side path for 60 meters." },
      { icon: "🎭", text: "The Auditorium is the large hall at the southern end." },
    ],
    tips: "💡 Reach 10 mins early for event seating."
  },
  "cs_dept→sports": {
    time: "6 min", distance: "300m",
    steps: [
      { icon: "💻", text: "Exit CS Department and turn right onto the main path." },
      { icon: "➡️", text: "Walk east for 100 meters toward the Library end." },
      { icon: "➡️", text: "Turn right at the far junction." },
      { icon: "⚽", text: "Sports Complex is the open green area. Enter via the side gate." },
    ],
    tips: "💡 Sports facility open 6 AM – 8 PM. Booking required for courts."
  },
  "cs_dept→lab_1": {
    time: "7 min", distance: "360m",
    steps: [
      { icon: "💻", text: "Exit CS Department and walk north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Take the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Lab hours: 9 AM – 5 PM. Student ID required."
  },
  "cs_dept→staff_room": {
    time: "8 min", distance: "390m",
    steps: [
      { icon: "💻", text: "Exit CS Department and walk north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on the left." },
    ],
    tips: "💡 Staff Room accessible 9 AM – 5 PM only."
  },
  "cs_dept→seminar": {
    time: "9 min", distance: "420m",
    steps: [
      { icon: "💻", text: "Exit CS Department and walk north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall capacity: 200. Booking required."
  },
  "cs_dept→principal": {
    time: "10 min", distance: "450m",
    steps: [
      { icon: "💻", text: "Exit CS Department and walk north toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments recommended. Check with reception first."
  },

  // ── FROM SPORTS ─────────────────────────────────────────
  "sports→library": {
    time: "3 min", distance: "160m",
    steps: [
      { icon: "⚽", text: "Exit Sports Complex from the side gate." },
      { icon: "↙️", text: "Turn left and walk along the eastern boundary path." },
      { icon: "📚", text: "Library is directly ahead — enter from the front steps." },
    ],
    tips: "💡 Library hours: 8 AM – 8 PM."
  },
  "sports→auditorium": {
    time: "8 min", distance: "440m",
    steps: [
      { icon: "⚽", text: "Exit Sports Complex via the main entrance." },
      { icon: "↙️", text: "Walk west along the northern path to the central junction." },
      { icon: "↙️", text: "Turn left at the junction and walk south past Canteen." },
      { icon: "🎭", text: "The Auditorium is at the southern end of campus." },
    ],
    tips: "💡 Allow extra time to freshen up before heading to the Auditorium."
  },
  "sports→admin_block": {
    time: "6 min", distance: "310m",
    steps: [
      { icon: "⚽", text: "Exit Sports Complex and walk west on the main road." },
      { icon: "↙️", text: "Turn left at the eastern junction past the Library." },
      { icon: "🏛️", text: "Admin Block is on your right after 150 meters." },
    ],
    tips: "💡 Admin offices open 9 AM – 5 PM."
  },
  "sports→lab_1": {
    time: "9 min", distance: "460m",
    steps: [
      { icon: "⚽", text: "Exit Sports Complex and walk west past the Library." },
      { icon: "⬆️", text: "Continue to Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Take the staircase to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Lab closes at 5 PM. Student ID required."
  },
  "sports→seminar": {
    time: "12 min", distance: "550m",
    steps: [
      { icon: "⚽", text: "Exit Sports Complex and walk west past the Library." },
      { icon: "⬆️", text: "Continue to Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall capacity: 200. Booking required."
  },

  // ── FROM AUDITORIUM ─────────────────────────────────────
  "auditorium→admin_block": {
    time: "4 min", distance: "190m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk north along the main path for 130 meters." },
      { icon: "🏛️", text: "Admin Block is the large blue building on your right." },
    ],
    tips: "💡 Admin offices open 9 AM – 5 PM."
  },
  "auditorium→canteen": {
    time: "3 min", distance: "160m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium from the main entrance." },
      { icon: "⬆️", text: "Walk north along the main path for 80 meters." },
      { icon: "🍽️", text: "Canteen is the building on your right with the yellow signboard." },
    ],
    tips: "💡 Great spot for a post-event meal!"
  },
  "auditorium→library": {
    time: "6 min", distance: "320m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk north along the main path." },
      { icon: "➡️", text: "Continue east past Admin Block toward the far end of campus." },
      { icon: "📚", text: "Library is the tall building on your right." },
    ],
    tips: "💡 Library hours: 8 AM – 8 PM."
  },
  "auditorium→cs_dept": {
    time: "5 min", distance: "270m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium and turn right onto the main path." },
      { icon: "⬆️", text: "Walk north for 80 meters toward Canteen." },
      { icon: "➡️", text: "Turn right at the Canteen junction and walk east 80 meters." },
      { icon: "💻", text: "CS Department (Block B) is on your right." },
    ],
    tips: "💡 Labs require student ID login. Open Mon–Sat, 9 AM – 5 PM."
  },
  "auditorium→sports": {
    time: "8 min", distance: "440m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium from the main entrance and turn right." },
      { icon: "⬆️", text: "Walk north along the main path toward the central junction." },
      { icon: "➡️", text: "Turn right and head east past the Library." },
      { icon: "⚽", text: "Sports Complex is at the far right corner — enter via the side gate." },
    ],
    tips: "💡 Booking required for courts."
  },
  "auditorium→lab_1": {
    time: "7 min", distance: "350m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium and turn right toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block from the side door." },
      { icon: "⬆️", text: "Climb to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Lab closes at 5 PM. Student credentials required."
  },
  "auditorium→seminar": {
    time: "9 min", distance: "390m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium and turn right toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall capacity: 200. Booking required."
  },
  "auditorium→principal": {
    time: "10 min", distance: "420m",
    steps: [
      { icon: "🎭", text: "Exit Auditorium and turn right toward Admin Block." },
      { icon: "🏛️", text: "Enter Admin Block and climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments recommended."
  },

  // ── FROM LAB 1 ──────────────────────────────────────────
  "lab_1→staff_room": {
    time: "2 min", distance: "50m",
    steps: [
      { icon: "🖥️", text: "Exit Computer Lab (Room 101) and turn right along the 1st floor corridor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on the left." },
    ],
    tips: "💡 Staff Room accessible during office hours 9 AM – 5 PM."
  },
  "lab_1→seminar": {
    time: "4 min", distance: "90m",
    steps: [
      { icon: "🖥️", text: "Exit Computer Lab and go to the Admin Block staircase." },
      { icon: "⬆️", text: "Climb one more floor to the 2nd floor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall seats 200. Booking required."
  },
  "lab_1→principal": {
    time: "4 min", distance: "80m",
    steps: [
      { icon: "🖥️", text: "Exit Computer Lab and go to the Admin Block staircase." },
      { icon: "⬆️", text: "Climb one more floor to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments preferred. Check with reception first."
  },
  "lab_1→canteen": {
    time: "6 min", distance: "270m",
    steps: [
      { icon: "🖥️", text: "Exit Computer Lab and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "↙️", text: "Turn left and walk down the side path." },
      { icon: "🍽️", text: "Canteen is on the left with the yellow signboard." },
    ],
    tips: "💡 Canteen open 7:30 AM – 7 PM."
  },

  // ── FROM STAFF ROOM ─────────────────────────────────────
  "staff_room→seminar": {
    time: "3 min", distance: "70m",
    steps: [
      { icon: "👨‍🏫", text: "Exit Staff Room and turn left along the 1st floor corridor." },
      { icon: "⬆️", text: "Climb to the 2nd floor using the main staircase." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — straight ahead from the staircase." },
    ],
    tips: "💡 Seminar Hall capacity 200. Booking required."
  },
  "staff_room→principal": {
    time: "3 min", distance: "65m",
    steps: [
      { icon: "👨‍🏫", text: "Exit Staff Room and locate the main staircase at the end of the corridor." },
      { icon: "⬆️", text: "Climb to the 2nd floor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — first door on your right." },
    ],
    tips: "💡 Appointments recommended. Knock before entering."
  },
  "staff_room→canteen": {
    time: "7 min", distance: "300m",
    steps: [
      { icon: "👨‍🏫", text: "Exit Staff Room and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "↙️", text: "Turn left and walk down the side path." },
      { icon: "🍽️", text: "Canteen is on your left with the yellow signboard." },
    ],
    tips: "💡 Canteen open 7:30 AM – 7 PM. Peak hours 12–1 PM."
  },
  "staff_room→library": {
    time: "8 min", distance: "390m",
    steps: [
      { icon: "👨‍🏫", text: "Exit Staff Room and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance and turn left." },
      { icon: "➡️", text: "Walk east along the main path." },
      { icon: "📚", text: "Library is the tall building at the far end." },
    ],
    tips: "💡 Library hours: 8 AM – 8 PM."
  },

  // ── FROM SEMINAR ────────────────────────────────────────
  "seminar→principal": {
    time: "2 min", distance: "40m",
    steps: [
      { icon: "🎓", text: "Exit Seminar Hall (Room 201) and turn right along the 2nd floor corridor." },
      { icon: "🏢", text: "Principal's Office is Room 202 — the next door on your right." },
    ],
    tips: "💡 Knock before entering the Principal's Office."
  },
  "seminar→lab_1": {
    time: "4 min", distance: "90m",
    steps: [
      { icon: "🎓", text: "Exit Seminar Hall and find the staircase." },
      { icon: "⬇️", text: "Descend to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Student credentials required for lab access."
  },
  "seminar→staff_room": {
    time: "3 min", distance: "70m",
    steps: [
      { icon: "🎓", text: "Exit Seminar Hall and find the staircase." },
      { icon: "⬇️", text: "Descend to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on your left." },
    ],
    tips: "💡 Staff Room accessible 9 AM – 5 PM only."
  },
  "seminar→canteen": {
    time: "8 min", distance: "330m",
    steps: [
      { icon: "🎓", text: "Exit Seminar Hall and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "↙️", text: "Turn left and walk down the side path." },
      { icon: "🍽️", text: "Canteen is on your left with the yellow signboard." },
    ],
    tips: "💡 Canteen open 7:30 AM – 7 PM."
  },
  "seminar→main_gate": {
    time: "7 min", distance: "310m",
    steps: [
      { icon: "🎓", text: "Exit Seminar Hall and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "⬆️", text: "Turn right and walk west along the main path." },
      { icon: "🚪", text: "Main Gate is at the western boundary." },
    ],
    tips: "💡 Security check required at the gate after 7 PM."
  },

  // ── FROM PRINCIPAL ──────────────────────────────────────
  "principal→seminar": {
    time: "2 min", distance: "40m",
    steps: [
      { icon: "🏢", text: "Exit Principal's Office (Room 202) and turn left along the 2nd floor corridor." },
      { icon: "🎓", text: "Seminar Hall is Room 201 — the next door on your left." },
    ],
    tips: "💡 Seminar Hall capacity: 200. Booking via Admin Block."
  },
  "principal→lab_1": {
    time: "4 min", distance: "80m",
    steps: [
      { icon: "🏢", text: "Exit Principal's Office and find the staircase." },
      { icon: "⬇️", text: "Descend to the 1st floor." },
      { icon: "🖥️", text: "Computer Lab is Room 101 — second door on the right." },
    ],
    tips: "💡 Student credentials required for lab access."
  },
  "principal→staff_room": {
    time: "3 min", distance: "65m",
    steps: [
      { icon: "🏢", text: "Exit Principal's Office and find the staircase." },
      { icon: "⬇️", text: "Descend to the 1st floor." },
      { icon: "👨‍🏫", text: "Staff Room is Room 110 — at the end of the corridor on your left." },
    ],
    tips: "💡 Staff Room accessible during office hours."
  },
  "principal→canteen": {
    time: "9 min", distance: "360m",
    steps: [
      { icon: "🏢", text: "Exit Principal's Office and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "↙️", text: "Turn left and walk down the side path." },
      { icon: "🍽️", text: "Canteen is on your left with the yellow signboard." },
    ],
    tips: "💡 Canteen open 7:30 AM – 7 PM."
  },
  "principal→main_gate": {
    time: "8 min", distance: "340m",
    steps: [
      { icon: "🏢", text: "Exit Principal's Office and descend to the ground floor." },
      { icon: "🏛️", text: "Exit Admin Block from the front entrance." },
      { icon: "⬆️", text: "Turn right and walk west along the main path." },
      { icon: "🚪", text: "Main Gate is at the western boundary of campus." },
    ],
    tips: "💡 Security check required at the gate after 7 PM."
  },
};

// Auto-build reverse routes
const ALL_ROUTES = { ...ROUTES };
for (const [key, route] of Object.entries(ROUTES)) {
  const [f, t] = key.split("→");
  const rk = `${t}→${f}`;
  if (!ALL_ROUTES[rk]) {
    ALL_ROUTES[rk] = {
      time: route.time,
      distance: route.distance,
      steps: [...route.steps].reverse(),
      tips: route.tips,
    };
  }
}

// Cache to localStorage for offline
try { localStorage.setItem("campusRoutes_v3", JSON.stringify(ALL_ROUTES)); } catch(e) {}

// ── State ───────────────────────────────────────────────────
let selectedFloor = "ground";
let currentFrom   = "";
let currentTo     = "";
let isFavorited   = false;

// ── Theme ───────────────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem("campusTheme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  document.getElementById("themeIcon").textContent = saved === "dark" ? "☀️" : "🌙";
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  document.getElementById("themeIcon").textContent = next === "dark" ? "☀️" : "🌙";
  localStorage.setItem("campusTheme", next);
}

// ── Banner ──────────────────────────────────────────────────
function closeBanner() {
  document.getElementById("announcementBanner").style.display = "none";
}

// ── Mobile Menu ─────────────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById("mobileNav").classList.toggle("open");
}

// ── Floor Selector ──────────────────────────────────────────
function selectFloor(btn, floor) {
  document.querySelectorAll(".floor-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  selectedFloor = floor;
  renderGrids();
  const fromLoc = LOCATIONS.find(l => l.id === currentFrom);
  const toLoc   = LOCATIONS.find(l => l.id === currentTo);
  if (fromLoc && fromLoc.floor !== floor) { currentFrom = ""; document.getElementById("fromLocation").value = ""; }
  if (toLoc   && toLoc.floor   !== floor) { currentTo   = ""; document.getElementById("toLocation").value   = ""; }
}

// ── Render Location Grids ───────────────────────────────────
function renderGrids() {
  const filtered = LOCATIONS.filter(l => l.floor === selectedFloor);
  renderGrid("fromGrid", "fromLocation", filtered, "from");
  renderGrid("toGrid",   "toLocation",   filtered, "to");
}

function renderGrid(containerId, inputId, locs, type) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = "";
  locs.forEach(loc => {
    const card = document.createElement("div");
    card.className = "loc-card";
    card.dataset.id = loc.id;
    if (loc.id === currentFrom && type === "from") card.classList.add("selected-from");
    if (loc.id === currentTo   && type === "to")   card.classList.add("selected-to");
    card.innerHTML = `
      <span class="l-icon">${loc.icon}</span>
      <div class="l-name">${loc.name}</div>
      <div class="l-sub">${loc.sub}</div>
    `;
    card.addEventListener("click", () => {
      grid.querySelectorAll(".loc-card").forEach(c => {
        c.classList.remove("selected-from", "selected-to");
      });
      card.classList.add(type === "from" ? "selected-from" : "selected-to");
      document.getElementById(inputId).value = loc.id;
      if (type === "from") currentFrom = loc.id;
      else                 currentTo   = loc.id;
    });
    grid.appendChild(card);
  });
}

// ── Swap Locations ──────────────────────────────────────────
function swapLocations() {
  const tempId   = currentFrom;
  currentFrom    = currentTo;
  currentTo      = tempId;
  document.getElementById("fromLocation").value = currentFrom;
  document.getElementById("toLocation").value   = currentTo;
  renderGrids();
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("errorCard").style.display  = "none";
}

// ── Search ──────────────────────────────────────────────────
function handleSearch(val) {
  const clear    = document.getElementById("searchClear");
  const dropdown = document.getElementById("searchDropdown");
  clear.style.display = val ? "flex" : "none";
  if (!val.trim()) { dropdown.classList.remove("open"); return; }
  const results = LOCATIONS.filter(l =>
    l.name.toLowerCase().includes(val.toLowerCase()) ||
    l.sub.toLowerCase().includes(val.toLowerCase())
  );
  if (results.length === 0) {
    dropdown.innerHTML = `<div class="search-item"><span class="search-item-name" style="color:var(--text2)">No results found</span></div>`;
  } else {
    dropdown.innerHTML = results.map(loc => `
      <div class="search-item" onclick="selectFromSearch('${loc.id}')">
        <span class="search-item-icon">${loc.icon}</span>
        <div>
          <div class="search-item-name">${loc.name}</div>
          <div class="search-item-sub">${loc.sub} · ${loc.floor} floor</div>
        </div>
      </div>
    `).join("");
  }
  dropdown.classList.add("open");
}

function selectFromSearch(id) {
  const loc = LOCATIONS.find(l => l.id === id);
  if (!loc) return;
  if (loc.floor !== selectedFloor) {
    const btn = [...document.querySelectorAll(".floor-tab")].find(
      b => b.getAttribute("onclick").includes(loc.floor)
    );
    if (btn) selectFloor(btn, loc.floor);
  }
  if (!currentFrom) {
    currentFrom = id;
    document.getElementById("fromLocation").value = id;
  } else {
    currentTo = id;
    document.getElementById("toLocation").value = id;
  }
  renderGrids();
  clearSearch();
  addToRecent(`${loc.icon} ${loc.name}`);
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
  document.getElementById("searchClear").style.display = "none";
  document.getElementById("searchDropdown").classList.remove("open");
}

document.addEventListener("click", e => {
  if (!e.target.closest(".search-bar-wrap")) {
    document.getElementById("searchDropdown").classList.remove("open");
  }
});

// ── Recent Searches ─────────────────────────────────────────
function getRecent() {
  try { return JSON.parse(localStorage.getItem("campusRecent") || "[]"); } catch(e) { return []; }
}
function addToRecent(label) {
  let recent = getRecent().filter(r => r !== label);
  recent.unshift(label);
  recent = recent.slice(0, 6);
  try { localStorage.setItem("campusRecent", JSON.stringify(recent)); } catch(e) {}
  renderRecent();
}
function renderRecent() {
  const recent = getRecent();
  const section = document.getElementById("recentSection");
  const list    = document.getElementById("recentList");
  if (recent.length === 0) { section.style.display = "none"; return; }
  section.style.display = "block";
  list.innerHTML = recent.map(r =>
    `<span class="recent-chip" onclick="handleRecentClick('${r}')">🕐 ${r}</span>`
  ).join("");
}
function handleRecentClick(label) {
  document.getElementById("searchInput").value = label.replace(/^[^\s]+ /, "");
  handleSearch(label.replace(/^[^\s]+ /, ""));
}
function clearRecent() {
  try { localStorage.removeItem("campusRecent"); } catch(e) {}
  renderRecent();
}

// ── Favorites ───────────────────────────────────────────────
function getFavorites() {
  try { return JSON.parse(localStorage.getItem("campusFavorites") || "[]"); } catch(e) { return []; }
}
function toggleFavorite() {
  const btn  = document.getElementById("favBtn");
  const from = currentFrom;
  const to   = currentTo;
  if (!from || !to) return;
  const favKey = `${from}→${to}`;
  let favs     = getFavorites();
  if (isFavorited) {
    favs = favs.filter(f => f.key !== favKey);
    isFavorited = false;
    btn.textContent = "☆ Save";
    btn.classList.remove("saved");
  } else {
    const fromLoc = LOCATIONS.find(l => l.id === from);
    const toLoc   = LOCATIONS.find(l => l.id === to);
    favs.push({
      key:   favKey,
      label: `${fromLoc?.icon} ${fromLoc?.name} → ${toLoc?.icon} ${toLoc?.name}`,
      from, to
    });
    isFavorited = true;
    btn.textContent = "★ Saved";
    btn.classList.add("saved");
  }
  try { localStorage.setItem("campusFavorites", JSON.stringify(favs)); } catch(e) {}
  renderFavorites();
}
function renderFavorites() {
  const favs    = getFavorites();
  const section = document.getElementById("favoritesSection");
  const list    = document.getElementById("favoritesList");
  if (favs.length === 0) { section.style.display = "none"; return; }
  section.style.display = "block";
  list.innerHTML = favs.map(f =>
    `<span class="fav-chip" onclick="loadFavorite('${f.from}','${f.to}')">⭐ ${f.label}</span>`
  ).join("");
}
function loadFavorite(from, to) {
  const fromLoc = LOCATIONS.find(l => l.id === from);
  if (fromLoc && fromLoc.floor !== selectedFloor) {
    const btn = [...document.querySelectorAll(".floor-tab")].find(
      b => b.getAttribute("onclick").includes(fromLoc.floor)
    );
    if (btn) selectFloor(btn, fromLoc.floor);
  }
  currentFrom = from;
  currentTo   = to;
  document.getElementById("fromLocation").value = from;
  document.getElementById("toLocation").value   = to;
  renderGrids();
  getDirections();
  document.getElementById("navigate").scrollIntoView({ behavior: "smooth" });
}
function clearFavorites() {
  try { localStorage.removeItem("campusFavorites"); } catch(e) {}
  renderFavorites();
}

// ── Get Directions ──────────────────────────────────────────
function getDirections() {
  const from = document.getElementById("fromLocation").value;
  const to   = document.getElementById("toLocation").value;
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("errorCard").style.display  = "none";
  if (!from)    { showError("Please select your current location."); return; }
  if (!to)      { showError("Please select your destination."); return; }
  if (from===to){ showError("You're already there! Please choose a different destination."); return; }

  let routes = ALL_ROUTES;
  try {
    const cached = JSON.parse(localStorage.getItem("campusRoutes_v3") || "{}");
    if (Object.keys(cached).length > 0) routes = cached;
  } catch(e) {}

  const key   = `${from}→${to}`;
  const route = routes[key];
  if (!route) { showError("No route found for this combination. More routes coming soon!"); return; }
  displayRoute(from, to, route);
  addToRecent(`${LOCATIONS.find(l=>l.id===from)?.icon} ${LOCATIONS.find(l=>l.id===from)?.name}`);
}

function displayRoute(from, to, route) {
  const fromLoc = LOCATIONS.find(l => l.id === from);
  const toLoc   = LOCATIONS.find(l => l.id === to);
  document.getElementById("resultRoute").textContent =
    `${fromLoc?.icon} ${fromLoc?.name}  →  ${toLoc?.icon} ${toLoc?.name}`;
  document.getElementById("badgeTime").textContent = `⏱ ${route.time || route.distance}`;
  document.getElementById("badgeDist").textContent = `📍 ${route.distance || ""}`;
  const list = document.getElementById("stepsList");
  list.innerHTML = "";
  route.steps.forEach((step, i) => {
    const div = document.createElement("div");
    div.className = "step-item";
    div.style.animationDelay = `${i * 0.07}s`;
    div.innerHTML = `
      <div class="step-num">${i + 1}</div>
      <span class="step-icon">${step.icon}</span>
      <span class="step-text">${step.text}</span>
    `;
    list.appendChild(div);
  });
  const tips = document.getElementById("tipsCard");
  if (route.tips) {
    document.getElementById("tipsText").textContent = route.tips;
    tips.style.display = "flex";
  } else {
    tips.style.display = "none";
  }
  currentFrom = from;
  currentTo   = to;
  const favKey = `${from}→${to}`;
  const favs   = getFavorites();
  isFavorited  = favs.some(f => f.key === favKey);
  const favBtn = document.getElementById("favBtn");
  favBtn.textContent = isFavorited ? "★ Saved" : "☆ Save";
  isFavorited ? favBtn.classList.add("saved") : favBtn.classList.remove("saved");
  document.getElementById("resultCard").style.display = "block";
  setTimeout(() => {
    document.getElementById("resultCard").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
}

function showError(msg) {
  document.getElementById("errorMsg").textContent = msg;
  document.getElementById("errorCard").style.display = "flex";
}

// ── Active Nav Link on Scroll ───────────────────────────────
const sections = ["home", "navigate", "map", "about"];
window.addEventListener("scroll", () => {
  let current = "home";
  const scrollPos = window.scrollY + 140;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && scrollPos >= el.offsetTop) current = id;
  });
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ═══════════════════════════════════════════════════════════
// INTERACTIVE MAP — Satellite / Blueprint toggle
// ═══════════════════════════════════════════════════════════
let activeMapBuilding = null;
let mapMode = "satellite"; // satellite | blueprint

function selectMapBuilding(el) {
  if (activeMapBuilding) activeMapBuilding.classList.remove("active");
  el.classList.add("active");
  activeMapBuilding = el;
  const id   = el.dataset.id;
  const name = el.dataset.name;
  const sub  = el.dataset.sub;
  const icon = el.dataset.icon;
  document.getElementById("ttIcon").textContent = icon;
  document.getElementById("ttName").textContent = name;
  document.getElementById("ttSub").textContent  = sub;
  document.getElementById("mapTooltip").dataset.locId = id;
  document.getElementById("mapTooltip").style.display = "flex";
}

function navigateFromMap() {
  const id = document.getElementById("mapTooltip").dataset.locId;
  if (!id) return;
  const loc = LOCATIONS.find(l => l.id === id);
  if (loc && loc.floor !== selectedFloor) {
    const btn = [...document.querySelectorAll(".floor-tab")]
      .find(b => b.getAttribute("onclick").includes(loc.floor));
    if (btn) selectFloor(btn, loc.floor);
  }
  currentTo = id;
  document.getElementById("toLocation").value = id;
  renderGrids();
  document.getElementById("navigate").scrollIntoView({ behavior: "smooth" });
}

function toggleMapMode(btn) {
  const buttons = document.querySelectorAll(".map-mode-btn");
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  mapMode = btn.dataset.mode;
  const mapWrap = document.getElementById("campusMapWrap");
  if (mapMode === "satellite") {
    mapWrap.classList.remove("blueprint-mode");
    mapWrap.classList.add("satellite-mode");
  } else {
    mapWrap.classList.remove("satellite-mode");
    mapWrap.classList.add("blueprint-mode");
  }
}

// ── Particle / Hero animation ───────────────────────────────
function createParticles() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W = canvas.width = canvas.offsetWidth;
  let H = canvas.height = canvas.offsetHeight;

  const particles = Array.from({length: 80}, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(129,140,248,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener("resize", () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  });
}

// ── Stats counter animation ──────────────────────────────────
function animateCounters() {
  document.querySelectorAll(".stat-num[data-target]").forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    let count = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(interval);
    }, 40);
  });
}

// ── Init ────────────────────────────────────────────────────
initTheme();
renderGrids();
renderRecent();
renderFavorites();
createParticles();
setTimeout(animateCounters, 400);

// ── Auth state on main page ──────────────────────────────────
(function checkAuthState() {
  try {
    const user = JSON.parse(localStorage.getItem('campusLoggedIn') || 'null');
    if (user) {
      document.getElementById('loginHeaderBtn').style.display = 'none';
      const chip = document.getElementById('userChip');
      chip.style.display = 'flex';
      document.getElementById('userName').textContent = user.name.split(' ')[0];
    }
  } catch(e) {}
})();

// ── Logout — uses Firebase signOut via module script in index.html ──
// doLogout() is defined in the <script type="module"> block in index.html
// Do NOT define it here to avoid conflicts with the ES module scope.