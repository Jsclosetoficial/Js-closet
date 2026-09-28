// =============================
// CONFIGURAÇÃO DA JS CLOSET
// =============================
// Coloque aqui o número do WhatsApp da loja, somente números,
// incluindo 55 + DDD. Exemplo: 5592999999999
const WHATSAPP_NUMBER = "5595991779958";

const products = [
  {id:1,name:"Vestido Essência",category:"Vestidos",price:159.90,emoji:"👗",tag:"Novidade"},
  {id:2,name:"Conjunto Elegance",category:"Conjuntos",price:189.90,emoji:"🎀",tag:"Destaque"},
  {id:3,name:"Blusa Delicada",category:"Blusas",price:89.90,emoji:"👚",tag:"Novo"},
  {id:4,name:"Saia Lumière",category:"Looks",price:119.90,emoji:"🌸",tag:"Novo"},
  {id:5,name:"Vestido Rosé",category:"Vestidos",price:169.90,emoji:"🌷",tag:"Novidade"},
  {id:6,name:"Conjunto Charm",category:"Conjuntos",price:199.90,emoji:"✨",tag:"Destaque"},
  {id:7,name:"Vestido Bella",category:"Vestidos",price:179.90,emoji:"💗",tag:"Novo"},
  {id:8,name:"Conjunto Soft",category:"Conjuntos",price:179.90,emoji:"🎀",tag:"Novo"}
];

let cart = JSON.parse(localStorage.getItem("jscloset-cart") || "[]");

const money = v => v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

function renderProducts(list, targetId){
  const target=document.getElementById(targetId);
  target.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-img"><span class="tag">${p.tag}</span><span>${p.emoji}</span></div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.category} • Consulte tamanhos e cores pelo WhatsApp</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add" onclick="addToCart(${p.id})">Adicionar</button>
        </div>
      </div>
    </article>`).join("");
}

function render(){
  renderProducts(products.slice(0,4),"products");
  renderProducts(products.filter(p=>p.category==="Vestidos"),"vestidosGrid");
  renderProducts(products.filter(p=>p.category==="Conjuntos"),"conjuntosGrid");
  renderCart();
  document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
}

function addToCart(id){
  const p=products.find(x=>x.id===id);
  const found=cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({id:p.id,qty:1});
  save(); openCart();
}

function changeQty(id,delta){
  const item=cart.find(x=>x.id===id);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(x=>x.id!==id);
  save();
}

function save(){localStorage.setItem("jscloset-cart",JSON.stringify(cart));render();}

function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length){
    box.innerHTML='<div style="padding:50px 10px;text-align:center;color:#806a6f">Seu carrinho está vazio. 💗<br><br>Escolha seus looks favoritos!</div>';
  }else{
    box.innerHTML=cart.map(item=>{
      const p=products.find(x=>x.id===item.id);
      return `<div class="cart-item">
        <div class="mini-img">${p.emoji}</div>
        <div><h4>${p.name}</h4><p>${money(p.price)} cada</p>
          <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div>
        </div>
        <strong>${money(p.price*item.qty)}</strong>
      </div>`;
    }).join("");
  }
  const total=cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+p.price*i.qty},0);
  document.getElementById("cartTotal").textContent=money(total);
}

function openCart(){document.getElementById("overlay").classList.add("open")}
function closeCart(e){if(!e||e.target===document.getElementById("overlay"))document.getElementById("overlay").classList.remove("open")}
function openCheckout(){
  if(!cart.length){alert("Adicione pelo menos uma peça ao carrinho.");return;}
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("checkoutOverlay").classList.add("open");
}
function closeCheckout(e){if(!e||e.target===document.getElementById("checkoutOverlay"))document.getElementById("checkoutOverlay").classList.remove("open")}

function buildOrderMessage(data){
  const lines=cart.map(i=>{
    const p=products.find(x=>x.id===i.id);
    return `• ${i.qty}x ${p.name} — ${money(p.price*i.qty)}`;
  });
  const total=cart.reduce((s,i)=>{const p=products.find(x=>x.id===i.id);return s+p.price*i.qty},0);
  return `Olá, JS Closet! 💗\n\nGostaria de fazer este pedido:\n${lines.join("\n")}\n\n*Subtotal:* ${money(total)}\n*Entrega:* consultar taxa\n*Pagamento:* ${data.payment}\n\n*Cliente:* ${data.name}\n*WhatsApp:* ${data.phone}\n*Endereço/bairro:* ${data.address}\n*Observação:* ${data.note || "—"}\n\nAguardo a confirmação de disponibilidade, taxa de entrega e valor final. 🛍️`;
}

document.getElementById("checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(WHATSAPP_NUMBER.includes("SEUNUMERO")){
    alert("Antes de publicar, configure o número do WhatsApp no arquivo script.js.");
    return;
  }
  const data=Object.fromEntries(new FormData(e.target).entries());
  const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(data))}`;
  window.open(url,"_blank");
});

function setupWhatsApp(){
  const href=WHATSAPP_NUMBER.includes("SEUNUMERO")?"#":`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá, JS Closet! 💗 Gostaria de saber mais sobre as peças.")}`;
  document.getElementById("aboutWhatsapp").href=href;
}
document.getElementById("year").textContent=new Date().getFullYear();
setupWhatsApp();
render();
