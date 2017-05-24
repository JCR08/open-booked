var Rebase = require('re-base');
var config = {
  apiKey: "AIzaSyDbGoeKlskmWznnY2p2R5kd7jEGZDXjRCI",
  authDomain: "open-booked.firebaseapp.com",
  databaseURL: "https://open-booked.firebaseio.com",
  projectId: "open-booked",
  storageBucket: "open-booked.appspot.com",
  messagingSenderId: "733456675765"
};
var base = Rebase.createClass(config);
export default base;
