class Person {
  constructor(
    public id: number,
    public fullName: string,
    public phoneNumber: string
  ) {}
}

class Client extends Person {
  public isBlocked: boolean = false;

  constructor(
    id: number,
    fullName: string,
    phoneNumber: string,
    public balance: number = 0
  ) {
    super(id, fullName, phoneNumber);
  }

  public topUp(amount: number): void {  
    if (amount <= 0) {
      console.log('Amount has to be more than 0.');
      return;
    }

    this.balance += amount;
    console.log(`Top up ${this.fullName}: + ${amount}$. Current balance: ${this.balance}$`);

    if (this.isBlocked && this.balance >= 0) {
      this.isBlocked = false;
      console.log(`Unblocking client ${this.fullName} automatically.`);
    }
  }

  public checkStatusAndBlock(): boolean {
    if (this.balance < 0) {
      this.isBlocked = true;
      console.log(`Client ${this.fullName} is blocked because balance is less than zero (${this.balance}$).`);
    }
    return this.isBlocked;
  }
}

class TopUpTransaction {
  constructor(
    public id: number,
    public client: Client,
    public amount: number,
    public date: Date = new Date()
  ) {}

  public execute(): void {
    this.client.topUp(this.amount);
  }
}

class Call {
  public date: Date;

  constructor(
    public id: number,
    public client: Client,
    public durationMinutes: number,
    public pricePerMinute: number
  ) {
    this.date = new Date();
  }

  public get totalCost(): number {
    return this.durationMinutes * this.pricePerMinute;
  }

  public makeCall(): boolean {
    if (this.client.isBlocked) {
      console.log(`[Forbidden] ${this.client.fullName} is blocked and can't call!`);
      return false;
    }

    const cost: number = this.totalCost;
    this.client.balance -= cost;
    console.log(
      `[Call] ${this.client.fullName} talked for ${this.durationMinutes} min. Price: ${cost}$. You have ${this.client.balance}$ left on your balance.`
    );

    this.client.checkStatusAndBlock();
    return true;
  }
}

class PhoneSystem {
  private clients: Client[] = [];
  private calls: Call[] = [];
  private topUps: TopUpTransaction[] = [];

  public addClient(client: Client): void {
    this.clients.push(client);
  }

  public addCall(call: Call): void {
    if (call.makeCall()) {
      this.calls.push(call);
    }
  }

  public addTopUp(topUp: TopUpTransaction): void {
    topUp.execute();
    this.topUps.push(topUp);
  }

  public findClientByPhone(phoneNumber: string): Client | null {
    return this.clients.find((client: Client) => client.phoneNumber === phoneNumber) || null;
  }

  public findBlockedClients(): Client[] {
    return this.clients.filter((client: Client) => client.isBlocked);
  }

  public findCallsByClient(phoneNumber: string): Call[] {
    return this.calls.filter((call: Call) => call.client.phoneNumber === phoneNumber);
  }

  public sortClientsByBalance(): Client[] {
    return [...this.clients].sort((a: Client, b: Client) => b.balance - a.balance);
  }

  public sortClientsByName(): Client[] {
    return [...this.clients].sort((a: Client, b: Client) => a.fullName.localeCompare(b.fullName));
  }
}

const system = new PhoneSystem();

const c1 = new Client(1, "Яцюк Уляна", "0971112233", 50);
const c2 = new Client(2, "Матвійчук Павло", "0674445566", 15);
const c3 = new Client(3, "Нікітюк Саша", "0937778899", 100);

system.addClient(c1);
system.addClient(c2);
system.addClient(c3);

console.log("\n Making calls ");
system.addCall(new Call(101, c1, 10, 2)); 
system.addCall(new Call(102, c2, 10, 2)); 
system.addCall(new Call(103, c2, 5, 2)); 

console.log("\n Topping up balance ");
system.addTopUp(new TopUpTransaction(501, c2, 50));
system.addCall(new Call(104, c2, 5, 2));

console.log("\n Result of search ");
console.log("Find number '0971112233':", system.findClientByPhone("0971112233")?.fullName);
console.log("Blocked clients:", system.findBlockedClients().map((c: Client) => c.fullName));

console.log("\n Sorting by balance ");
const sortedByBalance = system.sortClientsByBalance();
sortedByBalance.forEach((c: Client) => console.log(`${c.fullName}: ${c.balance}$`));

console.log("\n Sort clients by name ");
const sortedByName = system.sortClientsByName();
sortedByName.forEach((c: Client) => console.log(`${c.fullName}`));