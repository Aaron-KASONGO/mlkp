
const Router = window.ReactRouterDOM.BrowserRouter;
const Link = window.ReactRouterDOM.Link;
const Route = window.ReactRouterDOM.Route;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;

const {
	colors,
	Typography,
	Container,
	Box,
	SvgIcon,
	Button,
	TableContainer,
	Tab,
	Tabs,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Modal,
	TextField
  } = MaterialUI;

const { 
    Marker, 
    Map: LeafletMap,
    Popup, 
    TileLayer, 
    Circle } = ReactLeaflet;




function Profile() {

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	  };

	const [value, setValue] = React.useState(0);

	const [users, setUsers] = React.useState([]);

	const [buses, setBuses] = React.useState([]);

	const [open, setOpen] = React.useState(false);


	// Etats de formulaire

	const [num, setNum] = React.useState('');
	const [parcours1, setParcours1] = React.useState('');
	const [parcours2, setParcours2] = React.useState('');
	const [poids, setPoids] = React.useState(0);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const loadUsers = () => {
		axios.get('/get-users')
			.then(response => {
				setUsers(response.data.users);
				setBuses(response.data.buses);
			})
			.catch(error => console.log(error));
	}

	const addUser = (e) => {
		e.preventDefault();
		axios.get('/register-bus', {
			params : {
				'num_bus': num,
				'parcours1': parcours1,
				'parcours2': parcours2,
				'poids': poids
			}
		}).then(response => {
				setNum('');
				setParcours1('');
				setParcours2('');
				setPoids(0);
				console.log(response);
		}).catch(error => console.log(error));
	}

	React.useEffect(() => {
		// Met à jour le titre du document via l’API du navigateur
		loadUsers();
	  });
	
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const launch = (e, idBus) => {
		e.preventDefault();
		axios.get('/launch', {
			params : {
				'idBus': idBus
			}
		}).then(response => {
				console.log(response);
		}).catch(error => console.log(error));
	}
	
	return (
		<div>
			<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label="Utilisateurs" />
					<Tab label="Bus(Tracker)" />
				</Tabs>
			</Box>
			<Box sx={value==0 ? { width: '100%', bgcolor: 'background.paper'}: { width: '100%', bgcolor: 'background.paper', display: 'none'}}>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Nom d'utilisateur</TableCell>
							<TableCell align="right">Active Date</TableCell>
							<TableCell align="right">Creation</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
							{users.map((row) => (
								<TableRow
								key={row.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
								<TableCell component="th" scope="row">
									{row.id}
								</TableCell>
								<TableCell align="right">{row.username}</TableCell>
								<TableCell align="right">{row.last_active}</TableCell>
								<TableCell align="right">{row.created_at}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Box sx={value==1 ? { width: '100%', bgcolor: 'background.paper'}: { width: '100%', bgcolor: 'background.paper', display: 'none'}}>
			<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Numero Bus</TableCell>
							<TableCell align="right">Poids</TableCell>
							<TableCell align="right">Parcours</TableCell>
							<TableCell align="right">Voyage</TableCell>
							<TableCell align="right">Lancer</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
							{buses.map((row) => (
								<TableRow
								key={row.id_bus}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.id_bus}
									</TableCell>
									<TableCell align="right">{row.num_bus}</TableCell>
									<TableCell align="right">{row.poids_bus}</TableCell>
									<TableCell align="right">{row.source + '-' + row.dest}</TableCell>
									<TableCell align="right">{parseInt(row.voyage) ? "En route" : "Arrêt"}</TableCell>
									<TableCell align="right"><Button onClick={(e) => launch(e, row.id_bus)} variant={parseInt(row.voyage) ? "outlined" : "contained"}>Lancer</Button></TableCell>
								</TableRow>
							))}
							<Button onClick={handleOpen} variant="contained" sx={{ m: 2}}>Ajouter</Button>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h5" component="h2" centered>
									Nouveau Bus
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						<div class="form-floating mb-2">
							<input type="text" name="num_bus" onChange={(e) => setNum(e.target.value)} value={num} class="form-control" id="floatingInputGrid" placeholder="nom" />
							<label for="floatingInputGrid">Numero Bus</label>
						</div>
						<div class="form-floating mb-2">
							<input type="text" name="source" onChange={(e) => setParcours1(e.target.value)} value={parcours1} class="form-control" id="floatingInputGrid" placeholder="nom" />
							<label for="floatingInputGrid">Parcours 1</label>
						</div>
						<div class="form-floating mb-2">
							<input type="text" name="dest" onChange={(e) => setParcours2(e.target.value)} value={parcours2} class="form-control" id="floatingInputGrid" placeholder="nom" />
							<label for="floatingInputGrid">Parcours 2</label>
						</div>
						<div class="form-floating mb-2">
							<input type="number" name="poids_bus" onChange={(e) => setPoids(e.target.value)} value={poids} class="form-control" id="floatingInputGrid" placeholder="nom" />
							<label for="floatingInputGrid">poids</label>
						</div>
					</Typography>
					<button onClick={addUser} class="btn btn-primary">Créer</button>
				</Box>
			</Modal>
		</div>
	);
}

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			value: '',
			bus: {}
		}
	}

	showPos = (e) => {
		e.preventDefault();
		axios.get('/get-pos/' + this.state.value)
			.then(response => {
				this.setState({
					data: response.data.bus
				});
				console.log(response);
			})
			.catch(error => console.log(error));
		this.setState({
			value: ''
		})
		console.log(this.state.value);
	}

	componentDidMount = () => {
		axios.get('/verify')
					.then(response => {
						if (response.data.verify) {
							navigator.geolocation.getCurrentPosition(function(position) {
								console.log("Latitude is :", position.coords.latitude);
								console.log("Longitude is :", position.coords.longitude);
								axios.get('/update-pos/' + response.data.verify.id_bus + '/' + position.coords.longitude + '/' + position.coords.latitude)
									.then(response => {
										console.log(response);
									})
									.catch(error => console.log(error));
							});
						}
						console.log(response);
					})
					.catch(error => console.log(error));
	}

	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	}

    render() {

		const position = [-11.6, 27.4];
		const current = [this.state.data.lat, this.state.data.long]
        return (
			<div>
				<div className="d-flex justify-content-between mb-1">
					<h3 className="text-dark mb-1">Carte</h3>
					<form onSubmit={(e) => this.showPos(e)} class="d-none d-sm-inline-block ms-md-3 my-2 my-md-0 mw-100 navbar-search shadow">
						<div class="input-group"><input class="bg-light form-control border-0 small" value={this.state.value} onChange={(e) => this.handleChange(e)} type="text" placeholder="Code"/>
						<button class="btn btn-primary py-0"  type="submit"><i class="fas fa-search"></i></button></div>
					</form>
				</div>
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

class TableIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	update = () => {
		axios.get('/load-data')
			.then(response => {
				this.setState({
					data: response.data.allResults
				});
			})
			.catch(error => console.log(error));
	}

	delete = (id) => {
		axios.get('/delete/' + id)
			.then(response => {
				console.log(response);
				this.update();
			})
			.catch(error => console.log(error));
		console.log(id);

	}

	componentDidMount = () => {
		this.update();
	}

	render() {
		return (
			<div>
				<h3 class="text-dark mb-4">Tableau en Cours</h3>
				<div class="card shadow">
					<div class="card-header py-3">
						<p class="text-primary m-0 fw-bold">Tranfères</p>
					</div>
					<div class="card-body">
						<div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
							<table class="table my-0" id="dataTable">
								<thead>
									<tr>
										<th>Expéditeur</th>
										<th>Recepteur</th>
										<th>Bus</th>
										<th>Source</th>
										<th>Destination</th>
										<th>date Expédition</th>
									</tr>
								</thead>
								<tbody>
								{
										this.state.data.length ?
										(
											this.state.data.map((value, index) => (
												<tr key={index}>
													<td>{value.prenom_exp + ' ' + value.nom_exp}</td>
													<td>{value.prenom_rec + ' ' + value.nom_rec}</td>
													<td>{value.num_bus}</td>
													<td>{value.source}</td>
													<td>{value.destination}</td>
													<td>{value.date_exp}</td>
													<td><a onClick={() => this.delete(value.id_trans)} className="btn btn-primary btn-sm">supprimer</a></td>
												</tr>
											))
										) :
										(
											<tr><td colspan="7"><h3 className="text-center text-muted">Rien à afficher !</h3></td></tr>
										)
									}
								</tbody>
								<tfoot>
									<tr>
										<td><strong>Expéditeur</strong></td>
										<td><strong>Recepteur</strong></td>
										<td><strong>Bus</strong></td>
										<td><strong>Source</strong></td>
										<td><strong>Destination</strong></td>
										<td><strong>Date Expédition</strong></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div class="row">
							<div class="col-md-6 align-self-center">
								<p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Transfères</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Sended extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	update = () => {
		axios.get('/load-data-false')
			.then(response => {
				this.setState({
					data: response.data.allResults
				});
			})
			.catch(error => console.log(error));
	}

	delete = (id) => {
		axios.get('/delete/' + id)
			.then(response => {
				console.log(response);
				this.update();
			})
			.catch(error => console.log(error));
		console.log(id);
	}

	componentDidMount = () => {
		this.update();
	}

	render() {
		return (
			<div>
				<h3 class="text-dark mb-4">Tableau Livrés</h3>
				<div class="card shadow">
					<div class="card-header py-3">
						<p class="text-primary m-0 fw-bold">Tranfères</p>
					</div>
					<div class="card-body">
						<div class="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
							<table class="table my-0" id="dataTable">
								<thead>
									<tr>
										<th>Expéditeur</th>
										<th>Recepteur</th>
										<th>Bus</th>
										<th>Source</th>
										<th>Destination</th>
										<th>date Expédition</th>
										<th>date Reception</th>
									</tr>
								</thead>
								<tbody>
									{
										this.state.data.length ?
										(
											this.state.data.map((value, index) => (
												<tr key={index}>
													<td>{value.prenom_exp + ' ' + value.nom_exp}</td>
													<td>{value.prenom_rec + ' ' + value.nom_rec}</td>
													<td>{value.num_bus}</td>
													<td>{value.source}</td>
													<td>{value.destination}</td>
													<td>{value.date_exp}</td>
													<td>{value.date_rec}</td>
													<td><a onClick={() => this.delete(value.id_trans)} className="btn btn-primary btn-sm">supprimer</a></td>
												</tr>
											))
										) :
										(
											<tr><td colspan="8"><h3 className="text-center text-muted">Rien à afficher !</h3></td></tr>
										)
									}
								</tbody>
								<tfoot>
									<tr>
										<td><strong>Expéditeur</strong></td>
										<td><strong>Recepteur</strong></td>
										<td><strong>Bus</strong></td>
										<td><strong>Source</strong></td>
										<td><strong>Destination</strong></td>
										<td><strong>Date Expédition</strong></td>
										<td><strong>Date Reception</strong></td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div class="row">
							<div class="col-md-6 align-self-center">
								<p id="dataTable_info" class="dataTables_info" role="status" aria-live="polite">Transfères</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			compt: 0,
			compte: 0,
			open: false,
			report: [],
			reportFalse: []
		}
	}

	update = () => {
		axios.get('/load-data-all')
			.then(response => {
				
				this.setState({
					data: response.data.allResults
				});
				console.log(response);
			})
			.catch(error => console.log(error));

		axios.get('/load-count-data')
			.then(response => {
				console.log(response);
				this.setState({
					compt: response.data.counted[0].count
				})
			})
			.catch(error => console.log(error));

		axios.get('/load-count')
			.then(response => {
				console.log(response);
				this.setState({
					compte: response.data.count[0].count
				})
			})
			.catch(error => console.log(error));

		axios.get('/get-report')
			.then(response => {
				console.log(response);
				this.setState({
					report: response.data.report
				});
			})
			.catch(error => console.log(error));
		
		axios.get('/get-report-1')
			.then(response => {
				console.log(response);
				this.setState({
					reportFalse: response.data.report1
				});
			})
			.catch(error => console.log(error));
	}

	handleOpen = () => {
		this.setState({
			open: true
		});
	}

	handleClose = () => {
		this.setState({
			open: false
		});
	}

	componentDidMount = () => {
		this.update();
	}

	render() {
		const style = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 750,
			bgcolor: 'background.paper',
			border: '2px solid #000',
			boxShadow: 24,
			p: 4,
		  };

		return (
			<div>
				<div class="pagetitle">
					<h1>Tableau de bord</h1>
					<nav>
						<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
						<li class="breadcrumb-item active">Tableau de bord</li>
						</ol>
					</nav>
					</div>
					{/* <!-- End Page Title --> */}

					<section class="section dashboard">
					<div class="row">

						{/* <!-- Left side columns --> */}
						<div class="col-lg-8">
						<div class="row">

							{/* <!-- Sales Card --> */}
							<div class="col-xxl-4 col-md-6">
							<div class="card info-card sales-card">

								<div class="card-body">
								<h5 class="card-title">Colis Arrivés <span>| Ajourd'hui</span></h5>

								<div class="d-flex align-items-center">
									<div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
									<i class="bi bi-send-check"></i>
									</div>
									<div class="ps-3">
									<h6>{this.state.compt}</h6>
									{/* <span class="text-success small pt-1 fw-bold">12%</span> <span class="text-muted small pt-2 ps-1">des colis</span> */}

									</div>
								</div>
								</div>

							</div>
							</div>
							{/* <!-- End Sales Card --> */}

							{/* <!-- Revenue Card --> */}
							<div class="col-xxl-4 col-md-6">
							<div class="card info-card revenue-card">

								<div class="card-body">
								<h5 class="card-title">Colis en cours <span>| Ajourd'hui</span></h5>

								<div class="d-flex align-items-center">
									<div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
									<i class="bi bi-send-exclamation"></i>
									</div>
									<div class="ps-3">
									<h6>{this.state.compte}</h6>
									{/* <span class="text-success small pt-1 fw-bold">8%</span> <span class="text-muted small pt-2 ps-1">des colis</span> */}

									</div>
								</div>
								</div>

							</div>
							</div>
							{/* <!-- End Revenue Card --> */}

							{/* <!-- Recent Sales --> */}
							<div class="col-12">
							<div class="card recent-sales overflow-auto">

								<div class="card-body">
								<h5 class="card-title">Colis Récents</h5>

								<table class="table table-borderless datatable">
									<thead>
									<tr>
										<th scope="col">Code</th>
										<th scope="col">Nom</th>
										<th scope="col">Bus</th>
										<th scope="col">Poids</th>
										<th scope="col">Status</th>
									</tr>
									</thead>
									<tbody>
										{
											this.state.data.map((v) => (
												<tr key={v.code}>
													<td>{v.code}</td>
													<td>{v.nom_exp + " " + v.prenom_exp}</td>
													<td>{v.num_bus}</td>
													<td>{v.poids_bus}</td>
													<td>{(v.trans == 1) ? (<span class="badge bg-warning">En cours</span>) : (<span class="badge bg-success">Effectué</span>)}</td>
												</tr>
											))
										}
									</tbody>
								</table>

								</div>

							</div>
							</div>
							{/* <!-- End Recent Sales --> */}

						</div>
						</div>
						{/* <!-- End Left side columns --> */}

						{/* <!-- Right side columns --> */}
						<div class="col-lg-4">

						{/* <!-- Recent Activity --> */}
						<div class="card">
							{/* <div class="filter">
							<a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
							<ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
								<li class="dropdown-header text-start">
								<h6>Filter</h6>
								</li>

								<li><a class="dropdown-item" href="#">Today</a></li>
								<li><a class="dropdown-item" href="#">This Month</a></li>
								<li><a class="dropdown-item" href="#">This Year</a></li>
							</ul>
							</div> */}

							<div class="card-body">
							<h5 class="card-title">Rapport <span>| Ajourd'hui</span></h5>
								<Button onClick={() => this.handleOpen()} variant="outlined">RAPPORT D'AUJOURD'HUI</Button>
								<Modal
									open={this.state.open}
									onClose={() => this.handleClose()}
									aria-labelledby="modal-modal-title"
									aria-describedby="modal-modal-description"
								>
									<Box sx={style}>
										<Typography id="modal-modal-title" variant="h4" component="h2">
											Rapport de la journée
										</Typography>
										<TableContainer component={Paper}>
											<Table sx={{ minWidth: 650 }} aria-label="simple table">
												<TableHead>
												<TableRow>
													<TableCell align="center" colSpan={5}>
														<Typography variant="h6">Bus En cours</Typography>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>ID</TableCell>
													<TableCell align="right">Numero</TableCell>
													<TableCell align="right">Nombre de colis</TableCell>
													<TableCell align="right">Total de Gain</TableCell>
													<TableCell align="right">Poids total tranporté</TableCell>
												</TableRow>
												</TableHead>
												<TableBody>
												{this.state.report.map((row) => (
													<TableRow
													key={row.id_bus}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
													<TableCell component="th" scope="row">
														{row.id_bus}
													</TableCell>
													<TableCell align="right">{row.num_bus}</TableCell>
													<TableCell align="right">{row.nombre}</TableCell>
													<TableCell align="right">{row.poids}</TableCell>
													<TableCell align="right">{row.total}</TableCell>
													</TableRow>
												))}
												</TableBody>
											</Table>
											<Table sx={{ minWidth: 650 }} aria-label="simple table">
												<TableHead>
												<TableRow>
													<TableCell align="center" colSpan={5}>
														<Typography variant="h6">Bus Arrivés</Typography>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>ID</TableCell>
													<TableCell align="right">Numero</TableCell>
													<TableCell align="right">Nombre de colis</TableCell>
													<TableCell align="right">Total de Gain</TableCell>
													<TableCell align="right">Poids total tranporté</TableCell>
												</TableRow>
												</TableHead>
												<TableBody>
												{this.state.reportFalse.map((row) => (
													<TableRow
													key={row.id_bus}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
													>
													<TableCell component="th" scope="row">
														{row.id_bus}
													</TableCell>
													<TableCell align="right">{row.num_bus}</TableCell>
													<TableCell align="right">{row.nombre}</TableCell>
													<TableCell align="right">{row.poids}</TableCell>
													<TableCell align="right">{row.total}</TableCell>
													</TableRow>
												))}
												</TableBody>
											</Table>
										</TableContainer>
									</Box>
								</Modal>
							<div class="activity">

								
								{/* <!-- End activity item--> */}

							</div>

							</div>
						</div>
						{/* <!-- End Recent Activity --> */}

						</div>
						{/* <!-- End Right side columns --> */}

					</div>
				</section>
			</div>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dashboar: 1,
			map: 0,
			tables: 0,
			profil: 0,
			notifications: []
		}
	}

	getNotifs = () => {
		axios.get('/get-notifs')
			.then(response => {
				this.setState({
					notifications: response.data.messages
				})
			})
			.catch(error => console.log(error));
	}

	componentDidMount = () => {
		this.timeID = setInterval(
			() => this.getNotifs(),
			1000
		  );
	}

	componentWillUnmount = () => {
		clearInterval(this.timeID);
	}

	changeCollapse = (nb) => {
		if (nb == 1) {
			this.setState({
				dashboar: 1,
				map: 0,
				tables: 0,
				profil: 0
			})
		} else if (nb == 2) {
			this.setState({
				dashboar: 0,
				map: 1,
				tables: 0,
				profil: 0
			})
		} else if (nb == 3) {
			this.setState({
				dashboar: 0,
				map: 0,
				tables: 1,
				profil: 0
			})
		} else if (nb == 4) {
			this.setState({
				dashboar: 0,
				map: 0,
				tables: 0,
				profil: 1
			})
		}
	}
	
	render() {
		return (
			<Router>
					
					{/* <Switch>
						<Route path="/waiting" exact render={(props) => <Dashboard {...props} />} />
						<Route path="/sended" exact render={(props) => <Sended {...props} />} />
						<Route path="/" render={(props) => <Map {...props} />} />
					</Switch> */}
					
				<header id="header" class="header fixed-top d-flex align-items-center">

					<div class="d-flex align-items-center justify-content-between">
					<a href="index.html" class="logo d-flex align-items-center">
						<span class="d-none d-lg-block">Mulykap</span>
					</a>
					</div>
					{/* <!-- End Logo --> */}

					{/* <!-- <div class="search-bar">
					<form class="search-form d-flex align-items-center" method="POST" action="#">
						<input type="text" name="query" placeholder="Search" title="Enter search keyword">
						<button type="submit" title="Search"><i class="bi bi-search"></i></button>
					</form>
					</div>End Search Bar --> */}

					<nav class="header-nav ms-auto">
					<ul class="d-flex align-items-center">

						<li class="nav-item d-block d-lg-none">
						<a class="nav-link nav-icon search-bar-toggle " href="#">
							<i class="bi bi-search"></i>
						</a>
						</li>
						{/* <!-- End Search Icon--> */}


						<li class="nav-item dropdown">

						<a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
							<i class="bi bi-chat-left-text"></i>
							<span class="badge bg-success badge-number">{this.state.notifications.length}</span>
						</a>
						{/* <!-- End Messages Icon --> */}

						<ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
							<li class="dropdown-header">
							You have 3 new messages
							<a href="#"><span class="badge rounded-pill bg-primary p-2 ms-2">Nettoyer</span></a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li class="message-item">
							<a href="#">
								<div>
								<h4>David Elvis</h4>
								<p>Le colis envoyé à Kasesa Hyacinthe est arrivé avec succès à l'agence Mulykap Lubumbashi</p>
								<p>8 hrs. ago</p>
								</div>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li class="message-item">
							<a href="#">
								<div>
								<h4>Kayembe Dan</h4>
								<p>Le colis envoyé à Kunda Fabrice est arrivé avec succès à l'agence Mulykap Lubumbashi</p>
								<p>8 hrs. ago</p>
								</div>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li class="message-item">
							<a href="#">
								<div>
								<h4>Tshikwat Nathan</h4>
								<p>Le colis envoyé à Kawej Excellence est arrivé avec succès à l'agence Mulykap Likasi</p>
								<p>8 hrs. ago</p>
								</div>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

						</ul>
						{/* <!-- End Messages Dropdown Items --> */}

						</li>
						{/* <!-- End Messages Nav --> */}

						<li class="nav-item dropdown pe-3">

						<a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
							{/* <!-- <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"> --> */}
							<span class="d-none d-md-block ps-2">Admin</span>
						</a>
						{/* <!-- End Profile Iamge Icon --> */}

						{/* <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
							<li class="dropdown-header">
							<h6>Kevin Anderson</h6>
							<span>Web Designer</span>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li>
							<a class="dropdown-item d-flex align-items-center" href="users-profile.html">
								<i class="bi bi-person"></i>
								<span>My Profile</span>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li>
							<a class="dropdown-item d-flex align-items-center" href="users-profile.html">
								<i class="bi bi-gear"></i>
								<span>Account Settings</span>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li>
							<a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
								<i class="bi bi-question-circle"></i>
								<span>Need Help?</span>
							</a>
							</li>
							<li>
							<hr class="dropdown-divider"/>
							</li>

							<li>
							<a class="dropdown-item d-flex align-items-center" href="#">
								<i class="bi bi-box-arrow-right"></i>
								<span>Sign Out</span>
							</a>
							</li>

						</ul> */}
						{/* <!-- End Profile Dropdown Items --> */}
						</li>
						{/* <!-- End Profile Nav --> */}

					</ul>
					</nav>
					{/* <!-- End Icons Navigation --> */}

				</header>
				{/* <!-- End Header --> */}

				{/* <!-- ======= Sidebar ======= --> */}
				<aside id="sidebar" class="sidebar">

					<ul class="sidebar-nav" id="sidebar-nav">

					<li class="nav-item">
						<Link class={this.state.dashboar ? 'nav-link' : 'nav-link collapsed'} onClick={() => this.changeCollapse(1)} to="/">
						<i class="bi bi-grid"></i>
						<span>Tableau de bord</span>
						</Link>
					</li>
					{/* <!-- End Dashboard Nav --> */}

					<li class="nav-item">
						<Link class={this.state.map ? 'nav-link' : 'nav-link collapsed'} onClick={() => this.changeCollapse(2)} to="/map">
						<i class="bi bi-map"></i>
						<span>Carte</span>
						</Link>
					</li>
					{/* <!-- End Dashboard Nav --> */}

					<li class="nav-item">
						<a class={this.state.tables ? 'nav-link' : 'nav-link collapsed'} data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
						<i class="bi bi-layout-text-window-reverse"></i><span>Tables</span><i class="bi bi-chevron-down ms-auto"></i>
						</a>
						<ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
						<li>
							<Link onClick={() => this.changeCollapse(3)} to="/table">
							<i class="bi bi-circle"></i><span>colis en cours</span>
							</Link>
						</li>
						<li>
							<Link onClick={() => this.changeCollapse(3)} to="/sended">
							<i class="bi bi-circle"></i><span>Colis envoyés</span>
							</Link>
						</li>
						</ul>
					</li>
					{/* <!-- End Tables Nav --> */}

					<li class="nav-heading">Pages</li>

					<li class="nav-item">
						<Link class={this.state.profil ? 'nav-link' : 'nav-link collapsed'} onClick={() => this.changeCollapse(4)} to="/profile">
							<i class="bi bi-person"></i>
							<span>Profile</span>
						</Link>
					</li>
					{/* <!-- End Profile Page Nav --> */}

					{/* <!-- <li class="nav-item">
						<a class="nav-link collapsed" href="pages-register.html">
						<i class="bi bi-card-list"></i>
						<span>Register</span>
						</a>
					</li>End Register Page Nav --> */}

					<li class="nav-item">
						<a class="nav-link collapsed" href="/logout">
						<i class="bi bi-box-arrow-in-right"></i>
						<span>Deconnexion</span>
						</a>
					</li>
					{/* <!-- End Login Page Nav --> */}

					{/* <!-- <li class="nav-item">
						<a class="nav-link collapsed" href="pages-error-404.html">
						<i class="bi bi-dash-circle"></i>
						<span>Error 404</span>
						</a>
					</li>End Error 404 Page Nav --> */}

					</ul>

				</aside>
				{/* <!-- End Sidebar--> */}

				<main id="main" class="main">
					<Switch>
						<Route path="/sended" exact render={(props) => <Sended {...props} />} />
						<Route path="/map" exact render={(props) => <Map {...props} />} />
						<Route path="/table" exact render={(props) => <TableIn {...props} />} />
						<Route path="/profile" exact render={(props) => <Profile {...props} />} />
						<Route path="/" render={(props) => <Dashboard {...props} />} />
					</Switch>
				</main>
			</Router>
		)
	}
}

ReactDOM.createRoot(document.getElementById("page-top")).render(<App />);

