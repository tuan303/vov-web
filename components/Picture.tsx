import { SITE } from '../content';

type PictureProps = {
  /** Đường dẫn gốc, ví dụ "/images/hero" → hero-640.webp, hero-640.jpg … */
  base: string;
  widths: number[];
  fallbackExt: 'jpg' | 'png';
  sizes: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** true: ảnh hiển thị ngay đầu trang (tải ưu tiên); false: tải khi cuộn tới */
  priority?: boolean;
};

/** Ảnh nhiều kích thước: WebP cho trình duyệt mới, JPEG/PNG cho trình duyệt cũ */
export default function Picture({ base, widths, fallbackExt, sizes, alt, width, height, className, priority }: PictureProps) {
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
  const fallbackSrc = `${base}-${widths[Math.min(1, widths.length - 1)]}.${fallbackExt}`;
  const loading = priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const, decoding: 'async' as const };
  return (
    <picture>
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={set(fallbackExt)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...loading}
      />
    </picture>
  );
}

export const heroPicture = { base: '/images/hero', widths: SITE.images.heroWidths, sizes: '(min-width: 1825px) 1825px, 100vw' };
