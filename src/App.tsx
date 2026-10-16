import { useState, useRef } from 'react'
import './App.css'

function App() {
  // Armazena a quantidade de segundos contados
  const [count, setCount] = useState(0);

  // Controla se o cronômetro está rodando ou pausado
  const [ativa, setAtiva] = useState(false);

  // Guarda o ID do intervalo para poder cancelá-lo depois (useRef não causa re-render)
  const intervaloRef = useRef<number | null>(null);

  // Inicia ou pausa o cronômetro dependendo do estado atual
  function contar() {
    if (ativa) {
      // Se estava rodando, cancela o intervalo e marca como pausado
      if (intervaloRef.current !== null) {
        window.clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
      setAtiva(false);
    } else {
      // Se estava pausado, cria um novo intervalo que incrementa 1 a cada segundo
      intervaloRef.current = window.setInterval(() => {
        setCount(segundos => segundos + 1);
      }, 1000);
      setAtiva(true);
    }
  }

  // Para o cronômetro e volta o contador para zero
  function resetar() {
    if (intervaloRef.current !== null) {
      window.clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    setAtiva(false);
    setCount(0);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 w-72">
        {/* Título da página */}
        <h2 className="text-2xl font-bold text-gray-700 tracking-wide">Cronômetro</h2>

        {/* Exibe a contagem de segundos */}
        <p className="text-6xl font-mono font-semibold text-gray-800">{count}s</p>

        {/* Botões */}
        <div className="flex gap-3 w-full">
          {/* Botão que alterna entre Iniciar e Pausar */}
          <button
            className={`flex-1 py-2 rounded-lg font-semibold text-white cursor-pointer transition-colors ${ativa ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}`}
            onClick={contar}
          >
            {ativa ? 'Pausar' : 'Iniciar'}
          </button>

          {/* Botão que zera o cronômetro */}
          <button
            className="flex-1 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 cursor-pointer transition-colors"
            onClick={resetar}
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
