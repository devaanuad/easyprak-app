<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class soal extends Model
{
    use HasFactory;

    protected $fillable = [
        'matpel',
        'soal',

        'kelas',
        'guru',
        'kode_soal',
    ];
}
