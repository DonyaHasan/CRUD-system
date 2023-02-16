var inputName= document.getElementById("name");
var price= document.getElementById("price");
var qty= document.getElementById("qty");
var desc= document.getElementById("desc");
var cat= document.getElementById("cat");
var addBtn = document.getElementById("add-btn");
var table= document.getElementById("table");
var clearBtn= document.getElementById("clear-btn");
var deleteAll= document.getElementById("deleteAll");
var btns=document.getElementById("btns");
var keyword=document.getElementById("keyword");
var updateBTn=document.getElementById('update-btn');

var courses;
if(localStorage.getItem('courses')){
  courses= JSON.parse(localStorage.getItem('courses')); //return string so, we convert to array using JSON.parse()
} else{
  courses=[];
}
console.log(courses);
displayData();
updateBTn.style.display='none';

addBtn.onclick=function(e){
    e.preventDefault();
    var course={
        inputName:inputName.value,
        price:price.value,
        qty:qty.value,
        desc:desc.value,
        cat:cat.value

    }
    var errors=0;
    if(course.inputName.length<5){
      errors++;
      inputName.classList.add('is-invalid');
    }else{
      errors=0;
      inputName.classList.remove('is-invalid');
      inputName.classList.add('is-valid');
    }

    if(isNaN(course.price) || !course.price){
      errors++;
      price.classList.add('is-invalid');
    }else{
      errors=0;
      price.classList.remove('is-invalid');
      price.classList.add('is-valid');
    }


    if(isNaN(course.qty) || !course.qty){
      errors++;
      qty.classList.add('is-invalid');
    }else{
      errors=0;
      qty.classList.remove('is-invalid');
      qty.classList.add('is-valid');
    }

    if( !course.desc){
      errors++;
      desc.classList.add('is-invalid');
    }else{
      errors=0;
      desc.classList.remove('is-invalid');
      desc.classList.add('is-valid');
    }

    if( !course.cat){
      errors++;
      cat.classList.add('is-invalid');
    }else{
      errors=0;
      cat.classList.remove('is-invalid');
      cat.classList.add('is-valid');
    }
    if(!errors){
      inputName.classList.remove('is-valid');
      price.classList.remove('is-valid');
      qty.classList.remove('is-valid');
      desc.classList.remove('is-valid');
      cat.classList.remove('is-valid');
    courses.push(course);
    coursess=localStorage.setItem('courses',JSON.stringify(courses));
    console.log(courses);
    displayData();
    clear();

    
    Swal.fire(
    'Good job!',
    'You added course success',
    'success'
     )
    }
}

//display data
function displayData(){
    
    var data=``;
    for(var i=0; i< courses.length ;i++){
        data+=`
        <tr> 
        <td>${i+1}</td>
        <td> ${courses[i].inputName}</td>
        <td> ${courses[i].cat}</td>
        <td> ${courses[i].desc}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].qty}</td>
        <td>
            <a href="#" id="edit" onclick="updateCourse(${i})" class="btn btn-primary" > <i class="fa-solid fa-pen" ></i></a>
            <a href="#" id="delete" onclick="deleteCourse(${i})" class="btn btn-danger" > <i class="fa-solid fa-trash" ></i></a>
         </td>
        
    </tr>`;
    
    }  
    table.innerHTML=data;  
}

clearBtn.onclick=function(){
    inputName.value="";
    price.value="";
    qty.value="";
    desc.value="";
    cat.value="";

}
function clear(){
    inputName.value="";
    price.value="";
    qty.value="";
    desc.value="";
    cat.value="";
}

//delete one course
function deleteCourse(i){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(i,1);
          displayData();
          localStorage.setItem('courses',JSON.stringify(courses));
          Swal.fire(
            'Deleted!',
            'Your course has been deleted.',
            'success'
          )
          
        }
      })
     
}
//delete all courses
deleteAll.onclick = function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses',JSON.stringify(courses));
          displayData();
          Swal.fire(
            'Deleted!',
            'Your courses has been deleted.',
            'success'
          )
          
        }
      })
   
}
//update icon
function updateCourse(i){
     console.log(i);
     inputName.value=courses[i].inputName;
     qty.value=courses[i].qty;
     desc.value=courses[i].desc;
     cat.value=courses[i].cat;
     price.value=courses[i].price;
     updateBTn.onclick=function(){
         updateBtn(i);
     }
     
     addBtn.style.display='none';
     updateBTn.style.display='inline-block';

}


function updateBtn(i){
    // courses[i].inputName=inputName.value;
    // courses[i].price=price.value;
    // courses[i].qty=qty.value;
    // courses[i].desc=desc.value;
    // courses[i].cat=cat.value;
    //OR
    
   Swal.fire({
    title: 'Are you sure?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, edit it!'
  }).then((result) => {
    //start update function
    if (result.isConfirmed) {
        var course={
            inputName:inputName.value,
            price:price.value,
            qty:qty.value,
            desc:desc.value,
            cat:cat.value
        }
        courses[i]=course;
        // ما الها داعي
      //   btns.innerHTML=`
      //   <button type="submit" id="add-btn"  class="btn btn-primary">add</button> 
      //  <button type="button" id="clear-btn" class="btn btn-dark">clear</button> `;
       displayData();
       
       localStorage.setItem('courses', JSON.stringify(courses));
       Swal.fire(
        'Updated',
        'Your course has been Updated.',
        'success'
      )
      
    }else{ //if we click cancell then clear the data
        clear();
    }
  }
  )
  updateBTn.style.display='none';
  addBtn.style.display='inline-block';

}
keyword.onkeyup=function(){
    var data=``;
    var key=keyword.value;
    for(var i=0;i<courses.length;i++){
        key= key.toLowerCase();
        if(courses[i].inputName.toLowerCase().includes(key) || courses[i].desc.toLowerCase().includes(key)){
        data+=`
        <tr> 
        <td>${i+1}</td>
        <td> ${courses[i].inputName}</td>
        <td> ${courses[i].cat}</td>
        <td> ${courses[i].desc}</td>
        <td>${courses[i].price}</td>
        <td>${courses[i].qty}</td>
        <td>
            <a href="#" id="edit" onclick="updateCourse(${i})" class="btn btn-primary" > <i class="fa-solid fa-pen" ></i></a>
            <a href="#" id="delete" onclick="deleteCourse(${i})" class="btn btn-danger" > <i class="fa-solid fa-trash" ></i></a>
         </td>
        
    </tr>`;
        }
    }  
    table.innerHTML=data;
}