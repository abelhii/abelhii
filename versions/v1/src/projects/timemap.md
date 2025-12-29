---
layout: project.njk
projectTitle: Time Map - where is my next class?
tags: ["javascript", "google-maps", "bootstrap", "responsive", "project"]
headerImg: assets/images/timemap.png
---

<!-- excerpt start -->

This was for my final year project where I created a timetable-map web app for my university campus.

<!-- excerpt end -->

## The problem

My university had a relatively big campus, which was pretty confusng to navigate (especially as a new student).

## The solution

The idea was to have students upload their lecture timetable into the app and it will populate the map with where their next classes were. This required me to build a custom Excel parser (in PHP), to parse the data into JSON in order to insert the student's timetable into the calendar.

It could also be used for things outside of the university campus. Where users could connect it to their own personal calendars (granted their calendar events had locations to them) and it would be populated onto the map based on the times they had to be there.
<br> I was given the opportunity to explore a little bit more of this idea during my summer internship with my university.

## The outcome

What I learned:

-   Storing things in JSON is a thing
-   How to decipher documentation
-   How to work with multiple APIs
