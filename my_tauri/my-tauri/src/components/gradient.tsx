import { v4 as uuidv4 } from 'uuid';

function getTextWidth(str = '') {
  const dom = document.createElement('span');
  dom.style.display = 'inline-block';
  dom.textContent = str;
  dom.className = 'font-style';
  document.body.appendChild(dom);
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  console.log(`width: ${width}`);
  document.body.removeChild(dom);
  return width;
}

type GradientTextProps = {
  text: string;
  svg_class: string;
  font_style: string;
  from_style: string;
  to_style: string;
};

const GradientText: React.FC<GradientTextProps> = ({
  text,
  svg_class,
  font_style,
  from_style,
  to_style,
}) => {
  const uuid = uuidv4();
  const grad_id = `grad-${uuid}`;
  return (
    <svg className={svg_class} style={{ width: getTextWidth(text) + 'px' }}>
      <defs>
        <linearGradient id={grad_id} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className={from_style} />
          <stop offset="100%" className={to_style} />
        </linearGradient>
      </defs>
      <text x="0" y="12" fill={`url(#${grad_id})`} className={font_style}>
        {text}
      </text>
    </svg>
  );
};

export { GradientText };
export type { GradientTextProps };