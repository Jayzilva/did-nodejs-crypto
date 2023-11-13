const crypto = require("crypto");

function generateDID() {
  // Step 1: Generate a unique identifier (for simplicity, we use a random number here)
  const did = `did:example:${Math.floor(Math.random() * 100000)}`;

  // Step 2: Generate a pair of cryptographic keys (RSA keys in this example)
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  // Step 3: Create a DID document with the public key
  const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    id: did,
    publicKey: [
      {
        id: `${did}#keys-1`,
        type: "RsaVerificationKey2018",
        controller: did,
        publicKeyPem: publicKey,
      },
    ],
  };

  // Step 4: Print or return the DID and associated keys
  console.log("DID:", did);
  console.log("Public Key:", publicKey);
  console.log("Private Key:", privateKey);

  return { did, didDocument };
}

// Generate a simple DID
const { did, didDocument } = generateDID();
