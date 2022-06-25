<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ujian extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama',
        'matpel',
        'kelas',
        'mulai_ujian',
        'selesai_ujian',
        'kode_soal',


    ];
}
