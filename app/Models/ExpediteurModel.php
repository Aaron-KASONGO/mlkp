<?php

namespace App\Models;

use CodeIgniter\Model;

class ExpediteurModel extends Model
{
    protected $table = 'expediteur';
    protected $primaryKey = 'id_exp';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';

    protected $allowedFields = ['nom_exp', 'prenom_exp', 'numero_exp', 'email_exp'];

    protected $createdField  = 'created_at';
}