interface IAbonent {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    postIndex: number;
    getAtsCode(): string;
    getFullInfo(): string;
}

interface IAbonentConstructor {
    new (
        phoneNumber: string,
        firstName: string,
        lastName: string,
        middleName: string,
        address: string,
        postIndex: number
    ): IAbonent;
}

function Abonent(
    this: IAbonent,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    middleName: string,
    address: string,
    postIndex: number
): void {
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.address = address;
    this.postIndex = postIndex;
}

Abonent.prototype.getAtsCode = function (this: IAbonent): string {
    return String(this.phoneNumber).slice(0, 3);
};

Abonent.prototype.getFullInfo = function (this: IAbonent): string {
    return `${this.lastName} ${this.firstName} ${this.middleName}.\nPhone number: ${this.phoneNumber}.\n Address: ${this.address}. \n PostIndex: ${this.postIndex}`;
};


interface IATSSystem {
    abonents: IAbonent[];
    AddAbonentToATS(abonent: IAbonent): void;
    printListByATS(): void;
}

interface IATSSystemConstructor {
    new (): IATSSystem;
}

function ATSSystem(this: IATSSystem): void {
    this.abonents = [];
}

ATSSystem.prototype.AddAbonentToATS = function (this: IATSSystem, abonent: IAbonent): void {
    this.abonents.push(abonent);
};

ATSSystem.prototype.printListByATS = function (this: IATSSystem): void {
    const groupedByATS: Record<string, IAbonent[]> = {};

    for (let i = 0; i < this.abonents.length; i++) {
        const abonent: IAbonent = this.abonents[i];
        const atsCode: string = abonent.getAtsCode();

        if (!groupedByATS[atsCode]) {
            groupedByATS[atsCode] = [];
        }

        groupedByATS[atsCode].push(abonent);
    }

    console.log('List of abonents by ATS');

    for (const code in groupedByATS) {
        if (Object.prototype.hasOwnProperty.call(groupedByATS, code)) {
            console.log(`ATS №${code}:`);
            const list: IAbonent[] = groupedByATS[code];

            for (let j = 0; j < list.length; j++) {
                console.log(`${j + 1}. ${list[j].getFullInfo()}`);
            }
            console.log('\n');
        }
    }
};

const AbonentTyped = Abonent as unknown as IAbonentConstructor;
const ATSSystemTyped = ATSSystem as unknown as IATSSystemConstructor;

const atsSystem = new ATSSystemTyped();

const user1 = new AbonentTyped('2541234', 'Uliana', 'Yatsiuk', 'Oleksandrivna', 'Prospect Mury Avenue', 29000);
const user2 = new AbonentTyped('2541234', 'Pavlo', 'Matviichuk', 'Volodumurovuch', 'Lisogrenivetska st', 29000);
const user3 = new AbonentTyped('3125544', 'Sasha', 'Nikituk', 'Mukolaivna', 'Zaliznyaka st', 29000);
const user4 = new AbonentTyped('3125544', 'Victor', 'Babiuk', 'Oleksandrovuch', 'Kamyanetska', 29000);
const user5 = new AbonentTyped('2646234', 'Dmutro', 'Semyakov', 'Oleksandrovuch', 'Grechany', 29000);

atsSystem.AddAbonentToATS(user1);
atsSystem.AddAbonentToATS(user2);
atsSystem.AddAbonentToATS(user3);
atsSystem.AddAbonentToATS(user4);
atsSystem.AddAbonentToATS(user5);

atsSystem.printListByATS();