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
                'soal' => 'Apakah kata "Komputer" berasal dari bahasa Inggris?',
                'jwb1' => 'Ya',
                'jwb2' => 'Tidak',
                'jwb3' => 'Tidak tahu',
                'jwb4' => 'Tidak ada',
                'jawaban' => 'Ya',
                'kelas' => 'X',
                'guru' => 'Sujamin S.ST',
                'kode_soal' => 'SOAL-001',
            ],
            [
                'matpel' => 'Bahasa Indonesia',
                'soal' => 'Apakah Kamus b inggris berasal dari bahasa Inggris?',
                'jwb1' => 'Ya',
                'jwb2' => 'Tidak',
                'jwb3' => 'Tidak tahu',
                'jwb4' => 'Tidak ada',
                'jawaban' => 'Ya',
                'kelas' => 'X',
                'guru' => 'Sujamin S.ST',
                'kode_soal' => 'SOAL-001',
            ],
            [
                'matpel' => 'Matematika',
                'soal' => '1 + 1 = ?',
                'jwb1' => '3',
                'jwb2' => '4',
                'jwb3' => 'Tidak tahu',
                'jwb4' => '2',
                'jawaban' => '2',
                'kelas' => 'X',
                'guru' => 'Sujamin S.ST',
                'kode_soal' => 'SOAL-002',
            ],
        ];

        foreach ($data as $item) {
            \App\Models\Soal::create($item);
        }
    }
}
