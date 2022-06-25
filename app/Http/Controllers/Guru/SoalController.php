<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\soal;
use Illuminate\Support\Facades\Validator;

class SoalController extends Controller
{
    public function getSoal(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('guru_token')) {
            $soals = Soal::all();

            if (empty($soals)) {
                return response()->json([
                    'message' => 'Data tidak ditemukan'
                ], 404);
            }

            return response()->json([
                "data" => $soals
            ], 200);
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    public function createSoal(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('guru_token')) {
            $validator = Validator::make($req->all(), [
                'matpel' => 'required',
                'soal' => 'required',
                'kelas' => 'required',
                'guru' => 'required',
                'kode_soal' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Data tidak lengkap'
                ], 400);
            }
            $soal = new Soal;
            $soal->matpel = $req->matpel;
            $soal->soal = $req->soal;
            $soal->kelas = $req->kelas;
            $soal->guru = $req->guru;
            $soal->kode_soal = $req->kode_soal;
            $soal->save();
            return response()->json([
                'message' => 'Data berhasil ditambahkan',
                'data' => $soal
            ], 201);
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }
}
