<?php

namespace App\Models;

use CodeIgniter\Model;

class TransfereModel extends Model
{
    protected $table = 'transfere';
    protected $primaryKey = 'id_trans';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';

    protected $allowedFields = ['trans', 'code', 'date_exp', 'date_rec', 'bus_id', 'exp_id', 'rec_id', 'poids_trans', 'prix', 'description', 'escale', 'colisseur', 'dist', 'view_date'];

    protected $createdField  = 'created_at';
}