import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const Map = ({ center }: { center: [number, number] | null }) => {
    return (
        <div className="h-[500px]">
            <MapContainer
                className="h-full"
                center={center || [0, 0]}
                zoom={center ? 4 : 0}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                {center && (
                    <Marker
                        position={center}
                        icon={
                            new Icon({
                                iconUrl: '/images/map-pin.png',
                                iconSize: [38, 38],
                            })
                        }
                    />
                )}
            </MapContainer>
        </div>
    )
}

export default Map
