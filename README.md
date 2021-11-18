## Requirements
* Node 12
* PostgreSQL >10

## Run the server
Replace user to your POSTGRES_USER and POSTGRES_PASSWORD in:
1. .env
2. package.json ("create:db" script)

Run scripts below for start.
```
npm i
npm run create:db
npm run migrate:db
npm run start
```

## Start work
Open localhost:3005 for making request on start work

## See result
You can see resulting files in a core folder. The file will have results.csv name.

## Explenation of the script working
A source file stored in "big_downloaded_files" folder.
1. Start server and go to the main route (localhost:3005)
2. The 'GET' request will start parsing task
3. The script will divide results by chunks (1000 elements) and save/update elements in db (see src/utils/parse.js file). You can configure size of chunks.
4. Work with the db makes in stream to not made memory leaks.
5. Finally the file will be saved in main folder as resuls.csv

## Coomplexity
The complexity of the algorythm can be estimated ~ as O(n + 2z), where n is amount of rows in csv file, and z - is amount of cities. We need to check each row in a source file, and after it we need to update the cities in db or create new records with results to a new csv file. 2z shows that we make 2 times operations with each city.