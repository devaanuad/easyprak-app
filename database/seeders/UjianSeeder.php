<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UjianSeeder extends Seeder
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
                'nama' => 'Ujian Praktek Semester genap 2022',
                'matpel' => 'Bahasa Indonesia',
                'kelas' => 'X',
                'mulai_ujian' => '2020-01-01 00:00:00',
                'selesai_ujian' => '2020-01-01 00:00:00',
                'kode_soal' => 'SOAL-001',
            ],
            [
                'nama' => 'UTS 2022',
                'matpel' => 'Olahraga',
                'kelas' => 'XI',
                'mulai_ujian' => '2020-01-01 00:00:00',
                'selesai_ujian' => '2020-01-01 00:00:00',
                'kode_soal' => 'SOAL-002',
            ],
        ];

        foreach ($data as $item) {
            \App\Models\Ujian::create($item);
        }
    }
}
