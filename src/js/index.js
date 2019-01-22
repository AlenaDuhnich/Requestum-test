import 'es6-promise';
import 'isomorphic-fetch';
import '@babel/polyfill';
import 'url-polyfill';
import ProductPrefetch from "./partials/ProductPrefetch";

let prFetch = new ProductPrefetch(2);

let container = document.querySelector("ul.product-list");
let loader = document.querySelector(".preloader");

/* Set events */
document.querySelector('.btn-load').addEventListener('click', e => {
    // * request data from buffer
    loader.classList.remove('d-none');
    (e.target).classList.add('d-none');
	prFetch.getBufferResults().then(data => {
        data.arrProd.forEach(product => {
			container.appendChild(product.render());
        });
        if (!data.status) {
            (e.target).parentNode.removeChild(e.target);
        }
	}).catch((err) => {
		console.log("Catch from promise", err);
	}).finally(() => {
        // * Request finished - no matter which result (sucess or error)
        (e.target).classList.remove('d-none');
        loader.classList.add('d-none');
    });
});
