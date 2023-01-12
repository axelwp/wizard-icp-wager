import Array     "mo:base/Array";
import Buffer     "mo:base/Buffer";
import Iter     "mo:base/Iter";
import Blob      "mo:base/Blob";
import Nat      "mo:base/Nat";
import Nat8      "mo:base/Nat8";
import Nat32     "mo:base/Nat32";
import Principal "mo:base/Principal";
import Text      "mo:base/Text";
import CRC32     "./CRC32";
import SHA224    "./SHA224";

module {
  // 32-byte array.
  public type AccountIdentifier = Blob;
  // 32-byte array.
  public type Subaccount = Blob;

  func beBytes(n: Nat32) : [Nat8] {
    func byte(n: Nat32) : Nat8 {
      Nat8.fromNat(Nat32.toNat(n & 0xff))
    };
    [byte(n >> 24), byte(n >> 16), byte(n >> 8), byte(n)]
  };

  public func defaultSubaccount() : Subaccount {
    Blob.fromArrayMut(Array.init(32, 0 : Nat8))
  };

  public func accountIdentifier(principal: Principal, subaccount: Subaccount) : AccountIdentifier {
    let hash = SHA224.Digest();
    hash.write([0x0A]);
    hash.write(Blob.toArray(Text.encodeUtf8("account-id")));
    hash.write(Blob.toArray(Principal.toBlob(principal)));
    hash.write(Blob.toArray(subaccount));
    
    let hashSum = hash.sum();
    let crc32Bytes = beBytes(CRC32.ofArray(hashSum));
    /*
    let buffer = Buffer.Buffer<Nat>(3);
    //beBytes returns a [Nat8] with a length of 4
    for (i in Iter.range(0, 3)){
      buffer.add(Nat8.toNat(crc32Bytes[i]));
    };
    //Sha 224 hash is 224 bits long and Nat8 is 8 bits so we iterate 28 times
    for (i in Iter.range(0, 27)){
      buffer.add(Nat8.toNat(hashSum[i]));
    };
    var accountID = Array.init<Nat8>(buffer.size(), 0);
    //loop through the buffer and copy the elements into a Nat8 array
    for (i in Iter.range(0, buffer.size() - 1)){
      accountID[i] := Nat8.fromNat(buffer.get(i));
    };
    Blob.fromArrayMut(accountID)
    
    //Array.append was deprecated, replaced with Buffer.append above
    */
    Blob.fromArray(Array.append(crc32Bytes, hashSum))
  };

  public func validateAccountIdentifier(accountIdentifier : AccountIdentifier) : Bool {
    if (accountIdentifier.size() != 32) {
      return false;
    };
    let a = Blob.toArray(accountIdentifier);
    let accIdPart    = Array.tabulate(28, func(i: Nat): Nat8 { a[i + 4] });
    let checksumPart = Array.tabulate(4,  func(i: Nat): Nat8 { a[i] });
    let crc32 = CRC32.ofArray(accIdPart);
    Array.equal(beBytes(crc32), checksumPart, Nat8.equal)
  };
}