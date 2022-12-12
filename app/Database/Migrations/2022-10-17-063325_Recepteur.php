<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Recepteur extends Migration
{
    public function up()
    {
        // All Migrations about the 'recepteur' table
        $this->forge->addField([
            'id_rec' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'nom_rec' => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
            ],
            'prenom_rec' => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
            ],
            'numero_rec' => [
                'type' => 'VARCHAR',
                'constraint' => '30'
            ],
            'email_rec' => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
            ]
        ]);
        $this->forge->addKey('id_rec', true);
        $this->forge->createTable('recepteur');
    }

    public function down()
    {
        $this->forge->dropTable('recepteur');
    }
}
