/**
 * Fetch data from ULR endpoint
 */
export default class Fetcher {
    /**
     * Constructing fetcher with URL endpoint
     * @param url  - relative URL
     * @param baseUrl base URL, optional
     */
    constructor(url, baseUrl = null) {
        if (baseUrl === null) {
            baseUrl = new URL(window.location);
        }
        this.url = new URL(url, baseUrl);
    }

    /**
     * Get request to server to fetch products
     * @param page page to load
     * @param perPage products per page, optional
     * @returns {Promise<any>}
     */
	async getProducts(page, perPage = 4) {
        let params = new URLSearchParams ({
            page: page,
            per_page: perPage
        });


        this.url.search = params;

        try {
            const response = await fetch(this.url);
			const data = await response.json();
            if (response.status === 200) {
                return data;
            } else {
                throw new Error('Some Error');
            };
        } catch(error) {
            console.log("Error in fetch code:", error);
        }
    }
}
