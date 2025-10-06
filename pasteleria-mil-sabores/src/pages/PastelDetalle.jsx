import { useParams } from 'react-router-dom';
import { pasteles } from '../utils/mockPasteles.js';
import { useMemo, useState } from 'react';
import { calcPricePastel } from '../utils/pricing.js';
import { Form, Button, Image } from 'react-bootstrap';
import '../styles/theme.css';

export default function PastelDetalle() {
  const { id } = useParams();
  const pastel = useMemo(() => pasteles.find(p => p.id === id), [id]);

  const [size, setSize] = useState(pastel?.size ?? '6/8 Personas');
  const [type, setType] = useState(pastel?.type ?? 'Redondo');
  const [extras, setExtras] = useState([]);

  const price = calcPricePastel({ size, type, extras });

  if (!pastel) return <p>🍰 Pastel no encontrado.</p>;

  return (
    <div className="pastel-detalle-container">
      <h1 className="h3 mb-2">{pastel.title}</h1>
      <p className="text-secondary small mb-4">
        Categoría: {pastel.category} • Opiniones: {'⭐'.repeat(pastel.opinions)}
      </p>
      <p className="text-secondary small mb-4">{pastel.description}</p>

      <Image src={pastel.photo} alt={pastel.title} fluid rounded className="pastel-detalle-img shadow-sm" />

      <Form className="vstack gap-3 pastel-form">
        <fieldset>Personaliza tu experiencia</fieldset>
        <Form.Group>
          <Form.Label>Tamaño</Form.Label>
          <Form.Select value={size} onChange={e => setSize(e.target.value)}>
            <option>6/8 Personas</option>
            <option>8/10 Personas</option>
            <option>10/12 Personas</option>
            <option>12/14 Personas</option>
            <option>14/16 Personas</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Tipo</Form.Label>
          <Form.Select value={type} onChange={e => setType(e.target.value)}>
            <option>Redondo</option>
            <option>Cuadrado</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Extras</Form.Label>
          <Form.Select
            multiple
            value={extras}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions).map(o => o.value);
              if (selected.includes("sinExtras")) {
                setExtras(["sinExtras"]);
              } else {
                setExtras(selected.filter(opt => opt !== "sinExtras"));
              }
            }}
          >
            <option value="frutas">Decoración con frutas</option>
            <option value="rellenoExtra">Relleno extra</option>
            <option value="mensaje">Mensaje personalizado</option>
            <option value="fondant">Cobertura de fondant</option>
            <option value="sinExtras">Sin extras</option>
          </Form.Select>
        </Form.Group>
        <p>Mantén presionado Ctrl o (Cmd) para seleccionar varios.</p>


          <div className="pastel-precio">
          <strong>Precio: ${price.toLocaleString('es-CL')} CLP</strong>
          <Button>Agregar al carrito</Button>
        </div>
      </Form>
  </div>
  );
}
