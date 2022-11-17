class Validator {
  constructor() {
    this.validations = ["data-min-length"];
  }

  //Iniciar a validação de todos os campos
  validate(form) {
    // Pegar os input
    let inputs = document.getElementsByTagName("input");

    // HTMLCollection -> array
    let inputAwway = [...inputs];

    // Loops nos inputs e validação
    inputAwway.forEach(function (input) {
      //  Loop em todas as Validações existentes

      for (let i = 0; this.validations.length > i; i++) {
        if (input.getAttribute(this.validations[i]) != null) {
          //Limpando a string para virar um método
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          // Valor do input
          let value = input.getAttribute(this.validations[i]);

          // invocar o método
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

  //Método de imprimir message de erro na tera
  printMessage(input, msg) {
    let template = document.querySelector(".error-validation").cloneNode(true);
    template.textContent = msg;
    let inputParent = input.parentNode;

    template.classList.remove("template");
    inputParent.appendChild(template);
  }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

// Evento que despera as validações
submit.addEventListener("click", function (e) {
  e.preventDefault();

  validator.validate(form);
});
