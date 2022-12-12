<?php

namespace App\Models;

use CodeIgniter\Model;

class RecepteurModel extends Model
{
    protected $table = 'recepteur';
    protected $primaryKey = 'id_rec';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';

    protected $allowedFields = ['nom_rec', 'prenom_rec', 'numero_rec', 'email_rec'];

    protected $createdField  = 'created_at';
}