<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\nilai;
use App\Http\Resources\NilaiResource;
use Illuminate\Support\Facades\Validator;

class NilaiController extends Controller
{
    public function getNilai(Request $req)
    {

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

    // get nilai by user id
    public function getNilaiById(Request $req, $id)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {
            $cari = NilaiResource::collection(nilai::where('user_id', $id)->get());
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

    public function beriPenilaianSiswa(Request $req, $id)
    {
        $user = $req->user();
        if ($user->tokenCan('guru_token')) {
            nilai::find($id);
            $validator = Validator::make($req->all(), [
                'nilai' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Data tidak valid'
                ], 400);
            } else {
                $nilai = nilai::find($id);
                $nilai->nilai = $req->nilai;
                $nilai->save();
                return response()->json([
                    'message' => 'Data berhasil diubah',
                    'data' => $nilai
                ], 200);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }
}
