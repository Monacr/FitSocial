# Requirements & Team Policies

This document defines the Fit Social project. It outlines the project's goals, requirements, and high-level implementation, including how the Fit Social team will operate to reach these goals.

## Team Info & Policies

### Team members

- Lawrence Qupty: in charge of backend, project architecture.
-
-
-
-

## Product Description

## Use Cases

## Non-Functional Requirements

### User experience

Since this project is a social media platform that focuses on reaching as many people as possible, user experience is a priority. The user interface must follow design principles proven to improve UX and accessability. By using libraries like [bootstrap](https://getbootstrap.com/) we can quickly deploy a high-UX interface.

## External Requirements

## Team Process Description

### Software toolset

- Rust for backend. Rust has a very extensive ecosystem of libraries for web servers like [actix](https://actix.rs/) and databse ORMs like [diesel](https://diesel.rs/). These tools are the fastest, competing and often beating similar libraries in languages like C++. Unlike C++, Rust's strong typesystem and compiler lowers the chance of runtime errors and gaurantees no memory errors.

- [SurrealDB](https://surrealdb.com/) for database. SurrealDB is a Rust-implemented serverless database that uses a SQL-like query language. This makes it easy to use for those familiar with SQL, and makes simple data retreval (like user account info) fast on the frontend as it can return JSON directly from the database without needing to go through the backend. This way, the backend would only be used for data aggregation and computation, increasing speed and decreasing complexity.

- ReactJS for the frontend. React is the most popular Javascript framework giving multiple advantages. Not only will developer familiarity remove the need to learn a new technology, React's ecosystem of libraries (React bootstrap, for example) and community support make it easy to develop with. React works so well because it is component based, meaning components can be composed to create complex user interfaces quickly.


