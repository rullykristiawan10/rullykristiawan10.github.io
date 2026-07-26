import sys
from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # Using a threshold to detect white or near-white background
    threshold = 240
    for item in datas:
        # item is (R, G, B, A)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # Replace white/near-white pixels with transparent
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        remove_background(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python remove_bg.py <input> <output>")
