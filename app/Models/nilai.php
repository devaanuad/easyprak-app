<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class nilai extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'nama_siswa',
        'kelas',
        'matpel',
        'nilai',
        'file',
        'kode_soal',

    ];
}
