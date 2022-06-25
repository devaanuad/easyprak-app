<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\nilai;
use App\Http\Resources\NilaiResource;

class NilaiController extends Controller
{
    public function getNilai(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {
            $users = NilaiResource::collection(nilai::all());

            if (empty($users)) {
                return response()->json([
                    'message' => 'Data tidak ditemukan',
                    'data' => $users
                ], 404);
            }

            return response()->json([
                "data" => $users
            ], 200);
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    public function getNilaiByKode(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {

            $cari = NilaiResource::collection(nilai::where('user_id', $req->user_id)->get()->where('kode_soal', $req->kode_soal))->first();
            if (empty($cari)) {
                return response()->json([
                    'message' => 'Data tidak ditemukan'
                ], 404);
            } else {

                return response()->json([
                    'message' => 'Data ditemukassn',
                    "data" => $cari
                ], 200);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }
}
