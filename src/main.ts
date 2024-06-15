import './style.css'
import { DomController } from './scripts/DomController'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Battleship</h1>
  </div>
`
let dc = new DomController();

dc.setup();

