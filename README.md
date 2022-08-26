# Leave Your Mark - Share your moments! (Facebook Clone)

### Live Link

https://leaveyourmark.vercel.app/

### Teach stack

Next.js (Javascript Framework), Context API (State Management), NextAuth (User Authentication), Firebase Firestore (Database), FileReader API (Image upload) & Tailwind CSS (Styling)

### About

This app acts a pin board for anyone to use. Make your own text and image posts. You can also view everyone elses posts too. Think of it like a mood board, a Pinterest type app with a facebook user interface.

### Motivation

This project was mainly used to keep my CSS skills sharp, get familiar with firebase and to try out nextAuth (User Authentication package)

### Features

1. A clear focus on code modularity and code structure for easy modification and expansion
2. We have different apps for mobile vs larger screens. Please test the app on different screen sizes. Use your browsers `inspect` tool.
3. Facebook, Google login enabled
4. Custom login page
5. Can share a post with or without an image and display it in the User interface in real-time just like Facebook
6. Your data is persisted via firebase, meaning when you sign in and out your posts will be there. They are essentially there forever!
7. Can view every other users post with one button click. Careful what you share as only I can delete the posts from the database.
8. Light/Dark mode
9. Mobile first approach
10. Error messages for API failures i.e if the firebase day quota is exceeded you will get a notification as to why you can't make posts as this app is on the free plan
11. My own custom tailwind animations and utility classes using the @layout feature

### TODOs

1. Search pos by user name and email
2. Allow users to post images to their own story section
3. Allow users to like, comment and share posts externally.
4. Creating other pages in the style of facebook but repurposing them, if you have any got ideas, let me know.

### App Images

#### Mobile (click on the images to view larger)

<a href="https://imgur.com/4MnoXAC"><img src="https://i.imgur.com/4MnoXAC.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/1XMVsRF"><img src="https://i.imgur.com/1XMVsRF.png" title="source: imgur.com" /></a>

#### Larger Screens

<a href="https://imgur.com/BAcGWY5"><img src="https://i.imgur.com/BAcGWY5.png" width='351.33px' height='242.px'title="source: imgur.com" /></a>
<a href="https://imgur.com/eH8O6P4"><img src="https://i.imgur.com/eH8O6P4.png" width='348.66px' height='237.px' title="source: imgur.com" /></a>

<a href="https://imgur.com/16IsQF1"><img src="https://i.imgur.com/16IsQF1.png" width='350.66px' height='242.66px' title="source: imgur.com" /></a>
<a href="https://imgur.com/yw7PBxO"><img src="https://i.imgur.com/yw7PBxO.png" width='350.66px' height='237px' title="source: imgur.com" /></a>

<a href="https://imgur.com/PXnNGZ1"><img src="https://i.imgur.com/PXnNGZ1.png" width='198.66px' height='236.66px' title="source: imgur.com" /></a>
<a href="https://imgur.com/OFF04Pr"><img src="https://i.imgur.com/OFF04Pr.png" width='196.33px' height='236.33px' title="source: imgur.com" /></a>

<a href="https://imgur.com/uwSiFxe"><img src="https://i.imgur.com/uwSiFxe.png" width='197.66px' height='236.66px'title="source: imgur.com" /></a>
<a href="https://imgur.com/U0JD4Uq"><img src="https://i.imgur.com/U0JD4Uq.png" width='196.33px' height='236.33px' title="source: imgur.com" /></a>

<a href="https://imgur.com/DtK3K6A"><img src="https://i.imgur.com/DtK3K6A.png" width='236.66px' height='298.33px' title="source: imgur.com" /></a>
<a href="https://imgur.com/7JeVYmj"><img src="https://i.imgur.com/7JeVYmj.png" width='313px' height='298.33px' title="source: imgur.com" /></a>

#### Database Schema

The database was designed this way to make it easy to find, organize and add new user data systematically. This enables easy create, read, write and update functionally based on user emails.

<a href="https://imgur.com/OLoWTm7"><img src="https://i.imgur.com/OLoWTm7.png" width='235px' height='85.33px' title="source: imgur.com" /></a>

<a href="https://imgur.com/H4JZn8w"><img src="https://i.imgur.com/H4JZn8w.png" width='307.33px' height='133.33px' title="source: imgur.com" /></a>

<a href="https://imgur.com/ptA0jmF"><img src="https://i.imgur.com/ptA0jmF.png" width='211px' height='76.16px' title="source: imgur.com" /></a>
