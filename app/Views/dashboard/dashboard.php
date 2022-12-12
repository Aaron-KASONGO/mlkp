<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&amp;display=swap">
    <link rel="stylesheet" href="<?= base_url('assets/fonts/fontawesome-all.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/bootstrap-icons/bootstrap-icons.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/boxicons/css/boxicons.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/quill/quill.snow.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/quill/quill.bubble.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/remixicon/remixicon.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/simple-datatables/style.css') ?>">
    <link rel="stylesheet" href="<?= base_url('assets/css/style.css') ?>">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css">
    <link rel="stylesheet" href="<?= base_url('assets/css/dashboard.css') ?>">
</head>

<!-- <body class="toggle-sidebar"> -->
<body>
    <div id="page-top">
    </div>
    <script src="<?= base_url('assets/bootstrap/js/bootstrap.min.js') ?>"></script>
    <script src="<?= base_url('assets/js/chart.min.js') ?>"></script>
    <script src="<?= base_url('assets/js/main.js') ?>"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
    <script src='https://unpkg.com/react-router-dom@5.0.0/umd/react-router-dom.min.js'></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-leaflet/2.3.0/react-leaflet.min.js"></script>
    <script
      src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"
      crossorigin="anonymous"
    ></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        const bus = <?= json_encode($bus) ?>;
    </script>
    <script type="text/babel" data-type="module" src="<?= base_url('assets/js/App.js') ?>"></script>
</body>

</html>