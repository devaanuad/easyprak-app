<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'matpel' => 'Bahasa Indonesia',
                'soal' => 'Tugas Praktek Bahasa indonesia kelas X',
                'kelas' => 'X',
                'guru' => 'Sujamin S.ST',
                'kode_soal' => 'SOAL-001',
            ],
            [
                'matpel' => 'Olahraga',
                'soal' => 'Tugas Praktek Olahraga Senam kelas X',
                'kelas' => 'XI',
                'guru' => 'Bu Marto S.ST',
                'kode_soal' => 'SOAL-002',
            ],
        ];

        foreach ($data as $item) {
            \App\Models\Soal::create($item);
        }
    }
}
