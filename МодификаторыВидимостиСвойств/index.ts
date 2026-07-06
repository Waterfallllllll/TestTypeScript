function setName() {
    return "COD";
}

class Player {
    private static game: string = "COD";

    #login: string; // public значение по умолчанию
    private _password: string; 
    public server: string;
    protected consent: boolean; // Приватные свойства и методы не будут видны при наследовании у потомков. Они только для определенного класса. Если всё же хотим использовать, то нужен модификатор protected

    constructor(login: string) {
        this.#login = login;
    }

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

    // logIn(this: Player) { // <- есть внутри плеера. Это работает как подсказка тайпскрипта, что в случае чего нам нужно использовать bind
    //     return `Player ${this.#login} online!`; // Когда метод срабатывает, то эта строка всегда будет ссылаться на свойство которое ->
    // }

    logIn = () => { 
        return `Player ${this.#login} online!`; 
    }

    connect() {
        return this;
    }

    isPro(): this is CompetitivePlayer { // И тут мы чётко говорим, что из нашего метода будет возвращаться.
        return this instanceof CompetitivePlayer; // Тут мы возвращаем является ли this потомком этого класса. Если да, то true. Если нет, то false.
    }
}


// const test = player.logIn; // Контекст потерян
// const test = player.logIn.bind(player); // Жестко привязали контекст. Во всей этой строке возвращается новая функция,bind возвращает новую функцию контекст которой жестко привязан к объекту player который является экземпляром класса player
const test = player.logIn; // При использовании стрелочной функции нам не нужна привязка bind. При использовании стрелочной функции контекст сам привязан к экземпляру за счёт использования стрелочной функции.


test();

// new Player();
// new Player();
// new Player();
// console.log(Player.getGameName());


// Math.random();

// const test = new Player();
// // test.#login

class CompetitivePlayer extends Player {
    rank: number;

    checkLogin() {
        return this.logIn(); // Когда мы используем стрелочную функцию, это значит что она не записывается в прототип из которого уже берётся эта функция. А если его нет в прототипе, то через супер мы не можем его получить. Он не видим у потомков. Поэтому просто используем this.logIn();
    }

    private isConsented() {
        this.consent ? "Yes" : "No";
    }
}

const player = new Player("test");
console.log(player.connect().logIn()); // Такой приём называется чейнингом

const player2 = new CompetitivePlayer("Test2");
console.log(player2.connect().logIn());

const somePlayer: Player | CompetitivePlayer = new CompetitivePlayer("Test3");
somePlayer.isPro() ? console.log(somePlayer) : console.log(somePlayer);

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