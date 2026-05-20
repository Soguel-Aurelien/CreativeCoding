import assert from "assert";

import { isValidPassword } from "../PW_Validator.js";
import { calculatePriceAfterDiscount } from "../ShoppingCart.js";
/*
describe("Test PW_Validator.js", () => {
    describe("isValidPassword()", () => {
        it("Should return true, if the password >= 16 chars", () =>{
            assert.strictEqual(isValidPassword("0123456789abcdef"), true);
        });

        it("Should return false, if the password is too short", () => {
            assert.strictEqual(isValidPassword("abc"), false);
        });

        it("Should return false if no string was passed in the function", () =>{
            assert.strictEqual(isValidPassword(null), false);
        });

        it("Should return false if is not a String", () =>{
            assert.strictEqual(isValidPassword({}), false);
        });
    });
});

*/

describe("Test ShoppingCart.js", ()=> {
    describe("calculatePriceAfterDiscount()", () => {
        it("Should return true if discount is <1 || >0", () =>{
            assert.strictEqual(calculatePriceAfterDiscount(0.1),true);
        });

        it("Should return true if discount == 1 || == 0", ()=> {
            assert.strictEqual(calculatePriceAfterDiscount(42,1), true);
        });

        it("Should return false if discount >1 || <0", () => {
            assert.strictEqual(calculatePriceAfterDiscount(47,-1), false);
        });
    });
});