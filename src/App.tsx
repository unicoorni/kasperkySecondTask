import { useRef } from "react";
import "./App.css";
export const App = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function checkValid() {
    if (!inputRef.current || !inputRef.current?.textContent) return;
    const logicConstruction = inputRef.current?.textContent;
    inputRef.current.innerHTML = inputRef.current?.textContent;

    const separator = /(\(|\)|OR|AND|\[|\])/g;
    // проверка на OR AND и скобки

    // const sepForReg = /^(\([a-zA-Z]+(?:\s[a-zA-Z]+)?\)\s(OR|AND)\s\([a-zA-Z]+(?:\s[a-zA-Z]+)?\))$/
    const testAndOr = /\b(OR|AND)\b/i;

    // const quotes =
    //   /^("[^"\s]+"(?:\s+[^"\s]+)*"|[^"\s]+)(?:\s+(?:AND|OR)\s+("[^"\s]+"(?:\s+[^"\s]+)*"|[^"\s]+))*$/;

    const bracketCheck =
      /^(\([^()]*\)|[^()]+)(\s+(AND|OR)\s+(\([^()]*\)|[^()]+))*$/i;
    const arrInput = logicConstruction.split(separator);
    console.log(arrInput)
    const matches: string[] | null = logicConstruction.match(separator);
    console.log("MATCH", matches);
    const output: string[] = [];
    // const stack: string[] = []

    const arrString =  logicConstruction.split('"')
    console.log(arrString);

    for (let i = 0; i < arrInput.length; i++) {
      // if(arrInput[i] === '(' || arrInput[i] === ')') {
      //     stack.push(arrInput[i])
      // }
      // const lengthStackOpen = stack.filter(el => el === '(').length
      // const lengthStackClose = stack.filter(el => el === ')').length
      // if(lengthStackOpen % 2 !== lengthStackClose % 2 ) {
      //     output.push(`<span class="red">${arrInput[i]}</span>`)
      //     stack.pop()
      //     continue
      // }
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
