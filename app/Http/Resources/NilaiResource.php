<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NilaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'nama_siswa' => $this->nama_siswa,
            'kelas' => $this->kelas,
            'matpel' => $this->matpel,
            'nilai' => $this->nilai,
            'file' => url('/storage/' . $this->file),
            'kode_soal' => $this->kode_soal,
        ];
    }
}
