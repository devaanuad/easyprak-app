<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Guru\UserController;
use App\Http\Controllers\Siswa\NilaiController;
use App\Http\Controllers\Siswa\UjianController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:sanctum')->prefix('guru')->group(function () {
    Route::get('/user', [UserController::class, 'getUserss']);
});

Route::middleware('auth:sanctum')->prefix('siswa')->group(function () {
    Route::get('/ujian', [UjianController::class, 'getUjian']);
    Route::get('/ujian/{kode}', [UjianController::class, 'getUjianByKode']);

    Route::post('/postTugas', [UjianController::class, 'postTugas']);

    Route::get('/nilai', [NilaiController::class, 'getNilai']);
    Route::post('/cari/user', [NilaiController::class, 'getNilaiByKode']);
});


// route login logot
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
