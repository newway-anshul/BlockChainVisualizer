import * as openpgp from 'openpgp';
import { AccountType } from './enum/accountType';
export class Account {
  public address: string;
  public nounce: number;
  public type: AccountType;
  private _balance: number;
  get balance() {
    return this._balance;
  }
  constructor() {
    this.nounce = 0;
    this._balance = 0;
  }
  async generateAddress() {
    const { privateKey, publicKey, revocationCertificate } =
      await openpgp.generateKey({
        type: 'ecc', // Type of the key, defaults to ECC
        curve: 'curve25519', // ECC curve name, defaults to curve25519
        userIDs: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
        passphrase: 'super long and hard to guess secret', // protects the private key
        format: 'armored', // output key format, defaults to 'armored' (other options: 'binary' or 'object')
      });

    console.log(privateKey); // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
    console.log(publicKey); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
    console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
  }
  transfer(amount: number) {}
}
