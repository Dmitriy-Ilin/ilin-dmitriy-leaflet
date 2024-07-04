/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, useMapEvents, Polygon } from 'react-leaflet';
import { useState } from 'react';

const DrawPolygon = () => {
  const [points, setPoints] = useState<any>([]);
  const [polygon, setPolygon] = useState(false);
  const [coordinates, setCoordinates] = useState<string[]>([]);

  useMapEvents({
    click(e) {
      const latlng = [e.latlng.lat, e.latlng.lng];
      setPoints([...points, latlng]);
      setCoordinates((prev) => {
        if (prev.length <= 2) {
          return [...prev, `(${latlng[0].toFixed(6)}, ${latlng[1].toFixed(6)})`];
        } else {
          setCoordinates([]);
          return [];
        }
      });
      if (points.length >= 2) {
        setPolygon(true);
      }
      if (points.length >= 3) {
        // setCoordinates(points.map((point: any) => `(${point[0].toFixed(6)}, ${point[1].toFixed(6)})`));
        setPoints([]);
        setPolygon(false);
      }
    },
  });

  return (
    <div>
      <Polygon positions={[...points]} color="blue" />
      <div className="coordinates-list">
        <p>Координаты:</p>
        <ul>
            {coordinates.map((coordinate, index) => (
                <li 
                    className='coordinates-item' 
                    key={index}
                >
                    {`Точка ${index + 1}: ${coordinate}`}
                </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

const MapComponent = () => {
  return (
    <MapContainer
      center={{ lat: 55.751244, lng: 37.618423 }}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DrawPolygon />
    </MapContainer>
  );
};

export default MapComponent;