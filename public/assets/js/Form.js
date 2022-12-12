
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ltr: "",
            date: "",
            colis: "",
            escale: "",

            nom_exp: "",
            prenom_exp: "",
            num_exp: "",
            email_exp: "",

            nom_rec: "",
            prenom_rec: "",
            num_rec: "",
            email_rec: "",

            poids: "",
            prix: "",
            observation: "",
            bus: "",
            code_colis: "",
            type: "",
            buses: []
        }
    }

    handleTypeChange(e) {
        this.setState({
            type: e.target.value,
    });
    }

    handleCodeChange(e) {
        this.setState({
            code_colis: e.target.value,
    });
    }

    handleBusChange(e) {
        this.setState({
            bus: e.target.value,
    });
    }

    handleObservationChange(e) {
        this.setState({
            observation: e.target.value,
    });
    }

    handlePrixChange(e) {
        this.setState({
            prix: e.target.value,
    });
    }

    handlePoidsChange(e) {
        this.setState({
            poids: e.target.value
        });

        // axios.get('filter-bus')
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             buses: response.data.usedBus.filter((row) => {
        //                 return row.poids_bus > e.target.value
        //             })
        //         })

        //         axios.get('filter-empty-bus')
        //             .then(response => {
        //                 console.log(response)
        //                 this.setState((state) => ({
        //                     buses: state.buses.concat(response.data.emptyBus.filter((row) => {
        //                         return row.poids_bus > e.target.value
        //                     }))
        //                 }))
                        
        //             })
        //             .catch(response => {
        //                 console.log(response);   
        //             });
                
        //     })
        //     .catch(response => {
        //         console.log(response);
        //     });
        
        
    }

    handleEmailrecChange(e) {
        this.setState({
            email_rec: e.target.value,
    });
    }

    handleNumrecChange(e) {
        this.setState({
            num_rec: e.target.value,
    });
    }

    handlePrecChange(e) {
        this.setState({
            prenom_rec: e.target.value,
    });
    }

    handleNrecChange(e) {
        this.setState({
            nom_rec: e.target.value,
    });
    }

    handleEmailexpChange(e) {
        this.setState({
            email_exp: e.target.value,
    });
    }

    handleNumexpChange(e) {
        this.setState({
            num_exp: e.target.value,
    });
    }

    handlePexpChange(e) {
        this.setState({
            prenom_exp: e.target.value,
    });
    }

    handleNexpChange(e) {
        this.setState({
            nom_exp: e.target.value,
    });
    }

    handleEscaleChange(e) {
        this.setState({
            escale: e.target.value,
    });
    }

    handleColisChange(e) {
        this.setState({
            colis: e.target.value,
    });
    }

    handleDateChange(e) {
        this.setState({
            date: e.target.value,
    });
    }

    handleLtrChange(e) {
        this.setState({
            ltr: e.target.value,
    });
    }

    loadBus = () => {
        axios.get('/load-bus')
            .then(response => {
                console.log(response);
                this.setState({
                    buses: response.data.allResults
                });
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidMount = () => {
        const d = new Date();

        const day = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        const hours = d.getHours();
        const minutes = d.getMinutes();

        this.setState({
            date: `${year}-${month}-${day}T${hours}:${minutes}`
        });

        this.loadBus();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        axios.get('/register-form', {
            params: {
                'colisseur': this.state.colis,
                'escale': this.state.escale,
                'name1': this.state.nom_exp,
                'first-name1': this.state.prenom_exp,
                'numero1': this.state.num_exp,
                'email1': this.state.email_exp,
                'name2': this.state.nom_rec,
                'first-name2': this.state.prenom_rec,
                'numero2': this.state.num_rec,
                'email2': this.state.email_rec,
                'poids': this.state.poids,
                'prix': this.state.prix,
                'description': this.state.observation,
                'bus': this.state.bus,
                'code': this.state.code_colis,
                'type': this.state.type
            }
        })
            .then(response => {
                console.log(response);
                document.location.href = "/load-pdf/" + response.data.id;

                this.setState({
                    colis: '',
                    escale: '',
                    nom_exp: '',
                    prenom_exp: '',
                    num_exp: '',
                    email_exp: '',
                    nom_rec: '',
                    prenom_rec: '',
                    num_rec: '',
                    email_rec: '',
                    poids: '',
                    prix: '',
                    observation: '',
                    bus: '',
                    code_colis: '',
                    type: ''
                });
            })
            .catch(error => {
                console.log(error);
            });

        

    }

    render() {
        return (
            <div>
                <form class="container px-4 rounded-3">
                    <div class="row gx-md-5 gy-2">
                        <fieldset>
                            <div class="row g-2">
                                <div class="col-md">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" disabled onChange={(e) => this.handleLtrChange(e)} value={this.state.ltr} id="floatingInputGrid" placeholder="nom" />
                                        <label for="floatingInputGrid">N° LTR</label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-floating">
                                        <input type="datetime-local" class="form-control" onChange={(e) => this.handleDateChange(e)} value={this.state.date} id="floatingInputGrid" placeholder="prenom.com" />
                                        <label for="floatingInputGrid">Date</label>
                                    </div>
                                    </div>
                                    <div class="col-md">
                                    <div class="form-floating">
                                        <input type="text"  name="colisseur" class="form-control" onChange={(e) => this.handleColisChange(e)} value={this.state.colis} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Colisseur</label>
                                    </div>
                                    </div>
                                    <div class="col-md">
                                    <div class="form-floating">
                                        <input type="text" name="escale" class="form-control" onChange={(e) => this.handleEscaleChange(e)} value={this.state.escale} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Escale</label>
                                    </div>
                                    </div>
                                </div>
                        </fieldset>
                        <fieldset class="col-6">
                            <legend class="w-auto fs-5">Expéditeur</legend>
                            <div class="row g-2">
                                <div>
                                    <div class="form-floating">
                                        <input type="text" name="name1" class="form-control" onChange={(e) => this.handleNexpChange(e)} value={this.state.nom_exp} id="floatingInputGrid" placeholder="nom" />
                                        <label for="floatingInputGrid">Nom</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-floating">
                                        <input type="text" name="first-name1" class="form-control" onChange={(e) => this.handlePexpChange(e)} value={this.state.prenom_exp} id="floatingInputGrid" placeholder="prenom.com" />
                                        <label for="floatingInputGrid">Prenom</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-floating">
                                        <input type="text" name="numero1" class="form-control" onChange={(e) => this.handleNumexpChange(e)} value={this.state.num_exp} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Numero</label>
                                    </div>
                                </div>
                                <div    >
                                    <div class="form-floating">
                                        <input type="text" name="email1" class="form-control" onChange={(e) => this.handleEmailexpChange(e)} value={this.state.email_exp} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Email</label>
                                    </div>
                                </div>
                                </div>
                        </fieldset>
                        <fieldset class="col-6 border-start">
                            <legend class="w-auto fs-5">Destinataire</legend>
                            <div class="row g-2">
                                <div>
                                <div class="form-floating">
                                    <input type="text" name="name2" class="form-control" onChange={(e) => this.handleNrecChange(e)} value={this.state.nom_rec} id="floatingInputGrid" placeholder="nom" />
                                    <label for="floatingInputGrid">Nom</label>
                                </div>
                                </div>
                                <div>
                                    <div class="form-floating">
                                    <input type="text" name="first-name2" class="form-control" onChange={(e) => this.handlePrecChange(e)} value={this.state.prenom_rec} id="floatingInputGrid" placeholder="prenom.com" />
                                    <label for="floatingInputGrid">Prenom</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-floating">
                                    <input type="text" name="numero2" class="form-control" onChange={(e) => this.handleNumrecChange(e)} value={this.state.num_rec} id="floatingInputGrid" placeholder="lieu" />
                                    <label for="floatingInputGrid">Numero</label>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-floating">
                                    <input type="text" name="email2" class="form-control" onChange={(e) => this.handleEmailrecChange(e)} value={this.state.email_rec} id="floatingInputGrid" placeholder="lieu" />
                                    <label for="floatingInputGrid">Email</label>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div>
                        <hr />
                        </div>
                        <fieldset>
                            <div class="row g-2">
                                <div class="col-md-6">
                                    <div class="form-floating">
                                        <input type="number" name="poids" class="form-control" onChange={(e) => this.handlePoidsChange(e)} value={this.state.poids} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Poids</label>
                                    </div>
                                    <div class="form-floating mt-2">
                                        <input type="text" name="prix" class="form-control" onChange={(e) => this.handlePrixChange(e)} value={this.state.prix} id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Prix</label>
                                    </div>
                                    <div class="form-floating mt-2">
                                        <textarea name="description" id="floatingInputGrid" onChange={(e) => this.handleObservationChange(e)} value={this.state.observation} cols="30" rows="10" class="form-control"></textarea>
                                        <label for="floatingInputGrid">Observation</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-floating">
                                    <select class="form-select" onChange={(e) => this.handleBusChange(e)} value={this.state.bus} name="bus" id="floatingSelectGrid" aria-label="Floating label select">
                                        <option selected>Sélectionnez</option>
                                        {
                                            this.state.buses.map((row) => (
                                                <option value={row.id_bus} key={row.id_bus}>Bus {row.num_bus + ' ' + row.source + '-' + row.dest}</option>
                                            ))
                                        }
                                    </select>
                                    <label for="floatingSelectGrid">Bus</label>
                                    </div>
                                    <div class="form-floating mt-2">
                                    <input type="text" name="code" class="form-control" disabled onChange={(e) => this.handleCodeChange(e)} value={this.state.code_colis} id="floatingInputGrid" placeholder="lieu" />
                                    <label for="floatingInputGrid">Code colis</label>
                                    </div>
                                    <div class="form-floating mt-2">
                                    <input type="text" name="type" class="form-control" onChange={(e) => this.handleTypeChange(e)} value={this.state.type} id="floatingInputGrid" placeholder="lieu" />
                                    <label for="floatingInputGrid">Type</label>
                                    </div>
                                </div>
                                </div>
                        </fieldset>
                    </div>
                    <div class="d-flex justify-content-center my-3">
                        <div>
                        <button type="reset" class="btn text-white fw-bold disabled" style={{backgroundColor: '#195490'}}>Annuler</button>
                        <button onClick={(e) => this.handleSubmit(e)} class="btn text-white fw-bold ms-3" style={{backgroundColor: '#195490'}}>Enregistrer</button>                    
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

ReactDOM.createRoot(document.getElementById("form")).render(<Form />);