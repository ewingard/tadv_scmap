from bs4 import BeautifulSoup

def convert_coords_to_path(coords, shape):
    coords_list = list(map(int, coords.split(',')))
    if shape == "poly":
        path_data = ' '.join(f"L{x},{y}" for x, y in zip(coords_list[::2], coords_list[1::2]))
        return f"M{path_data[1:]} Z"
    # you can add cases for other shapes like `rect` or `circle` if needed
    return ""

def html_map_to_svg(html_file, svg_file):
    with open(html_file, 'r') as file:
        soup = BeautifulSoup(file, 'html.parser')

    svg_content = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">\n'
    
    for area in soup.find_all('area'):
        shape = area.get('shape')
        coords = area.get('coords')
        title = area.get('title', 'Untitled')
        
        if shape == "poly":  # only handling polygons for now
            path_data = convert_coords_to_path(coords, shape)
            svg_content += f'  <!-- {title} -->\n  <path d="{path_data}" fill="none" stroke="black"/>\n'
    
    svg_content += '</svg>'
    
    with open(svg_file, 'w') as file:
        file.write(svg_content)

# example usage
html_map_to_svg('image_map.html', 'output.svg')
