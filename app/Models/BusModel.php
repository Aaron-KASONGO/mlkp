<?php

namespace App\Models;

use CodeIgniter\Model;

class BusModel extends Model
{
    protected $table = 'bus';
    protected $primaryKey = 'id_bus';

    protected $useAutoIncrement = true;

    protected $returnType     = 'array';

    protected $allowedFields = ['num_bus', 'voyage', 'long', 'lat', 'source', 'dest', 'poids_bus', 'id_user', 'init_lat', 'init_long'];

    protected $createdField  = 'created_at';

}