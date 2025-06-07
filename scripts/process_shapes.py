import json
import math
import numpy as np

def compress_point(point):
    return [round(point[0], 2), round(point[1], 2)]


def distance_point_line_segment(point, p1, p2):
    point = np.array(point, dtype=float)
    p1 = np.array(p1, dtype=float)
    p2 = np.array(p2, dtype=float)

    line_vec = p2 - p1
    pnt_vec = point - p1
    line_len = np.linalg.norm(line_vec)
    line_unitvec = line_vec / line_len
    pnt_vec_scaled = pnt_vec / line_len
    t = np.dot(line_unitvec, pnt_vec_scaled)
    if t < 0.0:
        t = 0.0
    elif t > 1.0:
        t = 1.0
    nearest = line_vec * t
    dist = np.linalg.norm(pnt_vec - nearest)
    return dist


def find_farthest_point_index(points, p1, p2):
    if (len(points) == 1):
        return 0
        
    max_dist = -math.inf
    farthest_index = None
    for i in range(len(points)):
        point = points[i]
        dist = distance_point_line_segment(point, p1, p2)
        if dist > max_dist:
            max_dist = dist
            farthest_index = i
    return farthest_index, max_dist


def ramer_douglas_peucker_step(start, end, points):
    if (len(points) == 0): 
        return []
    if (len(points) == 1):
        return [points[0]]

    mid_index, max_dist = find_farthest_point_index(points, start, end)

    if (max_dist < .05):
        return []

    mid = points[mid_index]
    start_mid = points[0:mid_index]
    mid_end = points[mid_index:]

    newPoints = ramer_douglas_peucker_step(start, mid, start_mid)
    newPoints += [mid]
    newPoints += ramer_douglas_peucker_step(mid, end, mid_end)

    return newPoints


def ramer_douglas_peucker(shape):
    start = shape[0]
    end = shape[1]
    shape.remove(start)
    shape.remove(end)
    newShape = ramer_douglas_peucker_step(start, end, shape)
    return newShape

def compress_shape(shape):
    return list(map(compress_point, ramer_douglas_peucker(shape)))


def compress_shapes(shapes):
    return list(filter(lambda shape : len(shape) > 2, map(compress_shape, shapes)))


def main():
    with open("country_shapes.json", "r") as file:
        shape_data = json.load(file)

    for country in shape_data:
        del country["geo_point_2d"]
        del country["join_name"]
        geometry = country["geo_shape"]["geometry"]

        if (geometry["type"] == "Polygon"):
            geometry["coordinates"] = list(map(compress_shape, geometry["coordinates"]))
        elif (geometry["type"] == "MultiPolygon"):
            geometry["coordinates"] = list(map(compress_shapes, geometry["coordinates"]))

    with open("../site/app/data/country_shapes.json", "w") as file:
        json.dump(shape_data, file, separators=(',', ':'))



if __name__ == "__main__":
    main()