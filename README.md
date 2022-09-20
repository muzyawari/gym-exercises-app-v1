## Gym Exercise Tracker App

Hi there,

Thank you for visiting my gym exercise tracker. 

This application was built with:

**React, NodeJS, Express, MongoDB.** 


## Motivation and Inspiration: 

I wanted to create this app to save my gym workouts and to track my progress, instead of using an excel worksheet to track my workouts which I am using currently.

This app was inspired by the VSCode layout in which you can have many folders and each folder can have many different pages.

## Architecture and Design: 

The app architecture is thus very similar to VSCode. 

*A user can have many folders and each folder can have many pages. The reason for this is because, say you are running a push/pull workout routine.*

Creating a folder for push day and adding different pages for your different exercise for each day makes it much easier to track, rather then searching a long list each time. 

Therefore, I wanted to reduce the clutter of the large majority of gym apps out there and make it mine as minimalistic as possible, to allow each user to get to their exercises and sets as quick as possible. 

The backend uses **Express** and **MongoDB** for the database. 

I felt that since there were not many relationships required, as the only data relationships that was needed was for **folder --> pages --> exercises**, 

I felt a document based DB would allow me to quickly grab the required data and display to the users. 

The app was designed with **TailwindCSS**, which is my favourite styling framework due to its lightweight and very adaptable nature and the frontend is made with **React**. 


## To start:

1. Create a folder.
2. Inside the folder create a new page.
3. In the page you can search for any gym workout of your choosing.
4. In the workout, choose the amount of sets and enter in your weights and reps.
5. Based on the number of sets you create, swipe right on the weights and reps to add in more weights/reps.


## Here is a small app preview: 

The app allows you to add a variety of exercises, which you can search from different categories and body parts and add to your page. 

![chrome-capture-2022-8-20](https://user-images.githubusercontent.com/83682463/191259789-1cc3a3f8-47b8-44b1-861b-33a59c4f91f7.gif)


You can add in your exercises and add in your sets, reps and weights. 

The reps and weights are dependant on the sets. So if you have 3 sets, you can add in 3 reps and weight amounts by sliding across. 

![chrome-capture-2022-8-20 (1)](https://user-images.githubusercontent.com/83682463/191261141-98349dea-ddc1-4290-90f5-aa3a2a345fa1.gif)


This app is also completely mobile responsive. 

![chrome-capture-2022-8-20 (1)](https://user-images.githubusercontent.com/83682463/191261141-98349dea-ddc1-4290-90f5-aa3a2a345fa1.gif)


## Next Version:

I am currently working on version 2 where there will be authentication, you will be able to track your previous workouts, start a workout with a timer and will contain more apps all in this one dashboard.

The stack I am using for V2 is NextJS, Typescript and NodeJS. So keep a lookout for that!


