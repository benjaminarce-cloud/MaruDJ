export default function Ticker({
  items,
  className = "",
  itemClassName = "",
  reverse = false,
  duration = "30s",
  separator = "·",
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  reverse?: boolean;
  duration?: string;
  separator?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex whitespace-nowrap w-max animate-marquee ${
          reverse ? "marquee-reverse" : ""
        }`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {[0, 1].map((n) => (
          <div key={n} className="flex items-baseline" aria-hidden={n === 1}>
            {items.map((item, i) => (
              <span key={`${n}-${i}`} className={`flex items-baseline ${itemClassName}`}>
                <span>{item}</span>
                <span className="mx-[0.6em] opacity-60">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
