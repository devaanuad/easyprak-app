<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ujian;
use App\Http\Resources\UjianResource;
use App\Models\nilai;
use App\Models\soal;
use Illuminate\Support\Facades\Validator;

class UjianController extends Controller
{
    public function getUjian(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {
            $users = UjianResource::collection(Ujian::all());

            if (empty($users)) {
                return response()->json([
                    'message' => 'Data tidak ditemukan'
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

    public function getUjianByKode(Request $req, $kode)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {
            // get soal in soal model
            $soal = soal::where('kode_soal', $kode)->get();
            // get ujian in ujian model


            // return ujian
            return response()->json([
                "data" => $soal
            ], 200);
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }

    public function postTugas(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('siswa_token')) {
            $validator = Validator::make($req->all(), [
                'user_id' => 'required',
                'nama_siswa' => 'required',
                'kelas' => 'required',
                'matpel' => 'required',
                'nilai' => 'nullable',
                'file' => 'required',
                'kode_soal' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Data tidak valid',
                    'error' => $validator->errors()
                ], 400);
            }

            try {
                $nilai = new nilai();
                $nilai->user_id = $req->user_id;
                $nilai->nama_siswa = $req->nama_siswa;
                $nilai->kelas = $req->kelas;
                $nilai->matpel = $req->matpel;
                $nilai->nilai = $req->nilai;
                $nilai->file = $req->file->store('tugas');
                $nilai->kode_soal = $req->kode_soal;
                $nilai->save();
                return response()->json([
                    'message' => 'Data berhasil dikirim'
                ], 201);
            } catch (\Throwable $th) {
                return response()->json([
                    'message' => 'Terjadi kesalahan',
                    'error' => $th->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }
}
