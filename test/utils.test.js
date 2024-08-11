const secret = require("../utils/utils");
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

      it("can sign bigdata", () => {
        const singedBigData = secret.signData(JSON.stringify(bigData));
        expect(singedBigData).toBeDefined();
        expect(typeof singedBigData).toBe("string");
        expect(singedBigData).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
      })

    });
  });

  describe("generateHash", () => {
    describe("generateHash should generate hash for any data", () => {
      it("should return hash for any data", () => {
        const hash = secret.generateHash("Hello World");
        expect(hash).toBeDefined();
      });

      it("should return false if no data given", () => {
        const hash = secret.generateHash(null);
        expect(hash).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const hash = secret.generateHash(undefined);
        expect(hash).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const hash = secret.generateHash("");
        expect(hash).toBeFalsy();
      });

      it("should return a string", () => {
        const hash = secret.generateHash("Hello World");
        expect(typeof hash).toBe("string");
      });

      it("should return a base64 string", () => {
        const hash = secret.generateHash("Hello World");
        expect(hash).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
      });

      it("should return different hash for different data", () => {
        const hash1 = secret.generateHash("Hello World");
        const hash2 = secret.generateHash("Hello World!");
        expect(hash1).not.toBe(hash2);
      });

      it("should return false if data is not a string", () => {
        const hash = secret.generateHash(123);
        expect(hash).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const hash = secret.generateHash({});
        expect(hash).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const hash = secret.generateHash([]);
        expect(hash).toBeFalsy();
      });

    })
  });

  describe("generateCryptographicallySecureRandomString", () => {
    describe("generateCryptographicallySecureRandomString should generate cryptographically secure string", () => {

      it("Should return the string of given length", () => {
        const randomString = secret.generateCryptographicallySecureRandomString(10);
        expect(randomString).toBeDefined();
        expect(randomString.length).toBe(20);
      });


      it("Should return the string of given big length", () => {
        const randomString = secret.generateCryptographicallySecureRandomString(100000);
        expect(randomString).toBeDefined();
        expect(randomString.length).toBe(200000);
      });

      it("Should return false if no length given", () => {
        const randomString = secret.generateCryptographicallySecureRandomString();
        expect(randomString).toBeFalsy();
      });


    })
  });

  describe("generateChecksum", () => {
    describe("generateChecksum should generate checksum for any data", () => {
      it("should return checksum for any data", () => {
        const checksum = secret.generateChecksum("Hello World");
        expect(checksum).toBeDefined();
      });

      it("should return false if no data given", () => {
        const checksum = secret.generateChecksum(null);
        expect(checksum).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const checksum = secret.generateChecksum(undefined);
        expect(checksum).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const checksum = secret.generateChecksum("");
        expect(checksum).toBeFalsy();
      });

      it("should return a string", () => {
        const checksum = secret.generateChecksum("Hello World");
        expect(typeof checksum).toBe("string");
      });

      it("should return a base64 string", () => {
        const checksum = secret.generateChecksum("Hello World");
        expect(checksum).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
      });

      it("should return different checksum for different data", () => {
        const checksum1 = secret.generateChecksum("Hello World");
        const checksum2 = secret.generateChecksum("Hello World!");
        expect(checksum1).not.toBe(checksum2);
      });

      it("should return false if data is not a string", () => {
        const checksum = secret.generateChecksum(123);
        expect(checksum).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const checksum = secret.generateChecksum({});
        expect(checksum).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const checksum = secret.generateChecksum([]);
        expect(checksum).toBeFalsy();
      });

      it("should return same checksum for same data", () => {
        const checksum1 = secret.generateChecksum("Hello World");
        const checksum2 = secret.generateChecksum("Hello World");
        expect(checksum1).toBe
      });

      it("can generate checksum for bigdata", () => {
        const checksum = secret.generateChecksum(JSON.stringify(bigData));
        expect(checksum).toBeDefined();
        expect(typeof checksum).toBe("string");
        expect(checksum).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);

      })

      it("Should generate same checksum for same big data", () => {
        const checksum1 = secret.generateChecksum(JSON.stringify(bigData));
        const checksum2 = secret.generateChecksum(JSON.stringify(bigData));
        expect(checksum1).toBe(checksum2);
      });
    });
  })


  describe("encryptData", () => {
    describe("encryptData should encrypt data", () => {
      it("should return encrypted data", () => {
        const encryptedData = secret.encryptData("Hello World");
        expect(encryptedData).toBeDefined();
      });

      it("should return false if no data given", () => {
        const encryptedData = secret.encryptData(null);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const encryptedData = secret.encryptData(undefined);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if no data given", () => {
        const encryptedData = secret.encryptData("");
        expect(encryptedData).toBeFalsy();
      });

      it("should return a object", () => {
        const encryptedData = secret.encryptData("Hello World");
        expect(typeof encryptedData).toBe("object");
      });

      it("should return a object with encrypted data", () => {
        const encryptedData = secret.encryptData("Hello World");
        expect(encryptedData.encryptedData).toBeDefined();
        expect(encryptedData.encryptedKey).toBeDefined();
        expect(encryptedData.iv).toBeDefined();
      });

      it("should return a object with proper encrypted data", () => {
        const encryptedData = secret.encryptData("Hello World");

        expect(typeof encryptedData.encryptedData).toBe("string");
        expect(typeof encryptedData.encryptedKey).toBe("string");
        expect(typeof encryptedData.iv).toBe("string");
      });

      it("should return a object with proper types of encrypted data", () => {
        const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
        const encryptedData = secret.encryptData("Hello World");
        expect(encryptedData.encryptedData).toMatch(base64Regex);
        expect(encryptedData.encryptedKey).toMatch(base64Regex);
        expect(encryptedData.iv).toMatch(base64Regex);
      })

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData(123);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData({});
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData([]);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData(true);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData(false);
        expect(encryptedData).toBeFalsy();
      });

      it("should return false if data is not a string", () => {
        const encryptedData = secret.encryptData(null);
        expect(encryptedData).toBeFalsy();
      });
    });

    describe("decryptData", () => {
      describe("decryptData should decrypt data", () => {
        it("should return decrypted data", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(encryptedData);
          expect(decryptedData).toBeDefined();
        });

        it("should return false if no data given", () => {
          const decryptedData = secret.decryptData(null);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const decryptedData = secret.decryptData(undefined);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const decryptedData = secret.decryptData("");
          expect(decryptedData).toBeFalsy();
        });

        it("should return a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(encryptedData);
          expect(typeof decryptedData).toBe("string");
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(123);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData({});
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData([]);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(true);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(false);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const encryptedData = secret.encryptData("Hello World");
          const decryptedData = secret.decryptData(null);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if encrypted data is not appropriate", () => {
          const encryptedData = secret.encryptData("Hello World");
          delete encryptedData.encryptedData;
          const decryptedData = secret.decryptData(encryptedData);
          expect(decryptedData).toBeFalsy();
        });


        it("should return false if encrypted data is manupulated", () => {
          const encryptedData = secret.encryptData("Hello World");
          encryptedData.encryptedData = "Hello World";
          const decryptedData = secret.decryptData(encryptedData);
          expect(decryptedData).toBeFalsy();
        });

        it("should return false if encrypted key is not appropriate", () => {
          const encryptedData = secret.encryptData("Hello World");
          delete encryptedData.encryptedKey;
          const decryptedData = secret.decryptData(encryptedData);
          expect(decryptedData).toBeFalsy();
        });
      });
    });

    describe("genreateSignature", () => {
      describe("genreateSignature should generate signature for any data", () => {
        it("should return signature for any data", () => {
          const signature = secret.genreateSignature("Hello World");
          expect(signature).toBeDefined();
        });

        it("should return false if no data given", () => {
          const signature = secret.genreateSignature(null);
          expect(signature).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const signature = secret.genreateSignature(undefined);
          expect(signature).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const signature = secret.genreateSignature("");
          expect(signature).toBeFalsy();
        });

        it("should return a string", () => {
          const signature = secret.genreateSignature("Hello World");
          expect(typeof signature).toBe("string");
        });

        it("should return a base64 string", () => {
          const signature = secret.genreateSignature("Hello World");
          expect(signature).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
        });

        it("should return different signature for different data", () => {
          const signature1 = secret.genreateSignature("Hello World");
          const signature2 = secret.genreateSignature("Hello World!");
          expect(signature1).not.toBe(signature2);
        });

        it("should return false if data is not a string", () => {
          const signature = secret.genreateSignature(123);
          expect(signature).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const signature = secret.genreateSignature({});
          expect(signature).toBeFalsy();
        });

        it("should return false if data is not a string", () => {
          const signature = secret.genreateSignature([]);
          expect(signature).toBeFalsy();
        });

        it("should return same signature for same data", () => {
          const signature1 = secret.genreateSignature("Hello World");
          const signature2 = secret.genreateSignature("Hello World");
          expect(signature1).toBe(signature2);
        });

        it("can generate signature for bigdata", () => {
          const signature = secret.genreateSignature(JSON.stringify(bigData));
          expect(signature).toBeDefined();
          expect(typeof signature).toBe("string");
          expect(signature).toMatch(/^[a-zA-Z0-9+/]+={0,2}$/);
        });

        it("Should generate same signature for same big data", () => {
          const signature1 = secret.genreateSignature(JSON.stringify(bigData));
          const signature2 = secret.genreateSignature(JSON.stringify(bigData));
          expect(signature1).toBe(signature2);
        });

      });
    });

    describe("verifySignature", () => {
      describe("verifySignature should verify signature for any data", () => {
        it("should return true if signature is valid", () => {
          const signature = secret.genreateSignature("Hello World");
          const isValid = secret.verifySignature("Hello World", signature);
          expect(isValid).toBeTruthy();
        });

        it("should return false if signature is invalid", () => {
          const signature = secret.genreateSignature("Hello World");
          const isValid = secret.verifySignature("Hello World!", signature);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(null, null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(undefined, undefined);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("Hello World", "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", "Hello World");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("Hello World", null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(null, "Hello World");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(undefined, "Hello World");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("Hello World", undefined);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("Hello World", null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(undefined, null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(null, undefined);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(null, "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(undefined, "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", undefined);
          expect(isValid).toBeFalsy();
        });
        
        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", null);
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(null, "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature(undefined, "");
          expect(isValid).toBeFalsy();
        });

        it("should return false if no data given", () => {
          const isValid = secret.verifySignature("", undefined);
          expect(isValid).toBeFalsy();
        });
        
      });
    });

  });
});