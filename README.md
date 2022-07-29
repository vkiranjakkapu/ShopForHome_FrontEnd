
# ShopForHome

[Microservices - Springboot](https://github.com/vkiranjakkapu/ShopForHome)

ShopForHome is a online Shopping application for home decoration items.
ShopForHome Application was developed using Microservices Architecture, and designed using Angular 12 Framework. In this repository you will find the Microservices which are developed and used for and by our application.

#### Microservices for ShopForHome:
- Master Service
- Coupons Service
- Reports Service

The above mentioned are the Microservices used for developing ShopForHome where, each Microservice works by communicating the other Microservices by using REST API calls using WebClient Dependency for JAVA Spring Boot applications.

#### Master Service:
---
This service is responsible for providing endpoints and resources on request for the frontend angular application, which is used by our end users. The requests made by the end user will be received by this masterservice micro service and the response will be served after authorizing the user.

This Microservice will deal with the user authentications, authorizations, Registrations, Maintenance of Cart&Wishlist of users.

#### Coupons Service:
---
This Service is responsible for providing the operations/executions of bussiness logics on the coupons, like creating of coupons, validation of coupons, and modifications of coupons. This micro service will be accessed from inside the Master Microservice. On every request received by the external Microservices, the requests will be first authorized and then only the resources will be served.

#### Reports Service
---
This Service is responsible for providing the operations/executions of bussiness logics on the reports section for ShopForHome Application. Where this Microservice will provide the admins with reports generation and fetching operations. Also the requests will be authorized before serving the resources to the requested client.
