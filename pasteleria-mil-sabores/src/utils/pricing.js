export const calcPricePastel = ({ size = '6/8 Personas', type = 'Redondo', extras = [] } = {}) => {
  const base = 15000;

  const match = String(size).match(/\d+/g);
  const promedioPersonas = match ? (parseInt(match[0], 10) + (parseInt(match[1], 10) || parseInt(match[0], 10))) / 2 : 8;
  const bySize = promedioPersonas * 1200; // $800 por persona

  const byType = type === 'Cuadrado' ? 2000 : 3500;

  const effectiveExtras = (extras || []).filter(e => e && e !== 'sinExtras' && e !== 'none' && e !== 'sin extras');
  const byExtras = effectiveExtras.length * 1500;

  const total = base + bySize + byType + byExtras;
  return Math.round(total);
};
