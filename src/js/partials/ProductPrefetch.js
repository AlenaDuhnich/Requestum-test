import Fetcher from "./Fetcher";
import Product from "./Product";

export default class ProductPrefetch {
    /**
     * Prepare buffered product prefetching starting from page nextPage.
     * Issuing initial prefetch.
     * @param nextPage
     */
    constructor(nextPage) {
        this._fetcher = new Fetcher('/list.php');
        this.nextPage = nextPage;
        this._buffer = [];
        this.activeQuery = null;
        this.fetchNext();
        this.items_total = -1; // used to make decision that total isn't available yet
        this.items_fetched = 4; //initial per_page number
    }

    /**
     * Fill buffer with server data
     * @returns {Promise<void>}
     */
    async fetchNext() {
        this.activeQuery = this._fetcher.getProducts(this.nextPage); // data for the next page from buffer point of view
                                                                    // save promise to activeQuery class field to inform other class parts that query is in action
        let data = await this.activeQuery; // waiting for query to finish

        data.entities.forEach((pr) => {
            this._buffer.push(new Product(pr)); // creating products and store them into the buffer
        });
        this.nextPage += 1; // increment page pointer for buffer
        this.items_total = data.total; // set total
        this.items_fetched += data.entities.length; // increment already fetched items counter (ex. 4 + 4)
		this.activeQuery = null; // query finished now
    }

    /**
     * get data from buffer or from server (if buffer is empty)
     * returns status when end of products list reached
     * @returns {Promise<{arrProd: Array, status: boolean}>}
     */
    async getBufferResults() {
        let ret = [];
        let status = true;

        if (this._buffer.length > 0) {
            //* Return data from buffer
            ret = this._buffer.splice(0, 4); // cut from buffer
        } else {
            //* Buffered data isn't available, starting sync product fetch
            if (this.activeQuery === null) {
                await this._fetcher.getProducts(this.nextPage); // wait until fetch operation is finished
            } else {
                await this.activeQuery; // wait for previously started fetch
            }
            ret = this._buffer.splice(0,4);
        }

        // Shedule next buffer filling
        if((this.items_fetched < this.items_total || this.items_total < 0) && this.activeQuery === null) {
            this.fetchNext();
        }
        if (this.items_fetched >= this.items_total) { //reached product list end
            status = false;
        }

        let bufferRes = {
            arrProd: ret,
            status: status
        };

        return bufferRes;
    }

}
