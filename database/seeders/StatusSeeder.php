<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('statuses')->insert([
            [
                'slug' => 'pending',
                'description' => 'Pendente',
                'color' => 'yellow'
            ],
            [
                'slug' => 'approved',
                'description' => 'Aprovada',
                'color' => 'green'
            ],
            [
                'slug' => 'declined',
                'description' => 'Recusada',
                'color' => 'red'
            ],
            [
                'slug' => 'cancelled',
                'description' => 'Cancelada',
                'color' => 'violet'
            ],
        ]);
    }
}