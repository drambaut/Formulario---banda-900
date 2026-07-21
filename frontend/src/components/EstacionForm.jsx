import MapaUbicacion from './MapaUbicacion.jsx'
import SectoresEditor from './SectoresEditor.jsx'

export default function EstacionForm({
  estacion,
  camposAntena,
  onChange,
  mostrarTipoEstacion = false,
}) {
  function set(campo, valor) {
    onChange({ ...estacion, [campo]: valor })
  }

  return (
    <div>
      <div className="fila">
        <div className="campo">
          <label>Latitud</label>
          <input
            type="number"
            step="any"
            value={estacion.latitud}
            onChange={(e) => set('latitud', e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label>Longitud</label>
          <input
            type="number"
            step="any"
            value={estacion.longitud}
            onChange={(e) => set('longitud', e.target.value)}
            required
          />
        </div>
        <div className="campo">
          <label>Formato de coordenadas</label>
          <select
            value={estacion.formato_coordenadas}
            onChange={(e) => set('formato_coordenadas', e.target.value)}
          >
            <option value="decimal">Decimal</option>
            <option value="gms">Grados, minutos, segundos (GMS)</option>
          </select>
        </div>
      </div>

      <MapaUbicacion latitud={estacion.latitud} longitud={estacion.longitud} />

      <div className="fila" style={{ marginTop: 12 }}>
        <div className="campo">
          <label>Dirección de la estación</label>
          <input
            value={estacion.direccion_estacion}
            onChange={(e) => set('direccion_estacion', e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Departamento</label>
          <input
            value={estacion.departamento}
            onChange={(e) => set('departamento', e.target.value)}
          />
        </div>
        <div className="campo">
          <label>Municipio</label>
          <input
            value={estacion.municipio}
            onChange={(e) => set('municipio', e.target.value)}
          />
        </div>
      </div>

      {mostrarTipoEstacion && (
        <div className="campo">
          <label>Tipo de estación</label>
          <select
            value={estacion.tipo_estacion || ''}
            onChange={(e) => set('tipo_estacion', e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="nueva">Nueva</option>
            <option value="repetidora">Repetidora</option>
          </select>
        </div>
      )}

      <h2 style={{ marginTop: 16 }}>Sectores y antenas</h2>
      <SectoresEditor
        camposAntena={camposAntena}
        sectores={estacion.sectores}
        onChange={(sectores) => onChange({ ...estacion, sectores })}
      />
    </div>
  )
}
