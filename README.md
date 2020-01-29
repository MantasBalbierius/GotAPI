# Game of Thrones API

## Setup

Import from CSV file to MongoDB:

    mongoimport -d GOT -c GameOfThrones --type CSV --file **<FILE_PATH>**/etc/battles.csv --headerline

Install dependencies:

    npm install

Create environment `.env` file:

    SERVER_PORT=<your-port>
    MONGO_URL=<your-mongodb-uri>

Generate routes:

    npm run generate

Start:

    npm run start
