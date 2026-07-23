// import "test";

// const folder = "main";

// switch (folder) {
//     case "main":
//         const test = "test";
//     case "admin":
//         return true;
    
// }

// ---
// "noUncheckedIndexedAccess": true,

interface IStyles {
    [style: string]: string;
}

const style_1: IStyles = {
    "border": "red"
};
const style_2 = style_1["bg"];

// ---