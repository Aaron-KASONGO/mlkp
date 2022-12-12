const { 
    Marker, 
    Map: LeafletMap,
    Popup, 
    TileLayer, 
    Circle } = ReactLeaflet;

// const customIcon = new L.Icon({
//         iconUrl: url,
//         iconSize: new L.Point(60, 75),
// });

class Map extends React.Component {
    render() {

		const position = [-11.6, 27.4];
		const current = [bus.lat, bus.long];
        return (
			<div>
                {
                    console.log(bus)
                }
                <LeafletMap center={position} zoom={8} attributionControl={false}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    detectRetina={true}
                    maxZoom={18}
                    />
                    {
						current[0] ?
						(
							<div>
								<Circle center={current} fillColor="blue" radius={200} />
								<Marker position={current}>
									<Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
								</Marker>
							</div>
						): ''
					}
                </LeafletMap>
            </div>
        )
    }
}

ReactDOM.createRoot(document.getElementById("page-top")).render(<Map />);