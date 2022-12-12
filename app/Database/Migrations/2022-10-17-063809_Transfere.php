<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Exceptions\DatabaseException;

use CodeIgniter\Database\Migration;

use CodeIgniter\Database\RawSql;

class Transfere extends Migration
{
    public function up()
    {
        // All Migrations about the 'transfere' table
        $this->db->disableForeignKeyChecks();

        $this->forge->addField([
            'id_trans' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],'code' => [
                'type'       => 'VARCHAR',
                'constraint' => '30',
                'default' => ''
            ],
            'trans' => [
                'type'       => 'BOOLEAN',
                'default' => true,
            ],
            'date_exp' => [
                'type'       => 'TIMESTAMP',
                'default' => new RawSql('CURRENT_TIMESTAMP'),
            ],
            'date_rec' => [
                'type'       => 'TIMESTAMP',
            ],
            'bus_id' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'       => true
            ],
            'exp_id' => [
                'type'       => 'INT',
                'constraint' => 5,
                'unsigned'       => true
            ],
            'rec_id' => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true
            ],
            'poids_trans' => [
                'type' => 'DOUBLE'
            ],
            'prix' => [
                'type' => 'DOUBLE',
                'default' => 0.0
            ],
            'description' => [
                'type' => 'VARCHAR',
                'constraint' => '100'
            ],
            'colisseur' => [
                'type' => 'VARCHAR',
                'constraint' => '30'
            ],
            'escale' => [
                'type' => 'VARCHAR',
                'constraint' => '30'
            ],
            'view_date' => [
                'type' => 'BOOLEAN',
                'default' => false
            ],
            'dist' => [
                'type' => 'INT',
                'default' => 0
            ]
        ]);
        $this->forge->addKey('id_trans', true);

        $this->forge->addForeignKey('bus_id', 'bus', 'id_bus', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('exp_id', 'expediteur', 'id_exp', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('rec_id', 'recepteur', 'id_rec', 'CASCADE', 'CASCADE');

        $this->forge->createTable('transfere');

        $this->db->enableForeignKeyChecks();
    }

    public function down()
    {
        $this->forge->dropTable('transfere');
    }
}