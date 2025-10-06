import { useParams } from 'react-router-dom';
import { pasteles } from '../utils/pasteles.js';
import { useMemo, useState } from 'react';
import { calcPricePastel } from '../utils/pricing.js';
import { Form, Button, Image } from 'react-bootstrap';

export default function PastelDetail() {
  const { id } = useParams();
  const pastel = useMemo(() => pasteles.find(p => p.id === id), [id]);

  // Estados iniciales según el pastel seleccionado
  const [size, setSize] = useState(pastel?.size ?? '6/8 Personas');
  const [type, setType] = useState(pastel?.type ?? 'Redondo');
  const [extras, setExtras] = useState([]);

  // Calcular precio usando la función en pesos chilenos
  const price = calcPricePastel({ size, type, extras });

  // Si no existe el pastel
  if (!pastel) return <p>🍰 Pastel no encontrado.</p>;

  return (
    <>
      <h1 className="h3 mb-2">{pastel.title}</h1>
      <p className="text-secondary small mb-4">
        Categoría: {pastel.category} • Tamaño: {pastel.size} • Tipo: {pastel.type} • Opiniones: {'⭐'.repeat(pastel.opinions)}
      </p>

      <Image src={pastel.photo} alt={pastel.title} fluid rounded className="mb-4 shadow-sm" />

      <Form className="vstack gap-3">
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
            onChange={e => setExtras(Array.from(e.target.selectedOptions).map(o => o.value))}
          >
            <option value="frutas">Decoración con frutas</option>
            <option value="rellenoExtra">Relleno extra</option>
            <option value="mensaje">Mensaje personalizado</option>
            <option value="fondant">Cobertura de fondant</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex align-items-center gap-3">
          <strong>💵 Precio: ${price.toLocaleString('es-CL')} CLP</strong>
          <Button variant="primary">Agregar al carrito</Button>
        </div>
      </Form>
    </>
  );
}
