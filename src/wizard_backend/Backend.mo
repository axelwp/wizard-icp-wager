import Random "mo:base/Random";
import Float "mo:base/Float";
import Int "mo:base/Int";
actor {
  let SubnetManager : actor {
    raw_rand() : async Blob;
  } = actor "aaaaa-aa";

  public func get_bytes() : async Blob {
    let bytes = await SubnetManager.raw_rand();
    return bytes;
  };
  
  public func get_choice() : async Text {
    //let someBlob = await get_bytes();
    //let random = Random.rangeFrom(32, someBlob);
    // between 0..4294967295
    let bytes : Blob = await SubnetManager.raw_rand();

    let random = Random.rangeFrom(3, bytes);
    let newRandom = random / 3;
    return Int.toText(newRandom);
  };

  //let random = Random.rangeFrom(32, someBlob);
};