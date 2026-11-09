import os
import struct
import zlib

def write_png(filename, width, height, rgba_bytes):
    png = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data)
    png += struct.pack('>I', len(ihdr_data)) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    line_bytes = width * 4
    raw_lines = [b'\x00' + rgba_bytes[y*line_bytes : (y+1)*line_bytes] for y in range(height)]
    raw_data = b''.join(raw_lines)
    
    compressed = zlib.compress(raw_data, 9)
    idat_crc = zlib.crc32(b'IDAT' + compressed)
    png += struct.pack('>I', len(compressed)) + b'IDAT' + compressed + struct.pack('>I', idat_crc)
    
    iend_crc = zlib.crc32(b'IEND')
    png += struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'wb') as f:
        f.write(png)
    print(f"Generated {filename} ({width}x{height})")

def process():
    bmp_path = '/tmp/media.bmp'
    with open(bmp_path, 'rb') as f:
        header = f.read(54)
        w = abs(int.from_bytes(header[18:22], 'little', signed=True))
        h = abs(int.from_bytes(header[22:26], 'little', signed=True))
        row_bytes = (w * 3 + 3) & ~3
        data = f.read()

    def get_pixel(x, y):
        if x < 0 or x >= w or y < 0 or y >= h:
            return (255, 255, 255)
        idx = y * row_bytes + x * 3
        return (data[idx+2], data[idx+1], data[idx])

    # ----------------------------------------------------
    # 1. SQUARE ICON (Logo 3) Monogram
    # Bounds: X: 866 to 988, Y: 146 to 268 (approx 122x122)
    # ----------------------------------------------------
    sq_x0, sq_y0 = 866, 146
    sq_w, sq_h = 122, 122
    sq_rgba = bytearray()
    
    # Rounded corner detection (outside the rounded square is white bg)
    for y in range(sq_y0, sq_y0 + sq_h):
        for x in range(sq_x0, sq_x0 + sq_w):
            r, g, b = get_pixel(x, y)
            # If it's the white background outside the rounded corners
            # Near corners, pure white / light gray is outside the icon
            # Let's check distance to center or corner
            dx = min(x - sq_x0, sq_x0 + sq_w - 1 - x)
            dy = min(y - sq_y0, sq_y0 + sq_h - 1 - y)
            is_outer_corner = (dx < 16 and dy < 16 and (16-dx)*(16-dx) + (16-dy)*(16-dy) > 16*16)
            
            if is_outer_corner or (r > 245 and g > 245 and b > 245 and (dx < 18 or dy < 18)):
                sq_rgba.extend([0, 0, 0, 0])
            else:
                sq_rgba.extend([r, g, b, 255])
                
    write_png('livitect-web/public/brand/livitect-icon-square.png', sq_w, sq_h, bytes(sq_rgba))
    write_png('livitect-web/public/favicon.png', sq_w, sq_h, bytes(sq_rgba))

    # ----------------------------------------------------
    # 2. TERRACOTTA LOGO ON WHITE / TRANSPARENT (Logo 2)
    # Bounds: X: 580 to 844, Y: 110 to 312
    # ----------------------------------------------------
    pad = 4
    t_x0 = 584 - pad
    t_y0 = 114 - pad
    t_x1 = 841 + pad
    t_y1 = 308 + pad
    t_w = t_x1 - t_x0 + 1
    t_h = t_y1 - t_y0 + 1

    # Both opaque white bg version & transparent bg version
    t_rgba_white = bytearray()
    t_rgba_trans = bytearray()

    # Brand color target: #8E4F2A (142, 79, 42)
    for y in range(t_y0, t_y0 + t_h):
        for x in range(t_x0, t_x0 + t_w):
            r, g, b = get_pixel(x, y)
            t_rgba_white.extend([r, g, b, 255])
            
            # Transparency calculation
            # White background has r, g, b near 255
            # Terracotta strokes have r ~ 142, g ~ 79, b ~ 42
            # Brightness / luminance:
            lum = (r * 299 + g * 587 + b * 114) / 1000
            if lum > 250:
                t_rgba_trans.extend([0, 0, 0, 0])
            elif lum < 140:
                # Fully opaque terracotta #8E4F2A
                t_rgba_trans.extend([142, 79, 42, 255])
            else:
                # Anti-aliased edge
                alpha = int(255 * (250 - lum) / (250 - 140))
                alpha = max(0, min(255, alpha))
                t_rgba_trans.extend([142, 79, 42, alpha])

    write_png('livitect-web/public/brand/livitect-logo-terracotta.png', t_w, t_h, bytes(t_rgba_trans))
    write_png('livitect-web/public/brand/livitect-logo-light.png', t_w, t_h, bytes(t_rgba_white))

    # ----------------------------------------------------
    # 3. WHITE LOGO (Logo 1) on Terracotta / Transparent
    # Bounds: X: 48 to 498, Y: 72 to 416
    # ----------------------------------------------------
    w_pad = 6
    w_x0 = 49 - w_pad
    w_y0 = 74 - w_pad
    w_x1 = 496 + w_pad
    w_y1 = 414 + w_pad
    w_w = w_x1 - w_x0 + 1
    w_h = w_y1 - w_y0 + 1

    w_rgba_bg = bytearray()
    w_rgba_trans = bytearray()

    # Terracotta bg is around (143, 69, 32), white strokes are (255, 255, 255)
    for y in range(w_y0, w_y0 + w_h):
        for x in range(w_x0, w_x0 + w_w):
            r, g, b = get_pixel(x, y)
            w_rgba_bg.extend([r, g, b, 255])
            
            # Transparency: if pixel is close to white (lum > 220), alpha=255
            # If close to terracotta bg (r < 165, g < 95, b < 55), alpha=0
            # Interpolate for smooth edges
            lum = (r * 299 + g * 587 + b * 114) / 1000
            # Terracotta bg lum is around ~85-95, white is ~255
            if lum < 105:
                w_rgba_trans.extend([0, 0, 0, 0])
            elif lum > 210:
                w_rgba_trans.extend([255, 255, 255, 255])
            else:
                alpha = int(255 * (lum - 105) / (210 - 105))
                alpha = max(0, min(255, alpha))
                w_rgba_trans.extend([255, 255, 255, alpha])

    write_png('livitect-web/public/brand/livitect-logo-white.png', w_w, w_h, bytes(w_rgba_trans))
    write_png('livitect-web/public/brand/livitect-logo-terracotta-bg.png', w_w, w_h, bytes(w_rgba_bg))

if __name__ == '__main__':
    process()
