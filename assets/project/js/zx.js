 //----------------注销------------------
 let yhmBtn=document.querySelector('.yhm_btn');
 let yhmName=document.querySelector('.yhm_name')
 $.getJSON('/user/getname',function(data){
     yhmName.innerHTML=`欢迎您:${data}`
 })
 yhmBtn.onclick=function(){
    $.getJSON('/user/deleteName',function(data){
         if(data){
             location.href = '/user/login';
         }
    })
 };