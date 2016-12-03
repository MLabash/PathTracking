// use forEach to solve problem.
function bug1() {
  const people = [{
  name: 'Alice',
    age: 25
   }, {
    name: 'Bob',
    age: 27
   }, {
    name: 'Charlie',
    age: 40
   }];
 people.forEach(function(person){
    console.log(`${person.name} is ${person.age}`);
});
}

bug1();    
/***************/
//the for loop was executed and i becomes 4 before the call back function exuted.
function bug8proxy(i){
    setTimeout(function () {console.log(i + 1);}, 100*i);
}
function bug8() {
      for (var i = 0; i < 5; i++) {
        bug8proxy(i)
      }
}
bug8();
