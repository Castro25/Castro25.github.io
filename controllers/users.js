import { v4 as uuidv4 } from 'uuid';
import mongodb from 'mongodb'
import { stringify } from 'qs';


export const checkUserEmail = (req, res) => {
    const userEmail = req.params;
    const MongoClient = mongodb.MongoClient;
    const url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find(userEmail, { projection: { _id: 0,password: 0, status: 0 } }).toArray(function(err, result) {
          if (err) throw err
          let uEmail = (result);
          db.close();
          
          var SuEmail = JSON.stringify(uEmail);
          var SuserEmail = "[" + JSON.stringify(userEmail) + "]";
          
          if ( SuEmail === SuserEmail) {
            res.json(1);
          } else {
            res.json(0);
          };
        });
      });
}

export const registUser = (req, res) => {
  const userData = req.body;
  const MongoClient = mongodb.MongoClient;
  const url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").insertOne(userData, function(err, res) {
      if (err) throw err;
      db.close();
    });
  }); 
  res.send("Done!")
}


export const getUsersFromDB = (req, res) => {
  const MongoClient = mongodb.MongoClient;
  var url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });
  res.send(200)
}


export const deleteUserFromFB = (req, res) => {
  const userEmailToDelete = req.params;
  const MongoClient = mongodb.MongoClient;
  const url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";
  console.log(userEmailToDelete);


  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").deleteOne(userEmailToDelete, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
  res.send(200)
}

export const getStatusByUser = (req, res) => {
  const userEmailToGetStatus = req.params;
  const MongoClient = mongodb.MongoClient;
  var url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";
  console.log(userEmailToGetStatus);

  try {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").find(userEmailToGetStatus, { projection: { _id: 0, email: 0, password: 0 } }).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        res.json(result);
      });
    }); 
  } catch {
    res.send("There is not such an email")
  };
}

export const loginUser = (req, res) => {
    var userData = req.body;
    const MongoClient = mongodb.MongoClient;
    var url = "mongodb+srv://onauser:pass123@cluster0.spzufgp.mongodb.net/?retryWrites=true&w=majority";

    console.log(userData);

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      dbo.collection("customers").find(userData, { projection: { _id: 0, email: 0, password: 0} }).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        
        if (JSON.stringify(result) == '[{"status":0}]'  || JSON.stringify(result) == '[{"status":1}]') {
          res.json(1);
        } else {
          res.json(0);
        }
      });
    }); 
}
