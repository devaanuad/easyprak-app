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
        'jwb1',
        'jwb2',
        'jwb3',
        'jwb4',
        'jawaban',
        'kelas',
        'guru',
        'kode_soal',
    ];
}
