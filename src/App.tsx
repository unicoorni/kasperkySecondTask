import { useRef } from "react";
import "./App.css";
export const App = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function checkValid() {
    if (!inputRef.current || !inputRef.current?.textContent) return;
    const logicConstruction: string = inputRef.current?.textContent;
    inputRef.current.innerHTML = inputRef.current?.textContent;

    const input =
      '("Каролина Тони" OR ( ("Тони и Каролина" AND "Тони и Каролина" ) AND ("Тони и Каролина" AND "Тони и Каролина" ))) AND Каролина';

    let words = [];

    function Parser(input) {
      const basicInput = input;
      const bracketExp = /("(?:[^"\\]|\\.)*"|(?![AND]|[OR])([а-яА-Яa-zA-Z]+))/g;
      words = input.match(bracketExp);
      words.forEach((el, i) => {
        input = input.replace(el, "#");
      });
      input = input
        .replaceAll(" ", "")
        .replaceAll("AND", "*")
        .replaceAll("OR", "|");
      input = input.split("");

      if (input.includes('"')) {
        throw new Error(`В строке не хватает кавычки`);
      }

      let start = 0;
      let end = 0;
      let prev = "";
      let current = "";
      const isValidate = true;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "(") {
          start++;
        } else if (input[i] === ")") {
          end++;
        } else {
          current = input[i];
          if (
            ["|", "*"].indexOf(current) >= 0 &&
            ["|", "*"].indexOf(prev) >= 0
          ) {
            throw new Error("Ошибка логических операторов");
          }
          if (["#"].indexOf(current) >= 0 && ["#"].indexOf(prev) >= 0) {
            throw new Error("Ошибка ввода текста");
          }
          prev = current;
        }
      }

      if (start < end) {
        throw new Error(`В строке не хватает открывающейся скобки`);
      } else if (start > end) {
        throw new Error(`В строке не хватает закрывающейся скобки`);
      }
    }
    const start = performance.now();

    for (let i = 0; i < 1e6; i++) {
      Parser(input);
    }
    console.log(performance.now() - start);
    const separator = /(\(|\)|OR|AND|\[|\])/g;
    // проверка на OR AND и скобки

    // const sepForReg = /^(\([a-zA-Z]+(?:\s[a-zA-Z]+)?\)\s(OR|AND)\s\([a-zA-Z]+(?:\s[a-zA-Z]+)?\))$/
    const testAndOr = /\b(OR|AND)\b/i;

    const quotes = /("(?:[^"\\]|\\.)*"|(?![AND]|[OR])([а-яА-Яa-zA-Z]+))/g;

    const bracketCheck =
      /^(\([^()]*\)|[^()]+)(\s+(AND|OR)\s+(\([^()]*\)|[^()]+))*$/i;
    const arrInput = logicConstruction.split(separator);
    console.log(arrInput);
    const matches: string[] | null = logicConstruction.match(quotes);
    console.log("MATCH", matches);
    const output: string[] = [];
    const stack: string[] = [];

    const arrString = logicConstruction.split("AND");
    console.log(arrString);

    for (let i = 0; i < arrInput.length; i++) {
      if (arrInput[i] === "(" || arrInput[i] === ")") {
        stack.push(arrInput[i]);
      }
      const lengthStackOpen = stack.filter((el) => el === "(").length;
      const lengthStackClose = stack.filter((el) => el === ")").length;
      if (lengthStackOpen % 2 !== lengthStackClose % 2) {
        output.push(`<span class="red">${arrInput[i]}</span>`);
        stack.pop();
        continue;
      }

      if (arrInput[i] === "(" || arrInput[i] === ")") {
        output.push(`<span class="green">${arrInput[i]}</span>`);
        continue;
      }
      if (arrInput[i] === "OR" || arrInput[i] === "AND") {
        output.push(`<span class="orange">${arrInput[i]}</span>`);
        continue;
      }
      output.push(`<span class="blue">${arrInput[i]}</span>`);
    }

    inputRef.current.innerHTML = output.join("");
    //  arrInput.map((el) => {
    //     if(el === '(' || el === ')') {
    //         return `<span class="green">${el}</span>`
    //     }
    //     if(el === 'OR' || el === 'AND') {
    //         return `<span class="orange">${el}</span>`
    //     }
    //     return `<span class="blue">${el}</span>`
    // }).join('')

    // if(!matches) {
    //     return
    // }

    if (!testAndOr.test(inputRef.current.textContent)) {
      console.log(inputRef.current?.textContent);
      alert("Отсутвует логический оператор");
      return;
    }

    // if (!quotes.test(inputRef.current.textContent)) {
    //   console.log(inputRef.current?.textContent);
    //   alert("ОШИБКА, отстутсвует кавычка");
    //   return;
    // }

    if (!bracketCheck.test(inputRef.current.textContent)) {
      console.log(inputRef.current?.textContent);
      alert("Отсутвует скобка");
      return;
    }

    // if(!sepForReg.test(inputRef.current.textContent)) {
    //     console.log(inputRef.current?.textContent)
    //     alert('Некорректное выражение')
    //     return;
    // }
  }

  return (
    <>
      <div contentEditable ref={inputRef} />

      <button onClick={checkValid}>Проверить</button>
    </>
  );
};
export default App;
