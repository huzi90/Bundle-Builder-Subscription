class BundleBuilder extends HTMLElement {
    constructor() {
        super();
        this.handlePlus = this.plusQuantity.bind(this);
        this.handleMinus = this.minusQuantity.bind(this);
        this.handleAddToBundle = this.handleAddToBundle.bind(this);
    }

    connectedCallback() {
        this.plusBtn = this.querySelectorAll(".bundle-plus__btn");
        this.minusBtn = this.querySelectorAll(".bundle-minus__btn");
        this.addToBundle = this.querySelectorAll(".add-to-bundle");

        this.addToBundle.forEach((btn) => {
            btn.addEventListener("click", this.handleAddToBundle);
        });


        this.plusBtn.forEach((btn) => {
            btn.addEventListener("click", this.handlePlus);
        });

        this.minusBtn.forEach((btn) => {
            btn.addEventListener("click", this.handleMinus);
        });
    }

    disconnectedCallback() {
        this.plusBtn.forEach((btn) => {
            btn.removeEventListener("click", this.handlePlus);
        });

        this.minusBtn.forEach((btn) => {
            btn.removeEventListener("click", this.handleMinus);
        });
    }

    handleAddToBundle(event){
        const wrapper = event.currentTarget.closest(".bundle-items");
        const addToBundle = wrapper.querySelector(".add-to-bundle");
        if(addToBundle){
            addToBundle.classList.toggle("loading-spiner");
            addToBundle.disabled = "true";
        }
    }

    plusQuantity(event) {
        const wrapper = event.currentTarget.closest(".bundle-items");
        const qtyInput = wrapper.querySelector(".bundle-quantity");

        if (qtyInput) {
            let value = parseInt(qtyInput.value) || 0;
            qtyInput.value = Math.min(value + 1, 24); 
        }
    }

    minusQuantity(event) {
        const wrapper = event.currentTarget.closest(".bundle-items");
        const qtyInput = wrapper.querySelector(".bundle-quantity");

        if (qtyInput) {
            let value = parseInt(qtyInput.value) || 1;
            qtyInput.value = Math.max(value - 1, 1); 
        }
    }
}

customElements.define("bundle-builder", BundleBuilder);