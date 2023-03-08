import Ledger     "canister:ledger";
import Random     "mo:base/Random";
import Float      "mo:base/Float";
import Int        "mo:base/Int";
import Debug      "mo:base/Debug";
import Error      "mo:base/Error";
import HashMap    "mo:base/HashMap";
import List       "mo:base/List";
import Nat64      "mo:base/Nat64";
import Principal  "mo:base/Principal";
import Time       "mo:base/Time";
import Account    "../ledger/Account";
import Nat "mo:base/Nat";

actor Self {
  let SubnetManager : actor {
      raw_rand() : async Blob;
  } = actor "aaaaa-aa";
    
  public func get_bytes() : async Blob {
      let bytes = await SubnetManager.raw_rand();
      return bytes;
  };
    
  public func get_choice() : async Nat {
      let random = Random.rangeFrom(32, await get_bytes());
      //between 0..4294967295
      //let bytes : Blob = await SubnetManager.raw_rand();

      //let random = Random.rangeFrom(1, await SubnetManager.raw_rand());
      //let newRandom = random / 3;
      return (3 * random) / 4294967295;
  };

  public type Wager = {
      //one icp = 1_000_000_000 e8s
      amount : Int;
      //time the wager is created on our end
      created_at : Int;

      result : Bool;

      last_choice : Int;
  };

  public type Wagers = List.List<Wager>;

  //wagers indexed by author, newest wagers at the front of the list
  var wagers : HashMap.HashMap<Principal, Wagers> = HashMap.HashMap(10, Principal.equal, Principal.hash);

  //returns integer
  //  null - choices are out of bounds
  //  0 - A wins, B loses
  //  1 - B wins, A loses
  //  2 - A and B tie
  public func getOutcome(choice_a : Nat, choice_b : Nat) {
    //check that choice_a,b are within bounds
    if(choice_b < 0 or choice_b > 2 or choice_a < 0 or choice_b > 2) {
      return -1
    };
    switch(choice_a){
      case choice_b { return 2 };
      //if A chooses rock
      case 0 {
        //paper beats rock
        if(choice_b == 1) { return 1 }
        //rock beats scissors
        else if(choice_b == 2) { return 0 }
      };
      //if A chooses paper
      case 1 {
        //scissors beats paper
        if(choice_b == 2) { return 1 }
        //paper beats rock
        else if(choice_b == 0) { return 0 }
      };
      //if A chooses scissors
      case 2 {
        //rock beats scissors
        if (choice_b == 0) { return 1 }
        //scissors beats paper
        else if (choice_b == 1) { return 0 }
      };
    }
  };
  //private function to add the wager
  //adds a new wager to wagers hashmap with index author
  func addWager(author : Principal, amount : Int, last_choice : Int) {
    //set the wager amount and time
    let house_choice = await get_choice();
    let wager = { amount = amount; created_at = Time.now(); 
      result = getOutcome(house_choice, last_choice)};
    
    let newWagers = switch (wagers.get(author)) {
      case null { List.make(wager) };
      case (?oldWagers) { List.push(wager, oldWagers) };
    };
    wagers.put(author, newWagers);
  };

  //public call to add a new wager
  public shared ({ caller }) func wager(amount : Int) : async () {
    addWager(caller, amount);
  };

  // Returns all wagers made by the caller.
  public shared query ({ caller }) func myWagers() : async Wagers {
    switch (wagers.get(caller)) {
      case null { null };
      case (?p) { p };
    }
  };

  public type Post = {
      text : Text;
      created_at : Int;
  };

  public type Posts = List.List<Post>;
  // Posts indexed by the author.
  // Newest posts are at the front of the post list.
  var posts : HashMap.HashMap<Principal, Posts> = HashMap.HashMap(10, Principal.equal, Principal.hash);

  // Records a new message posted by the specified author.
  func addPost(author : Principal, text : Text) {
    let post = { text = text; created_at = Time.now(); };
    
    let newPosts = switch (posts.get(author)) {
      case null { List.make(post) };
      case (?oldPosts) { List.push(post, oldPosts) };
    };

    posts.put(author, newPosts);
  };

  // Returns the default account identifier of this canister.
  func myAccountId() : Account.AccountIdentifier {
    Account.accountIdentifier(Principal.fromActor(Self), Account.defaultSubaccount())
  };

  // Adds a new post.
  public shared ({ caller }) func post(lit : Text) : async () {
    addPost(caller, lit);
  };

  // Returns messages posted by the caller.
  public shared query ({ caller }) func myPosts() : async Posts {
    switch (posts.get(caller)) {
      case null { null };
      case (?p) { p };
    }
  };

  // Returns canister's default account identifier as a blob.
  public query func canisterAccount() : async Account.AccountIdentifier {
    myAccountId()
  };

  // Returns current balance on the default account of this canister.
  public func canisterBalance() : async Ledger.Tokens {
    await Ledger.account_balance({ account = myAccountId() })
  };

  // Rewards the most prolific author of the last week with 1 token.
  //
  // Returns the principal of the winner, if there is one.
  public func distributeRewards() : async ?Principal {
    let weekNanos = 7 * 24 * 3600 * 1_000_000_000;
    let now = Time.now();
    let threshold = if (now < weekNanos) { 0 } else { now - weekNanos };

    var maxPosts = 0;
    var mostProlificAuthor : ?Principal = null;

    // Go over all the posts and find the most prolific author.
    for ((author, posts) in posts.entries()) {
      let numFreshPosts = List.foldLeft(posts, 0 : Nat, func (acc : Nat, post : Post) : Nat {
        if (post.created_at >= threshold) { acc + 1 } else { acc }
      });
      if (numFreshPosts > maxPosts) {
        maxPosts := numFreshPosts;
        mostProlificAuthor := ?author;
      };
    };
    
    switch (mostProlificAuthor) {
      case null {};
      case (?principal) {
        // If there is a winner, transfer 1 Token to the winner.
        let res = await Ledger.transfer({
          memo = Nat64.fromNat(maxPosts);
          from_subaccount = null;
          to = Account.accountIdentifier(principal, Account.defaultSubaccount());
          amount = { e8s = 100_000_000 };
          fee = { e8s = 10_000 };
          created_at_time = ?{ timestamp_nanos = Nat64.fromNat(Int.abs(now)) };
        });
        switch (res) {
          case (#Ok(blockIndex)) {
            Debug.print("Paid reward to " # debug_show principal # " in block " # debug_show blockIndex);
          };
          case (#Err(#InsufficientFunds { balance })) {
            throw Error.reject("Top me up! The balance is only " # debug_show balance # " e8s");
          };
          case (#Err(other)) {
            throw Error.reject("Unexpected error: " # debug_show other);
          };
        };
      };
    };

    mostProlificAuthor
  };
};