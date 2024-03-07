1. PureComponent is using shouldComponentUpdate to make a comparison of the current data compared to the new data, if no update it won't rerender

In this example it might not detect the nested values of data have changed.

```// Assume data is an array of objects
const data = [{ id: 1, country: 'Italy' }];

// Initial state
this.state = { data };

// Later in the code, you modify the data in an immutable way
const newData = [...this.state.data];
newData[0].country = 'Spain';

// Updating state with the modified data
this.setState({ data: newData });
```

2. Context can trigger the rerender, even thoug shouldComponentUpdate won't do it.

3. Callbacks ( Props), Context API, state-management tools like Redux, Mobx

4. a. useMemo to cache the response unless there's a change
   b. useRef by accessing the element current value

5. A fragment can be used to wrap multiple elements without creating a new element in the DOM

6. a. ThemeProvider from styled components
   b. React router
   c. Accepting a Component as an argument

7. A promise is doing .then()=> .catch() whilst async await is doing try / catch method. For a callback you can pass it as an external parameter.

8. setState 2, useState 1

9. Convert from class component to functional component,implement hooks, replace lifecycle methods with useEffect

10. CSS preprocessors ( Sass ), styled components, CSS frameworks ( Tailwind )

11. a package that can parse the informationg coming from the server, or dangerouslySetInnerHTML (not reccomended)
