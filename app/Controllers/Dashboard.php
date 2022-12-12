<?php

namespace App\Controllers;

use Twilio\Rest\Client;

use App\Controllers\BaseController;

class Dashboard extends BaseController
{
    public function index()
    {
        if (auth()->user()->inGroup('admin')) {

            $busModel = model(BusModel::class);
            $bus = [
                'bus' => $busModel->find(auth()->id())
            ];
    
            return view('dashboard/dashboard', $bus);
        } else {
            return redirect()->to('/');
        }

    }

    public function launch() {
        $busModel = model(BusModel::class);

        $idBus = $this->request->getVar('idBus');

        $bus = $busModel->find($idBus);

        $busV = $busModel->update($idBus, ['voyage'=> true, 'init_lat' => $bus['lat'], 'init_long' => $bus['long']]);

        return json_encode(['response' => $busV]);

    }

    public function getNotifications() {
        
        $transModel = model(TransfereModel::class);
        $expModel = model(ExpediteurModel::class);
        $recModel = model(RecepteurModel::class);

        $transferes = $transModel->where('view_date', true)->findAll();

        $array = [];

        foreach ($transferes as $key => $row) {
            $exp = $expModel->find($row['exp_id']);
            $rec = $recModel->find($row['rec_id']);

            $body = 'Cher client, nous vous annonçons que le colis envoyé à '. $rec['nom_rec'] . ' ' . $rec['prenom_rec'] . ' de la part de ' . $exp['nom_exp'] . ' ' . $exp['prenom_exp'] .' est arrivé avec succès. Veuillez passer à l\'agence Mulykap pour le récupérer !';
            $array[$key] = $body;
        }

        return json_encode(['messages' => $array]);
        
    }

    public function cleanNotifications() {
        
        $transModel = model(TransfereModel::class);
        $expModel = model(ExpediteurModel::class);
        $recModel = model(RecepteurModel::class);

        $transferes = $transModel->where('view_date', true)->findAll();

        $array = [];

        foreach ($transferes as $key => $row) {
            $exp = $expModel->find($row['exp_id']);
            $rec = $recModel->find($row['rec_id']);

            $transModel->update($row['id_trans'], ['view_date' => false]);
        }

        return json_encode(['messages' => $array]);
        
    }

    public function verify() {
        $busModel = model(BusModel::class);
        $response = $busModel->where('id_user', auth()->id())->first();
        $bus = [
            'verify' => $response
        ];

        return json_encode($bus);
    }

    public function loadData()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (count($trans->findAll()) > 0) {
            $buider = $db->query('SELECT * FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id JOIN expediteur ON expediteur.id_exp = transfere.exp_id JOIN recepteur ON recepteur.id_rec = transfere.rec_id WHERE trans=true;');
            $results = [
                'allResults' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }
    }

    public function loadDataAll()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (count($trans->findAll()) > 0) {
            $buider = $db->query('SELECT * FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id JOIN expediteur ON expediteur.id_exp = transfere.exp_id JOIN recepteur ON recepteur.id_rec = transfere.rec_id;');
            $results = [
                'allResults' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }
    }

