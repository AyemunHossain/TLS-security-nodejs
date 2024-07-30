const secret = require("../utils");
const bigData = require("./data");

describe("utils.js", () => {
  describe("verifyKeys", () => {
    describe("keys should exists", () => {

      it("should return true", () => {
        expect(secret.verifyKeys).toBeDefined();
      });

    });
  });

  describe("signData ", () => {
    describe("signData should sign any data", () => {
      it("should return singed data", () => {
        const signedData = secret.signData("Hello World");
        expect(signedData).toBeDefined();
      });

      it("should return false if no data given", () => {
        const signedData = secret.signData(null);
        expect(signedData).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const signedData = secret.signData(undefined);
        expect(signedData).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const signedData = secret.signData("");
        expect(signedData).toBeFalsy();
      });

      it("should return a string", () => {
        const signedData = secret.signData("Hello World");
        expect(typeof signedData).toBe("string");
      });

      it("should return a base64 string", () => {
        const signedData = secret.signData("Hello World");
        expect(signedData).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
      });
      
      it("should return different signed data for different data", () => {
        const signedData1 = secret.signData("Hello World");
        const signedData2 = secret.signData("Hello World!");
        expect(signedData1).not.toBe(signedData2);
      });

      it("should return false if data is not a string", () => {
        const signedData = secret.signData(123);
        expect(signedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const signedData = secret.signData({});
        expect(signedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const signedData = secret.signData([]);
        expect(signedData).toBeFalsy();
      });


      it("should return false if data is not a string", () => {
        const signedData = secret.signData(true);
        expect(signedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const signedData = secret.signData(false);
        expect(signedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const signedData = secret.signData(null);
        expect(signedData).toBeFalsy();
      });


      it("should return same signed data for same data", () => {
        const signedData1 = secret.signData("Hello World");
        const signedData2 = secret.signData("Hello World");
        expect(signedData1).toBe(signedData2);
      });

      it("can sign bigdata", ()=>{
        const singedBigData = secret.signData(JSON.stringify(bigData));
        expect(singedBigData).toBeDefined();
        expect(typeof singedBigData).toBe("string");
        expect(singedBigData).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
      })

    });
  });

  // describe("generateHash", ()=>{
    
  // })

});