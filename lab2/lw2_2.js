/* 2.Телефонні розмови (клієнт, поповнення, розмова, блокування) 
В другому завдані розробити систему класів(запропоновані класи в дужках).
В програмах передбачити збереження колекцій та виконання сортування по котромусь із полів та пошук по котромусь із полів.
*/

class Person {
  constructor(id, fullName, phoneNumber) {
    this.id = id;
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
  }
}

class Client extends Person{
    constructor(id, fullName, phoneNumber, balance = 0) {
    super(id, fullName, phoneNumber);
    this.balance = balance;
    this.isBlocked = false;
  }

    topUp(amount) {
        if(amount <= 0){
            console.log('Amount has to be more then 0.');
            return;
        }

        this.balance += amount;
        console.log(`Top up ${this.fullName}: + ${amount}$. Current balance: ${this.balance}`);

        if(this.isBlocked && this.balance >= 0){
            this.isBlocked = false;
            console.log(`Unblocking client ${this.fullName} automatically.`);
        }
    }

    checkStatusAndBlock() {
      if (this.balance < 0) {
          this.isBlocked = true;
          console.log(`Client ${this.fullName} is blocked because balance is less than zero (${this.balance}$).`);
      }
      return this.isBlocked;
    }
}

class Transaction {
  constructor(id, client, date = new Date()) {
    this.id = id;
    this.client = client;
    this.date = date;
  }
}

class TopUpTransaction extends Transaction {
  constructor(id, client, amount) {
    super(id, client);
    this.amount = amount;
  }

  execute() {
    this.client.topUp(this.amount);
  }
}

class Call {
  constructor(id, client, durationMinutes, pricePerMinute) {
    this.id = id;
    this.client = client;
    this.durationMinutes = durationMinutes;
    this.pricePerMinute = pricePerMinute;
    this.date = new Date();
  }

  get totalCost(){
    return this.durationMinutes * this.pricePerMinute;
  }

  makeCall() {
    if (this.client.isBlocked) {
      console.log(`[Forbidden] ${this.client.fullName} is blocked and cant call!`);
      return false;
    }

    const cost = this.totalCost;
    this.client.balance -= cost;
    console.log(`[Call] ${this.client.fullName} talked for ${this.durationMinutes} min. Proce: ${cost}$. You have ${this.client.balance}$ left on your balance.`);

    this.client.checkStatusAndBlock();
    return true;
  }
}

class PhoneSystem {
  constructor() {
    this.clients = [];
    this.calls = [];
    this.topUps = [];
  }

  addClient(client){
    this.clients.push(client);
  }

  addCall(call) {
    if (call.makeCall()) {
      this.calls.push(call);
    }
  }

  addTopUp(topUp) {
    topUp.execute();
    this.topUps.push(topUp);
  }

  findClientByPhone(phoneNumber) {
    return this.clients.find(client => client.phoneNumber === phoneNumber) || null;
  }

  findBlockedClients() {
    return this.clients.filter(client => client.isBlocked);
  }

  findCallsByClient(phoneNumber) {
    return this.calls.filter(call => call.client.phoneNumber === phoneNumber);
  }

  sortClientsByBalance() {
    return this.clients.sort((a, b) => b.balance - a.balance);
  }
}

const system = new PhoneSystem();

const c1 = new Client(1, "Яцюк Уляна", "0971112233", 50);
const c2 = new Client(2, "Матвійчук Павло", "0674445566", 15);
const c3 = new Client(3, "Нікітюк Саша", "0937778899", 100);

system.addClient(c1);
system.addClient(c2);
system.addClient(c3);

console.log("\nMaking calls");
system.addCall(new Call(101, c1, 10, 2)); 
system.addCall(new Call(102, c2, 10, 2)); 
system.addCall(new Call(103, c2, 5, 2)); 

console.log("\nToping up balance");
system.addTopUp(new TopUpTransaction(501, c2, 50));
system.addCall(new Call(104, c2, 5, 2));

console.log("\nResult of search.");
console.log("Find number '0971112233':", system.findClientByPhone("0971112233")?.fullName);
console.log("Blocked clients:", system.findBlockedClients().map(c => c.fullName));

console.log("\nSorting by balance");
const sortedByBalance = system.sortClientsByBalance();
sortedByBalance.forEach(c => console.log(`${c.fullName}: ${c.balance}$`));
