<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Http\Resources\UserResource;


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
}
