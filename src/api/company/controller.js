import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'company';
const collectiionName = "company";
function makeQueryObject(query) {
    let result = {};
    console.log(query);
    if (query.maxworkercount && query.minworkercount) {
        result.workercount = {
            $and: [{
                $lte: parseInt(query.maxworkercount)
            }, {
                $gte: parseInt(query.minworkercount)
            }]
        };
    }
    console.log(result);
    return result;
};
const companyControler = {
    get: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect(); 
            const company = connection.db(dbName).collection(collectiionName);             
            const result = await company.find().toArray();           
            res.send(result);
            client.close(); 
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const companies = connection.db(dbName).collection(collectiionName);
            if(Array.isArray(req.body))
            {
                const result = await companies.insertMany(req.body);
            }
            else
            {
               const result = await companies.insertOne(req.body);
            }
            res.send("Успішно добавлено!");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },   
    getById: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const books = connection.db(dbName).collection(collectiionName);
            const result = await books.findOne({
                _id: ObjectID(req.params.id)
            }); // знайти
            if (result) //якщо знайшло
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const companies = connection.db(dbName).collection(collectiionName);
            const result = await companies.findOneAndDelete({
                _id: ObjectID(req.params.id)
            }, req.body);
            if (result)
                res.send(result);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const companies = connection.db(dbName).collection(collectiionName);
            const result = await companies.findOneAndUpdate({
                    _id: ObjectID(req.params.id)
                },
                {
                    $set: req.body
                }, );
            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    get_async: async (req, res) => { 
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            }); 
            const connection = await client.connect(); 
            const companies = connection.db(dbName).collection(collectiionName);          
            const result = await companies
                .find(
                    

                    makeQueryObject(req.query)
                )
                .toArray();         
            res.send(result); 
            client.close(); 
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}
export default companyControler;