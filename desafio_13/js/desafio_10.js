const array_comidas=[];
const carrito=[];
const nombre=$('#nombre');
const precio=document.getElementById('precio');
const menu=document.getElementById('menu');
const items=document.getElementById('items');
const footer=document.getElementById('footer');
const templeate_carrito=document.getElementById('template-carrito');
const templeate_footer=document.getElementById('template-footer');
const nuevo=$('#menu');

class Comida{
    constructor(id,nombre,precio,stock,cantidad){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.stock=stock;
        this.cantidad=cantidad||0;
    } 
    aumentarCantidad(){
        this.cantidad++
    }
}


const URLJSON = "catalogo.json";
$.getJSON(URLJSON, function (respuesta, estado){
    if(estado === "success"){
        let misDatos = respuesta;
        const clase= $('#menu');
for(const comida of misDatos ){
    const contenedor = document.createElement('div')
    contenedor.className='card'
    contenedor.innerHTML=`
                        <img src="img/img_${comida.id}.jpg" class="card-img-top" alt=${comida.nombre}>
                        <div class="card-body">
                            <h5 class="card-title">${comida.nombre}</h5>
                            <p class="card-text">precio: ${comida.precio}</p>
                            <button id=${comida.id} class="btn btn-primary comprar btnMostrar">Comprar</button>
                        </div>`
    clase.append(contenedor)
    
    $(`#${comida.id}`).click(() => comprar(comida))
    $(`#${comida.id}`).click(() => {
        $(`#${comida.id}`).addClass("animate__animated animate__fadeInLeft")
        setTimeout(()=>{$(`#${comida.id}`).removeClass("animate__animated animate__fadeInLeft")},1000)
        })

}
    }
  
})




function comprar(producto){
    console.log(producto)
    let compra = carrito.find(el=> el.nombre=== producto.nombre)
    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
            console.log("se aumento la cantidad")
        }else{
            alert('no hay mas stock')
        }
    }else{
        carrito.push(producto);
        producto.aumentarCantidad();
    }
    let total = 0;
    for(let i=0; i<carrito.length;i++){
        total += carrito[i].cantidad;
    }
    const contador = document.getElementById('contador');
    contador.innerHTML = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    pintar_carrito(carrito);
}

function cargarLocalStorage(){
    let carro = JSON.parse(localStorage.getItem('carrito'))
    if(carro){
        for(let i = 0; i < carro.length; i++){
            carrito.push(new Comida(carro[i].id, carro[i].nombre, carro[i].precio, carro[i].stock, carro[i].cantidad))
        }
    }
    console.log(carrito)
    pintar_carrito(carrito);
   
}



function pintar_carrito(carrito){
    $("#items").empty();
    for(let i=0; i<carrito.length;i++){
        $("#items").append(`<div id="template-carrito" class="carro">
            <tr>
            <th scope="col"></th>
            <td>${carrito[i].nombre}</td>
            <td>${carrito[i].cantidad}</td>
            <td>
                <button id="${carrito[i].id}" class="btn btn-info btn-sm">
                    +
                </button>
                <button id="${carrito[i].id}" class="btn btn-danger btn-sm">
                    -
                </button>
            </td>
            <td>$ <span>${carrito[i].precio}</span></td>
            </tr>
            </div>`
        );
      
        $(`#template-carrito`).append(() => {
            $(`#template-carrito`).addClass("animate__animated animate__slideInDown")
          
            })
        
    }
}


/*
const add_carrito=e=>{
    console.log(e.target);
    if(e.target.classList.contains('btn-primary')){}
}
menu.addEventListener('click',e =>{
    add_carrito(e);
})
*/
