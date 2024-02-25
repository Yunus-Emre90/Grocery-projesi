// Gerekli HTML Elementlerini seç
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");

// Düzenleme Seçenekleri
let editElement;
let editFlag = false; // düzenleme modunda olup olmadığını belirtir.
let editId = ""; // Düzenleme yapılan öğenin benzersiz kimliği (ID)

// Olay İzleyici
form.addEventListener("submit", addItem);

// Fonksiyonlar

function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(()=>{
        alert.textContent = "";
        alert.classList.remov(`alert-${action}`);
    },2000);

}


function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

function addItem(e) {
    e.preventDefault(); // Formun otomatik olarak gönderilmesini engelle
    const value = grocery.value.trim(); // Formdaki girilen input değerini al
    const id = new Date().getTime().toString(); // Benzersiz ID oluşturduk

    if (value !== "" && !editFlag) {
        const element = document.createElement("article"); // Yeni bir article öğesi oluştur
        let attr = document.createAttribute("data-id"); // Yeni bir veri kimliği oluştur!
        attr.value = id;
        element.setAttributeNode(attr); // olusturdugumuz id'yi elemnte ekledik
        element.classList.add("grocery-item"); // Olusturdugumuz elente class ekledik !
        element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
                <button type="button" class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        
        
        
        
        `;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);
        


        // kapsayaciya ekleme yapma
        list.appendChild(element);
        displayAlert("Basariyla Eklendi", "Succsess");
        container.classList.add("show-container");
        // icerik kizmina yazi yazdiktan sonra sifirlar
        grocery.value = "";
    }else if(value !== "" && editFlag){
        editElement.innerHTML = value;
        displayAlert("Deger Degistirildi", "success");
    }else{

    }

}

// Silme (Delete) Foksiyonu
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    console.log(element);
    const id = element.dataset.id;
    list.removeChild(element);
  
    displayAlert("Öge Kaldirildi", "danger");
  }
// duzenleme (Edit) Foksiyonu
function editItem(e) {
    console.log(e);
    const element = e.currentTarget.parentElement.parentElement;
    // düzenleme yapilan ögeyi sec!
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log(editElement);
    // form icerisinde bulunan inputun degerini duzenlenen ögrenin metniyle doldur.
    grocery.value = editElement.innerHTML;
  
    editFlag = true;
    console.log(element.dataset);
    editId = element.dataset.id; // düzenlen ögenin kimligi
    submitBtn.textContent = "Düzenle";
  }
  const clearBtn = document.querySelector('.clear-btn');

  clearBtn.addEventListener('click', clearList);
  
  function clearList() {
      list.innerHTML = '';
      
  }
    