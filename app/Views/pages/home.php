<div class="navbar navbar-expand-md position-absolute w-100 navbar-dark fixed-top">
    <div class="container-fluid container-lg">
        <a href="#" class="navbar-brand">
            <span class="navbar-text">MULIKAP   </span>
        </a>
    </div>
</div>
<div class="banner-img d-flex align-items-center">
    <div class="container">
        <p class="text-center text-muted"><small>Trouver l'emplacement de votre collis en temps réél</small></p>
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form action="/get-pos-map" method="post" class="d-grid gap-2 d-md-flex">
                    <?= csrf_field() ?>
                    <input type="search" name="code" id="code" placeholder="Entrez le code du collis" class="form-control rounded-pill">
                    <button type="submit" class="btn btn-danger mt-md-0 mx-md-3 rounded-pill px-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>