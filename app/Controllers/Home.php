<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {

        return view('templates/header')
            .view('pages/register')
            .view('templates/footer');
    }

    
    public function getRandom($length)
    {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $string = '';
        for($i=0; $i<$length; $i++){
            $string .= $chars[rand(0, strlen($chars)-1)];
        }
        return $string;
    }

    public function register()
    {
        $exp = model(ExpediteurModel::class);
        $rec = model(RecepteurModel::class);
        $bus = model(BusModel::class);
        $transfere = model(TransfereModel::class);

        $results = [
            'results' => $bus->findAll()
        ];


        $rules = [
            'name1' => 'required|min_length[3]|max_length[255]',
            'first-name1' => 'required|min_length[3]|max_length[255]',
            'numero1' => 'required|min_length[3]|max_length[255]',
            'name2' => 'required|min_length[3]|max_length[255]',
            'first-name2' => 'required|min_length[3]|max_length[255]',
            'numero2' => 'required|min_length[3]|max_length[255]',
            'bus' => 'required'
        ];

        $expediteur = [
            'nom_exp' => $this->request->getVar('name1'),
            'prenom_exp' => $this->request->getVar('first-name1'),
            'numero_exp' => $this->request->getVar('numero1'),
            'email_exp' => $this->request->getVar('email1')
        ];

        $recepteur = [
            'nom_rec' => $this->request->getVar('name2'),
            'prenom_rec' => $this->request->getVar('first-name2'),
            'numero_rec' => $this->request->getVar('numero2'),
            'email_rec' => $this->request->getVar('email2')
        ];

        if ($this->validate($rules)) {
            $exp->save($expediteur);
            $rec->save($recepteur);
            $transfere->save([
                'trans' => true,
                'code' => $exp->getInsertID() .''. $rec->getInsertID() .'-'. $this->getRandom(4),
                'bus_id' => (int) $this->request->getVar('bus'),
                'exp_id' => $exp->getInsertID(),
                'rec_id' => $rec->getInsertID(),
                'poids_trans' => $this->request->getVar('poids'),
                'prix' => $this->request->getVar('prix'),
                'description' => $this->request->getVar('description'),
                'escale' => $this->request->getVar('escale'),
                'colisseur' => $this->request->getVar('colisseur'),
                'dist' => 1
            ]);
            return json_encode(['reponse' => 'success', 'id' => $transfere->getInsertID()]);
        } else {
            return json_encode(['response'=> $recepteur]);
        }
    }

    public function getPosMap()
    {
        $bus = null;
        if ($this->request->getMethod() === 'post') {

            $transModel = model(TransfereModel::class);
            $busModel = model(BusModel::class);
    
            $trans = $transModel->where('code', $this->request->getPost('code'))->first();
    
            $bus = $busModel->find($trans['bus_id']);
        }

        $result = [
            'bus' => $bus
        ];

        return view('pages/map', $result);
    }

    public function verifyBus($username, $password)
    {
        $users = model(UsersModel::class);
        $busModel = model(BusModel::class);

        $array = ['username' => $username, 'active' => false];

        $user = $users->where($array)->first();

        if ($user && $password === '123456') {
            // $busArray = ['id_user' => $user['id'], 'voyage' => true];
            // if ($busModel->where($busArray)->first()) {
                
            // } else {
            //     return false;
            // }
            return true;
        } else {
            return false;
        }
    }

    public function logBus() {

        if ($this->request->getMethod() === 'post') {

            $username = $this->request->getVar('username');
            $password = $this->request->getVar('password');

            if ($this->verifyBus($username, $password)) {
                return view('pages/bus', ['number' => $username]);
            } else {
                return view('pages/connexion_bus', ['result' => 'Non validé']);
            }
        } else {
            return view('pages/connexion_bus', ['result' => 'Pas une requête post']);
        }
    }
}


