const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const adminSchema = new Schema({
    username: String,
    password: String
});

// pre here is a built in middleware that will run before the 
// function that we past in as first arg
// in this example its the save function
// note: a normal function signature is used here instead of an arrow function
// to allow for the tind binding in the fuction below
adminSchema.pre('save', async function (next) {
    const admin = this;

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8);
    }

    // next here will move in the saving process
    next();
});

// static methods are availble on the Model 
adminSchema.statics.findByCredentials = async (username, password) => {
    // usage of destructuing here
    const admin = await Admin.findOne({ username });

    if (!admin) {
        throw new Error("Unable to find that username");
    };

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        throw new Error("Unable to login");
    };

    return admin;
};

// if we wish to use the this keyword within this function we have to defined it in the 
// normal way finctions are defined and refrain from using an arrow function
adminSchema.methods.toJSON = function () {
    console.log("inside toJSon")
    // user now holds the current user 
    const admin = this;
    const adminObject = admin.toObject();

    // allows us to manupulate the userobject that we want to send back as response
    // so as to ensure that when we login the data returned to the user does t contain confidential info 
    // for example password and access tokens
    delete adminObject.password

    return adminObject;
};

// setting up our model creation and export like this allows
// us to reuse the Admin models for querying the db from wothin this schema creation itself
const Admin = new mongoose.model('admin', adminSchema);

module.exports = Admin;