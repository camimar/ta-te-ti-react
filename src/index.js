import React, { useState } from "react";
import ReactDOM from 'react-dom';

import './index.css';

const Cuadrado = (props) => {

  return (
    <button
     className="cuadrado"
     onClick={props.onClickEvent}
     >
      {props.value}
    </button>
  );
};

const Tablero = () => {
  // Array de los elementos X O null, el hook los maneja
  const cuadradosVacios = Array(9).fill(null);
  const [cuadrados, setCuadrados] = useState(cuadradosVacios);
  const [xEsProximo, setXEsProximo] = useState(true);

  const handleClickEvent = (i) => {
    //hacer una copia del array del state
    const nuevosCuadrados = [...cuadrados];
    //chequear si el juego está ganado o el campo está "ocupado"
    const ganadorDeclarado = Boolean(calcularGanador(nuevosCuadrados));
    const cuadradosLlenos = Boolean(nuevosCuadrados[i]);
    //si cualquiera de los dos es verdadero..
    if (ganadorDeclarado || cuadradosLlenos) {
      //return early
      return;
    }


    //mutar la copia del array, seteando el index con una x o una actualizacion con la O
    nuevosCuadrados[i] = xEsProximo ? 'X' : 'O';
    //llamar a la funcion setCuadrados con la copia mutada
    setCuadrados(nuevosCuadrados);
    //cambiar el booleano por sigue X
    setXEsProximo(!xEsProximo);
  }

  const renderCuadrado = (i) => {
    return (
      <Cuadrado value={cuadrados[i]}
      onClickEvent={() => handleClickEvent(i)}
      />
    )
  };

  const ganador = calcularGanador(cuadrados);
  //operador ternario, cambiar el estado a quien es el ganador, o si no hay, o si se sigue jugando
  const estado = ganador ?
  `Ganador: ${ganador}` :
  `Próximo jugador:  ${xEsProximo ? 'X' : 'O'}`;

  return (
    <div style={{
      backgroundColor: 'darkgray',
      margin: 10,
      padding: 20,
    }}>
        <div className="estado">{estado}</div>
        <div className="fila-tablero">
         {renderCuadrado(0)}{renderCuadrado(1)}{renderCuadrado(2)}
        </div>
        <div className="fila-tablero">
        {renderCuadrado(3)}{renderCuadrado(4)}{renderCuadrado(5)}
        </div>
        <div className="fila-tablero">
        {renderCuadrado(6)}{renderCuadrado(7)}{renderCuadrado(8)}
        </div>
    </div>
  )
};

const Juego = () => {

  return (
    <div className="juego">
        <h1>Jueguito</h1>
        <Tablero/>
    </div>
  );

};

ReactDOM.render(
  <Juego/>, 
  document.getElementById('root')
);

 function calcularGanador(cuadrados) {
   const lineas = [
     //combinaciones para ganar
     [0, 1, 2], [3, 4, 5], [6, 7, 8],  // filas
     [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
     [0, 4, 8], [2, 4, 6], //diagonales
   ];
     for (let linea of lineas) {
       //combos de combinaciones ganadoras
       const [a, b, c] = linea;

       //chequear que el valor de a no sea null
       if(cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[a] === cuadrados[c]) {
         //mostrar quien gana
         return cuadrados[a]; // gana X u O
       } 
      }
      //Hay empate - no hay ganador
      return null;
       
     
 };
