


//const {setting}=require('../../BookLand_Microservice/bookLand_microservice/settings.py')

const client={
           
                     // 'ENGINE': 'django.db.backends.postgresql',
                     db:{
                      user: 'admin',
                      host: 'postgres-db',
                      database: 'BookLandDB',
                      password: 'password',
                      port: '5432',
                     }

           }

// client.connect(function(err) {
//            if (err) throw err;
//            console.log("Connected!");
//          });

module.exports=client