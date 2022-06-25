<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(20)->create();

        $this->call([
            UjianSeeder::class,
            SoalSeeder::class,
        ]);

        \App\Models\User::create([
            'name' => 'Guru',
            'email' => 'admin@gmail.com',
            'kelas' => null,
            'password' => Hash::make('123'),
            'role' => 'guru',
        ]);
    }
}
