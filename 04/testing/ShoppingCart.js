function calculatePriceAfterDiscount(price, discount){
    if(price || discount !== "float") return false;

    if(discount<0 || discount>1) return false;

    const priceAfterDiscount = price - (price*discount);

    return priceAfterDiscount;
}

export { calculatePriceAfterDiscount };