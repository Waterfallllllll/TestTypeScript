const forms = document.querySelectorAll("form");
const email = document.querySelector("#email") as HTMLInputElement;
const title = document.querySelector("#title") as HTMLInputElement;
const text = document.querySelector("#text") as HTMLTextAreaElement;
const checkbox = document.querySelector("#checkbox") as HTMLInputElement;

interface IFormData {
    email: string;
    title: string;
    text: string;
    checkbox: boolean;
}

let formData: IFormData = {
    email: "",
    title: "",
    text: "",
    checkbox: false,
};

// Последовательность действий:
// 1) Происходит submit любой из форм
// 2) Все данные из 4х полей со страницы переходят в свойства объекта formData
// 3) Запускается функция validateFormData с этим объектом, возвращает true/false
// 4) Если на предыдущем этапе true, то запускается функция checkFormData с этим объектом

forms.forEach((item) => {
    item.addEventListener("submit", (event) => {
        event.preventDefault();

        formData = {
            email: email?.value ?? "",
            title: title?.value ?? "",
            text: text?.value ?? "",
            checkbox: checkbox?.checked ?? false
        };

		if (validateFormData(formData)) {
			checkFormData(formData);
		}
    });
});

function validateFormData(data: IFormData) {
    // Если каждое из свойств объекта data правдиво...

    const arr = Object.values(data).every((item) => item);

    if (arr) {
        return true;
    } else {
        console.log("Please, complete all fields");
        return false;
    }
}

function checkFormData(data: IFormData) {
    const { email } = data;
    const emails = ["example@gmail.com", "example@ex.com", "admin@gmail.com"];
    let flag = false;

    emails.forEach((item) => {
        if (item === email) {
            flag = true;
        }
    });

    // Если email совпадает хотя бы с одним из массива
    if (flag) {
        console.log("This email is already exist");
    } else {
        console.log("Posting data...");
    }
}
