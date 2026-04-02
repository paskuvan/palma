type Props = { current: number, total: number }

export default function NavDots({ current, total}: Props) {
    return (
        <div className="flex gap-2 justify-center mb-2">
            {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
          style={{ background: i === current ? '#D85A30' : '#d1d5db' }}
        />
        ))}
        </div>
    )
}