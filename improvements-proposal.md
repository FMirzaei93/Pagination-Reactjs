1.Right now the data for the posts is coming from a json file. What changes would you have to make to the application if it came from an API? In what type of hook should you use to fetch the data and why? What other considerations would you have to make?

Answer:
If we would like to receive the data from an API, we need to fetch the data asynchronously, and as it's considered a side effect in React, we have to use React.useEffect hook.
To fetch the data asynchronously, we can use either .fetch(URL)/then(), or async/await functions.
After receiving the data, if the response is OK, the received json data must be parsed (to be converted to a javascript object) using .json() method.
If we're using a library like 'Axios', the data will be converted to a javascript object automatically.
For using the parsed data, we have to create an array of objects and populate it with the provided data. For this purpose, we will map every item of the response (the parsed data) to an element of the array. We can also add some extra properties to each object if it's needed.
In the next step, we have to map every item of this array to a React component that we've already created and pass the required attributes to be used

---

2.How could you improve your current solution if the number of blog posts was really large (for example 10,000)?
Answer:
Depending on the page size, for each page, we need to send a respective request to the server to receive only that number of data and not more.
For example, if the page size is 15, for the first page, we request the first 15 posts from the server and show them to the user. Thus, for the second page, we would request the second 15 posts, and so on. Because receiving all data at once and keeping them in the app, doesn't make sense, as it's a very time-consuming process and violates the optimization rule in programming.
For this purpose, to keep track of the page number, we can define a state that keeps the current page number. Each time that we are going to receive the new data for the next page, we will increase that state(like what we already have in the app), then send both the state and the page size to the server. It will be done by using POST method for sending a request and adding both the state and the page size as the body of the request.
If we want to show the total number of existing pages, we have to receive the size of the whole data from the server to provide the pagination for the user.

---

3.What are additional features you would consider adding now that the data is being requested from an API?
Answer:
We can have a respective hook that takes care of different types of requests (GET, POST) and then import it to the intended component.
We should make this hook to adhere to the clean and modular coding.
This hook will have at least two methods for handling the GET and POST requests, that will be exported.
Each time we're about to send a request, we will call this methods and pass the required parameters(if needed).
As I mentined before, bacause we're fetching the data from an API and it's considered a side effect in React, we have to use React.useEffect hook. As React.useEffect runs after the DOM updates, it won't block the render process.

---

4.Part of this application uses the package nanoid to generate keys. What issue would this cause for generating keys in React?

Answer:
Using the generated key by nanoid will affect the performance of the app, because it forces the reconciliation process(the process through which React updates the Browser DOM), because React always views every element in the array as "new" or "changed", which forces it to rerender.
In other words, it prevents React from making optimizations to avoid re-rendering more than it needs to do.
The solution is using stable keys for items in lists, like unique, unchangeable ids to have optimal render performance.