    public function getReport()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (count($trans->findAll()) > 0) {
            $buider = $db->query('SELECT bus.id_bus, bus.num_bus, COUNT(transfere.id_trans) AS nombre, SUM(transfere.prix) AS total, SUM(transfere.poids_trans) AS poids FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id WHERE bus.voyage=TRUE AND transfere.date_exp > CURDATE() GROUP BY bus.id_bus');
            $results = [
                'report' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['report' => []]);
        }
    }

    public function getReport1()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (count($trans->findAll()) > 0) {
            $buider = $db->query('SELECT bus.id_bus, bus.num_bus, COUNT(transfere.id_trans) AS nombre, SUM(transfere.prix) AS total, SUM(transfere.poids_trans) AS poids FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id WHERE bus.voyage=FALSE AND transfere.date_exp > CURDATE() GROUP BY bus.id_bus');
            $results = [
                'report1' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['report1' => []]);
        }
    }

    public function loadDataFalse()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT * FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id JOIN expediteur ON expediteur.id_exp = transfere.exp_id JOIN recepteur ON recepteur.id_rec = transfere.rec_id WHERE trans=false;');
            $results = [
                'allResults' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }

        
    }

    public function loadCountData()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT COUNT(*) as count FROM transfere WHERE trans=false;');
            $results = [
                'counted' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }
    }

    public function loadCount()
    {
        $db = db_connect();

        $trans = model(TransfereModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT COUNT(*) as count FROM transfere WHERE trans=true;');
            $results = [
                'count' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }

    }

    public function loadPDF($id)
    {
        $db = db_connect();
        $userModel = model(UsersModel::class);

        $trans = model(TransfereModel::class);

        if (count($trans->findAll()) > 0) {
            $buider = $db->query('SELECT * FROM transfere JOIN bus ON bus.id_bus = transfere.bus_id JOIN expediteur ON expediteur.id_exp = transfere.exp_id JOIN recepteur ON recepteur.id_rec = transfere.rec_id where transfere.id_trans = '. $id);
            $results = [
                'allResults' => $buider->getResultArray(),
                'user' => $userModel->find(auth()->id())
            ];

            return view('pages/pdf', $results);
        } else {
            return view('dashboard/dashboard', ['allResults' => []]);
        }
    }

    public function filterBus()
    {
        $db = db_connect();

        $trans = model(BusModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT b.id_bus, b.num_bus, b.source, b.dest, (b.poids_bus - sum(t.poids_trans)) AS poids_bus FROM bus AS b, transfere AS t WHERE b.id_bus = t.bus_id GROUP BY b.id_bus');
            $results = [
                'usedBus' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['usedBus' => []]);
        }
    }

    public function filterEmptyBus()
    {
        $db = db_connect();

        $trans = model(BusModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT b.id_bus, b.num_bus, b.source, b.dest, b.poids_bus FROM bus AS b, transfere AS t WHERE b.id_bus != t.bus_id GROUP BY b.id_bus');
            $results = [
                'emptyBus' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['emptyBus' => []]);
        }
    }

    public function loadBus()
    {
        $db = db_connect();

        $trans = model(BusModel::class);

        if (!empty($trans->findAll())) {
            $buider = $db->query('SELECT id_bus, num_bus, source, dest, poids_bus FROM bus');
            $results = [
                'allResults' => $buider->getResultArray()
            ];

            return json_encode($results);
        } else {
            return json_encode(['allResults' => []]);
        }
    }

    public function deleteByID($id) {
        $transfere = model(TransfereModel::class);

        $transfere->delete($id);

        $results = [
            'response' => "Succès"
        ];
        
        return json_encode($results);
    }

    public function updatePos($number, $long, $lat)
    {
        $busModel = model(BusModel::class);

        $bus = $busModel->where('num_bus', $number)->first();

        $data = [
            'long' => $long,
            'lat' => $lat,
        ];

        $response = $busModel->update($bus['id_bus'], $data);

        $result = [
            'result' => $response,
            'bus' => $busModel->find($bus['id_bus'])
        ];

        return json_encode($result);
    }

    public function getAllBus()
    {
        $busModel = model(BusModel::class);

        $bus = $busModel->findAll();

        $results = [
            'bus' => $bus
        ];

        return json_encode($results);
    }

    public function getPos($code)
    {
        $transModel = model(TransfereModel::class);
        $busModel = model(BusModel::class);

        $trans = $transModel->where('code', $code)->first();

        $bus = $busModel->find($trans['bus_id']);

        $result = [
            'trans' => $trans,
            'bus' => $bus
        ];

        return json_encode($result);
    }

    public function sendingSMS()
    {
        $sid    = "AC7cb684a9e527bc2b9ffba702a1fa3968";
        $token  = "8c4a986b44b5e1b61a3273a136199d8b";
        $twilio = new Client($sid, $token);

        $busModel = model(BusModel::class);
        $transModel = model(TransfereModel::class);
        $expModel = model(ExpediteurModel::class);
        $recModel = model(RecepteurModel::class);

        $id_bus = $this->request->getVar('transId');

        $transferes = $transModel->where(['bus_id'=> $id_bus, 'trans' => true])->findAll();

        $array = [];

        foreach ($transferes as $key => $row) {
            $bus = $busModel->find($row['bus_id']);
            $exp = $expModel->find($row['exp_id']);
            $rec = $recModel->find($row['rec_id']);

            $body = 'Cher client, nous vous annonçons que le colis envoyé à '. $rec['nom_rec'] . ' ' . $rec['prenom_rec'] . ' de la part de ' . $exp['nom_exp'] . ' ' . $exp['prenom_exp'] .' est arrivé avec succès. Veuillez passer à l\'agence Mulykap pour le récupérer !';

            $array[$key] = $body;

            $message = $twilio->messages 
                        ->create($exp['numero_exp'], // to 
                                array(
                                    "body" => $body,
                                    "from" => "+19804095754"
                                ) 
                        );
            
            $message = $twilio->messages 
                        ->create($rec['numero_rec'], // to 
                                array(
                                    "body" => $body,
                                    "from" => "+19804095754"
                                ) 
                        );
            
            $busModel->update($row['bus_id'], ['voyage' => false]);

            $transModel->update($row['id_trans'], ['trans' => false, 'view_date' => true]);
        }
        
        
        // print($message->sid);
        return json_encode(['response' => $transferes]);
    }

    public function loadUsers()
    {
        $users = model(UsersModel::class);
        $buses = model(BusModel::class);
        $trans = model(TransfereModel::class);


        if (!empty($trans->findAll())) {
            $userArray = $users->where('active', 1)->findAll();
            $busArray = $buses->findAll();

            $results = [
                'users' => $userArray,
                'buses' => $busArray,
            ];

            return json_encode($results);
        } else {
            return json_encode([
                'users' => [],
                'buses' => []
            ]);
        }

    }

    public function registerBus()
    {
        $users = model(UsersModel::class);
        $buses = model(BusModel::class);


        if ($this->request->getMethod() === 'get') {

            $users->save([
                'username' => $this->request->getVar('num_bus'),
            ]);

            $bus = [
                'num_bus' => $this->request->getVar('num_bus'),
                'source' => $this->request->getVar('parcours1'),
                'dest' => $this->request->getVar('parcours2'),
                'poids_bus' => $this->request->getVar('poids'),
                'id_user' => $users->getInsertID()
            ];
            $buses->save($bus);

            return json_encode(['result' => 'succes']);
        } else {
            return json_encode(['r' => 'erreur']);
        }

    }
}
