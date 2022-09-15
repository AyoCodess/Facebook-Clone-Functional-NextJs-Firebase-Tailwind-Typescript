# Leave Your Mark - Share your moments! (Facebook Clone)

### Live Link

https://leaveyourmark.vercel.app/

### Latest Update: 15/09/2022

1. Users can now comment on their own and other users posts. They can also edit and delete these comments. The database scheme as been updated to accommodate this new feature.

#### Next feature implementation

1. Post and comment 'like' functionally.

### Teach stack

Next.js (Javascript Framework), Context API (State Management), NextAuth (User Authentication), Firebase Firestore (Database), FileReader API (Image upload) & Tailwind CSS (Styling)

### About

This app acts as a pinboard for anyone to use. Think of it like a mood board, a Pinterest-type app with a Facebook user interface. You can share your photos and your writing. And browse the posts of others.

### Motivation

This project was mainly used to keep my CSS skills sharp, get familiar with firebase and try out nextAuth (User Authentication package)

### Features

1. A clear focus on code modularity and code structure for easy modification and expansion
2. We have different apps for mobile vs larger screens. Please test the app on different screen sizes. Use your browser’s inspect tool.
3. Facebook, Google login enabled
4. Custom login page
5. Can share a post with or without an image and display it in the User interface in real-time just like Facebook
6. Your data is persisted via firebase, meaning your posts will be there when you sign in and out. They are essentially there forever!
7. Can view every other user's post with one button click. Be careful what you share as only I can delete the posts from the database.
8. Light/Dark mode
9. Mobile first approach
10. Error messages for API failures (i.e., if the firebase day quota is exceeded you will get a notification as to why you can't make posts as this app is on the free plan)
11. My own custom tailwind animations and utility classes using the @layout feature
12. User comments.

### TODOs

1. Search post by user name and email and possibly keywords.
2. Allow users to post images to their own story section.
3. Allow users to like and share posts externally.
4. Creating other pages in the style of Facebook but repurposing them, if you have any ideas, let me know.

### App Images

#### Mobile (Click on the images to view larger)

<a href="https://i.imgur.com/Dv8rpQu.png"><img src="https://i.imgur.com/Dv8rpQu.png" height='509.33px' title="source: imgur.com" /></a>
<a href="https://i.imgur.com/9qJjbNl.png"><img src="https://i.imgur.com/9qJjbNl.png" height='509.33px' title="source: imgur.com" /></a>

#### Larger Screens (Click on the images to view larger)

<a href="https://i.imgur.com/BAcGWY5.png" ><img src="https://i.imgur.com/BAcGWY5.png" width='351.33px' title="source: imgur.com" /></a>
<a href="https://i.imgur.com/eH8O6P4.png" ><img src="https://i.imgur.com/eH8O6P4.png" width='348.66px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/16IsQF1.png" ><img src="https://i.imgur.com/16IsQF1.png" width='350.66px'  title="source: imgur.com" /></a>
<a href="https://i.imgur.com/yw7PBxO.png" ><img src="https://i.imgur.com/yw7PBxO.png" width='350.66px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/PXnNGZ1.png" ><img src="https://i.imgur.com/PXnNGZ1.png" width='198.66px'  title="source: imgur.com" /></a>
<a href="https://i.imgur.com/OFF04Pr.png" ><img src="https://i.imgur.com/OFF04Pr.png" width='196.33px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/uwSiFxe.png" ><img src="https://i.imgur.com/uwSiFxe.png" width='197.66px' title="source: imgur.com" /></a>
<a href="https://i.imgur.com/U0JD4Uq.png" ><img src="https://i.imgur.com/U0JD4Uq.png" width='196.33px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/DtK3K6A.png" ><img src="https://i.imgur.com/DtK3K6A.png" width='236.66px' title="source: imgur.com" /></a>
<a href="https://i.imgur.com/7JeVYmj.png" ><img src="https://i.imgur.com/7JeVYmj.png" width='313px'  title="source: imgur.com" /></a>

#### Database Schema (Click on the images to view larger)

The database was designed to make it easy to find, organize and add new user data systematically. This enables easy create, read, write and update functionally based on user emails.

<a href="https://i.imgur.com/OLoWTm7.png" ><img src="https://i.imgur.com/OLoWTm7.png" width='235px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/H4JZn8w.png" ><img src="https://i.imgur.com/H4JZn8w.png" width='307.33px'  title="source: imgur.com" /></a>

<a href="https://i.imgur.com/ptA0jmF.png" ><img src="https://i.imgur.com/ptA0jmF.png" width='211px' title="source: imgur.com" /></a>

#### Firebase Storage (Image storage)

Images uploaded with a post are saved into a separate folder in firebases fire storage facility, titled with the users email.

<a href="https://i.imgur.com/oFtihl8.png" ><img src="https://i.imgur.com/oFtihl8.png" width='480px' title="source: imgur.com" /></a>
