var firebaseConfig = {
    apiKey: "AIzaSyAB9N-LB8tHB070Av61F2TmWtozu2vXjnM",
    authDomain: "faq-of-school-osfd.firebaseapp.com",
    databaseURL: "https://faq-of-school-osfd-default-rtdb.firebaseio.com",
    projectId: "faq-of-school-osfd",
    storageBucket: "faq-of-school-osfd.appspot.com",
    messagingSenderId: "105039666214",
    appId: "1:105039666214:web:c0b9567d1332dbe6291ae7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

username=localStorage.getItem("username");

$(window).on('load',function(){
    username=localStorage.getItem("username");
    document.getElementById("welcome").innerHTML='Hello "'+username+'" !!! Welcome to Kwitter!!!';
    firebase.database().ref("/").on('value',function(snapshot){
       document.getElementById("output").innerHTML = ""; 
       snapshot.forEach(function(childSnapshot){
           childKey=childSnapshot.key;
           room=childKey;
           document.getElementById("output").innerHTML=document.getElementById("output").innerHTML+'<h1 id="'+room+'" onclick="go(this.id)">'+room+'</h1><hr>'
       });
    });
});

function logout() {
    localStorage.removeItem("username");
    window.location="index.html";
  }

i=0;
var array=[];

function addRoom() {
    roomname=document.getElementById("roomname").value;
    console.log(roomname);
    firebase.database().ref("/").child(roomname).update({
       purpose:"add room name"
    });
    firebase.database().ref("/").on('value',function(snapshot){
        document.getElementById("output").innerHTML = ""; 
       snapshot.forEach(function(childSnapshot){
           childKey=childSnapshot.key;
           room=childKey;
           array.push(room);
           i=i+1;
           document.getElementById("output").innerHTML=document.getElementById("output").innerHTML+'<h1 id="'+room+'" onclick="go(this.id)">'+room+'</h1><hr>'
       });
    });
}

function go(name) {
   enter=name;
   localStorage.setItem("enter",enter);
   window.location="index(3).html";
}

//firebase.database().ref("/").on('value', function(snapshot) { 
//    document.getElementById("output").innerHTML = ""; 
//    snapshot.forEach(function(childSnapshot) { 
//    childKey  = childSnapshot.key;
//    Room_names = childKey;
//    console.log("Room Name - " + Room_names);
//   row = "<div class='room_name' style='font-size:50;' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
//   document.getElementById("output").innerHTML += row;
// });
//});