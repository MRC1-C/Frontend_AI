//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input"),
submit = document.querySelector(".submit"),
handleDelete = document.querySelector(".dt"),
text = document.querySelector(".text");
let file; 
const url = 'http://localhost:5000/predict';
handleDelete.onclick = () => {
  if(file == null) return
  file = null;
  text.innerHTML = "Wecome"
  input.value = null;
  dropArea.classList.remove("active")
  document.getElementById("img").remove()
}
button.onclick = ()=>{
  input.click(); 
}

input.addEventListener("change", function(){
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); 
});


dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

dropArea.addEventListener("drop", (event)=>{
  event.preventDefault();
  file = event.dataTransfer.files[0];
  showFile(); 
});


submit.onclick = async () => {
  if(file == null) return
  text.innerHTML = "Loading ...";
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){
  let data = new FormData();
  data.append("image", file);
  await fetch(url, {
    method: "POST",
    body: data
  })
  .then( response => response.json())
  .then (data => {
    console.log(data)
    text.innerHTML = data.predictions[0].label;
  })
  .catch(err => {
    text.innerHTML = err;
  })}
}

function showFile(){
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; 
      var imgTag = document.createElement("img");
      imgTag.src = fileURL;
      imgTag.id = "img";
      dropArea.appendChild(imgTag);
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
