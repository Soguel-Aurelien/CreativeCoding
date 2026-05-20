const isValidPassword = (password) => {
    if(!password) return false;
    if(typeof password !== "string") return false;

    return password.length >= 16;
};

export { isValidPassword };