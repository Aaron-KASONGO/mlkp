<div class="container-fluid py-5 font-courier fw-bold" style="background-color: #195490;">
    <div class="d-flex flex-column justify-content-center align-items-center vh-100">
        <div class="row">
            <div class="card col-10 offset-1">
            <div class="card-header d-flex">
                <div>
                <img src="https://media-exp1.licdn.com/dms/image/C560BAQHIxF527szgLg/company-logo_200_200/0/1644151080496?e=2147483647&v=beta&t=QxNWltmN4rR4JtIxqDkAveLxXVqlMPcYOZpVEOZr4J4" width="75px" alt="logo" class="img-fluid">
                </div>
                <h4 class="card-title text-center m-auto">Enregistrement de Colis</h4>
            </div>
            <div class="card-body">
                <?= session()->getFlashdata('error') ?>
                <?php $validation = service('validation'); ?>
                <div id="form">
                    <!-- <form method="post" action="/register-form" class="container px-4 rounded-3">
                        <?= csrf_field() ?>
                        <div class="row gx-md-5 gy-2">
                            <fieldset>
                                <div class="row g-2">
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingInputGrid" placeholder="nom" />
                                            <label for="floatingInputGrid">N° LTR</label>
                                        </div>
                                    </div>
                                    <div class="col-md">
                                        <div class="form-floating">
                                            <input type="datetime-local" class="form-control" id="floatingInputGrid" placeholder="prenom.com" />
                                            <label for="floatingInputGrid">Date</label>
                                        </div>
                                        </div>
                                        <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text"  name="colisseur" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Colisseur</label>
                                        </div>
                                        </div>
                                        <div class="col-md">
                                        <div class="form-floating">
                                            <input type="text" name="escale" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Escale</label>
                                        </div>
                                        </div>
                                        <div class="col-md">
                                        <div class="form-floating">
                                            <input type="number" name="dist" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Distance</label>
                                        </div>
                                        </div>
                                    </div>
                            </fieldset>
                            <fieldset class="col-6">
                                <legend class="w-auto fs-5">Expéditeur</legend>
                                <div class="row g-2">
                                    <div>
                                        <div class="form-floating">
                                            <input type="text" name="name1" class="form-control" id="floatingInputGrid" placeholder="nom" />
                                            <label for="floatingInputGrid">Nom</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-floating">
                                            <input type="text" name="first-name1" class="form-control" id="floatingInputGrid" placeholder="prenom.com" />
                                            <label for="floatingInputGrid">Prenom</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-floating">
                                            <input type="text" name="numero1" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Numero</label>
                                        </div>
                                    </div>
                                    <div    >
                                        <div class="form-floating">
                                            <input type="text" name="email1" class="form-control" id="floatingInputGrid" placeholder="lieu" />
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
                                        <input type="text" name="name2" class="form-control" id="floatingInputGrid" placeholder="nom" />
                                        <label for="floatingInputGrid">Nom</label>
                                    </div>
                                    </div>
                                    <div>
                                        <div class="form-floating">
                                        <input type="text" name="first-name2" class="form-control" id="floatingInputGrid" placeholder="prenom.com" />
                                        <label for="floatingInputGrid">Prenom</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-floating">
                                        <input type="text" name="numero2" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Numero</label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-floating">
                                        <input type="text" name="email2" class="form-control" id="floatingInputGrid" placeholder="lieu" />
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
                                            <input type="number" name="poids" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Poids</label>
                                        </div>
                                        <div class="form-floating mt-2">
                                            <input type="text" name="prix" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                            <label for="floatingInputGrid">Prix</label>
                                        </div>
                                        <div class="form-floating mt-2">
                                            <textarea name="description" id="floatingInputGrid" cols="30" rows="10" class="form-control"></textarea>
                                            <label for="floatingInputGrid">Observation</label>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-floating">
                                        <select class="form-select" name="bus" id="floatingSelectGrid" aria-label="Floating label select">
                                            <option selected>Sélectionnez</option>
                                            <option value="1">Bus 1</option>
                                            <option value="2">Bus 2</option>
                                            <option value="3">Bus 3</option>
                                        </select>
                                        <label for="floatingSelectGrid">Bus</label>
                                        </div>
                                        <div class="form-floating mt-2">
                                        <input type="text" name="code" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Code colis</label>
                                        </div>
                                        <div class="form-floating mt-2">
                                        <input type="text" name="type" class="form-control" id="floatingInputGrid" placeholder="lieu" />
                                        <label for="floatingInputGrid">Type</label>
                                        </div>
                                    </div>
                                    </div>
                            </fieldset>
                        </div>
                        <div class="d-flex justify-content-center my-3">
                            <div>
                            <button type="reset" class="btn text-white fw-bold disabled" style='background-color: #195490'>Annuler</button>
                            <button type="submit" class="btn text-white fw-bold ms-3" style='background-color: #195490'>Enregistrer</button>                    
                            </div>
                        </div>
                    </form> -->
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="text/babel" data-type="module" src="<?= base_url('assets/js/Form.js') ?>"></script>