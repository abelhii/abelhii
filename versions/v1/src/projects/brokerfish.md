---
layout: project.njk
projectTitle: brokerfish.com
tags: ["angular", "javascript", "dotnet-core", "responsive", "project"]
headerImg: assets/images/brokerfish.png
---

<!-- excerpt start -->

[Brokerfish](https://brokerfish.com) is an end-to-end health insurance comparison website, that presents international insurance information in an easy to digest manner.
The project encompasses a front facing comparison website which includes a CMS along with a dynamic application form for each insurer.

<!-- excerpt end -->

## The problem

Brokerfish was in need of a revamp which required a complete overhaul of the **database**, **comparison logic** and a **maintainable solution** for updating and introducing new insurance products.

## The solution

#### Database

The first step was to restructure and optimise the database to fit our needs.
We generated a DB diagram using [HeidiSQL](https://www.heidisql.com/) which gave us a good visual overview of what we were working with.
Then we went through each table and their relationships, removed the redeundancies and rearranged the tables.

#### Comparison Logic

After sorting out the database, we wrote the comparison logic by connecting it to Entity Framework in order to be able to work with LINQ.
This made it a lot easier for us to work with the data and create the APIs that we needed.

After getting the backend sorted, I started work on the frontend to bring it up to a more modern design standard by following responsive principles and optimising it for mobile use.

![Comparison](../../assets/images/brokerfish-compare.png)
![Comparison](../../assets/images/brokerfish-compare-2.png)

#### CMS (Content Management Systems)

Due to the nature of insurance being quite complex, it meant that updating and inserting data into the database was equally so.
One of the pain points of the old system was that updating insurance products and prices required quite a lot of manual labor.

To help with this we created a CMS that allowed users to bulk import and export multiple product data into excel sheets. We also created macros for those excel sheets to help with updating the prices.

This provided the client with more ownership of their system while greatly reducing the time it takes to update or add new products.

## The outcome

The outcome was a sleek, easily maintainable system that provides clarity in a complicated industry.

#### What I learned from this project:

My takeaway from working on this is the importance of planning before development.
This is where I really got to experience updating legacy software and making sure that whoever looks at my code won't curse me in the future.

Technologies I learned:

-   C#
-   Entity Framework LINQ
-   Razor Pages
-   CSS Responsiveness
