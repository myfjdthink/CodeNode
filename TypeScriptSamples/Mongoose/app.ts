/**
 * Created by nick on 16/5/14.
 */

/// <reference path="./typings/mongoose/mongoose.d.ts" />
import mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:57017/user_koala');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("we're connected!");
});


interface IKitten extends mongoose.Document {
  name: string;
  speak : any;
}

var kittySchema:mongoose.Schema = new mongoose.Schema({
  name: String,


});

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model < IKitten >('Kitten', kittySchema);


async function main() {
  var silence = new Kitten({name: 'Silence'});
  console.log(silence.name); // 'Silence'


  var fluffy = new Kitten({name: 'fluffy'});
  fluffy.speak(); // "Meow name is fluffy"


  //fluffy.save(function (err, fluffy) {
  //    if (err) return console.error(err);
  //    console.log('save ok');
  //    fluffy.speak();
  //});

  //Kitten.find({name: /^fluff/}, function (err, kittens) {
  //  if (err) return console.error(err);
  //  console.log(kittens);
  //})

  let kittens = await Kitten.find({name: /^fluff/}).exec()
  console.log(kittens);
}

main()
