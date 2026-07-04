function setName() {
    return "COD";
}

class Player {
    private static game: string = "COD";

    #login: string; // public значение по умолчанию
    private _password: string; 
    public server: string;
    protected consent: boolean; // Приватные свойства и методы не будут видны при наследовании у потомков. Они только для определенного класса. Если всё же хотим использовать, то нужен модификатор protected

    static { // Вызывается один раз при создании первого экземпляра этого класса. Статичные свойства будут зафиксированы и блок больше не будет запускаться. Это большой плюс в сравнение с конструктором который каждый раз запускается и перезаписывает свойства
        Player.game = setName(); 
    }

    // constructor(game: string) {
    //     // this.game = game; не сработает
    //     Player.game = game;
    // }

    // private constructor() {}

    get password() {
        return this._password;
    }

    set password(newPass: string) {
        this._password = newPass;
    }

    static getGameName() {
        return Player.game;
    }
}

new Player();
new Player();
new Player();
console.log(Player.getGameName());


// Math.random();

// const test = new Player();
// // test.#login

// class CompetitivePlayer extends Player {
//     rank: number;

//     private isConsented() {
//         this.consent ? "Yes" : "No";
//     }
// }

// const player = new Player();
// player.password = "1qaz";

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