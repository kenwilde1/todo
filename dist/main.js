(()=>{"use strict";let t=[{title:"Food",todoList:[["breakfast","go get breakfast","16/11/2020",1]]}],o=t[0];const s=()=>o,e=s(),d=(t,o,s,d)=>(e.todoList.push([t,o,s,d]),{title:t,description:o,dueDate:s,priority:d});let i=s();(o=>{let s=[o];t.push({title:o,todoList:s})})("default"),console.log(i);const l=d("gym","go to the gym","16/11/2020",1);var a;d("asdasd","Asdasdasdthe gym","16/11/2020",1),console.log(i.todoList),console.log(i.todoList.indexOf(l)),a=i.todoList.indexOf(l),e.todoList.splice(a,1),console.log(i.todoList)})();