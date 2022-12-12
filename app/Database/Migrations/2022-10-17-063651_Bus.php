<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Bus extends Migration
{
    public function up()
    {
        // All Migrations about the 'bus' Table
        $this->forge->addField([
            'id_bus' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'num_bus' => [
                'type'       => 'VARCHAR',
                'constraint' => '10',
                'unique'     => true,
            ],
            'voyage' => [
                'type'       => 'BOOLEAN',
                'default' => false,
            ],
            'long' => [
                'type'           => 'DOUBLE',
                'default' => 0
            ],
            'lat' => [
                'type'           => 'DOUBLE',
                'default' => 0,
            ],
            'init_lat' => [
                'type'      => 'DOUBLE',
                'default' => 0
            ],
            'init_long' => [
                'type'      => 'DOUBLE',
                'default' => 0
            ],
            'source' => [
                'type' => 'VARCHAR',
                'constraint' => '10'
            ],
            'dest' => [
                'type' => 'VARCHAR',
                'constraint' => '10'
            ],
            'poids_bus' => [
                'type' => 'DOUBLE',
            ],
            'id_user' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'unique'        => true,
                'null'          => true,
            ]
        ]);
        $this->forge->addKey('id_bus', true);
        $this->forge->createTable('bus');
    }

    public function down()
    {
        $this->forge->dropTable('bus');
    }
}
