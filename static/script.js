const form=document.getElementById("chatForm");
const input=document.getElementById("messageInput");
const box=document.getElementById("chatBox");

function addMessage(text,sender){
 const m=document.createElement("div");
 m.className="message "+sender;
 if(sender==="bot") m.innerHTML='<div class="avatar">🏠</div><div class="bubble"></div>';
 else m.innerHTML='<div class="bubble"></div>';
 m.querySelector(".bubble").textContent=text;
 box.appendChild(m);
 box.scrollTop=box.scrollHeight;
}

async function sendMessage(text){
 text=text.trim(); if(!text)return;
 addMessage(text,"user"); input.value="";
 try{
  const r=await fetch("/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text})});
  const d=await r.json(); addMessage(d.response,"bot");
 }catch(e){addMessage("Sorry, something went wrong. Please try again.","bot");}
}
form.addEventListener("submit",e=>{e.preventDefault();sendMessage(input.value)});
function sendQuick(text){sendMessage(text)}
