## Run the script
```
npm i
node parse.js
```

## Explenation of the script working
1. We read a csv file row by row
2. If the city is unique (met it for the first time) we save the city with a current value
3. If the city already in our results a current value adds to a value in results
4. When all rows are mapped and reduced we save results in stream, value by value

## Coomplexity
The complexity of the algorythm can be estimated as O(n + z), where n is amount of rows in csv file, and z - is amount of cities in results objects. We need to check each row to finish the task, and after it we need to convert object with results to a new csv file.