<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Créer pdf</title>
</head>
<body class="container my-5">
    <?php $allResult = $allResults[0]; ?>
    <div id="content">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-baseline">
                    <h6>N° LTR : LTR<?= $allResult['code'] ?><?= $allResult['date_exp'] ?></h6>
                    <div>
                        <img style="width: 300px;" src="<?= base_url('assets/img/avatars/LOGO-MULYKAP-ESP-RED.png') ?>" alt="Mulikap-logo" class="img-fluid">
                    </div>
                    <h6><span><?= $allResult['source'] ?></span> ,<small>Date <?= $allResult['date_exp'] ?></small></h6>
                </div>
                <h4 class="text-center my-3 fw-bold">LETTRE DE TRANSPORT ROUTIER</h4>
            </div>
            <div class="card-body">
                <h5 class="fw-bold my-1 text-center">Trajet : <?= $allResult['source']. '-' . $allResult['dest'] ?></h5>
                <div class="row g-2">
                    <div class="col-6 border">
                        <h6 class="fw-bold my-3">EXPEDITEUR</h6>
                        <div class="mx-3">
                            <div class="my-4">
                                <p>Nom Expéditeur : <span class="fw-bold"><?= $allResult['nom_exp'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Ville : <span class="fw-bold"><?= $allResult['source'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Téléphone Expéditeur : <span class="fw-bold"><?= $allResult['numero_exp'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Mail Expéditeur : <span class="fw-bold"><?= $allResult['email_exp'] ?></span></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 border">
                        <h6 class="fw-bold my-3">DESTINATAIRE</h6>
                        <div class="mx-3">
                            <div class="my-4">
                                <p>Nom Destinataire : <span class="fw-bold"><?= $allResult['nom_rec'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Ville : <span class="fw-bold"><?= $allResult['dest'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Téléphone Destinataire : <span class="fw-bold"><?= $allResult['numero_rec'] ?></span></p>
                            </div>
                            <div class="my-4">
                                <p>Mail Destinataire : <span class="fw-bold"><?= $allResult['email_rec'] ?></span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-4">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Code colis</th>
                                <th colspan="3">Designation</th>
                                <th>Prix colis</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><?= $allResult['code'] ?></td>
                                <td colspan="3"><?= $allResult['description'] ?></td>
                                <td><?= $allResult['prix'] ?> Fc</td>
                                <td><?= $allResult['prix'] ?> FC</td>
                            </tr>
                            <tr>
                                <th colspan="5" class="text-end">TOTAL HT : </th>
                                <td><?= $allResult['prix'] ?> FC</td>
                            </tr>
                            <tr>
                                <th colspan="5" class="text-end">Remise : </th>
                                <td>0 FC</td>
                            </tr>
                            <tr>
                                <th colspan="5" class="text-end">TVA 16% : </th>
                                <td>0 FC</td>
                            </tr>
                            <tr>
                                <th colspan="5" class="text-end">Total TTC CDF : </th>
                                <td><?= $allResult['prix'] ?> FC</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-around mb-5">
                    <small>Expéditeur</small>
                    <small>Pour reception<br/>Nom & Signature</small>
                    <small>Mulykap sarl<br/><span class="fw-bold"><?= $user['username'] ?></span></small>
                </div>
                <div>
                    <small>En signant, j'accepte les conditions reprises au verso</small>
                </div>
            </div>
        </div>
    </div>
    <div id="root"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel" data-type="module" src="<?= base_url('assets/js/Pdf.js') ?>"></script>
</body>
</html>