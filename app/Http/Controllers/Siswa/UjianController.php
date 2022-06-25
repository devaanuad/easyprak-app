<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ujian;
use App\Http\Resources\UjianResource;

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
}
