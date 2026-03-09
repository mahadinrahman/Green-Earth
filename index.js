fetch('https://openapi.programming-hero.com/api/categories').then(res=>res.json()).then(data=>{
    //console.log(data.categories);
    loadCatagories(data.categories);

});

const loadCatagories=(buttons)=>{
    const treeButton=document.getElementById('allTreebtn');
    treeButton.innerHTML="";
    buttons.forEach(button => {
       const div=document.createElement('div');
        div.innerHTML=`
          <button id="cat-btn${button.id}" class="btn  btn-outline  btn-block cat-btn" onClick='otherbtn(${button.id})'>${button.category_name}</button>
                
               
        `;
         treeButton.appendChild(div);
        
    });

}

const treebtn=()=>{fetch('https://openapi.programming-hero.com/api/plants')
.then(res=>res.json())
.then(data=>{
    console.log(data.plants);
    allTrees(data.plants);

})
}
treebtn();

const allTrees=(alls)=>{
    const allcontainer=document.getElementById('all-container');
    allcontainer.innerHTML="";
    alls.forEach(all=>{
        const div=document.createElement('div');
        div.innerHTML=`
             <div class="card bg-base-100 w-50 shadow-sm h-full">
  <figure>
    <img
      src="${all.image}"
      alt="Shoes" class="px-3 pt-3" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-semibold text-xl text-green-500">${all.name}</h2>
    <p class="font-medium   mb-3 text-gray-500">${all.description}</p>
    <div class="flex justify-between ">
        <p class="font-semibold text-lg bg-green-200 rounded-xl text-center text-green-700 pl-3">${all.category}</p>
        <p class="pl-2 font-semibold text-lg "><i class="fa-solid fa-bangladeshi-taka-sign"></i>${all.price}</p>
    </div>
    <div class="card-actions justify-end">
      <button onClick="addToCart(${all.id},'${all.name}',${all.price})" class="btn btn-success btn-block rounded-full bg-green-600">Buy Now</button>
    </div>
  </div>
        </div>
        `;
        allcontainer.appendChild(div);
    })
    managespinning(false);
}

const otherbtn=(id)=>{
    managespinning(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`).then(res=>res.json())
    .then(data=>{
        console.log(data.plants);
        loadOtherCategories(data.plants);

        removeActive();
        const clickbtn=document.getElementById(`cat-btn${id}`);
        clickbtn.classList.add('active');
        
    })
}

const removeActive=()=>{
    const allbtn=document.querySelectorAll('.cat-btn');
    allbtn.forEach(btn=>{
     btn.classList.remove('active') ; 

     
    });
}

const loadOtherCategories=(cards)=>{
    const othersContainer=document.getElementById('all-container');
    othersContainer.innerHTML="";
    cards.forEach(card=>{
        const div=document.createElement('div');
        div.innerHTML=`
             <div class="card bg-base-100 w-50 shadow-sm h-full">
  <figure>
    <img
      src="${card.image}"
      alt="Shoes" class="px-3 pt-3" />
  </figure>
  <div class="card-body">
    <h2 class="card-title font-semibold text-xl text-green-500">${card.name}</h2>
    <p class="font-medium   mb-3 text-gray-500">${card.description}</p>
    <div class="flex justify-between ">
        <p class="font-semibold text-lg bg-green-200 rounded-xl text-center text-green-700 pl-3">${card.category}</p>
        <p class="pl-2 font-semibold text-lg "><i class="fa-solid fa-bangladeshi-taka-sign"></i>${card.price}</p>
    </div>
    <div onClick="addToCart(${card.id},'${card.name}',${card.price})" class="card-actions justify-end">
      <button class="btn btn-success btn-block rounded-full bg-green-600">Buy Now</button>
    </div>
  </div>
        </div>
        `;
        othersContainer.appendChild(div);
    })
    managespinning(false);
}

const managespinning=(isLoading)=>{
    if(isLoading==true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('all-container').classList.add('hidden');

    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('all-container').classList.remove('hidden');

    }
}

const alltreebtn= document.getElementById('all-tree-btn');
 alltreebtn.addEventListener('click',function(){
    
       alltreebtn.style.backgroundColor="mediumseagreen";
       alltreebtn.style.color="white";
       
     
});


let cart=[];
function addToCart(id,name,price){
    console.log(id,name,price,"add to cart");

    const existingItem=cart.find(item=>item.id===id);
    if(existingItem){
        existingItem.quantity+=1;
    }
    else{
    cart.push({
        id,
        name,
        price,
        quantity:1,
    });
    
}
    updateCart();
}

const totalPrice=document.getElementById('totalPrice')
function updateCart(){
    const cartContainer=document.getElementById('cartContainer');
    cartContainer.innerHTML="";

    let total=0;

    cart.forEach(item=>{
        total+=item.price * item.quantity;
        const div=document.createElement('div');
        div.innerHTML=`
           <div class="card card-body shadow-xl">
                    <div class="flex justify-between items-center">
                <div>
                  <p>${item.name}</p>
                  <p>$${item.price} x ${item.quantity}</p>
                  </div>
                  <button onClick="removeFromCart(${item.id})" class="btn btn-ghost">X</button>
                  </div>
                  <p class="text-end">${item.price * item.quantity}</p>


            </div>
        `;
        cartContainer.appendChild(div);
    })
    totalPrice.innerText=total;
}

function removeFromCart(treeId){
    const updatedCart=cart.filter(item=>item.id!=treeId);
    cart=updatedCart;
    updateCart();

}


