
/**
 * sateAlert msg for emty or not
 */

const setAlert = (msg,type = 'danger') => {

    return ` <p class="alert alert-${type} d-flex justify-content-between">${msg} <button data-bs-dismiss="alert" class="btn-close"></button></p>`
}



/**
 * LocalStorge Data sate 
 */


const createLsData = (key, value) => {

    let data = [];

    if(localStorage.getItem(key)){

        data = JSON.parse(localStorage.getItem(key));

    }

    data.push(value);


    localStorage.setItem(key , JSON.stringify(data));
}




/**
 * Reade Local Storage data 
 */

const redeLsData = (key) => {

    if(localStorage.getItem(key)){

        return JSON.parse(localStorage.getItem(key))

    } else{
        return false 
    }
}



/**
 * ubdate localStorage data 
 */


const ubDateLsData = (key , array) => {

    localStorage.setItem(key , JSON.stringify(array));

}