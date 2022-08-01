const product_form = document.getElementById('product_form');
const msg = document.querySelector('.msg');
const product_list = document.getElementById('product_list');
const single_modal = document.querySelector('.single_modal');
const product_edit_form = document.getElementById('product_edit_form');



const gateAllProduct = () => {

    let data = redeLsData('product');


    // chek localStorage valur emty or not

    if (!data) {

        product_list.innerHTML = `
        <tr>
        <td colspan = "7" class = "text-center">Fins Not Product !</td>
        </tr>
        `;

    }

    


    if (data) {

        let fainal_amount = 0 ;
        let list = '';

        data.map((item, index) => {
            fainal_amount += ( item.price * item.quantity );

            list += `
                                <tr>
                                    <td>${index +1}</td>
                                    <td><img style="width:70px ; height:70px ; object-fit: cover; border-radius: 4px;" src="${item.photo}" alt=""></td>
                                    <td>${item.name}</td>
                                    <td>${item.price}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.price * item.quantity}</td>
                                    <td>
                                    <a class="btn btn-info edit_product" data-bs-toggle="modal" product_index ="${index}" href="#shop_single_modal"><i class="fas fa-eye"></i></a>
                                    <a class="btn btn-warning edit_product" data-bs-toggle ="modal"  product_index ="${index}" href="#shop_edit_modal"><i class="fas fa-edit"></i></a>
                                    <a class="btn btn-danger delete_product product_index ="${index}" " href=""><i class="fas fa-trash"></i></a>
                                    </td>
                                </tr>

            `
        });

        list += `<tr>
        <td class = "text-end" colspan = "6">Fainal Amount = ${fainal_amount} BDT</td>
        <td></td>
        </tr>`

        product_list.innerHTML = list;


    }

}
gateAllProduct();



product_form.onsubmit = (e) => {
    e.preventDefault();

    let form_data = new FormData(e.target);
    let {
        name,
        price,
        quantity,
        photo
    } = Object.fromEntries(form_data.entries());
    let data = Object.fromEntries(form_data.entries());

    if (!name || !price || !quantity || !photo) {

        msg.innerHTML = setAlert('All filds arer riqurd !')

    } else {

        createLsData('product', data);

        msg.innerHTML = setAlert('Data Stable', 'success');

        e.target.reset();
        gateAllProduct();

    }

}



product_list.onclick = (e) => {

    e.preventDefault();

    if (e.target.classList.contains('edit_product')) {

        let index = e.target.getAttribute('product_index');

        let data = redeLsData('product');

        const {
            name,
            price,
            photo
        } = data[index];

        single_modal.innerHTML = `
       
       <img class="shadow" src="${photo}" alt="">
         <h4>Name : ${name}</h4>
         <p>Price : ${price}</p>

       `


    }



    if (e.target.classList.contains('edit_product')) {

        let index = e.target.getAttribute('product_index');

        let data = redeLsData('product');

        const {
            name,
            price,
            quantity,
            photo
        } = data[index];


        product_edit_form.innerHTML = `
        
                <div class="my-3">
                <label for="">Name</label>
                <input name="name" class="form-control" value = "${name}" type="text">
            </div>
            <div class="my-3">
                <label for="">Price</label>
                <input name="price" value = "${price}" class="form-control" type="text">
            </div>
            <div class="my-3">
                <label for="">Quantity</label>
                <input name="quantity" value = "${quantity}" class="form-control" type="text">
            </div>
            
            <div class="my-3">
             <img class="w-100" src="${photo}" alt="">
             </div>
             <div class="my-3">
             <label for=""></label>
             <input name="index" class="form-control" value = "${index}" type="hidden">
          </div>
            
            <div class="my-3">
                <label for="">Photo</label>
                <input name="photo" value = "${photo}" class="form-control" type="text">
            </div>
            <div class="my-3">
                
                <input class="btn btn-primary w-100" value="Ubdate Now"  type="submit">
            </div>
                `

    }



    // delete product for shop aappp

   if(e.target.classList.contains('delete_product')){

    let conf = confirm('are you sure ?');

    if(conf){
        let index = e.target.getAttribute('product_index');

    let data = redeLsData('product');


    data.splice(index , 1);

    ubDateLsData('product' , data);

    gateAllProduct()
    }

   }





}





product_edit_form.onsubmit = (e) => {

    e.preventDefault();

    let form_data = new FormData(e.target);
    let {name, price, quantity, photo, index}  = Object.fromEntries(form_data.entries());


    let all_data = redeLsData('product');


    all_data[index] = {

        name,
        price,
        quantity, 
        photo
    }

    ubDateLsData('product', all_data);

    gateAllProduct()
    
    
}
