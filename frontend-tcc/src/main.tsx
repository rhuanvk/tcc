import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import { TelaInicial } from './components/TelaInicial.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TelaInicial />
  </StrictMode>,
)
