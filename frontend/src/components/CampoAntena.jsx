import { useState } from 'react'

/**
 * Campo numerico para un parametro de antena (acimut, tilt, ganancia, etc.)
 * Muestra el tooltip y valida el rango exactamente como definidos en el
 * documento "Rangos / Tooltip" (recibidos desde /api/config/campos-antena).
 */
export default function CampoAntena({ nombreCampo, config, valor, onChange }) {
  const [mostrarTooltip, setMostrarTooltip] = useState(false)

  if (!config) return null

  const error = validar(config, valor)

  return (
    <div className="campo campo-antena">
      <label>
        {config.label}
        <span
          className="tooltip-icono"
          onMouseEnter={() => setMostrarTooltip(true)}
          onMouseLeave={() => setMostrarTooltip(false)}
          onClick={() => setMostrarTooltip((v) => !v)}
        >
          ?
          {mostrarTooltip && <span className="tooltip-texto">{config.tooltip}</span>}
        </span>
      </label>
      <input
        type="number"
        step="any"
        value={valor}
        onChange={(e) => onChange(nombreCampo, e.target.value)}
        required
      />
      {error && valor !== '' && <div className="error-texto">{error}</div>}
    </div>
  )
}

export function validar(config, valorStr) {
  if (valorStr === '' || valorStr === null || valorStr === undefined) return null
  const valor = Number(valorStr)
  if (Number.isNaN(valor)) return 'Debe ser un numero'
  const okMin = config.min_inclusive ? valor >= config.min : valor > config.min
  const okMax = config.max_inclusive ? valor <= config.max : valor < config.max
  if (okMin && okMax) return null
  const simboloMin = config.min_inclusive ? '>=' : '>'
  const simboloMax = config.max_inclusive ? '<=' : '<'
  return `Debe ser ${simboloMin} ${config.min} y ${simboloMax} ${config.max}`
}
