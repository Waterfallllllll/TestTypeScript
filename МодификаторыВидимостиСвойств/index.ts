class Player {
    #login: string; // public значение по умолчанию
    private _password: string; 
    public server: string;
    protected consent: boolean; // Приватные свойства и методы не будут видны при наследовании у потомков. Они только для определенного класса. Если всё же хотим использовать, то нужен модификатор protected

    get password() {
        return this._password;
    }

    set password(newPass: string) {
        this._password = newPass;
    }
}

const test = new Player();
// test.#login

class CompetitivePlayer extends Player {
    rank: number;

    private isConsented() {
        this.consent ? "Yes" : "No";
    }
}

const player = new Player();
player.password = "1qaz";

// player.login = "asdfsd";

// class User {
//     public email: string;
//     public name: string;

//     constructor(email: string, name: string) {
//         this.email = email;
//         this.name = name;
//     }
// }

// class User {
//     constructor(public email: string, public name: string) {} // Тоже самое, что и сверху
// }