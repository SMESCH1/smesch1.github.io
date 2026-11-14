import { NumberTicker } from '@/components/ui/number-ticker';
import type { Cifra as CifraDato } from './datos';

/** La cifra de un proyecto, en cobalto, que cuenta desde 0 la primera vez que se ve (NumberTicker de Magic UI, adaptado). */
export function Cifra({ cifra }: { cifra: CifraDato }) {
  return (
    <p className="cifra-card">
      <NumberTicker className="num" value={cifra.valor} decimalPlaces={cifra.decimales} />
      <span className="lbl">{cifra.rotulo}</span>
    </p>
  );
}
