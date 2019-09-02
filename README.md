# Ocean Panorama Apartments
This is a hotel lodging application. It allows guests to book and manage their reservations for the Ocean Panorama hotel (based in the Seychelles Islands). In addition to the guests related features are host related features. Some features include managing incoming guests' booking requests and managing the rooms available to guests.

Key Features:
  - Application has a seperation between client and server-side. Front-end is built using React + Redux and the backend with Node.js and Express. The client side consumes the REST Api backend, which allows for more flexibility due to the loose coupling between the 2 parts of the application.
  
  - Guests are given the option to make online payments through the use of the Stripe Payments API.
  
  - Automated communication (e.g booking confirmation, payment confirmation or booking cancelation)between guests and the platform is done using the SendGrid API.
  

Tools: Node.js, Express, React, Redux, Stripe and SendGrid.

Project Status: Development
