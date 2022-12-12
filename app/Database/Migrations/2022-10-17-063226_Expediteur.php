<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Expediteur extends Migration
{
    public function up()
    {
        // All Migrations about the 'expediteur' table
        
        $this->forge->addField([
            'id_exp' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'nom_exp' => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
            ],
            'prenom_exp' => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
            ],
            'numero_exp' => [
                'type' => 'VARCHAR',
                'constraint' => '30'
            ],
            'email_exp' => [
                'type'       => 'VARCHAR',
                'constraint' => '100'
            ]
        ]);
        $this->forge->addKey('id_exp', true);
        $this->forge->createTable('expediteur');
    }

    public function down()
    {
        $this->forge->dropTable('expediteur');
    }
}
