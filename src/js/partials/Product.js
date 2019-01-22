// Product entity model
export default class Product {
    /**
     * Construct product object from server response
     * @param obj JSON object from server
     */
    constructor(obj) {
        this.title = obj.title;
        this.description = obj.description;
        this.cost = obj.cost;
        this.discountCost = obj.discountCost;
        this.new = obj.new;
        this.img = obj.img;
    }

    /**
     * Render product entity to Document fragment suitable for
     * document.append functions
     * @returns {DocumentFragment}
     */
    render() {
        const template = `<li class="product col-auto row">
                <div class="product-info col-12">
                <a href="/" class="product-img row align-items-center">
                <img class="col-auto" src="${this.img}" alt="${this.title}">
                <span class="label-sale">Sale</span>
                <span class="label-new">New</span>
                </a>
                <h4>${this.title}</h4>
                <p>${this.description}</p>
                <span class="price-new">$ </span>
                <span class="price-old">$ </span>
                </div>
                <div class="btn-area row justify-content-between align-self-end col-12">
                	<a class="btn btn-premium " href="/">Add to cart</a>
                	<a class="btn btn-secondary col-6" href="/">View</a>
                </div>
                </li>`;


        const fragm = document.createRange().createContextualFragment(template);

        let discount = this.discountCost !== null,
			price = this.discountCost ? this.discountCost : this.cost;

        fragm.querySelector('.price-new').innerText = price;

        if (discount) {
            fragm.querySelector('.price-old').innerText = this.cost;
        } else {
            Product.remove(fragm.querySelector('.label-sale'));
            Product.remove(fragm.querySelector('.price-old'))
        }

        if (!this.new) {
            Product.remove(fragm.querySelector('.label-new'));
        }

        return fragm;
	};

    //* magic removing method for IE11
	static remove(node) {
		let parent = node.parentNode;
		parent.removeChild(node);
	}
}
