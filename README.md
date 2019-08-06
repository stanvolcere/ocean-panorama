# Ocean Panorama Apartments
This is a hotel lodging application. It allows guests to book and manage their reservations for the Ocean Panorama hotel (based on the Seychelles Islands). In addtion to the guests related features are host related features. Some features include managing incoming guests' booking requests and managing the rooms avaoilable to guests.

Key Features:
  - Application has a seperation between client and server-side. Frontend is built using React + Redux and the backend with Node.js and Express. The client side consumes the REST Api backend, which allows for more flexibility due to the loose coupling between the 2 parts of the application.
  
  - Guests are given the option to make online payments through the use of the Stripe Api.
  
  - Automated communication (e.g booking confirmation, payment confirmation or booking cancelation)between guests and tha platform is done using the SendGrid Api.
  
Preview:

![alt text](https://github.com/stanvolcere/ocean-panorama/tree/master/github-display-pics/screengrab-1-dp.png "Preview 1")
![alt text](https://github.com/stanvolcere/ocean-panorama/tree/master/github-display-pics/screengrab-2.png "Preview 2")


Tools: Node.js, React, Redux, Stripe and SendGrid.

Project Status: Development
