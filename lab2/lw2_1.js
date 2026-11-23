/* 1.У пам'яті ЕОМ зберігаються дані про абонентів АТС: номер телефону, 
прізвище, ім'я, по батькові, домашня адреса, що включала номер поштового відділення. 
Скласти списки абонентів по АТС, якщо вважається, що перші три цифри телефону відповідають назві (номеру) АТС. */

function Person(firstName, lastName, middleName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
}

Person.prototype.getFullName = function(){
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
}

function Address(street, postIndex) {
    this.street = street;
    this.postIndex = postIndex;
}

Address.prototype.getFullAddress = function() {
    return `${this.street}, поштовий індекс: ${this.postIndex}`;
};

function Abonent(phoneNumber, firstName, lastName, middleName, street, postIndex){
    Person.call(this, firstName, lastName, middleName);
    this.phoneNumber = phoneNumber;
    this.address = new Address(street, postIndex);
}

Abonent.prototype = Object.create(Person.prototype);
Abonent.prototype.constructor = Abonent;

Abonent.prototype.getAtsCode = function(){
    return String(this.phoneNumber).slice(0, 3);
}

Abonent.prototype.getFullInfo = function(){
    return `${this.getFullName()}.\nPhone number: ${this.phoneNumber}.\nAddress: ${this.address.getFullAddress()}.`;
}

function ATSSystem(){
    this.abonents = [];
}

ATSSystem.prototype.AddAbonentToATS = function(abonent){
    this.abonents.push(abonent);
}

ATSSystem.prototype.printListByATS = function(){
    var groupedByATS = {};

    for(var i=0; i<this.abonents.length; i++){
        var abonent = this.abonents[i];
        var atsCode = abonent.getAtsCode();

        if (!groupedByATS[atsCode]) 
            groupedByATS[atsCode] = [];
        
        groupedByATS[atsCode].push(abonent);
    }

    console.log('List of abonents by ATS');

    for(var code in groupedByATS){
        console.log(`ATS №${code}:`);
        var list = groupedByATS[code];
        
        for(var j=0; j<list.length; j++){
            console.log(`${j+1}. ${list[j].getFullInfo()}`);
        }
        console.log('\n');
    }
}

var atsSystem = new ATSSystem();

var user1 = new Abonent('2541234', 'Uliana', 'Yatsiuk', 'Oleksandrivna', 'Prospect Mury Avenue', 29000);
var user2 = new Abonent('2541234', 'Pavlo', 'Matviichuk', 'Volodumurovuch', 'Lisogrenivetska st', 29000);
var user3 = new Abonent('3125544', 'Sasha', 'Nikituk', 'Mukolaivna', 'Zaliznyaka st', 29000);
var user4 = new Abonent('3125544', 'Victor', 'Babiuk', 'Oleksandrovuch', 'Kamyanetska', 29000);
var user5 = new Abonent('2646234', 'Dmutro', 'Semyakov', 'Oleksandrovuch', 'Grechany', 29000);

atsSystem.AddAbonentToATS(user1);
atsSystem.AddAbonentToATS(user2);
atsSystem.AddAbonentToATS(user3);
atsSystem.AddAbonentToATS(user4);
atsSystem.AddAbonentToATS(user5);

atsSystem.printListByATS();