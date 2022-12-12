

function App() {

    React.useEffect(() => {
        console.log("Je suis là");
        navigator.geolocation.watchPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);

          axios.get('/update-pos/' + bus + '/' + position.coords.longitude + '/' + position.coords.latitude)
                                .then(response => {
                                    const metre = Math.sqrt(Math.pow((response.data.bus.lat - response.data.bus.init_lat), 2) + Math.pow((response.data.bus.long - response.data.bus.init_long), 2)) * 111.139;
                                    console.log(metre);
                                    if (metre >= 0 && (response.data.bus.voyage == 1)) {
                                        axios.get('/sending-sms', {
                                            params : {
                                                'transId' : response.data.bus.id_bus
                                            }
                                        })
                                        .then(response => {
                                                console.log(response);
                                                document.location.href = "/";
                                        })
                                        .catch(error => console.log(error));
                                    }
                                })
                                .catch(error => console.log(error));
        });
        if (navigator.geolocation) {
        }
    })

    return (
        <div class="d-flex justify-content-center align-items-center">
            <span>Votre Bus</span>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);