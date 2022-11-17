class Validator {
  constructor() {
    this.validations = [
      "data-required",
      "data-min-length",
      "data-max-length",
      "data-email-validate",
      "data-only-letters",
      "data-equal",
      "data-password-validate",
    ];
  }

  //Iniciar a validação de todos os campos
  validate(form) {
    // Resgata todas as validações
    let currentValidations = document.querySelectorAll(
      "form .error-validation"
    );

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }
    // Pegar os input
    let inputs = document.getElementsByTagName("input");

    // HTMLCollection -> array
    let inputAwway = [...inputs];

    // Loops nos inputs e validação
    inputAwway.forEach(function (input) {
      //  Loop em todas as Validações existentes

      // fazer validação de acordo com o atributo do input
      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          // limpa string para saber o método
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          // valor do input
          let value = input.getAttribute(this.validations[i]);

          // invoca o método
          this[method](input, value);
        }
      }
    }, this);
  }
  //Verifica se um input tem o numero minino de caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar se passou do máximo de caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }

  // método para validar e-mail
  emailvalidate(input) {
    let re = /\S+@\S+\.\S+/;

    let email = input.value;

    let errorMessage = `Insira um e-mail valido!`;

    if (!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  // Valida se esse campo so tem letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;
    let inpuValue = input.value;
    let errorMessage = `Este campo não aceita numeros nem caracteres especiais`;
    if (!re.test(inpuValue)) {
      this.printMessage(input, errorMessage);
    }
  }

  // Verifica se o imput é requerido
  required(input) {
    let inputValue = input.value;
    if (inputValue === "") {
      let errorMessage = `Este campo é obrigatório`;
      this.printMessage(input, errorMessage);
    }
  }

  // verificar se um campo está igual o outro
  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];
    console.log(inputToCompare);

    let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }

  // validando o campo de senha
  passwordvalidate(input) {
    // explodir string em array
    let charArr = input.value.split("");

    let uppercases = 0;
    let numbers = 0;

    for (let i = 0; charArr.length > i; i++) {
      if (
        charArr[i] === charArr[i].toUpperCase() &&
        isNaN(parseInt(charArr[i]))
      ) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }

    if (uppercases === 0 || numbers === 0) {
      let errorMessage = `A senha precisa um caractere maiúsculo e um número`;

      this.printMessage(input, errorMessage);
    }
  }

  //Método de imprimir message de erro na tera
  printMessage(input, msg) {
    let errorsQty = input.parentNode.querySelector(".error-validation");
    if (errorsQty === null) {
      let template = document
        .querySelector(".error-validation")
        .cloneNode(true);
      template.textContent = msg;
      let inputParent = input.parentNode;

      template.classList.remove("template");
      inputParent.appendChild(template);
    }
  }

  // Limpa as validações da tela
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// evento de envio do form, que valida os inputs
submit.addEventListener("click", function (e) {
  e.preventDefault();

  validator.validate(form);
});
