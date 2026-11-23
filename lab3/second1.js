"use strict";
function Abonent(phoneNumber, firstName, lastName, middleName, address, postIndex) {
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.address = address;
    this.postIndex = postIndex;
}
Abonent.prototype.getAtsCode = function () {
    return String(this.phoneNumber).slice(0, 3);
};
Abonent.prototype.getFullInfo = function () {
    return `${this.lastName} ${this.firstName} ${this.middleName}.\nPhone number: ${this.phoneNumber}.\n Address: ${this.address}. \n PostIndex: ${this.postIndex}`;
};
function ATSSystem() {
    this.abonents = [];
}
ATSSystem.prototype.AddAbonentToATS = function (abonent) {
    this.abonents.push(abonent);
};
ATSSystem.prototype.printListByATS = function () {
    const groupedByATS = {};
    for (let i = 0; i < this.abonents.length; i++) {
        const abonent = this.abonents[i];
        const atsCode = abonent.getAtsCode();
        if (!groupedByATS[atsCode]) {
            groupedByATS[atsCode] = [];
        }
        groupedByATS[atsCode].push(abonent);
    }
    console.log('List of abonents by ATS');
    for (const code in groupedByATS) {
        if (Object.prototype.hasOwnProperty.call(groupedByATS, code)) {
            console.log(`ATS №${code}:`);
            const list = groupedByATS[code];
            for (let j = 0; j < list.length; j++) {
                console.log(`${j + 1}. ${list[j].getFullInfo()}`);
            }
            console.log('\n');
        }
    }
};
const AbonentTyped = Abonent;
const ATSSystemTyped = ATSSystem;
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
