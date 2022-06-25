<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUserss(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('guru_token')) {
            $users = UserResource::collection(User::all());

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

    public function createUser(Request $req)
    {
        $user = $req->user();
        if ($user->tokenCan('guru_token')) {

            $messageError = [
                'required' => ':attribute tidak boleh kosong',
                'min' => ':attribute minimal :min karakter',
                'max' => ':attribute maksimal :max karakter',
                'email' => ':attribute email tidak valid',
                'unique' => ':attribute sudah digunakan',
            ];

            $validator = Validator::make($req->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:3',
                'kelas' => 'required',
                'role' => 'required|in:guru,siswa',
            ], $messageError);

            if ($validator->fails()) {
                return response()->json([
                    'error' => $validator->errors()
                ], 400);
            }

            try {
                $user = User::create([
                    'name' => $req->name,
                    'email' => $req->email,
                    'password' => Hash::make($req->password),
                    'kelas' => $req->kelas,
                    'role' => $req->role
                ]);

                return response()->json([
                    'message' => 'Data berhasil ditambahkan',
                    'data' => $user
                ], 201);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Gagal menambah data',
                    'error' => $e->getMessage()
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'Anda tidak memiliki akses'
            ], 401);
        }
    }
}
