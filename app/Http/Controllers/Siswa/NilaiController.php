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
}
