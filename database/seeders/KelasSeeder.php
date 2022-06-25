<?php

namespace Database\Seeders;

use App\Models\kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Kelas::factory(3)->create();

        $data = [
            [
                'nama_kelas' => '12 RPL A',
            ],
            [
                'nama_kelas' => '12 RPL B',
            ],
            [
                'nama_kelas' => '12 RPL C',
            ],
        ];

        foreach ($data as $key => $value) {
            kelas::create($value);
        }
    }
}
