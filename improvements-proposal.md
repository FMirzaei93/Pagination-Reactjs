The answer to the first question: Receiving data from an AIP

If we would like to receive the data from an API, we need to fetch the data asynchronously, and as it's considered a side effect in React, we have to use React.useEffect hook.
To fetch the data asynchronously, we can use either use .fetch(URL).then(), or async/await functions.
After receiving the data, if the response has been OK, it must be converted to the json format.
If we're using a library like 'Axios', the data will be converted to the json format automatically and it's ready to be parsed. But by using the traditional way, first, we have to convert the data to the json format using the .json() method, and then we can parse the data.
For parsing the data, we have to create an array of objects and populate it with the received data. For this purpose, we will map every item of the response (the received data) to an element of the array. We can also add some extra properties to each object if it's needed.
In the next step, we have to map every item of this array to a React component that we've already created and pass the required attributes to be used in that component. We also need to assign a unique key to every single component during the mapping process of the data array.

- We can create a respective hook for fetching the data and then import that hook into the component with React.useEffect hook.

---

The answer to the second question: The issues caused by nanoid for generating keys in React

Using the generated key by nanoid will affect the performance of the app, because it forces the reconciliation process(the process through which React updates the Browser DOM), because React always views every element in the array as "new" or "changed", which forces it to rerender.
In other words, it prevents React from making optimizations to avoid re-rendering more than it needs to do.
The solution is using stable keys for items in lists, like unique, unchangeable ids to have optimal render performance.
